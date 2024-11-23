import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { CircleXIcon, Loader2 } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isLoading?: boolean;
  onClear?: () => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, isLoading, disabled, onClear, ...props }, ref) => {
    const inputClassName = cn(
      'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors',
      'file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground',
      'placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
      'disabled:cursor-not-allowed disabled:opacity-50',
      className
    );

    const iconStyles = 'absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground';

    return (
      <div className="relative w-full">
        <input
          type={type}
          disabled={disabled || isLoading}
          className={inputClassName}
          ref={ref}
          {...props}
        />
        {isLoading && (
          <motion.div className={cn(iconStyles)}>
            <Loader2 className="animate-spin w-5 h-5" />
          </motion.div>
        )}
        {onClear && !isLoading && (
          <CircleXIcon
            className={cn(iconStyles, 'w-5 h-5 cursor-pointer hover:text-foreground')}
            onClick={onClear}
          />
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
