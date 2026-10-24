import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'whatsapp' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-bold transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none select-none';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-1.5 rounded-full gap-1.5',
    md: 'text-sm px-5 py-2.5 rounded-full gap-2',
    lg: 'text-base sm:text-lg px-7 py-3.5 rounded-full gap-2.5 shadow-md',
  };

  const variantStyles = {
    primary:
      'bg-brand-primary text-white hover:bg-[#d01754] hover:shadow-lg shadow-sm border border-transparent',
    secondary:
      'bg-brand-surface text-brand-primary hover:bg-brand-primary hover:text-white border border-pink-100',
    accent:
      'bg-brand-accent text-white hover:bg-emerald-600 hover:shadow-lg shadow-sm border border-transparent',
    outline:
      'bg-white text-brand-dark border border-gray-200 hover:border-brand-primary hover:text-brand-primary',
    whatsapp:
      'bg-[#25D366] text-white hover:bg-[#20ba59] hover:shadow-lg shadow-sm border border-transparent',
    ghost:
      'bg-transparent text-brand-dark hover:text-brand-primary hover:bg-brand-surface/60',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
      disabled={disabled}
      {...props}
    >
      {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
    </button>
  );
};
