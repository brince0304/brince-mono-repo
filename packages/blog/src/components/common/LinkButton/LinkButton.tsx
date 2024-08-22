import Link from 'next/link';
import type React from 'react';

interface ButtonLinkProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  isActive?: boolean;
  fullWidth?: boolean;
}

const ButtonLink: React.FC<ButtonLinkProps> = ({
  href,
  onClick,
  children,
  className = '',
  isActive = false,
  fullWidth = false,
}) => {
  const baseStyles = 'px-3 py-2 rounded-md text-sm font-medium transition duration-300';
  const activeStyles = 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900';
  const inactiveStyles =
    'text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900';
  const widthStyle = fullWidth ? 'w-full text-left' : '';

  const combinedClassName = `${baseStyles} ${
    isActive ? activeStyles : inactiveStyles
  } ${widthStyle} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClassName}>
        {children}
      </Link>
    );
  }

  return (
    // biome-ignore lint/a11y/useButtonType: <explanation>
    <button onClick={onClick} className={combinedClassName}>
      {children}
    </button>
  );
};

export default ButtonLink;
