import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isLoading?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, isLoading, disabled, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <input
          type={type}
          disabled={disabled || isLoading}
          className={cn(
            'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
            isLoading && 'pr-8',
            className
          )}
          ref={ref}
          {...props}
        />
        {isLoading && (
          <motion.div className="absolute right-2 top-1/2 -translate-y-1/2">
            <Loader2 className="h-4 w-4 text-muted-foreground animate-spin" />
          </motion.div>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
