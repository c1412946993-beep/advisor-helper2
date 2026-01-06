import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className = '', disabled, ...props }, ref) => {
    const baseClasses = 'font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

    const variantClasses = {
      primary: disabled
        ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
        : 'bg-navy-700 text-white hover:bg-navy-800 focus:ring-navy-500',
      secondary: disabled
        ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
        : 'bg-slate-200 text-navy-900 hover:bg-slate-300 focus:ring-slate-400',
      outline: disabled
        ? 'border-2 border-slate-300 text-slate-400 cursor-not-allowed'
        : 'border-2 border-navy-700 text-navy-700 hover:bg-navy-50 focus:ring-navy-500',
    };

    const sizeClasses = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
