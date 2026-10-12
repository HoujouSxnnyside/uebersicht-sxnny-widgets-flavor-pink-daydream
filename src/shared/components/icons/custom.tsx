import type { FC, SVGProps } from 'react';

/**
 * Sparkle icon in MingCute style
 */
export const SparkleIcon: FC<SVGProps<SVGSVGElement> & { size?: number }> = ({
  size = 14,
  color = 'currentColor',
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M12 2L14.2 8.8L21 11L14.2 13.2L12 20L9.8 13.2L3 11L9.8 8.8L12 2Z" fill={color} />
    <path d="M19 17L20 20L23 21L20 22L19 25L18 22L15 21L18 20L19 17Z" fill={color} opacity="0.8" />
  </svg>
);

/**
 * Gentle outlined heart icon in MingCute style
 */
export const HeartIcon: FC<SVGProps<SVGSVGElement> & { size?: number }> = ({
  size = 14,
  color = 'currentColor',
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12 20.25C11.66 20.25 11.34 20.12 11.1 19.89C6.88 15.82 3.75 12.65 3.75 8.75C3.75 5.6 6.13 3.25 9.25 3.25C10.74 3.25 12.18 3.82 13.25 4.81C14.32 3.82 15.76 3.25 17.25 3.25C20.37 3.25 22.75 5.6 22.75 8.75C22.75 12.65 19.62 15.82 15.4 19.89C15.16 20.12 14.84 20.25 14.5 20.25H12Z"
      stroke={color}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * Calendar icon in MingCute style
 */
export const CalendarIcon: FC<SVGProps<SVGSVGElement> & { size?: number }> = ({
  size = 14,
  color = 'currentColor',
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect x="3.5" y="5" width="17" height="15.5" rx="3.5" stroke={color} strokeWidth="1.6" />
    <path d="M3.5 10H20.5" stroke={color} strokeWidth="1.4" />
    <circle cx="8" cy="14" r="1.2" fill={color} />
    <circle cx="12" cy="14" r="1.2" fill={color} />
    <circle cx="16" cy="14" r="1.2" fill={color} />
    <path d="M7.5 3V6" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    <path d="M16.5 3V6" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);
