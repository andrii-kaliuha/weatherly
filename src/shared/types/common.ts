export type CircleProps = { color: string; aqi: number | null };
export type AirPollutantsListProps = { color: string; list: { name: string; value: number; icon: string }[] };

export type AstronomyIconProps = { style?: string; width: number; height: number; icon: string };
export type AstronomyDataItemProps = { icon: string; label: string; value: string | null };

export type ButtonProps = { icon: string; label?: string; style?: string; onClick?: () => void };
export type RadioButtonProps = { checked?: boolean; onChange?: () => void };
