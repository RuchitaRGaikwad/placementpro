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
      
      {/* Path for the homepage (light 'P' on dark logo) - Default visible */}
      <g className='group-data-[sidebar=sidebar]/logo:hidden'>
        <path
            d="M12 10H17C18.6569 10 20 11.3431 20 13C20 14.6569 18.6569 16 17 16H12V10Z"
            fill="hsl(var(--primary-foreground))"
        />
        <path
            d="M12 10V22"
            stroke="hsl(var(--primary-foreground))"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
      </g>

      {/* Path for the dashboard sidebar (dark 'P' on light logo) - Hidden by default */}
      <g className='hidden group-data-[sidebar=sidebar]/logo:block'>
         <path
            d="M12 10H17C18.6569 10 20 11.3431 20 13C20 14.6569 18.6569 16 17 16H12V10Z"
            fill="hsl(var(--sidebar-background))"
        />
        <path
            d="M12 10V22"
            stroke="hsl(var(--sidebar-background))"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
