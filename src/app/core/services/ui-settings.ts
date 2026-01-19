export type UiThemeMode = 'light' | 'dark';
export type UiPaletteMode = 'preset' | 'custom';
export type UiStatusMode = 'preset' | 'custom';
export type UiIconStyle = 'outline' | 'solid';

export interface UiTokens {
  bg: string;
  fg: string;
  muted: string;
  border: string;
  card: string;
  input: string;
  primary: string;
  primaryFg: string;
  secondary: string;
  secondaryFg: string;
  success: string;
  successFg: string;
  warning: string;
  warningFg: string;
  danger: string;
  dangerFg: string;
  info: string;
  infoFg: string;
  link: string;
}

export interface UiStatusTokens {
  success: string;
  successFg: string;
  warning: string;
  warningFg: string;
  danger: string;
  dangerFg: string;
  info: string;
  infoFg: string;
}

export interface UiConfig {
  themeMode: UiThemeMode;
  paletteMode: UiPaletteMode;
  activePresetId: string | null;
  statusMode: UiStatusMode;
  activeStatusPresetId: string | null;
  tokens: UiTokens;
  iconStyle: UiIconStyle;
  labels: Record<string, string>;
}

export interface UiPreset {
  id: string;
  name: string;
  light: UiTokens;
  dark: UiTokens;
}

export interface UiStatusPreset {
  id: string;
  name: string;
  tokens: UiStatusTokens;
}

export const UI_SETTINGS_KEY = 'space_ui_config';
const LEGACY_SETTINGS_KEY = 'space_ui_settings';

