import { useState } from "react";
import { 
  ArrowLeftOutlined, 
  PhoneOutlined, 
  MailOutlined,
  SendOutlined,
  LoadingOutlined,
  ExclamationCircleFilled,
  ExclamationCircleOutlined
} from '@ant-design/icons';
import { Button, Input } from 'antd';
import { motion } from "framer-motion";
import BrandIcon from "../../../../components/BrandIcon";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
};

export default function ForgotPasswordPage({ onBack }: { onBack: () => void }) {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [countdown, setCountdown] = useState(0);
  
  // 发送验证码
  const handleSendCode = () => {
    let isValid = true;
    setPhoneError('');
    
    if (!phone) {
      setPhoneError('请输入手机号');
      isValid = false;
    } else if (!/^1[3-9]\d{9}$/.test(phone)) {
      setPhoneError('请输入正确的手机号');
      isValid = false;
    }
    
    if (isValid) {
      setIsLoading(true);
      // 模拟发送验证码
      setTimeout(() => {
        setIsLoading(false);
        setShowCodeInput(true);
        setCountdown(60);
        
        // 倒计时逻辑
        const timer = setInterval(() => {
          setCountdown(prev => {
            if (prev <= 1) {
              clearInterval(timer);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }, 1000);
    }
  };
  
  // 验证验证码并重置密码
  const handleResetPassword = () => {
    // 这里添加验证逻辑和重置密码逻辑
    alert('验证码已验证，即将跳转到密码重置页面');
  };
  
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 md:p-12"
    >
      <div className="mb-8">
        <button 
          onClick={onBack}
          className="mb-6 inline-flex items-center text-gray-500 hover:text-primary transition-colors space-y-6"
        >
          <ArrowLeftOutlined className="mr-1" />
          <span>返回登录</span>
        </button>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
          <BrandIcon />
          忘记密码
        </h2>
        <p className="text-gray-500">请使用手机号找回密码</p>
      </div>
      
      <div className="space-y-5">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-500 mb-1">手机号</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
              <PhoneOutlined />
            </div>
            <Input 
              id="phone"
              type="tel"
              placeholder="请输入手机号"
              className="pl-10"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                if (phoneError) setPhoneError('');
              }}
              disabled={showCodeInput}
            />
          </div>
          {phoneError && (
            <div className="mt-1 text-danger text-sm flex items-center gap-1">
              <ExclamationCircleOutlined />
              <span>{phoneError}</span>
            </div>
          )}
        </div>
        
        {showCodeInput && (
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-500 mb-1">验证码</label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                  <MailOutlined />
                </div>
                <Input 
                  id="code"
                  placeholder="请输入验证码"
                  className="pl-10"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
              </div>
              
              <Button
                disabled={countdown > 0 || isLoading}
                onClick={handleSendCode}
                className="whitespace-nowrap"
              >
                {countdown > 0 ? `${countdown}s后重发` : '发送验证码'}
              </Button>
            </div>
          </div>
        )}
        
        <Button
          type="primary"
          className="w-full mt-4"
          loading={isLoading}
          onClick={showCodeInput ? handleResetPassword : handleSendCode}
        >
          {showCodeInput ? '下一步' : '发送验证码'}
        </Button>
      </div>
    </motion.div>
  );
}