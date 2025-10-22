'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../../components/Logo';
import { useRouter } from 'next/navigation';

type Props = {
  task?: () => Promise<void>;
  targetUrl?: string;
  onDone?: () => void;
  progress?: number;
};

export default function LoginAnimationPage({ task, targetUrl = '/index', onDone, progress }: Props) {
  const router = useRouter();
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);
  const animStartedRef = useRef(false);

  useEffect(() => {
    let raf: number | null = null;
    let stopped = false;

    const startInternal = () => {
      const tick = () => {
        setPct(prev => {
          if (done || stopped) return prev;
          const target = 80;
          const next = prev + Math.max(0.5, (target - prev) * 0.06);
          return Math.min(next, target);
        });
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const cleanup = () => {
      if (raf) cancelAnimationFrame(raf);
    };

    if (typeof progress === 'number') {
      setPct(progress);
      if (progress >= 100) setDone(true);
      return cleanup;
    }

    startInternal();

    (async () => {
      try {
        if (task) await task();
      } finally {
        setPct(100);
        setDone(true);
      }
    })();

    return () => {
      stopped = true;
      cleanup();
    };
  }, [task, progress, done]);

  useEffect(() => {
    if (!done || animStartedRef.current) return;
    animStartedRef.current = true;

    const go = () => router.push(targetUrl);
    const navWithViewTransition = () => {
      if (typeof document !== 'undefined' && 'startViewTransition' in document) {
        // @ts-expect-error experimental
        document.startViewTransition(() => {
          go();
        });
      } else {
        go();
      }
    };

    const t = setTimeout(() => {
      navWithViewTransition();
      onDone?.();
    }, 150);
    return () => clearTimeout(t);
  }, [done, router, targetUrl, onDone]);

  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.28, ease }}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          display: 'grid',
          placeItems: 'center',
          background: 'rgba(6,10,18,0.35)',
          backdropFilter: 'blur(8px) saturate(140%)',
          WebkitBackdropFilter: 'blur(8px) saturate(140%)'
        }}
      >
        <div
          style={{
            width: 'min(88vw, 560px)',
            maxWidth: 560,
            padding: '28px 24px',
            borderRadius: 24,
            background: 'rgba(11,18,32,0.65)',
            border: '1px solid rgba(124,58,237,0.35)',
            boxShadow: '0 20px 50px rgba(16,24,40,0.35), inset 0 1px rgba(255,255,255,0.08)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
            <div style={{ width: 'min(30vw, 160px)', height: 'min(30vw, 160px)', viewTransitionName: 'app-logo' as any }}>
              <Logo
                color="#A78BFA"
                cursorBallColor="#38BDF8"
                cursorBallSize={1.8}
                ballCount={12}
                animationSize={32}
                enableMouseInteraction={true}
                enableTransparency={true}
                hoverSmoothness={0.05}
                clumpFactor={1}
                speed={0.28}
              />
            </div>
          </div>

          <div style={{ textAlign: 'center', color: '#E6EAF2', marginBottom: 12 }}>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease }}
              style={{ fontSize: 16, fontWeight: 600, letterSpacing: '0.04em' }}
            >
              正在为您溯源
            </motion.div>
          </div>

          <div style={{ marginTop: 8 }}>
            <div
              style={{
                height: 10,
                borderRadius: 9999,
                background: 'rgba(230,234,242,0.15)',
                overflow: 'hidden',
                border: '1px solid rgba(230,234,242,0.25)'
              }}
            >
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: `${Math.min(100, Math.max(0, pct))}%` }}
                transition={{ duration: 0.25, ease }}
                style={{
                  height: '100%',
                  background: 'linear-gradient(90deg, #38BDF8, #A78BFA)',
                  boxShadow: '0 2px 12px rgba(124,58,237,0.35)',
                }}
              />
            </div>
            <div style={{ marginTop: 8, textAlign: 'right', color: '#E6EAF2', opacity: 0.85, fontSize: 12 }}>
              {Math.round(pct)}%
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}