export const UI_PRESETS: UiPreset[] = [
  {
    id: 'space-blue',
    name: 'Space Blue',
    light: {
      bg: '#F8FAFC',
      fg: '#0F172A',
      muted: '#64748B',
      border: '#E2E8F0',
      card: '#FFFFFF',
      input: '#FFFFFF',
      primary: '#1677FF',
      primaryFg: '#FFFFFF',
      secondary: '#38BDF8',
      secondaryFg: '#0B1220',
      success: '#22C55E',
      successFg: '#052E16',
      warning: '#F59E0B',
      warningFg: '#451A03',
      danger: '#EF4444',
      dangerFg: '#450A0A',
      info: '#3B82F6',
      infoFg: '#0B1220',
      link: '#1677FF',
    },
    dark: {
      bg: '#0B1220',
      fg: '#E2E8F0',
      muted: '#94A3B8',
      border: '#1F2A44',
      card: '#111C2F',
      input: '#111C2F',
      primary: '#3B82F6',
      primaryFg: '#E2E8F0',
      secondary: '#38BDF8',
      secondaryFg: '#0B1220',
      success: '#22C55E',
      successFg: '#052E16',
      warning: '#F59E0B',
      warningFg: '#451A03',
      danger: '#F87171',
      dangerFg: '#450A0A',
      info: '#60A5FA',
      infoFg: '#0B1220',
      link: '#60A5FA',
    },
  },
  {
    id: 'ocean',
    name: 'Ocean',
    light: {
      bg: '#F5FAFF',
      fg: '#0F172A',
      muted: '#64748B',
      border: '#D7E3F3',
      card: '#FFFFFF',
      input: '#FFFFFF',
      primary: '#0EA5E9',
      primaryFg: '#FFFFFF',
      secondary: '#22D3EE',
      secondaryFg: '#0B1220',
      success: '#22C55E',
      successFg: '#052E16',
      warning: '#F59E0B',
      warningFg: '#451A03',
      danger: '#EF4444',
      dangerFg: '#450A0A',
      info: '#0EA5E9',
      infoFg: '#0B1220',
      link: '#0284C7',
    },
    dark: {
      bg: '#071726',
      fg: '#E2E8F0',
      muted: '#94A3B8',
      border: '#12314F',
      card: '#0B2138',
      input: '#0B2138',
      primary: '#38BDF8',
      primaryFg: '#0B1220',
      secondary: '#22D3EE',
      secondaryFg: '#0B1220',
      success: '#22C55E',
      successFg: '#052E16',
      warning: '#F59E0B',
      warningFg: '#451A03',
      danger: '#F87171',
      dangerFg: '#450A0A',
      info: '#38BDF8',
      infoFg: '#0B1220',
      link: '#38BDF8',
    },
  },
  {
    id: 'indigo',
    name: 'Indigo',
    light: {
      bg: '#F8FAFF',
      fg: '#111827',
      muted: '#6B7280',
      border: '#E5E7EB',
      card: '#FFFFFF',
      input: '#FFFFFF',
      primary: '#6366F1',
      primaryFg: '#FFFFFF',
      secondary: '#A5B4FC',
      secondaryFg: '#111827',
      success: '#22C55E',
      successFg: '#052E16',
      warning: '#F59E0B',
      warningFg: '#451A03',
      danger: '#EF4444',
      dangerFg: '#450A0A',
      info: '#4F46E5',
      infoFg: '#FFFFFF',
      link: '#4F46E5',
    },
    dark: {
      bg: '#0E0F1E',
      fg: '#E5E7EB',
      muted: '#9CA3AF',
      border: '#23253D',
      card: '#14182A',
      input: '#14182A',
      primary: '#818CF8',
      primaryFg: '#0B1220',
      secondary: '#A5B4FC',
      secondaryFg: '#0B1220',
      success: '#22C55E',
      successFg: '#052E16',
      warning: '#F59E0B',
      warningFg: '#451A03',
      danger: '#F87171',
      dangerFg: '#450A0A',
      info: '#818CF8',
      infoFg: '#0B1220',
      link: '#818CF8',
    },
  },
  {
    id: 'teal',
    name: 'Teal',
    light: {
      bg: '#F6FFFE',
      fg: '#0F172A',
      muted: '#64748B',
      border: '#D9F2EE',
      card: '#FFFFFF',
      input: '#FFFFFF',
      primary: '#14B8A6',
      primaryFg: '#FFFFFF',
      secondary: '#2DD4BF',
      secondaryFg: '#0B1220',
      success: '#22C55E',
      successFg: '#052E16',
      warning: '#F59E0B',
      warningFg: '#451A03',
      danger: '#EF4444',
      dangerFg: '#450A0A',
      info: '#0D9488',
      infoFg: '#FFFFFF',
      link: '#0D9488',
    },
    dark: {
      bg: '#0B1D1B',
      fg: '#E2E8F0',
      muted: '#94A3B8',
      border: '#12312B',
      card: '#0F2824',
      input: '#0F2824',
      primary: '#2DD4BF',
      primaryFg: '#0B1220',
      secondary: '#14B8A6',
      secondaryFg: '#0B1220',
      success: '#22C55E',
      successFg: '#052E16',
      warning: '#F59E0B',
      warningFg: '#451A03',
      danger: '#F87171',
      dangerFg: '#450A0A',
      info: '#2DD4BF',
      infoFg: '#0B1220',
      link: '#2DD4BF',
    },
  },
  {
    id: 'purple',
    name: 'Purple',
    light: {
      bg: '#FBF7FF',
      fg: '#1E1B4B',
      muted: '#6B7280',
      border: '#EDE9FE',
      card: '#FFFFFF',
      input: '#FFFFFF',
      primary: '#8B5CF6',
      primaryFg: '#FFFFFF',
      secondary: '#C4B5FD',
      secondaryFg: '#1E1B4B',
      success: '#22C55E',
      successFg: '#052E16',
      warning: '#F59E0B',
      warningFg: '#451A03',
      danger: '#EF4444',
      dangerFg: '#450A0A',
      info: '#7C3AED',
      infoFg: '#FFFFFF',
      link: '#7C3AED',
    },
    dark: {
      bg: '#140E24',
      fg: '#E5E7EB',
      muted: '#9CA3AF',
      border: '#2A1B4B',
      card: '#1C1432',
      input: '#1C1432',
      primary: '#A78BFA',
      primaryFg: '#0B1220',
      secondary: '#C4B5FD',
      secondaryFg: '#0B1220',
      success: '#22C55E',
      successFg: '#052E16',
      warning: '#F59E0B',
      warningFg: '#451A03',
      danger: '#F87171',
      dangerFg: '#450A0A',
      info: '#A78BFA',
      infoFg: '#0B1220',
      link: '#A78BFA',
    },
  },
  {
    id: 'neutral-gray',
    name: 'Neutral',
    light: {
      bg: '#F8FAFC',
      fg: '#111827',
      muted: '#6B7280',
      border: '#E5E7EB',
      card: '#FFFFFF',
      input: '#FFFFFF',
      primary: '#334155',
      primaryFg: '#FFFFFF',
      secondary: '#94A3B8',
      secondaryFg: '#0B1220',
      success: '#22C55E',
      successFg: '#052E16',
      warning: '#F59E0B',
      warningFg: '#451A03',
      danger: '#EF4444',
      dangerFg: '#450A0A',
      info: '#475569',
      infoFg: '#FFFFFF',
      link: '#334155',
    },
    dark: {
      bg: '#0B0F15',
      fg: '#E5E7EB',
      muted: '#9CA3AF',
      border: '#1F2937',
      card: '#111827',
      input: '#111827',
      primary: '#94A3B8',
      primaryFg: '#0B1220',
      secondary: '#64748B',
      secondaryFg: '#0B1220',
      success: '#22C55E',
      successFg: '#052E16',
      warning: '#F59E0B',
      warningFg: '#451A03',
      danger: '#F87171',
      dangerFg: '#450A0A',
      info: '#94A3B8',
      infoFg: '#0B1220',
      link: '#94A3B8',
    },
  },
  {
    id: 'dark-blue',
    name: 'Dark Blue',
    light: {
      bg: '#F3F7FF',
      fg: '#0F172A',
      muted: '#64748B',
      border: '#DDE7F5',
      card: '#FFFFFF',
      input: '#FFFFFF',
      primary: '#1D4ED8',
      primaryFg: '#FFFFFF',
      secondary: '#3B82F6',
      secondaryFg: '#FFFFFF',
      success: '#22C55E',
      successFg: '#052E16',
      warning: '#F59E0B',
      warningFg: '#451A03',
      danger: '#EF4444',
      dangerFg: '#450A0A',
      info: '#2563EB',
      infoFg: '#FFFFFF',
      link: '#1D4ED8',
    },
    dark: {
      bg: '#081021',
      fg: '#E2E8F0',
      muted: '#94A3B8',
      border: '#14223D',
      card: '#0E1A33',
      input: '#0E1A33',
      primary: '#3B82F6',
      primaryFg: '#E2E8F0',
      secondary: '#60A5FA',
      secondaryFg: '#0B1220',
      success: '#22C55E',
      successFg: '#052E16',
      warning: '#F59E0B',
      warningFg: '#451A03',
      danger: '#F87171',
      dangerFg: '#450A0A',
      info: '#60A5FA',
      infoFg: '#0B1220',
      link: '#60A5FA',
    },
  },
  {
    id: 'sunrise',
    name: 'Sunrise',
    light: {
      bg: '#FFF8F1',
      fg: '#2B1B12',
      muted: '#8A6B5B',
      border: '#F3E3D6',
      card: '#FFFFFF',
      input: '#FFFFFF',
      primary: '#F97316',
      primaryFg: '#FFFFFF',
      secondary: '#FDBA74',
      secondaryFg: '#3B1D0C',
      success: '#22C55E',
      successFg: '#052E16',
      warning: '#F59E0B',
      warningFg: '#451A03',
      danger: '#EF4444',
      dangerFg: '#450A0A',
      info: '#FB7185',
      infoFg: '#881337',
      link: '#F97316',
    },
    dark: {
      bg: '#1A0F0A',
      fg: '#FCEFE6',
      muted: '#D0B4A3',
      border: '#2F1A12',
      card: '#22140D',
      input: '#22140D',
      primary: '#FB923C',
      primaryFg: '#1A0F0A',
      secondary: '#FDBA74',
      secondaryFg: '#1A0F0A',
      success: '#34D399',
      successFg: '#052E16',
      warning: '#FBBF24',
      warningFg: '#451A03',
      danger: '#F87171',
      dangerFg: '#450A0A',
      info: '#FB7185',
      infoFg: '#450A0A',
      link: '#FB923C',
    },
  },
  {
    id: 'forest',
    name: 'Forest',
    light: {
      bg: '#F6FBF8',
      fg: '#102A22',
      muted: '#5D756B',
      border: '#DDEBE4',
      card: '#FFFFFF',
      input: '#FFFFFF',
      primary: '#0F766E',
      primaryFg: '#FFFFFF',
      secondary: '#22C55E',
      secondaryFg: '#052E16',
      success: '#16A34A',
      successFg: '#052E16',
      warning: '#D97706',
      warningFg: '#451A03',
      danger: '#DC2626',
      dangerFg: '#450A0A',
      info: '#14B8A6',
      infoFg: '#042F2E',
      link: '#0F766E',
    },
    dark: {
      bg: '#0B1A16',
      fg: '#E5F4EE',
      muted: '#92A59D',
      border: '#163027',
      card: '#10241E',
      input: '#10241E',
      primary: '#2DD4BF',
      primaryFg: '#0B1220',
      secondary: '#34D399',
      secondaryFg: '#052E16',
      success: '#22C55E',
      successFg: '#052E16',
      warning: '#F59E0B',
      warningFg: '#451A03',
      danger: '#F87171',
      dangerFg: '#450A0A',
      info: '#38BDF8',
      infoFg: '#0B1220',
      link: '#2DD4BF',
    },
  },
  {
    id: 'steel',
    name: 'Steel',
    light: {
      bg: '#F5F7FA',
      fg: '#111827',
      muted: '#6B7280',
      border: '#E5E7EB',
      card: '#FFFFFF',
      input: '#FFFFFF',
      primary: '#0F172A',
      primaryFg: '#FFFFFF',
      secondary: '#64748B',
      secondaryFg: '#FFFFFF',
      success: '#16A34A',
      successFg: '#052E16',
      warning: '#F59E0B',
      warningFg: '#451A03',
      danger: '#EF4444',
      dangerFg: '#450A0A',
      info: '#1D4ED8',
      infoFg: '#FFFFFF',
      link: '#1D4ED8',
    },
    dark: {
      bg: '#0B111A',
      fg: '#E5E7EB',
      muted: '#9CA3AF',
      border: '#1F2937',
      card: '#111827',
      input: '#111827',
      primary: '#94A3B8',
      primaryFg: '#0B1220',
      secondary: '#475569',
      secondaryFg: '#E2E8F0',
      success: '#22C55E',
      successFg: '#052E16',
      warning: '#F59E0B',
      warningFg: '#451A03',
      danger: '#F87171',
      dangerFg: '#450A0A',
      info: '#60A5FA',
      infoFg: '#0B1220',
      link: '#93C5FD',
    },
  },
  {
    id: 'high-contrast',
    name: 'High Contrast',
    light: {
      bg: '#FFFFFF',
      fg: '#0B1220',
      muted: '#334155',
      border: '#0B1220',
      card: '#FFFFFF',
      input: '#FFFFFF',
      primary: '#000000',
      primaryFg: '#FFFFFF',
      secondary: '#0B1220',
      secondaryFg: '#FFFFFF',
      success: '#16A34A',
      successFg: '#FFFFFF',
      warning: '#F59E0B',
      warningFg: '#0B1220',
      danger: '#DC2626',
      dangerFg: '#FFFFFF',
      info: '#2563EB',
      infoFg: '#FFFFFF',
      link: '#000000',
    },
    dark: {
      bg: '#000000',
      fg: '#FFFFFF',
      muted: '#CBD5F5',
      border: '#FFFFFF',
      card: '#0B1220',
      input: '#0B1220',
      primary: '#FFFFFF',
      primaryFg: '#0B1220',
      secondary: '#CBD5F5',
      secondaryFg: '#0B1220',
      success: '#22C55E',
      successFg: '#0B1220',
      warning: '#F59E0B',
      warningFg: '#0B1220',
      danger: '#EF4444',
      dangerFg: '#0B1220',
      info: '#60A5FA',
      infoFg: '#0B1220',
      link: '#FFFFFF',
    },
  },
];

