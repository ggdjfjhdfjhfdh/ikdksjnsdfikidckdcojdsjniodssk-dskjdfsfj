import React from 'react';

type ButtonProps = {
  variant?: 'default' | 'secondary' | 'outline';
  size?: 'default' | 'lg';
  className?: string;
  children: React.ReactNode;
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'default',
  size = 'default',
  className = '',
  children,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  
  const variantClasses = {
    default: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    outline: 'border border-gray-300 bg-transparent hover:bg-gray-50',
  }[variant];
  
  const sizeClasses = {
    default: 'h-10 py-2 px-4',
    lg: 'h-12 px-8 text-base',
  }[size];
  
  const classes = `${baseClasses} ${variantClasses} ${sizeClasses} ${className}`;
  
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};
