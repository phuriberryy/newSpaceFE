// meter.model.ts - UPDATED with Group support

export interface Meter {
  id: string;
  roomNumber: string;
  tenantName: string;
  meterType: MeterType;
  meterNumber: string;
  installationDate: string;
  currentReading: number;
  previousReading: number;
  averageConsumption: number;
  expectedMin: number;
  expectedMax: number;
  lastUpdated: string;
  status: MeterStatus;
  unit: string;
  groupIds: string[]; // NEW: Array of group IDs this meter belongs to
}

export interface MeterGroup {
  id: string;
  name: string;
  description: string;
  meterIds: string[]; // Array of meter IDs in this group
  createdDate: string;
  updatedDate: string;
}

export type MeterType = 'electricity' | 'water' | 'gas' | 'ac';
export type MeterStatus = 'active' | 'inactive' | 'pending';

export interface MeterStats {
  totalActiveMeters: number;
  pendingReadings: number;
  lastMonthConsumption: number;
  lastMonthConsumptionUnit: string;
  costSavings: number;
  changePercent: {
    meters: number;
    pending: number;
    consumption: number;
    savings: number;
  };
}

export interface MeterReading {
  meterId: string;
  reading: number;
  readingDate: string;
  readBy: string;
  notes?: string;
}

export const METER_TYPE_LABELS: Record<MeterType, { TH: string; EN: string; icon: string; color: string }> = {
  electricity: {
    TH: 'ไฟฟ้า',
    EN: 'Electricity',
    icon: 'pi-bolt',
    color: '#FFD700'
  },
  water: {
    TH: 'น้ำประปา',
    EN: 'Water',
    icon: 'pi-droplet',
    color: '#4CA3FF'
  },
  gas: {
    TH: 'แก๊ส',
    EN: 'Gas',
    icon: 'pi-fire',
    color: '#FF6384'
  },
  ac: {
    TH: 'เครื่องปรับอากาศ',
    EN: 'Air Conditioning',
    icon: 'pi-sun',
    color: '#80E08E'
  }
};

export const METER_STATUS_LABELS: Record<MeterStatus, { TH: string; EN: string; COLOR: string }> = {
  active: { TH: 'ใช้งาน', EN: 'Active', COLOR: '#10B981' },
  inactive: { TH: 'ไม่ใช้งาน', EN: 'Inactive', COLOR: '#6B7280' },
  pending: { TH: 'รอบันทึก', EN: 'Pending', COLOR: '#F59E0B' }
};

/**
 * Get meter type config with module override fallback
 * This ensures Facilities data fetching is NEVER affected - only presentation
 * Note: This function is deprecated - use getMeterTypeConfigSync instead
 */
export const getMeterTypeConfig = (type: MeterType): { TH: string; EN: string; icon: string; color: string } => {
  // Use sync version for consistency
  return getMeterTypeConfigSync(type);
};

/**
 * Synchronous version that reads from localStorage directly (for immediate use)
 * This ensures Facilities data fetching is NEVER affected - only presentation
 */
export const getMeterTypeConfigSync = (type: MeterType): { TH: string; EN: string; icon: string; color: string } => {
  const defaultConfig = METER_TYPE_LABELS[type];
  
  if (typeof window === 'undefined') {
    return defaultConfig;
  }
  
  try {
    const raw = window.localStorage.getItem('space_ui_config');
    if (raw) {
      const config = JSON.parse(raw);
      // Type assertion: we know facilitiesUtilities has chips property
      const facilitiesOverride = config?.moduleOverrides?.facilitiesUtilities as { chips?: Record<MeterType, { color?: string; label?: string; icon?: string }> } | undefined;
      const chipConfig = facilitiesOverride?.chips?.[type];
      if (chipConfig) {
        return {
          TH: chipConfig.label || defaultConfig.TH,
          EN: defaultConfig.EN,
          icon: chipConfig.icon || defaultConfig.icon,
          color: chipConfig.color || defaultConfig.color,
        };
      }
    }
  } catch (e) {
    // Fallback to default
  }
  
  return defaultConfig;
};