export const UI_STATUS_PRESETS: UiStatusPreset[] = [
  {
    id: 'default',
    name: 'Default',
    tokens: {
      success: '#22C55E',
      successFg: '#052E16',
      warning: '#F59E0B',
      warningFg: '#451A03',
      danger: '#EF4444',
      dangerFg: '#450A0A',
      info: '#3B82F6',
      infoFg: '#0B1220',
    },
  },
  {
    id: 'soft',
    name: 'Soft',
    tokens: {
      success: '#86EFAC',
      successFg: '#14532D',
      warning: '#FCD34D',
      warningFg: '#78350F',
      danger: '#FCA5A5',
      dangerFg: '#7F1D1D',
      info: '#93C5FD',
      infoFg: '#1E3A8A',
    },
  },
  {
    id: 'bold',
    name: 'Bold',
    tokens: {
      success: '#10B981',
      successFg: '#ECFDF5',
      warning: '#F97316',
      warningFg: '#FFF7ED',
      danger: '#F43F5E',
      dangerFg: '#FFF1F2',
      info: '#0EA5E9',
      infoFg: '#E0F2FE',
    },
  },
  {
    id: 'sunset',
    name: 'Sunset',
    tokens: {
      success: '#84CC16',
      successFg: '#365314',
      warning: '#F59E0B',
      warningFg: '#78350F',
      danger: '#FB7185',
      dangerFg: '#881337',
      info: '#38BDF8',
      infoFg: '#0C4A6E',
    },
  },
  {
    id: 'aurora',
    name: 'Aurora',
    tokens: {
      success: '#34D399',
      successFg: '#064E3B',
      warning: '#FCD34D',
      warningFg: '#78350F',
      danger: '#FB7185',
      dangerFg: '#881337',
      info: '#60A5FA',
      infoFg: '#1E3A8A',
    },
  },
  {
    id: 'tropical',
    name: 'Tropical',
    tokens: {
      success: '#2DD4BF',
      successFg: '#042F2E',
      warning: '#FDBA74',
      warningFg: '#7C2D12',
      danger: '#F43F5E',
      dangerFg: '#FFF1F2',
      info: '#0EA5E9',
      infoFg: '#E0F2FE',
    },
  },
  {
    id: 'slate',
    name: 'Slate',
    tokens: {
      success: '#4ADE80',
      successFg: '#14532D',
      warning: '#EAB308',
      warningFg: '#713F12',
      danger: '#F87171',
      dangerFg: '#7F1D1D',
      info: '#38BDF8',
      infoFg: '#0C4A6E',
    },
  },
];

