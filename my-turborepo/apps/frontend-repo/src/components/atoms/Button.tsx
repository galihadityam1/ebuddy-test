import { FC, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  isLoading?: boolean;
}

const Button: FC<ButtonProps> = ({ 
  children, 
  variant = 'primary',
  isLoading,
  ...props 
}) => {
  return (
    <button 
      className={`button ${variant} ${isLoading ? 'loading' : ''}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  );
};

export default Button;