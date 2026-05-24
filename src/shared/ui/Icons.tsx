type SVGProps = { source: string; width?: number; height?: number; style?: string; label?: string };

export const SVG = ({ source, width, height, style, label }: SVGProps) => {
  return (
    <svg className={style} width={width} height={height} role={label ? "img" : "presentation"} aria-hidden={!label}>
      {label && <title>{label}</title>}
      <use href={source} />
    </svg>
  );
};

type IconProps = { name: string; width?: number; height?: number; color?: string };

export const Icon = ({ name, width, height, color = "currentColor" }: IconProps) => (
  <svg width={width} height={height} fill={color} aria-hidden="true">
    <use href={`/icons.svg#${name}`} />
  </svg>
);
