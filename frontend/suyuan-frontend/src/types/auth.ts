//1.用户信息
export interface User{
  id : Number;
  username: string;
  phone ?: string;
  avatar ?: string;//头像地址
  token : string;
  role: 'admin'|'user'|'guest'
  createdAt : string;
}
//2.登陆表单数据
export interface LoginFormData {
  username : string;
  password : string;
  rememberMe ?: Boolean;
}
//3.注册表单数据
export interface RegisterFormData {
  username : string;
  password : string;
  confirmPassword : string;
  phone : string; 
}
//4.认证状态
export interface AuthState {
  user: User | null ;
  isLoading : Boolean;
  error : String | null;
  isAuthenticated : Boolean;
}
//5.后端统一相应格式
export interface ApiResponse<T> {
  code: number;        // 状态码（200=成功，非200=失败）
  msg: string;         // 提示信息（成功/失败描述）
  data: T;             // 接口返回的具体数据（不同接口数据类型不同）
}
