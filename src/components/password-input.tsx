import * as React from 'react';

import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Input } from './ui/input';
import { cn } from '../lib/utils';
import { Button } from './ui/button';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const [isVisible, setVisible] = React.useState(false);

    const toggleVisibility = () => {
      setVisible((s) => !s);
    };

    return (
      <div className="relative">
        <Input
          type={isVisible ? 'text' : 'password'}
          className={cn(className)}
          ref={ref}
          {...props}
        />
        <Button
          variant="link"
          size="icon"
          type="button"
          onClick={toggleVisibility}
          className="absolute right-1 top-1/2 transform -translate-y-1/2 transition-transform duration-300"
        >
          {isVisible ? (
            <FaEyeSlash className="transition-opacity duration-300 opacity-100" />
          ) : (
            <FaEye className="transition-opacity duration-300 opacity-100" />
          )}
        </Button>
      </div>
    );
  },
);

PasswordInput.displayName = 'PasswordInput';

export { PasswordInput };
