import type { FC, SVGProps } from 'react';
import { MINGCUTE_ICONS, type MingCuteIconName } from './mingcute-data';

export type { MingCuteIconName };

interface MingCuteIconProps extends SVGProps<SVGSVGElement> {
  name: MingCuteIconName;
  size?: number | string;
  color?: string;
}

/**
 * Official component for Iconify MingCute icons
 * Native SVG rendering, offline, ultra-lightweight with zero runtime dependencies
 */
export const MingCuteIcon: FC<MingCuteIconProps> = ({
  name,
  size = 20,
  color = 'currentColor',
  className,
  style,
  ...props
}) => {
  const body = MINGCUTE_ICONS[name as string];

  if (!body) {
    console.warn(`[MingCuteIcon] Icon "${name}" not found in lightweight registry.`);
    return null;
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      className={className}
      style={{
        display: 'inline-block',
        verticalAlign: 'middle',
        color,
        ...style,
      }}
      dangerouslySetInnerHTML={{ __html: body }}
      {...props}
    />
  );
};
