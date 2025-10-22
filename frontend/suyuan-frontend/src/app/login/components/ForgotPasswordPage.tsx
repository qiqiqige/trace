'use client';

import React, { useMemo, useState } from 'react';

export interface ResetPasswordPageProps {
  onBackToLogin: (notice?: string) => void;
}

export default function ResetPasswordPage({ onBackToLogin }: ResetPasswordPageProps) {
  const [step, setStep] = useState<number>(0);
  const [method, setMethod] = useState<'phone' | 'email'>('phone');
  const [account, setAccount] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [pwd1, setPwd1] = useState<string>('');
  const [pwd2, setPwd2] = useState<string>('');

  const curve = 'cubic-bezier(0.22, 1, 0.36, 1)';
  const duration = '400ms';

  const panelBase: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    color: '#E6EAF2'
  };

  const renderStepper = () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, paddingTop: 4 }}>
      {[0, 1, 2].map((s, i) => (
        <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 10, height: 10, borderRadius: 9999, background: step >= s ? '#A78BFA' : 'rgba(230,234,242,0.25)', boxShadow: step >= s ? '0 0 12px rgba(167,139,250,0.6)' : 'none' }} />
          {i < 2 && <div style={{ width: 28, height: 2, borderRadius: 2, background: step > s ? 'rgba(167,139,250,0.75)' : 'rgba(230,234,242,0.2)' }} />}
        </div>
      ))}
    </div>
  );

  const actionBtn = (label: string, onClick: () => void, variant: 'primary' | 'secondary' = 'primary') => (
    <button type="button" onClick={onClick} style={{ padding: '10px 18px', borderRadius: 9999, border: variant === 'primary' ? '1px solid rgba(124,58,237,0.45)' : '1px solid rgba(230,234,242,0.25)', background: variant === 'primary' ? 'rgba(124,58,237,0.24)' : 'rgba(11,18,32,0.30)', color: '#E6EAF2', fontWeight: 600, letterSpacing: '0.06em', boxShadow: variant === 'primary' ? '0 8px 30px rgba(124,58,237,0.20), inset 0 1px rgba(56,189,248,0.24)' : 'none', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }}>
      {label}
    </button>
  );

  const field = (label: string, input: React.ReactNode) => (
    <div>
      <div style={{ marginBottom: 6 }}>
        <label style={{ fontSize: 13, opacity: 0.8 }}>{label}</label>
      </div>
      {input}
    </div>
  );

  const stepsPanels = [
    // Step 0 - 选择找回方式 + 输入账号
    (
      <div key={0} style={{ display: 'grid', gap: 16 }}>
        <div style={{ marginBottom: 12 }}>
          <h3 style={{ fontSize: 22, fontWeight: 800, letterSpacing: '0.06em' }}>重置密码</h3>
          <p style={{ opacity: 0.75, marginTop: 6 }}>请选择找回方式并完善信息。</p>
        </div>

        <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
          {actionBtn('通过手机号找回', () => setMethod('phone'), method === 'phone' ? 'primary' : 'secondary')}
          {actionBtn('通过邮箱找回', () => setMethod('email'), method === 'email' ? 'primary' : 'secondary')}
        </div>

        {field(method === 'phone' ? '手机号' : '邮箱', (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 10 }}>
            <input type={method === 'phone' ? 'tel' : 'email'} placeholder={method === 'phone' ? '请输入注册手机号' : '请输入绑定邮箱'} value={account} onChange={(e) => setAccount(e.target.value)} style={{ width: '100%', padding: '12px 14px', borderRadius: 12, border: '1px solid rgba(230,234,242,0.25)', background: 'rgba(11,18,32,0.30)', color: '#E6EAF2', outline: 'none' }} />
            {actionBtn('发送验证码', () => {}, 'secondary')}
          </div>
        ))}

        <div style={{ display: 'flex', gap: 12 }}>
          {actionBtn('下一步', () => setStep(1), 'primary')}
          {actionBtn('返回登录', () => onBackToLogin(), 'secondary')}
        </div>
      </div>
    ),
    // Step 1 - 输入验证码
    (
      <div key={1} style={{ display: 'grid', gap: 16 }}>
        {renderStepper()}
        {field('验证码', <input type="text" placeholder="请输入验证码" value={code} onChange={(e) => setCode(e.target.value)} style={{ width: '100%', padding: '12px 14px', borderRadius: 12, border: '1px solid rgba(230,234,242,0.25)', background: 'rgba(11,18,32,0.30)', color: '#E6EAF2', outline: 'none' }} />)}
        <div style={{ display: 'flex', gap: 12 }}>
          {actionBtn('上一步', () => setStep(0), 'secondary')}
          {actionBtn('下一步', () => setStep(2), 'primary')}
        </div>
      </div>
    ),
    // Step 2 - 设置新密码
    (
      <div key={2} style={{ display: 'grid', gap: 16 }}>
        {renderStepper()}
        {field('新密码', <input type="password" placeholder="请输入新密码" value={pwd1} onChange={(e) => setPwd1(e.target.value)} style={{ width: '100%', padding: '12px 14px', borderRadius: 12, border: '1px solid rgba(230,234,242,0.25)', background: 'rgba(11,18,32,0.30)', color: '#E6EAF2', outline: 'none' }} />)}
        {field('确认新密码', <input type="password" placeholder="请再次输入新密码" value={pwd2} onChange={(e) => setPwd2(e.target.value)} style={{ width: '100%', padding: '12px 14px', borderRadius: 12, border: '1px solid rgba(230,234,242,0.25)', background: 'rgba(11,18,32,0.30)', color: '#E6EAF2', outline: 'none' }} />)}
        <div style={{ display: 'flex', gap: 12 }}>
          {actionBtn('上一步', () => setStep(1), 'secondary')}
          {actionBtn('提交', () => onBackToLogin('请完成登录'), 'primary')}
        </div>
      </div>
    )
  ];

  return (
    <div style={{ position: 'relative', minHeight: 420 }}>
      {stepsPanels.map((el, idx) => {
        const offset = (idx - step) * 100;
        return (
          <div key={idx} style={{ ...panelBase, transform: `translateX(${offset}%)`, opacity: idx === step ? 1 : 0, transition: `transform ${duration} ${curve}, opacity ${duration} ${curve}`, pointerEvents: idx === step ? 'auto' : 'none' }}>
            {el}
          </div>
        );
      })}
    </div>
  );
}