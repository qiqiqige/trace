'use client';

import React, { createContext, useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';

type Origin = { x: number; y: number } | null;
type StartOptions = { origin?: Origin };

type Ctx = { start: (to: string, opts?: StartOptions) => void };

const RouteTransitionContext = createContext<Ctx>({ start: () => {} });

export function RouteTransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [active, setActive] = useState(false);
  const [origin, setOrigin] = useState<Origin>(null);
  const [target, setTarget] = useState<string | null>(null);
  const [mode, setMode] = useState<'sweep'|'circle'>('sweep');

  const start = (to: string, opts?: { origin?: Origin; mode?: 'sweep'|'circle' }) => {
    setTarget(to);
    setOrigin(opts?.origin ?? null);
    setMode(opts?.mode ?? 'sweep');
    setActive(true);
  };

  const onComplete = () => {
    if (target) router.push(target);
    setActive(false);
    setTarget(null);
    setOrigin(null);
  };

  const baseCircle: React.CSSProperties = {
    width: 160,
    height: 160,
    borderRadius: '50%',
    position: 'absolute',
    background: 'radial-gradient(120% 120% at 50% 50%, rgba(124,58,237,0.35), rgba(56,189,248,0.22))',
    boxShadow: '0 30px 60px rgba(124,58,237,0.25)',
  };

  const posStyle: React.CSSProperties =
    origin
      ? { left: origin.x, top: origin.y, transform: 'translate(-50%, -50%)' }
      : { left: '50%', top: '50%', transform: 'translate(-50%, -50%)' };

  const originXPercent =
    origin ? Math.max(0, Math.min(100, (origin.x / window.innerWidth) * 100)) : 50;

  return (
    <RouteTransitionContext.Provider value={{ start }}>
      <AnimatePresence>
        {active && (
          <motion.div
            key="route-transition"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, zIndex: 1000, pointerEvents: 'none', overflow: 'hidden' }}
          >
            {mode === 'sweep' ? (
              <motion.div
                initial={{ scaleX: 0.001 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                onAnimationComplete={onComplete}
                style={{
                  position: 'absolute',
                  inset: 0,
                  transformOrigin: `${originXPercent}% 50%`,
                  background:
                    'linear-gradient(90deg, rgba(56,189,248,0.18) 0%, rgba(124,58,237,0.28) 35%, rgba(124,58,237,0.35) 100%)',
                  backdropFilter: 'blur(6px)',
                  WebkitBackdropFilter: 'blur(6px)',
                }}
              />
            ) : (
              <motion.div
                initial={{ scale: 0.001, rotate: 0 }}
                animate={{ scale: 25, rotate: 360 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                onAnimationComplete={onComplete}
                style={{
                  width: 160,
                  height: 160,
                  borderRadius: '50%',
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  background: 'radial-gradient(120% 120% at 50% 50%, rgba(124,58,237,0.35), rgba(56,189,248,0.22))',
                  boxShadow: '0 30px 60px rgba(124,58,237,0.25)',
                }}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </RouteTransitionContext.Provider>
  );
}

export function useRouteTransition() {
  return useContext(RouteTransitionContext);
}