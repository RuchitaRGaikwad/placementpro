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
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32ZM13.25 10H17.75C20.25 10 22 11.75 22 14.25C22 16.75 20.25 18.5 17.75 18.5H13.25V10ZM10 22V10H10.75H13.25V18.5H10.75V22H10ZM15.75 18.5V22H13.25V18.5H15.75Z"
        fill="currentColor"
      />
    </svg>
  );
}