export const DEFAULT_UI_CONFIG: UiConfig = {
  themeMode: 'light',
  paletteMode: 'preset',
  activePresetId: 'space-blue',
  statusMode: 'custom',
  activeStatusPresetId: null,
  tokens: UI_PRESETS[0].light,
  iconStyle: 'outline',
  labels: {
    sales: 'Sales',
    area: 'Area',
    contract: 'Contract',
    collection_finance: 'collection_finance',
    facilities: 'facilities',
    report: 'Report',
    report_dashboard: 'Report',
  },
};

export const loadUiConfig = (): UiConfig => {
  if (typeof window === 'undefined') {
    return { ...DEFAULT_UI_CONFIG };
  }

  const raw =
    window.localStorage.getItem(UI_SETTINGS_KEY) ||
    window.localStorage.getItem(LEGACY_SETTINGS_KEY);
  if (!raw) {
    return { ...DEFAULT_UI_CONFIG };
  }

  try {
    const parsed = JSON.parse(raw) as Partial<UiConfig>;
    const mergedTokens = {
      ...DEFAULT_UI_CONFIG.tokens,
      ...(parsed.tokens || {}),
    };
    return {
      ...DEFAULT_UI_CONFIG,
      ...parsed,
      tokens: mergedTokens,
      labels: {
        ...DEFAULT_UI_CONFIG.labels,
        ...(parsed.labels || {}),
      },
      activePresetId: parsed.activePresetId ?? DEFAULT_UI_CONFIG.activePresetId,
      statusMode: parsed.statusMode ?? DEFAULT_UI_CONFIG.statusMode,
      activeStatusPresetId:
        parsed.activeStatusPresetId ?? DEFAULT_UI_CONFIG.activeStatusPresetId,
    };
  } catch {
    return { ...DEFAULT_UI_CONFIG };
  }
};

