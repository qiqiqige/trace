'use client';

import { Provider } from 'react-redux';
import { store } from '@/store';
import type { ReactNode } from 'react';
import Background from '@/app/components/Background';
import Logo from './components/Logo';
import { usePathname } from 'next/navigation';
import { RouteTransitionProvider } from './components/RouteTransition';

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  const pathname = usePathname();
  const isLogin = pathname?.startsWith('/login');

  return (
    <Provider store={store}>
      {/* 背景层 */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <Background listenOnWindow style={{ width: '100%', height: '100%' }} />
      </div>

      {/* 全局路由过渡层 */}
      <RouteTransitionProvider>
        {/* 非登录页时显示左上角品牌角标 */}
        {!isLogin && (
          <div
            style={{
              position: 'fixed',
              top: 16,
              left: 16,
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '8px 12px',
              background: 'rgba(11,18,32,0.6)',
              border: '1px solid rgba(124,58,237,0.35)',
              borderRadius: 12,
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
            }}
          >
            <div style={{ width: 36, height: 36 }}>
              <Logo
                color="#A78BFA"
                cursorBallColor="#38BDF8"
                cursorBallSize={1.6}
                ballCount={10}
                animationSize={24}
                enableMouseInteraction={false}
                enableTransparency={true}
                hoverSmoothness={0.05}
                clumpFactor={1}
                speed={0.25}
              />
            </div>
            <span
              style={{
                fontWeight: 700,
                fontSize: 18,
                letterSpacing: '0.08em',
                color: '#E6EAF2',
              }}
            >
              溯源
            </span>
          </div>
        )}

        <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
      </RouteTransitionProvider>
    </Provider>
  );
}