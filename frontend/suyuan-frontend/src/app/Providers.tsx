'use client';

import { Provider } from 'react-redux';
import { store } from '@/store';
import type { ReactNode } from 'react';

// 这个组件专门负责包裹客户端的全局 Provider（如 Redux、Theme 等）
interface ProvidersProps {
  children: ReactNode; // 接收子组件（所有页面内容）
}

export default function Providers({ children }: ProvidersProps) {
  return (
    // 把 Redux Provider 放在这里（客户端环境）
    <Provider store={store}>
      {children}
    </Provider>
  );
}