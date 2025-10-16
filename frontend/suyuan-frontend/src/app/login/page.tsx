'use client';

import { useEffect, useState } from "react";
import { 
  EyeOutlined, 
  EyeInvisibleOutlined, 
  UserOutlined, 
  LockOutlined, 
  CheckOutlined, 
  GithubOutlined,
  GoogleOutlined,
  WechatOutlined,
  ArrowRightOutlined,
  LoadingOutlined,
  FileTextOutlined,
  BorderOutlined,
  BookOutlined,
  LinkOutlined,
  ExclamationCircleOutlined,
  PhoneOutlined
} from '@ant-design/icons';
import { Button, Checkbox, Input, Card } from 'antd';
import BrandIcon from "../../../components/BrandIcon";
import { motion } from "framer-motion" 
import ForgotPasswordPage from "./components/ForgotPasswordPage";
//Redux相关
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store'; //导入 Store 类型
import { loginAsync, registerAsync, clearError } from '@/store/slices/authSlice'; //导入异步 Action
import { LoginFormData, RegisterFormData } from '@/types'; //导入表单类型

const containerVariants = {
  hidden : {opacity :0,y:20},
  visible :{opacity :1, y:0,transition :{duration:0.3}},
  exit:{opacity:0, y:-20,transition:{duration:0.3}}
};

const formFieldVariants = {
  hidden :{opacity :0,y:0},
  visible:{opacity:1,y:0,transition:{duration:0.2}}
};

const globalStyles = `
  * {
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
  }
  input, textarea {
    user-select: text;
    -webkit-user-select: text;
    -moz-user-select: text;
    -ms-user-select: text;
  }
`;

