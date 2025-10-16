import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, LoginFormData, RegisterFormData, User, ApiResponse } from '@/types';

const initialState: AuthState = {
  user: null,         
  isLoading: false,    
  error: null,        
  isAuthenticated: false 
};

// 3. 创建异步 Action（登录请求）
// createAsyncThunk 用于处理异步操作（如调用后端接口）
// 泛型参数：1. Action 类型名；2. 传入的参数类型（LoginFormData）；3. 返回值类型（ApiResponse<User>）
export const loginAsync = createAsyncThunk<
  ApiResponse<User>,  // 后端返回的响应类型
  LoginFormData,// 前端传入的登录参数（用户名、密码）
  { rejectValue : ApiResponse<null>}
>('auth/login', async (loginData, { rejectWithValue }) => {
  try {
    // TODO：后续对接真实后端接口，这里先模拟请求
    // 模拟后端接口延迟（1秒）
    const response = await new Promise<ApiResponse<User>>((resolve) => {
      setTimeout(() => {
        // 模拟登录成功（实际项目中这里会用 axios 调用后端 /api/login 接口）
        resolve({
          code: 200,
          msg: '登录成功',
          data: {
            id: 1,
            username: loginData.username,
            phone: '13800138000', // 模拟后端返回的手机号
            token: 'fake-token-123456', // 模拟 Token（实际是后端生成的 JWT）
            role: 'user',
            createdAt: '2024-10-01 10:00:00'
          }
        });
      }, 1000);
    });

    // 登录成功：将 Token 存入 localStorage（持久化，刷新页面不丢失）
    localStorage.setItem('token', response.data.token);
    return response; // 结果会传入 fulfilled 回调
  } catch (error) {
    // 登录失败：返回错误信息（会传入 rejected 回调）
    return rejectWithValue({
      code: 500,
      msg: '登录失败，请检查用户名或密码',
      data: null
    } as ApiResponse<null>);
  }
});

// 4. 创建异步 Action（注册请求）
export const registerAsync = createAsyncThunk<
  ApiResponse<User>,
  RegisterFormData,
  { rejectValue : ApiResponse<null>}
>('auth/register', async (registerData, { rejectWithValue }) => {
  try {
    // 模拟后端注册接口（实际项目中调用 /api/register）
    const response = await new Promise<ApiResponse<User>>((resolve) => {
      setTimeout(() => {
        resolve({
          code: 200,
          msg: '注册成功',
          data: {
            id: 2,
            username: registerData.username,
            phone: registerData.phone,
            token: 'fake-token-654321',
            role: 'user',
            createdAt: new Date().toLocaleString()
          }
        });
      }, 1000);
    });

    return response;
  } catch (error) {
    return rejectWithValue({
      code: 500,
      msg: '注册失败，用户名或手机号已存在',
      data: null
    } as ApiResponse<null>);
  }
});

// 5. 创建异步 Action（退出登录）
export const logoutAsync = createAsyncThunk<
  void, // 退出登录不需要返回值
  void  // 不需要传入参数
>('auth/logout', async () => {
  // 退出登录逻辑：清除 localStorage 中的 Token，后续可加后端登出接口
  localStorage.removeItem('token');
});

// 6. 创建切片（核心逻辑）
const authSlice = createSlice({
  name: 'auth', // 切片名称（唯一，用于 Action 类型前缀）
  initialState, // 初始状态
  reducers: {
    // 同步 Action：比如清除错误信息（不需要调用后端）
    clearError: (state) => {
      state.error = null; // RTK 内部用 Immer 库，可直接修改状态（不用返回新对象）
    }
  },
  // 处理异步 Action 的结果（pending/fulfilled/rejected）
  extraReducers: (builder) => {
    // 处理 loginAsync 的三种状态
    builder
      // 登录请求中
      .addCase(loginAsync.pending, (state) => {
        state.isLoading = true; // 加载中为 true
        state.error = null;     // 清空之前的错误
      })
      // 登录成功
      .addCase(loginAsync.fulfilled, (state, action: PayloadAction<ApiResponse<User>>) => {
        state.isLoading = false;                // 加载结束
        state.isAuthenticated = true;           // 标记为已认证
        state.user = action.payload.data;       // 保存用户信息
      })
      // 登录失败
      .addCase(loginAsync.rejected, (state, action) => {
        state.isLoading = false; // 加载结束
        // 保存错误信息（action.payload 是 rejectWithValue 返回的值）
        state.error = action.payload?.msg || '登录失败，请重试';
      })

      // 处理 registerAsync 的三种状态（逻辑和登录类似）
      .addCase(registerAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerAsync.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null; // 注册成功，清空错误
      })
      .addCase(registerAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.msg || '注册失败，请重试';
      })

      // 处理 logoutAsync（退出登录）
      .addCase(logoutAsync.fulfilled, (state) => {
        state.user = null;                // 清空用户信息
        state.isAuthenticated = false;    // 标记为未认证
      });
  }
});

// 7. 导出同步 Action（clearError）
export const { clearError } = authSlice.actions;

// 8. 导出切片的 Reducer（用于 Store 配置）
export default authSlice.reducer;