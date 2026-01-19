export type StatusPalette = {
  success: string;
  warning: string;
  danger: string;
  info: string;
};

const DEFAULT_STATUS_PALETTE: StatusPalette = {
  success: '#22C55E',
  warning: '#F59E0B',
  danger: '#EF4444',
  info: '#3B82F6',
};

const DEFAULT_CHART_PALETTE = [
  '#1677FF', // primary
  '#38BDF8', // secondary
  '#3B82F6', // info
  '#F59E0B', // warning
  '#22C55E', // success
  '#EF4444', // danger
];

const getRgbFromCssVar = (name: string): { r: number; g: number; b: number } | null => {
  if (typeof document === 'undefined') {
    return null;
  }

  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
  if (!value) {
    return null;
  }

  const parts = value.split(/\s+/).map((part) => Number(part));
  if (parts.length < 3 || parts.some((part) => Number.isNaN(part))) {
    return null;
  }

  return { r: parts[0], g: parts[1], b: parts[2] };
};

const toRgb = (rgb: { r: number; g: number; b: number }): string =>
  `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;

const toRgba = (rgb: { r: number; g: number; b: number }, alpha: number): string =>
  `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;

const getColorFromVar = (name: string, fallback: string): string => {
  const rgb = getRgbFromCssVar(name);
  if (!rgb) {
    return fallback;
  }
  return toRgb(rgb);
};

const getColorFromVarWithAlpha = (name: string, alpha: number, fallback: string): string => {
  const rgb = getRgbFromCssVar(name);
  if (!rgb) {
    return fallback;
  }
  return toRgba(rgb, alpha);
};

export const getStatusPalette = (): StatusPalette => ({
  success: getColorFromVar('--success', DEFAULT_STATUS_PALETTE.success),
  warning: getColorFromVar('--warning', DEFAULT_STATUS_PALETTE.warning),
  danger: getColorFromVar('--danger', DEFAULT_STATUS_PALETTE.danger),
  info: getColorFromVar('--info', DEFAULT_STATUS_PALETTE.info),
});

export const getStatusPaletteWithAlpha = (alpha: number): StatusPalette => ({
  success: getColorFromVarWithAlpha(
    '--success',
    alpha,
    `rgba(34, 197, 94, ${alpha})`,
  ),
  warning: getColorFromVarWithAlpha(
    '--warning',
    alpha,
    `rgba(245, 158, 11, ${alpha})`,
  ),
  danger: getColorFromVarWithAlpha('--danger', alpha, `rgba(239, 68, 68, ${alpha})`),
  info: getColorFromVarWithAlpha('--info', alpha, `rgba(59, 130, 246, ${alpha})`),
});

export const getChartPalette = (count: number): string[] => {
  const palette = [
    getColorFromVar('--primary', DEFAULT_CHART_PALETTE[0]),
    getColorFromVar('--secondary', DEFAULT_CHART_PALETTE[1]),
    getColorFromVar('--info', DEFAULT_CHART_PALETTE[2]),
    getColorFromVar('--warning', DEFAULT_CHART_PALETTE[3]),
    getColorFromVar('--success', DEFAULT_CHART_PALETTE[4]),
    getColorFromVar('--danger', DEFAULT_CHART_PALETTE[5]),
  ];

  if (count <= 0) {
    return [];
  }

  return Array.from({ length: count }, (_, index) => palette[index % palette.length]);
};

export const getChartPaletteWithAlpha = (count: number, alpha: number): string[] => {
  const palette = [
    getColorFromVarWithAlpha(
      '--primary',
      alpha,
      `rgba(22, 119, 255, ${alpha})`,
    ),
    getColorFromVarWithAlpha(
      '--secondary',
      alpha,
      `rgba(56, 189, 248, ${alpha})`,
    ),
    getColorFromVarWithAlpha('--info', alpha, `rgba(59, 130, 246, ${alpha})`),
    getColorFromVarWithAlpha(
      '--warning',
      alpha,
      `rgba(245, 158, 11, ${alpha})`,
    ),
    getColorFromVarWithAlpha('--success', alpha, `rgba(34, 197, 94, ${alpha})`),
    getColorFromVarWithAlpha('--danger', alpha, `rgba(239, 68, 68, ${alpha})`),
  ];

  if (count <= 0) {
    return [];
  }

  return Array.from({ length: count }, (_, index) => palette[index % palette.length]);
};