export const saveUiConfig = (config: UiConfig): void => {
  if (typeof window === 'undefined') {
    return;
  }
  window.localStorage.setItem(UI_SETTINGS_KEY, JSON.stringify(config));
};

export const applyUiConfig = (config: UiConfig): void => {
  if (typeof document === 'undefined') {
    return;
  }

  const root = document.documentElement;
  root.dataset['theme'] = config.themeMode;
  root.dataset['iconStyle'] = config.iconStyle;

  const activeTokens = resolveTokens(config);
  setColorVars(activeTokens);
};

export const getLabelOverride = (key: string): string | null => {
  const config = loadUiConfig();
  return config.labels?.[key] || null;
};

export const resolveTokens = (config: UiConfig): UiTokens => {
  let tokens = config.tokens;
  if (config.paletteMode === 'preset' && config.activePresetId) {
    const preset = UI_PRESETS.find((item) => item.id === config.activePresetId);
    if (preset) {
      tokens = config.themeMode === 'dark' ? preset.dark : preset.light;
    }
  }

  if (config.statusMode === 'preset' && config.activeStatusPresetId) {
    const statusPreset = UI_STATUS_PRESETS.find(
      (item) => item.id === config.activeStatusPresetId,
    );
    if (statusPreset) {
      return {
        ...tokens,
        ...statusPreset.tokens,
      };
    }
  }

  return tokens;
};