export default function LoginPage(){
//Redux状态
const dispatch = useDispatch<AppDispatch>();
const {isLoading,error,isAuthenticated} = useSelector((state : RootState) => state.auth);


//本地属性
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      window.location.href = '/';
    }
  },[isAuthenticated]);

  useEffect(() => {
    dispatch(clearError());
  },[dispatch]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    let isValid = true;
    setUsernameError('');
    setPasswordError('');
    
    // 简单验证
    if (!username) {
      setUsernameError('请输入用户名');
      isValid = false;
    }
    
    if (!password) {
      setPasswordError('请输入密码');
      isValid = false;
    }
    
    // 模拟登录成功
    if (isValid) {
      const loginData : LoginFormData = {
        username,
        password,
        rememberMe: true
      };
      await dispatch(loginAsync(loginData));
          
    }
  };
  
  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    let isValid = true;
    setUsernameError('');
    setPasswordError('');
    setConfirmPasswordError('');
    setPhoneError('');
    
    // 验证用户名
    if (!username) {
      setUsernameError('请输入用户名');
      isValid = false;
    }
    
    // 验证密码
    if (!password) {
      setPasswordError('请输入密码');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('密码长度不能少于6位');
      isValid = false;
    }
    
    // 注册时验证确认密码
    if (!isLogin) {
      if (!confirmPassword) {
        setConfirmPasswordError('请输入确认密码');
        isValid = false;
      } else if (confirmPassword !== password) {
        setConfirmPasswordError('两次输入的密码不一致');
        isValid = false;
      }
    }
    
    // 手机号验证
    if (!phone) {
      setPhoneError('请输入手机号');
      isValid = false;
    } else if (!/^1[3-9]\d{9}$/.test(phone)) {
      setPhoneError('请输入正确的手机号');
      isValid = false;
    }
  
    // 提交逻辑
    if (isValid) {
      const registerData : RegisterFormData = {
        username,
        password,
        confirmPassword,
        phone
      };
      const result = await dispatch(registerAsync(registerData));
      if(registerAsync.fulfilled.match(result)){
        setIsLogin(true);
        alert('注册成功，请登录');
      }
    }
  };
  
  return (
    <div className="bg-neutral min-h-screen flex items-center justify-center p-4 font-sans ">
      <style>{globalStyles}</style>
      
      {/*错误提示*/}
      {error && (
        <div className="mb-4 p-3 bg-danger/10 text-danger rounded-lg flex items-center gap-2">
          <ExclamationCircleOutlined />
          <span>{error}</span>
        </div>
      )}
      {/* 登录容器 */}
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row transition-all duration-500 hover:shadow-[0_10px_30px_-5px_rgba(0,0,0,0.1)]" id="login-container">
        
        {/*左侧*/}
        <div className="bg-gradient-to-br from-primary to-[#2C5282] text-white p-8 md:p-12 flex-1 flex flex-col justify-between relative overflow-hidden md:flex">
          {/*装饰元素*/}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24"></div>
          
          <div className="relative z-10">
            {/*品牌标识*/}
            <div className="flex items-center gap-3 mb-10">
              <BrandIcon />
              <h1 className="text-2xl font-bold">溯源</h1>
            </div>
            
            {/*功能介绍*/}
            <div className="space-y-8">
              <div className="flex items-start gap-4 group p-3 rounded-lg hover:bg-white/5 transition-all duration-300">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-1 transition-all duration-300 group-hover:bg-white/30">
                  <FileTextOutlined />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">高效日报管理</h3>
                  <p className="text-white/80 text-sm">轻松记录每日工作，自动关联任务进度</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 group p-3 rounded-lg hover:bg-white/5 transition-all duration-300">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-1 transition-all duration-300 group-hover:bg-white/30">
                  <BorderOutlined />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">可视化任务看板</h3>
                  <p className="text-white/80 text-sm">拖拽式管理任务，直观查看项目进展</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 group p-3 rounded-lg hover:bg-white/5 transition-all duration-300">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-1 transition-all duration-300 group-hover:bg-white/30">
                  <BookOutlined />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">个人知识库</h3>
                  <p className="text-white/80 text-sm">集中管理文档资料，构建个人知识体系</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/*右侧*/}
        {showForgotPassword ? (
            <ForgotPasswordPage onBack={() => setShowForgotPassword(false)}/>
          ) : (  
        <div className="p-8 md:p-12 flex-1 flex flex-col max-w-md w-full mx-auto">
          <div className="mb-10 md:mt-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
              <BrandIcon />
              {isLogin ? '欢迎登录溯源' : '创建新的账号'}
            </h2>
            <p className="text-gray-500">{isLogin ? '请输入账号信息登录系统' : '填写以下信息注册新账号'}</p>
          </div>
          {/*登录*/}
                  
            <form className="space-y-5" onSubmit={(e) => {isLogin ? handleLogin(e) : handleSubmit(e)}}>
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-500 mb-1">用户名</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                    <UserOutlined />        
                  </div>
                  <input id='username' 
                  placeholder="请输入用户名" 
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-300"
                  value={username}
                  onChange={(e) => {setUsername(e.target.value);
                  if(usernameError) setUsernameError('');
                }}
                />
                {usernameError && (
                  <div className="mt-1 text-danger text-sm flex items-center gap-1">
                    <ExclamationCircleOutlined />
                    <span>{usernameError}</span>
                  </div>
                )}
                </div>
              </div>

              <div>
                  <div className="flex justify-between mb-1">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-500">密码</label>
                    {isLogin && (
                    <a 
                    href="#" 
                    className="text-sm text-primary hover:underline transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowForgotPassword(true);
                    }}
                    >
                      忘记密码？
                    </a>
                    )}
                    
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                      <LockOutlined/>
                    </div>
                    <input 
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="请输入密码"
                    className="w-full pl-10 pr-10 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-300"
                    value={password}
                    onChange = {(e) => {
                      setPassword(e.target.value);
                      if (passwordError) setPasswordError('');
                    }}
                    />
       
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                  </button>
                  {passwordError && (
                    <div className="mt-1 text-danger text-sm flex items-center gap-1">
                    <ExclamationCircleOutlined />
                    <span>{passwordError}</span>
                  </div>
                  )}
                </div>
              </div>
              {!isLogin && (
                <div>
                      <div>
                        <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-500 mb-1">确认密码</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                            <LockOutlined/>
                          </div>
                          <input 
                            id="confirm-password"
                            type={showPassword ? "text" : "password"}
                            placeholder="请再次输入密码"
                            className="w-full pl-10 pr-10 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-300"
                            value={confirmPassword}
                            onChange={(e) => {
                              setConfirmPassword(e.target.value);
                              if (confirmPasswordError) setConfirmPasswordError('');
                            }}
                          />
                          {confirmPasswordError && (
                            <div className="mt-1 text-danger text-sm flex items-center gap-1">
                              <ExclamationCircleOutlined />
                              <span>{confirmPasswordError}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <motion.div
                        variants={formFieldVariants}
                        className="relative"
                      >
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-500 mb-1">手机号</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                            <PhoneOutlined />
                          </div>
                          <input 
                            id="phone"
                            type="tel"
                            placeholder="请输入手机号"
                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-300"
                            value={phone}
                            onChange={(e) => {
                              setPhone(e.target.value);
                              if (phoneError) setPhoneError('');
                            }}
                          />
                          {phoneError && (
                            <div className="mt-1 text-danger text-sm flex items-center gap-1">
                              <ExclamationCircleOutlined />
                              <span>{phoneError}</span>
                            </div>
                          )}
                        </div>
                      </motion.div>
                      </div> )}
              {isLogin &&(
              <div className="flex items-center">
                <Checkbox id="remember-me" className="text-primary focus:ring-primary border-gray-300 rounded transition-all duration-300">
                  记住我
                </Checkbox>
              </div>)}
              
            
              <Button
                type="primary"
                htmlType="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-6 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0"
                loading={isLoading}
              >
                <span>{isLogin ? '登录' : '注册'}</span>
                <ArrowRightOutlined />
              </Button>
            </form>
        
              {/* 其他登录方式 */}
            <div className="mt-8">
              <div className="relative flex items-center">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="flex-shrink mx-3 text-gray-400 text-sm">其他登录方式</span>
                <div className="flex-grow border-t border-gray-200"></div>
              </div>
              
              <div className="flex justify-center gap-4 mt-6">
                <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-primary/5 hover:text-primary hover:border-primary/30 transition-all duration-300 transform hover:scale-110 active:scale-95">
                  <GithubOutlined />
                </button>
                <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-primary/5 hover:text-primary hover:border-primary/30 transition-all duration-300 transform hover:scale-110 active:scale-95">
                  <GoogleOutlined />
                </button>
                <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-primary/5 hover:text-primary hover:border-primary/30 transition-all duration-300 transform hover:scale-110 active:scale-95">
                  <WechatOutlined />
                </button>
              </div>
            </div>
            
            {/* 注册提示 */}
            <div className="mt-8 text-center text-sm text-gray-500">
              {isLogin ? (
                <>
                还没有账号？
                <button
                onClick={() => setIsLogin(false)}
                className="text-primary font-medium hover:underline transition-colors ml-1"
                >
                  立即注册
                </button>
                </>
              ) : (
                <>
                已有账号？
                <button
                 onClick={() => setIsLogin(true)}
                 className="text-primary font-medium hover:underline transition-colors ml-1"
                >
                  立即登录
                </button>
                </>
              )
              }
            </div>
                  
        </div>
        )}
      </div>
    </div> 
  );
}