'use client';

import React, { useMemo, useState } from 'react';

export interface RegisterPageProps {
  onBackToLogin: () => void;
  onCompleted: () => void;
}

export default function RegisterPage({ onBackToLogin, onCompleted }: RegisterPageProps) {
  const curve = 'cubic-bezier(0.22, 1, 0.36, 1)';
  const duration = '400ms';

  const steps = useMemo(() => [0, 1, 2, 3, 4] as const, []);
  const [step, setStep] = useState<typeof steps[number]>(0);

  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [smsCode, setSmsCode] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [email, setEmail] = useState('');

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
      {[1, 2, 3, 4].map((s, i) => (
        <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 10, height: 10, borderRadius: 9999, background: step >= s ? '#A78BFA' : 'rgba(230,234,242,0.25)', boxShadow: step >= s ? '0 0 12px rgba(167,139,250,0.6)' : 'none' }} />
          {i < 3 && <div style={{ width: 28, height: 2, borderRadius: 2, background: step > s ? 'rgba(167,139,250,0.75)' : 'rgba(230,234,242,0.2)' }} />}
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

  const usernameValid = username.length >= 4;
  const calcStrength = (pwd: string) => {
    let s = 0;
    if (pwd.length >= 8) s++;
    if (/[A-Z]/.test(pwd)) s++;
    if (/[a-z]/.test(pwd)) s++;
    if (/\d/.test(pwd)) s++;
    if (/[^A-Za-z0-9]/.test(pwd)) s++;
    return Math.min(s, 4);
  };
  const strength = calcStrength(password);
  const strengthColors = ['#64748B', '#60A5FA', '#34D399', '#F59E0B', '#EF4444'];

  const stepsPanels = [
    // Step 0 - 初始提示（引导进入注册流程）
    (
      <div key={0} style={{ display: 'grid', gap: 16 }}>
        <div style={{ marginBottom: 12 }}>
          <h3 style={{ fontSize: 22, fontWeight: 800, letterSpacing: '0.06em' }}>注册新账号</h3>
          <p style={{ opacity: 0.75, marginTop: 6 }}>还没有账号？点击“开始注册”进入分步流程。</p>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          {actionBtn('开始注册', () => setStep(1), 'primary')}
          {actionBtn('返回登录', onBackToLogin, 'secondary')}
        </div>
      </div>
    ),
    // Step 1 - 用户名输入验证
    (
      <div key={1} style={{ display: 'grid', gap: 16 }}>
        {renderStepper()}
        {field(
          '用户名',
          <input type="text" placeholder="请输入用户名（至少4个字符）" value={username} onChange={(e) => setUsername(e.target.value)} style={{ width: '100%', padding: '12px 14px', borderRadius: 12, border: '1px solid rgba(230,234,242,0.25)', background: 'rgba(11,18,32,0.30)', color: '#E6EAF2', outline: 'none' }} />
        )}
        <div style={{ fontSize: 12, color: usernameValid ? '#34D399' : '#EF4444' }}>
          {usernameValid ? '用户名可用' : '用户名至少4个字符'}
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          {actionBtn('下一步', () => usernameValid && setStep(2), 'primary')}
          {actionBtn('返回登录', onBackToLogin, 'secondary')}
        </div>
      </div>
    ),
    // Step 2 - 手机号验证（含验证码）
    (
      <div key={2} style={{ display: 'grid', gap: 16 }}>
        {renderStepper()}
        {field(
          '手机号',
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 10 }}>
            <input type="tel" placeholder="请输入手机号" value={phone} onChange={(e) => setPhone(e.target.value)} style={{ width: '100%', padding: '12px 14px', borderRadius: 12, border: '1px solid rgba(230,234,242,0.25)', background: 'rgba(11,18,32,0.30)', color: '#E6EAF2', outline: 'none' }} />
            {actionBtn('发送验证码', () => {}, 'secondary')}
          </div>
        )}
        {field('短信验证码', <input type="text" placeholder="请输入验证码" value={smsCode} onChange={(e) => setSmsCode(e.target.value)} style={{ width: '100%', padding: '12px 14px', borderRadius: 12, border: '1px solid rgba(230,234,242,0.25)', background: 'rgba(11,18,32,0.30)', color: '#E6EAF2', outline: 'none' }} />)}
        <div style={{ display: 'flex', gap: 12 }}>
          {actionBtn('下一步', () => setStep(3), 'primary')}
          {actionBtn('上一步', () => setStep(1), 'secondary')}
        </div>
      </div>
    ),
    // Step 3 - 密码设置与确认（含强度提示）
    (
      <div key={3} style={{ display: 'grid', gap: 16 }}>
        {renderStepper()}
        {field(
          '设置密码',
          <input type="password" placeholder="至少8位，包含大小写/数字/符号" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '12px 14px', borderRadius: 12, border: '1px solid rgba(230,234,242,0.25)', background: 'rgba(11,18,32,0.30)', color: '#E6EAF2', outline: 'none' }} />
        )}
        <div style={{ height: 8, borderRadius: 9999, background: 'rgba(230,234,242,0.15)', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${(strength / 4) * 100}%`, background: strengthColors[strength], transition: `width ${duration} ${curve}` }} />
        </div>
        {field(
          '确认密码',
          <input type="password" placeholder="请再次输入密码" value={password2} onChange={(e) => setPassword2(e.target.value)} style={{ width: '100%', padding: '12px 14px', borderRadius: 12, border: '1px solid rgba(230,234,242,0.25)', background: 'rgba(11,18,32,0.30)', color: '#E6EAF2', outline: 'none' }} />
        )}
        <div style={{ fontSize: 12, color: password && password === password2 ? '#34D399' : '#EF4444' }}>
          {password && password === password2 ? '密码匹配' : '两次密码不一致'}
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          {actionBtn('下一步', () => setStep(4), 'primary')}
          {actionBtn('上一步', () => setStep(2), 'secondary')}
        </div>
      </div>
    ),
    // Step 4 - 邮箱绑定（可选）
    (
      <div key={4} style={{ display: 'grid', gap: 16 }}>
        {renderStepper()}
        {field(
          '邮箱（可选）',
          <input type="email" placeholder="请输入邮箱（可跳过）" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '12px 14px', borderRadius: 12, border: '1px solid rgba(230,234,242,0.25)', background: 'rgba(11,18,32,0.30)', color: '#E6EAF2', outline: 'none' }} />
        )}
        <div style={{ display: 'flex', gap: 12 }}>
          {actionBtn('完成注册', () => onCompleted(), 'primary')}
          {actionBtn('跳过，稍后绑定', () => onCompleted(), 'secondary')}
          {actionBtn('上一步', () => setStep(3), 'secondary')}
        </div>
      </div>
    ),
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