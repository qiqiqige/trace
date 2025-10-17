import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, LoginFormData, RegisterFormData, User, ApiResponse } from '@/types';

const initialState: AuthState = {
  user: null,         
  isLoading: false,    
  error: null,        
  isAuthenticated: false 
};
const BASE_URL = 'http://127.0.0.1:8081/api/auth';
// 3. 创建异步 Action（登录请求）
// createAsyncThunk 用于处理异步操作（如调用后端接口）
// 泛型参数：1. Action 类型名；2. 传入的参数类型（LoginFormData）；3. 返回值类型（ApiResponse<User>）
export const loginAsync = createAsyncThunk<
  ApiResponse<User>,
  LoginFormData,
  { rejectValue : ApiResponse<null>}
>('auth/login', async (loginData, { rejectWithValue }) => {
  try {
    const res = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: loginData.username, password: loginData.password })
    });
    const json = await res.json();

    if (json.code !== 200) {
      return rejectWithValue({ code: json.code ?? 500, msg: json.msg ?? '登录失败', data: null });
    }

    const backendUser = json.data?.user ?? {};
    const token = json.data?.token ?? '';

    const roleStr: string = (backendUser.role ?? '').toString().toLowerCase();
    const role: 'admin'|'user'|'guest' =
      roleStr.includes('admin') ? 'admin' :
      roleStr.includes('user') ? 'user' : 'guest';

    const mappedUser: User = {
      id: backendUser.id as any,
      username: backendUser.username ?? loginData.username,
      phone: backendUser.phone ?? undefined,
      avatar: backendUser.avatar ?? undefined,
      token,
      role,
      createdAt: backendUser.createdAT ? String(backendUser.createdAT) : new Date().toISOString()
    };

    localStorage.setItem('token', token);

    return { code: json.code, msg: json.msg, data: mappedUser };
  } catch (error) {
    return rejectWithValue({ code: 500, msg: '登录失败，请检查网络或稍后重试', data: null });
  }
});
// 4. 创建异步 Action（注册请求）
export const registerAsync = createAsyncThunk<
  ApiResponse<User>,
  RegisterFormData,
  { rejectValue : ApiResponse<null>}
>('auth/register', async (registerData, { rejectWithValue }) => {
  try {
    const res = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: registerData.username,
        password: registerData.password,
        phone: registerData.phone
      })
    });
    const json = await res.json();

    if (json.code !== 200) {
      return rejectWithValue({ code: json.code ?? 500, msg: json.msg ?? '注册失败', data: null });
    }

    const backendUser = json.data ?? {};
    const roleStr: string = (backendUser.role ?? '').toString().toLowerCase();
    const role: 'admin'|'user'|'guest' =
      roleStr.includes('admin') ? 'admin' :
      roleStr.includes('user') ? 'user' : 'guest';

    const mappedUser: User = {
      id: backendUser.id as any,
      username: backendUser.username ?? registerData.username,
      phone: backendUser.phone ?? registerData.phone,
      avatar: backendUser.avatar ?? undefined,
      token: '', // 注册不返回 token，这里占位以满足类型
      role,
      createdAt: backendUser.createdAT ? String(backendUser.createdAT) : new Date().toISOString()
    };

    return { code: json.code, msg: json.msg, data: mappedUser };
  } catch (error) {
    return rejectWithValue({ code: 500, msg: '注册失败，请稍后重试', data: null });
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