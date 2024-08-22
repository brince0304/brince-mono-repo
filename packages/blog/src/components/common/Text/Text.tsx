import type React from 'react';

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'body-large' | 'body-small' | 'emphasis';
  className?: string;
}

const Text: React.FC<TextProps> = ({ children, variant = 'body', className = '', ...props }) => {
  const baseStyles = 'transition-colors duration-200';

  const variantStyles = {
    h1: 'text-4xl font-bold text-gray-900 dark:text-gray-100',
    h2: 'text-3xl font-semibold text-gray-800 dark:text-gray-200',
    h3: 'text-2xl font-medium text-gray-800 dark:text-gray-200',
    body: 'text-base text-gray-700 dark:text-gray-300',
    'body-large': 'text-lg text-gray-700 dark:text-gray-300',
    'body-small': 'text-sm text-gray-600 dark:text-gray-400',
    emphasis: 'text-base font-medium text-gray-900 dark:text-gray-100',
  };

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${className}`;

  switch (variant) {
    case 'h1':
      return (
        <h1 className={combinedClassName} {...props}>
          {children}
        </h1>
      );
    case 'h2':
      return (
        <h2 className={combinedClassName} {...props}>
          {children}
        </h2>
      );
    case 'h3':
      return (
        <h3 className={combinedClassName} {...props}>
          {children}
        </h3>
      );
    default:
      return (
        <p className={combinedClassName} {...props}>
          {children}
        </p>
      );
  }
};

export default Text;
