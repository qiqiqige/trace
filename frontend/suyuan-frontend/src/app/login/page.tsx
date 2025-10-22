'use client';

import Logo from '../components/Logo';
import type { CSSProperties } from 'react';
import { useMemo, useState, useEffect } from 'react';
import RegisterPage from './components/RegisterPage';
import ForgotPasswordPage from './components/ForgotPasswordPage';
import { motion } from 'framer-motion';
import LoginAnimationPage from './components/LoginAnimationPage';

export default function LoginPage() {
  const curve = 'cubic-bezier(0.22, 1, 0.36, 1)';
  const duration = '400ms';
  const [activeView, setActiveView] = useState<'login' | 'register' | 'reset'>('login');
  const [notice, setNotice] = useState<string>('');
  
  //保持登陆页面正常显示

  const [vw, setVw] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 1200);
  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  const showLeft = vw >= 900;
  const leftScale = showLeft ? Math.max(0.85, Math.min(1, 0.85 + ((vw - 900) / 600) * 0.15)) : 1;

  //加载动画
  const [showLoader, setShowLoader] = useState(false);

  //容器样式
  const card: CSSProperties = useMemo(() => ({
    width: 'min(92vw, 1200px)',
    minHeight: 'min(80vh, 800px)',
    borderRadius: 24,
    background: 'rgba(11,18,32,0.55)',
    backdropFilter: 'blur(20px) saturate(140%)',
    WebkitBackdropFilter: 'blur(20px) saturate(140%)',
    border: '1px solid rgba(124,58,237,0.35)',
    boxShadow: '0 20px 50px rgba(16,24,40,0.35), inset 0 1px rgba(255,255,255,0.08)',
    display: 'grid',
    gridTemplateColumns: showLeft ? '1.2fr 1fr' : '1fr',
    overflow: 'hidden'
  }), [showLeft]);

  const order = useMemo(() => ['login', 'register', 'reset'] as const, []);
  const idxOf = (v: typeof order[number]) => order.indexOf(v);

  const rightPanelBase: CSSProperties = {
    position: 'relative',
    padding: 32,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    color: '#E6EAF2',
    overflow: 'hidden',
    minHeight: 460
  };

  const rightPanelStyle: CSSProperties & { viewTransitionName?: string } = {
    ...rightPanelBase,
    viewTransitionName: 'cta-bubble',
    willChange: 'transform, opacity'
  };

  //登陆按钮
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowLoader(true);
  };

  //登录页面
  const LoginView = (
    <div style={{ position: 'absolute', inset: 0, padding: 32, display: 'flex', flexDirection: 'column', justifyContent: 'center', color: '#E6EAF2' }}>
      <div style={{ marginBottom: 18 }}>
        <h3 style={{ fontSize: 24, fontWeight: 800, letterSpacing: '0.06em' }}>欢迎登录溯源</h3>
        <p style={{ opacity: 0.75, marginTop: 6 }}>{notice || '请输入账号信息登录。'}</p>
      </div>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 16 }}>
        {/* 用户名 */}
        <div>
          <label style={{ display: 'block', fontSize: 13, opacity: 0.8, marginBottom: 6 }}>用户名</label>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', opacity: 0.7 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="#C084FC" strokeWidth="1.6"/><path d="M4 21a8 8 0 0 1 16 0" stroke="#38BDF8" strokeWidth="1.6"/></svg>
            </span>
            <input
              type="text"
              placeholder="请输入用户名"
              style={{
                width: '100%', padding: '12px 14px 12px 38px', borderRadius: 12,
                border: '1px solid rgba(230,234,242,0.25)', background: 'rgba(11,18,32,0.30)', color: '#E6EAF2', outline: 'none'
              }}
            />
          </div>
        </div>

        {/* 密码 */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <label style={{ fontSize: 13, opacity: 0.8 }}>密码</label>
            <a href="#" style={{ fontSize: 13, color: '#A78BFA' }} onClick={(e) => { e.preventDefault(); setActiveView('reset'); setNotice(''); }}>
              忘记密码?
            </a>
          </div>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', opacity: 0.7 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="5" y="10" width="14" height="10" rx="2" stroke="#C084FC" strokeWidth="1.6"/><path d="M9 10V8a3 3 0 1 1 6 0v2" stroke="#38BDF8" strokeWidth="1.6"/></svg>
            </span>
            <input
              type="password"
              placeholder="请输入密码"
              style={{
                width: '100%', padding: '12px 14px 12px 38px', borderRadius: 12,
                border: '1px solid rgba(230,234,242,0.25)', background: 'rgba(11,18,32,0.30)', color: '#E6EAF2', outline: 'none'
              }}
            />
          </div>
        </div>

        {/* 记住我 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <input id="remember-me" type="checkbox" />
          <label htmlFor="remember-me" style={{ fontSize: 13, opacity: 0.85 }}>记住我</label>
        </div>

        {/* 登录按钮 */}
        <button
          type="submit"
          style={{
            marginTop: 6, padding: '12px 20px', borderRadius: 9999,
            background: 'rgba(124,58,237,0.24)', border: '1px solid rgba(124,58,237,0.45)',
            color: '#E6EAF2', fontWeight: 600, letterSpacing: '0.06em',
            boxShadow: '0 8px 30px rgba(124,58,237,0.20), inset 0 1px rgba(56,189,248,0.24)',
            backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)'
          }}
        >
          登录
        </button>

        {/* 去注册 */}
        <div style={{ marginTop: 6, textAlign: 'center', fontSize: 13 }}>
          还没有账号？
          <a href="/register" style={{ color: '#A78BFA', marginLeft: 6 }} onClick={(e) => { e.preventDefault(); setActiveView('register'); setNotice(''); }}>
            去注册
          </a>
        </div>
      </form>
    </div>
  );

  //切换动画
  const renderViews = () => {
    const active = idxOf(activeView);
    const panels = [
      { key: 'login', node: LoginView },
      {
        key: 'register',
        node: (
          <div style={{ position: 'absolute', inset: 0, padding: 32 }}>
            <RegisterPage
              onBackToLogin={() => { setActiveView('login'); setNotice(''); }}
              onCompleted={() => { setActiveView('login'); setNotice('请完成登录'); }}
            />
          </div>
        )
      },
      {
        key: 'reset',
        node: (
          <div style={{ position: 'absolute', inset: 0, padding: 32 }}>
            <ForgotPasswordPage
              onBackToLogin={(msg?: string) => { setActiveView('login'); setNotice(msg || '请完成登录'); }}
            />
          </div>
        )
      }
    ];
    return panels.map((p, i) => {
      const offset = (i - active) * 100;
      return (
        <div
          key={p.key}
          style={{
            position: 'absolute',
            inset: 0,
            transform: `translateX(${offset}%)`,
            opacity: i === active ? 1 : 0,
            transition: `transform ${duration} ${curve}, opacity ${duration} ${curve}`,
            pointerEvents: i === active ? 'auto' : 'none'
          }}
        >
          {p.node}
        </div>
      );
    });
  };

  return(
    <div style={{ display: 'grid', placeItems: 'center', minHeight: '100vh', width: '100vw', padding: 24 }}>
      <div style={card}>
        {showLeft && (
          <motion.div
            style={{ position: 'relative', padding: 32, color: '#E6EAF2', transform: `scale(${leftScale})`, transformOrigin: 'left center' }}
            initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 40, height: 40 }}>
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
              <h1 style={{ fontSize: 22, fontWeight: 800, letterSpacing: '0.06em' }}>溯源系统</h1>
            </div>

          <div style={{ height: 56 }} />

          <div style={{ display: 'grid', gap: 64, marginTop: 24, width: '80%', maxWidth: '80%' }}>
            {[
              { title: '高效日报管理', desc: '轻松记录每日工作，自动关联任务进度', icon: 'file' },
              { title: '可视化任务看板', desc: '拖拽式管理任务，直观查看项目进展', icon: 'board' },
              { title: '个人知识库', desc: '集中管理文档资料，构建个人知识体系', icon: 'book' },
            ].map((item, idx) => (
              <div key={idx} style={{ display: 'grid', gridTemplateColumns: '48px 1fr', gap: 20, alignItems: 'center' }}>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: 'rgba(124,58,237,0.20)',
                    border: '1px solid rgba(124,58,237,0.35)',
                    boxShadow: 'inset 0 1px rgba(56,189,248,0.30)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {item.icon === 'file' && (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                      <path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" stroke="#C084FC" strokeWidth="1.6"/>
                      <path d="M14 3v5h5" stroke="#38BDF8" strokeWidth="1.6"/>
                    </svg>
                  )}
                  {item.icon === 'board' && (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                      <rect x="3" y="4" width="18" height="16" rx="2" stroke="#C084FC" strokeWidth="1.6"/>
                      <path d="M9 4v16M15 4v16" stroke="#38BDF8" strokeWidth="1.6"/>
                    </svg>
                  )}
                  {item.icon === 'book' && (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                      <path d="M4 5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v15H6a2 2 0 0 1-2-2V5z" stroke="#C084FC" strokeWidth="1.6"/>
                      <path d="M8 7h8" stroke="#38BDF8" strokeWidth="1.6"/>
                    </svg>
                  )}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 16 }}>{item.title}</div>
                  <div style={{ opacity: 0.78, marginTop: 8 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>)}
        <motion.div
          style={rightPanelStyle}
          initial={{ opacity: 0, x: 18, scale: 0.98 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {renderViews()}
        </motion.div>
      </div>

      {showLoader && (
        <LoginAnimationPage
          task={async () => { await new Promise((r) => setTimeout(r, 1500)); }}
          targetUrl="/index"
          onDone={() => setShowLoader(false)}
        />
      )}
    </div>
  );
}