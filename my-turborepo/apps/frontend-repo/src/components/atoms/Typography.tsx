import { FC, ReactNode } from 'react';

export interface TypographyProps {
  variant?: 'h1' | 'h2' | 'h3' | 'body1' | 'body2';
  color?: 'primary' | 'secondary' | 'success' | 'error';
  children: ReactNode;
  className?: string; 
}

const Typography: FC<TypographyProps> = ({
  variant = 'body1',
  color = 'primary',
  children,
  className = '',
}) => {
  const variantStyles = {
    h1: 'text-2xl font-bold',
    h2: 'text-xl font-semibold',
    h3: 'text-lg font-medium',
    body1: 'text-base',
    body2: 'text-sm',
  };

  const colorStyles = {
    primary: 'text-gray-900',
    secondary: 'text-gray-600',
    success: 'text-green-600',
    error: 'text-red-600',
  };

  const baseStyles = `${variantStyles[variant]} ${colorStyles[color]}`;
  const combinedClassName = className ? `${baseStyles} ${className}` : baseStyles;

  return <div className={combinedClassName}>{children}</div>;
};

export default Typography;