const setColorVars = (tokens: UiTokens): void => {
  setColorVar('--bg', tokens.bg);
  setColorVar('--fg', tokens.fg);
  setColorVar('--muted', tokens.muted);
  setColorVar('--border', tokens.border);
  setColorVar('--card', tokens.card);
  setColorVar('--input', tokens.input);
  setColorVar('--primary', tokens.primary);
  setColorVar('--primary-fg', tokens.primaryFg);
  setColorVar('--secondary', tokens.secondary);
  setColorVar('--secondary-fg', tokens.secondaryFg);
  setColorVar('--success', tokens.success);
  setColorVar('--success-fg', tokens.successFg);
  setColorVar('--warning', tokens.warning);
  setColorVar('--warning-fg', tokens.warningFg);
  setColorVar('--danger', tokens.danger);
  setColorVar('--danger-fg', tokens.dangerFg);
  setColorVar('--info', tokens.info);
  setColorVar('--info-fg', tokens.infoFg);
  setColorVar('--link', tokens.link);
  setColorVar('--ring', tokens.primary);

  document.documentElement.style.setProperty('--primary-foreground', 'var(--primary-fg)');
  document.documentElement.style.setProperty('--secondary-foreground', 'var(--secondary-fg)');
  document.documentElement.style.setProperty('--success-foreground', 'var(--success-fg)');
  document.documentElement.style.setProperty('--warning-foreground', 'var(--warning-fg)');
  document.documentElement.style.setProperty('--danger-foreground', 'var(--danger-fg)');
  document.documentElement.style.setProperty('--info-foreground', 'var(--info-fg)');
};

const setColorVar = (name: string, hex: string): void => {
  const rgb = hexToRgb(hex);
  if (!rgb) {
    return;
  }
  document.documentElement.style.setProperty(name, `${rgb.r} ${rgb.g} ${rgb.b}`);
};

const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const normalized = hex.replace('#', '').trim();
  if (normalized.length === 3) {
    const r = parseInt(normalized[0] + normalized[0], 16);
    const g = parseInt(normalized[1] + normalized[1], 16);
    const b = parseInt(normalized[2] + normalized[2], 16);
    return { r, g, b };
  }
  if (normalized.length === 6) {
    const r = parseInt(normalized.slice(0, 2), 16);
    const g = parseInt(normalized.slice(2, 4), 16);
    const b = parseInt(normalized.slice(4, 6), 16);
    return { r, g, b };
  }
  return null;
};
