import type { FC, SVGProps } from 'react';
import { MINGCUTE_ICONS, type MingCuteIconName } from './mingcute-data';

export type { MingCuteIconName };

/** Props for {@link MingCuteIcon}. Any other SVG attribute is forwarded to the root element. */
interface MingCuteIconProps extends SVGProps<SVGSVGElement> {
  /** Name of the icon in the bundled MingCute registry. */
  name: MingCuteIconName;
  /**
   * Width and height of the icon.
   *
   * @defaultValue `20`
   */
  size?: number | string;
  /**
   * Icon color.
   *
   * @defaultValue `'currentColor'`
   */
  color?: string;
}

/**
 * Renders a MingCute icon from the bundled registry.
 *
 * The SVG markup is inlined, so the icon works offline. Renders nothing and logs a warning
 * when `name` is not in the registry.
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
