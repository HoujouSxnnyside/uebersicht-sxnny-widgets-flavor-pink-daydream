import type { FC, SVGProps } from 'react';

interface TapeStickerProps extends SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  color?: string;
  patternColor?: string;
}

/**
 * Semi-transparent torn-edge washi tape sticker for scrapbook cards
 */
export const TapeSticker: FC<TapeStickerProps> = ({
  width = 80,
  height = 20,
  color = 'rgba(255, 248, 241, 0.75)',
  patternColor = 'rgba(239, 169, 196, 0.35)',
  className,
  style,
  ...props
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 100 24"
      fill="none"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      className={className}
      style={{
        filter: 'drop-shadow(0 2px 4px rgba(239, 169, 196, 0.25))',
        ...style,
      }}
      {...props}
    >
      {/* Torn-edge decorative washi tape border */}
      <path
        d="M 3 2 
           L 97 2 
           L 95 6 L 98 10 L 94 14 L 97 18 L 95 22 
           L 3 22 
           L 5 18 L 2 14 L 6 10 L 3 6 Z"
        fill={color}
        stroke="rgba(255, 255, 255, 0.6)"
        strokeWidth="0.8"
      />
      {/* Subtle striped washi tape pattern */}
      <line
        x1="20"
        y1="3"
        x2="28"
        y2="21"
        stroke={patternColor}
        strokeWidth="1.2"
        strokeDasharray="2 2"
      />
      <line
        x1="45"
        y1="3"
        x2="53"
        y2="21"
        stroke={patternColor}
        strokeWidth="1.2"
        strokeDasharray="2 2"
      />
      <line
        x1="70"
        y1="3"
        x2="78"
        y2="21"
        stroke={patternColor}
        strokeWidth="1.2"
        strokeDasharray="2 2"
      />
    </svg>
  );
};
