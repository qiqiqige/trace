import { LinkOutlined } from '@ant-design/icons';

export default function BrandIcon({ size = 'xl' }: { size?: 'lg' | 'xl' | '2xl' }) {
  const sizeClasses = {
    'lg': 'text-lg',
    'xl': 'text-xl',
    '2xl': 'text-2xl'
  };
  
  return (
    <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center backdrop-blur-sm">
      <LinkOutlined className={`${sizeClasses[size]} text-white`} />
    </div>
  );
}