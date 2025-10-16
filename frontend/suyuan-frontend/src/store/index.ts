// 1. 导入 RTK 的配置工具和切片
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';

// 2. 创建 Store（configureStore 会自动配置 Redux DevTools 和中间件）
export const store = configureStore({
  reducer: {
    auth: authReducer, // 注册 auth 切片（key 是 'auth'，后续组件中通过 state.auth 访问认证状态）
    // 后续添加其他切片，比如：
    // task: taskReducer,
    // report: reportReducer
  }
});

// 3. 导出 Store 的类型（方便组件中使用 TypeScript 类型提示）
// RootState：整个 Store 的状态类型（所有切片的状态集合）
export type RootState = ReturnType<typeof store.getState>;
// AppDispatch：Store 的 dispatch 类型（支持异步 Action）
export type AppDispatch = typeof store.dispatch;