import React from 'react';
import logo from '@/assets/logo.png';
import { cn } from '../../lib/utils';

export function Logo({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <img
      src={logo}
      className={cn(className)}
      style={{
        ...style,
      }}
    />
  );
}
