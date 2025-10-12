import { cn } from '@/lib/utils';
import type { SVGProps } from 'react';

export function Logo({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('text-primary', className)}
      {...props}
    >
      <rect width="32" height="32" rx="8" fill="currentColor" />
      <path
        d="M12 10H17C18.6569 10 20 11.3431 20 13C20 14.6569 18.6569 16 17 16H12V10Z"
        fill="hsl(var(--background))"
      />
      <path
        d="M12 10V22"
        stroke="hsl(var(--background))"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
