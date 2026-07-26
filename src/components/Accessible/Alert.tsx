'use client';

import React from 'react';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
}

const typeClasses = {
  info: 'bg-blue-50 border-blue-200 text-blue-900',
  success: 'bg-green-50 border-green-200 text-green-900',
  warning: 'bg-yellow-50 border-yellow-200 text-yellow-900',
  error: 'bg-red-50 border-red-200 text-red-900',
};

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ type = 'info', title, className = '', children, ...props }, ref) => (
    <div
      ref={ref}
      role="alert"
      aria-live="polite"
      aria-atomic="true"
      className={`rounded-lg border p-4 ${typeClasses[type]} ${className}`}
      {...props}
    >
      {title && <h3 className="font-bold mb-2">{title}</h3>}
      {children}
    </div>
  )
);

Alert.displayName = 'Alert';

export { Alert };
