'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';

export default function Home() {
  const [hover, setHover] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const router = useRouter();
  //跳转到登录页
  const startTransitionToLogin = () => {
    const doc: any = typeof document !== 'undefined' ? document : null;
    if (doc && doc.startViewTransition) {
      doc.startViewTransition(() => router.push('/login'));
    } else {
      router.push('/login');
    }
  };

  return(
    <main className="min-h-screen w-full grid place-items-center px-6">
      <AnimatePresence>
        {transitioning && (
          <motion.div
            key="route-transition"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 999,
              pointerEvents: 'none',
              overflow: 'hidden',
            }}
          >
            <motion.div
              initial={{ scale: 0.001, rotate: 0, x: 0, y: 0 }}
              animate={{ scale: 25, rotate: 360 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              onAnimationComplete={() => router.push('/login')}
              style={{
                width: 160,
                height: 160,
                borderRadius: '50%',
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                background: 'radial-gradient(120% 120% at 50% 50%, rgba(124,58,237,0.35), rgba(56,189,248,0.22))',
                boxShadow: '0 0 60px rgba(124,58,237,0.35)',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onFocus={() => setHover(true)}
        onBlur={() => setHover(false)}
        tabIndex={0}
        style={{ outline: 'none' }}
      >
        <AnimatePresence mode="wait">
          {!hover ? (
            <motion.h1
              key="slogan"
              initial={{ opacity: 0, y: 4, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -2, filter: 'blur(3px)' }}
              transition={transition}
              className="text-center font-semibold tracking-wide"
              style={{
                color: '#E6EAF2',
                fontSize: 'clamp(32px, 6vw, 72px)',
                textShadow: '0 6px 40px rgba(124,58,237,0.18)',
                letterSpacing: '0.04em',
              }}
            >
              让每一次灵光，都有迹可寻
            </motion.h1>
          ) : (
            <motion.button
              key="cta"
              initial={{ opacity: 0, y: 6, scale: 0.97, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -3, scale: 0.99, filter: 'blur(3px)' }}
              transition={transition}
              onClick={startTransitionToLogin}
              style={{
                padding: '18px 52px',
                borderRadius: 9999,
                background: 'rgba(124,58,237,0.22)',
                border: '1px solid rgba(124,58,237,0.55)',
                color: '#E6EAF2',
                fontWeight: 700,
                fontSize: 'clamp(18px, 2.2vw, 24px)',
                lineHeight: 1.1,
                letterSpacing: '0.08em',
                minWidth: '280px',
                boxShadow: '0 14px 40px rgba(124,58,237,0.25), inset 0 1px rgba(56,189,248,0.28)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                transition: 'box-shadow .28s ease, background .28s ease, border-color .28s ease, transform .12s ease',
                viewTransitionName: 'cta-bubble', // 关键：与登录页右侧容器同名
                willChange: 'transform, opacity',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 18px 52px rgba(56,189,248,0.28), inset 0 1px rgba(56,189,248,0.36)';
                e.currentTarget.style.background = 'rgba(124,58,237,0.28)';
                e.currentTarget.style.borderColor = 'rgba(56,189,248,0.65)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 14px 40px rgba(124,58,237,0.25), inset 0 1px rgba(56,189,248,0.28)';
                e.currentTarget.style.background = 'rgba(124,58,237,0.22)';
                e.currentTarget.style.borderColor = 'rgba(124,58,237,0.55)';
                e.currentTarget.style.transform = 'translateY(0px)';
              }}
            >
              开始溯源
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

const transition = { duration: 0.28, ease: [0.22, 1, 0.36, 1] };