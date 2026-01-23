import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  UiConfig,
  UiPreset,
  UI_PRESETS,
  UiStatusPreset,
  UI_STATUS_PRESETS,
  DEFAULT_UI_CONFIG,
  applyUiConfig,
  loadUiConfig,
  saveUiConfig,
  resolveTokens,
  ModuleId,
  AreaAvailabilityOverride,
  FacilitiesUtilitiesOverride,
  AreaRentableItem,
} from '@core/services/ui-settings';

@Component({
  selector: 'app-system-interface',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './system-interface.component.html',
  styleUrl: './system-interface.component.css',
})
export class SystemInterfaceComponent implements OnInit {
  config: UiConfig = { ...DEFAULT_UI_CONFIG };
  presets: UiPreset[] = UI_PRESETS;
  statusPresets: UiStatusPreset[] = UI_STATUS_PRESETS;
  selectedElement: string = 'Background';
  private lastSavedConfig: UiConfig = cloneConfig(DEFAULT_UI_CONFIG);
  saveStatus: string = '';
  private saveStatusTimer: ReturnType<typeof setTimeout> | null = null;

  // Module selection
  selectedModule: ModuleId | '' = '';
  moduleOptions: { value: ModuleId; label: string }[] = [
    { value: 'areaAvailability', label: 'Area Availability' },
    { value: 'facilitiesUtilities', label: 'Facilities (Utilities)' },
  ];

  // Area Availability form data - Multi-language support (Thai + English)
  areaStatusConfig: Record<string, { color: string; label: string; labelEn?: string; icon: string }> = {
    unallocated: { color: '#FF6384', label: 'ยังไม่พร้อม', labelEn: 'Not Ready', icon: '' },
    quotation: { color: '#4CA3FF', label: 'คำใบเสนอราคา', labelEn: 'Quotation', icon: '' },
    leased: { color: '#FFD05F', label: 'เช่า', labelEn: 'Leased', icon: '' },
    vacant: { color: '#80E08E', label: 'ว่าง', labelEn: 'Vacant', icon: '' },
  };

  // Default values for reset
  private defaultAreaStatusConfig: Record<string, { color: string; label: string; labelEn?: string; icon: string }> = {
    unallocated: { color: '#FF6384', label: 'ยังไม่พร้อม', labelEn: 'Not Ready', icon: '' },
    quotation: { color: '#4CA3FF', label: 'คำใบเสนอราคา', labelEn: 'Quotation', icon: '' },
    leased: { color: '#FFD05F', label: 'เช่า', labelEn: 'Leased', icon: '' },
    vacant: { color: '#80E08E', label: 'ว่าง', labelEn: 'Vacant', icon: '' },
  };

  // Facilities form data - now dynamic array instead of fixed object
  facilitiesChipItems: Array<{ id: string; type: string; color: string; label: string; icon: string | undefined; enabled: boolean; order: number }> = [];
  facilitiesRentableItems: AreaRentableItem[] = [];
  editingRentableItem: AreaRentableItem | null = null;
  
  // Icon picker state
  selectedIconCategory: string = '';
  
  // Icon library for selection - editable names
  // Note: PrimeNG icons use format "pi pi-icon-name" (two "pi" classes)
  // Using only verified PrimeNG icons that exist and are meaningful
  iconLibrary: Array<{ name: string; class: string; category: string; editable?: boolean }> = [
    // Status Icons - Not Ready/Unallocated (ยังไม่พร้อม)
    { name: 'Not Ready', class: 'pi pi-ban', category: 'Status', editable: true },
    { name: 'Unallocated', class: 'pi pi-times-circle', category: 'Status', editable: true },
    { name: 'Blocked', class: 'pi pi-lock', category: 'Status', editable: true },
    { name: 'Warning', class: 'pi pi-exclamation-triangle', category: 'Status', editable: true },
    { name: 'Error', class: 'pi pi-times', category: 'Status', editable: true },
    { name: 'Stop', class: 'pi pi-stop-circle', category: 'Status', editable: true },
    
    // Status Icons - Quotation (คำใบเสนอราคา)
    { name: 'Quotation', class: 'pi pi-file-edit', category: 'Status', editable: true },
    { name: 'Document', class: 'pi pi-file', category: 'Status', editable: true },
    { name: 'Proposal', class: 'pi pi-file', category: 'Status', editable: true },
    { name: 'Contract', class: 'pi pi-file-pdf', category: 'Status', editable: true },
    { name: 'Quote', class: 'pi pi-dollar', category: 'Status', editable: true },
    { name: 'Money', class: 'pi pi-money-bill', category: 'Status', editable: true },
    
    // Status Icons - Leased (เช่า)
    { name: 'Leased', class: 'pi pi-check-circle', category: 'Status', editable: true },
    { name: 'Rented', class: 'pi pi-handshake', category: 'Status', editable: true },
    { name: 'Key', class: 'pi pi-key', category: 'Status', editable: true },
    { name: 'Lock', class: 'pi pi-lock', category: 'Status', editable: true },
    { name: 'Approved', class: 'pi pi-check', category: 'Status', editable: true },
    { name: 'Verified', class: 'pi pi-verified', category: 'Status', editable: true },
    
    // Status Icons - Vacant (ว่าง)
    { name: 'Vacant', class: 'pi pi-circle', category: 'Status', editable: true },
    { name: 'Empty', class: 'pi pi-inbox', category: 'Status', editable: true },
    { name: 'Available', class: 'pi pi-check', category: 'Status', editable: true },
    { name: 'Open', class: 'pi pi-unlock', category: 'Status', editable: true },
    { name: 'Free', class: 'pi pi-circle', category: 'Status', editable: true },
    { name: 'Ready', class: 'pi pi-check-circle', category: 'Status', editable: true },
    
    // Common Status Icons
    { name: 'Info Circle', class: 'pi pi-info-circle', category: 'Status', editable: true },
    { name: 'Question Circle', class: 'pi pi-question-circle', category: 'Status', editable: true },
    { name: 'Clock', class: 'pi pi-clock', category: 'Status', editable: true },
    { name: 'Calendar', class: 'pi pi-calendar', category: 'Status', editable: true },
    { name: 'Tag', class: 'pi pi-tag', category: 'Status', editable: true },
    
    // Utilities Icons - Electricity (ไฟฟ้า)
    { name: 'Electricity', class: 'pi pi-bolt', category: 'Utilities', editable: true },
    { name: 'Lightning', class: 'pi pi-bolt', category: 'Utilities', editable: true },
    { name: 'Power', class: 'pi pi-power-off', category: 'Utilities', editable: true },
    { name: 'Energy', class: 'pi pi-bolt', category: 'Utilities', editable: true },
    
    // Utilities Icons - Water (น้ำ) - Note: PrimeNG doesn't have water icon, use upload feature
    { name: 'Water', class: 'pi pi-circle', category: 'Utilities', editable: true },
    { name: 'Droplet', class: 'pi pi-circle', category: 'Utilities', editable: true },
    { name: 'Liquid', class: 'pi pi-circle', category: 'Utilities', editable: true },
    { name: 'Water Pipe', class: 'pi pi-cog', category: 'Utilities', editable: true },
    
    // Utilities Icons - Gas (แก๊ส) - Note: PrimeNG doesn't have gas icon, use upload feature
    { name: 'Gas', class: 'pi pi-circle', category: 'Utilities', editable: true },
    { name: 'Fire', class: 'pi pi-circle', category: 'Utilities', editable: true },
    { name: 'Fuel', class: 'pi pi-circle', category: 'Utilities', editable: true },
    { name: 'Gas Tank', class: 'pi pi-box', category: 'Utilities', editable: true },
    
    // Utilities Icons - AC (แอร์)
    { name: 'AC', class: 'pi pi-snowflake', category: 'Utilities', editable: true },
    { name: 'Cooling', class: 'pi pi-snowflake', category: 'Utilities', editable: true },
    { name: 'Fan', class: 'pi pi-spinner', category: 'Utilities', editable: true },
    { name: 'Sun', class: 'pi pi-sun', category: 'Utilities', editable: true },
    { name: 'Temperature', class: 'pi pi-snowflake', category: 'Utilities', editable: true },
    
    // Area Icons
    { name: 'Building', class: 'pi pi-building', category: 'Area', editable: true },
    { name: 'Home', class: 'pi pi-home', category: 'Area', editable: true },
    { name: 'Map', class: 'pi pi-map', category: 'Area', editable: true },
    { name: 'Location', class: 'pi pi-map', category: 'Area', editable: true },
    { name: 'Floor', class: 'pi pi-th-large', category: 'Area', editable: true },
    { name: 'Grid', class: 'pi pi-th-large', category: 'Area', editable: true },
    { name: 'Layout', class: 'pi pi-th', category: 'Area', editable: true },
    { name: 'Warehouse', class: 'pi pi-building', category: 'Area', editable: true },
    
    // Rentable Items Icons
    { name: 'Table', class: 'pi pi-th-large', category: 'Rentable', editable: true },
    { name: 'Chair', class: 'pi pi-circle', category: 'Rentable', editable: true },
    { name: 'Desk', class: 'pi pi-desktop', category: 'Rentable', editable: true },
    { name: 'Box', class: 'pi pi-box', category: 'Rentable', editable: true },
    { name: 'Shopping Cart', class: 'pi pi-shopping-cart', category: 'Rentable', editable: true },
    { name: 'Package', class: 'pi pi-archive', category: 'Rentable', editable: true },
    { name: 'Storage', class: 'pi pi-database', category: 'Rentable', editable: true },
    { name: 'Container', class: 'pi pi-box', category: 'Rentable', editable: true },
    { name: 'Furniture', class: 'pi pi-th-large', category: 'Rentable', editable: true },
  ];
  
  editingIconName: { index: number; originalName: string } | null = null;
  showIconPicker: { module: string; itemId: string; field: string } | null = null;

  ngOnInit(): void {
    this.config = loadUiConfig();
    this.lastSavedConfig = cloneConfig(this.config);
    this.syncPresetTokens();
    applyUiConfig(this.config);

    // Load selected module from localStorage
    const savedModule = localStorage.getItem('interface_selected_module');
    if (savedModule && (savedModule === 'areaAvailability' || savedModule === 'facilitiesUtilities')) {
      this.selectedModule = savedModule as ModuleId;
    }

    // Load module-specific configs
    this.loadModuleConfigs();
  }

  onModuleChange(): void {
    if (this.selectedModule) {
      localStorage.setItem('interface_selected_module', this.selectedModule);
      this.loadModuleConfigs();
    }
  }

  private loadModuleConfigs(): void {
    if (!this.selectedModule) {
      return;
    }

    if (this.selectedModule === 'areaAvailability') {
      const areaOverride = this.config.moduleOverrides?.areaAvailability;
      if (areaOverride?.statusColors) {
        this.areaStatusConfig['unallocated'] = {
          color: areaOverride.statusColors.unallocated?.color || '#FF6384',
          label: areaOverride.statusColors.unallocated?.label || 'ยังไม่พร้อม',
          labelEn: areaOverride.statusColors.unallocated?.labelEn || 'Not Ready',
          icon: areaOverride.statusIcons?.['unallocated'] || '',
        };
        this.areaStatusConfig['quotation'] = {
          color: areaOverride.statusColors.quotation?.color || '#4CA3FF',
          label: areaOverride.statusColors.quotation?.label || 'คำใบเสนอราคา',
          labelEn: areaOverride.statusColors.quotation?.labelEn || 'Quotation',
          icon: areaOverride.statusIcons?.['quotation'] || '',
        };
        this.areaStatusConfig['leased'] = {
          color: areaOverride.statusColors.leased?.color || '#FFD05F',
          label: areaOverride.statusColors.leased?.label || 'เช่า',
          labelEn: areaOverride.statusColors.leased?.labelEn || 'Leased',
          icon: areaOverride.statusIcons?.['leased'] || '',
        };
        this.areaStatusConfig['vacant'] = {
          color: areaOverride.statusColors.vacant?.color || '#80E08E',
          label: areaOverride.statusColors.vacant?.label || 'ว่าง',
          labelEn: areaOverride.statusColors.vacant?.labelEn || 'Vacant',
          icon: areaOverride.statusIcons?.['vacant'] || '',
        };
      }
    } else if (this.selectedModule === 'facilitiesUtilities') {
      const facilitiesOverride = this.config.moduleOverrides?.facilitiesUtilities;
      if (facilitiesOverride?.chips) {
        // Convert chips object to array for easier management
        const chips = facilitiesOverride.chips;
        this.facilitiesChipItems = [
          { id: 'electricity', type: 'electricity', color: chips.electricity?.color || '#FFD700', label: chips.electricity?.label || 'ไฟฟ้า', icon: chips.electricity?.icon || 'pi-bolt', enabled: true, order: 0 },
          { id: 'water', type: 'water', color: chips.water?.color || '#4CA3FF', label: chips.water?.label || 'น้ำ', icon: chips.water?.icon || 'pi-droplet', enabled: true, order: 1 },
          { id: 'gas', type: 'gas', color: chips.gas?.color || '#FF6384', label: chips.gas?.label || 'แก๊ส', icon: chips.gas?.icon || 'pi-fire', enabled: true, order: 2 },
          { id: 'ac', type: 'ac', color: chips.ac?.color || '#80E08E', label: chips.ac?.label || 'แอร์', icon: chips.ac?.icon || 'pi-sun', enabled: true, order: 3 },
        ];
      } else {
        // Default items if no config
        this.facilitiesChipItems = [
          { id: 'electricity', type: 'electricity', color: '#FFD700', label: 'ไฟฟ้า', icon: 'pi-bolt', enabled: true, order: 0 },
          { id: 'water', type: 'water', color: '#4CA3FF', label: 'น้ำ', icon: 'pi-droplet', enabled: true, order: 1 },
          { id: 'gas', type: 'gas', color: '#FF6384', label: 'แก๊ส', icon: 'pi-fire', enabled: true, order: 2 },
          { id: 'ac', type: 'ac', color: '#80E08E', label: 'แอร์', icon: 'pi-sun', enabled: true, order: 3 },
        ];
      }
      this.facilitiesRentableItems = facilitiesOverride?.rentableItems || [];
    }
  }

  onModuleSettingsChange(): void {
    // This is called automatically on input changes
    this.saveModuleSettingsInternal();
  }

  private saveModuleSettingsInternal(): void {
    if (!this.selectedModule) {
      return;
    }

    if (!this.config.moduleOverrides) {
      this.config.moduleOverrides = {};
    }

    if (this.selectedModule === 'areaAvailability') {
      this.config.moduleOverrides.areaAvailability = {
        statusColors: {
          unallocated: {
            color: this.areaStatusConfig['unallocated'].color,
            label: this.areaStatusConfig['unallocated'].label,
            labelEn: this.areaStatusConfig['unallocated'].labelEn,
          },
          quotation: {
            color: this.areaStatusConfig['quotation'].color,
            label: this.areaStatusConfig['quotation'].label,
            labelEn: this.areaStatusConfig['quotation'].labelEn,
          },
          leased: {
            color: this.areaStatusConfig['leased'].color,
            label: this.areaStatusConfig['leased'].label,
            labelEn: this.areaStatusConfig['leased'].labelEn,
          },
          vacant: {
            color: this.areaStatusConfig['vacant'].color,
            label: this.areaStatusConfig['vacant'].label,
            labelEn: this.areaStatusConfig['vacant'].labelEn,
          },
        },
        statusIcons: {
          unallocated: this.areaStatusConfig['unallocated'].icon,
          quotation: this.areaStatusConfig['quotation'].icon,
          leased: this.areaStatusConfig['leased'].icon,
          vacant: this.areaStatusConfig['vacant'].icon,
        },
      };
    } else if (this.selectedModule === 'facilitiesUtilities') {
      // Convert array back to chips object for storage
      const chips: Record<string, { color: string; label: string; icon: string }> = {};
      this.facilitiesChipItems.forEach(item => {
        if (item.enabled) {
          chips[item.type] = {
            color: item.color,
            label: item.label,
            icon: item.icon || '',
          };
        }
      });
      this.config.moduleOverrides.facilitiesUtilities = { 
        chips,
        rentableItems: this.facilitiesRentableItems,
      };
    }

    saveUiConfig(this.config);
    this.lastSavedConfig = cloneConfig(this.config);
    this.showSaveStatus('Saved');
  }

  onIconUpload(event: Event, statusKey: string): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const dataURL = e.target?.result as string;
          (this.areaStatusConfig as any)[statusKey].icon = dataURL;
          this.onModuleSettingsChange();
        };
        reader.readAsDataURL(file);
      }
    }
  }

  onRentableItemIconUpload(event: Event, item: AreaRentableItem): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const dataURL = e.target?.result as string;
          item.icon = dataURL;
          this.onModuleSettingsChange();
        };
        reader.readAsDataURL(file);
      }
    }
  }

  addRentableItem(): void {
    const newItem: AreaRentableItem = {
      id: `item-${Date.now()}`,
      name: '',
      color: '#667eea',
      enabled: true,
      order: this.facilitiesRentableItems.length,
    };
    this.facilitiesRentableItems.push(newItem);
    this.editingRentableItem = newItem;
    this.onModuleSettingsChange();
  }

  removeRentableItem(item: AreaRentableItem): void {
    const index = this.facilitiesRentableItems.indexOf(item);
    if (index > -1) {
      this.facilitiesRentableItems.splice(index, 1);
      // Reorder
      this.facilitiesRentableItems.forEach((it, idx) => {
        it.order = idx;
      });
      this.onModuleSettingsChange();
    }
  }

  moveRentableItem(item: AreaRentableItem, direction: 'up' | 'down'): void {
    const index = this.facilitiesRentableItems.indexOf(item);
    if (direction === 'up' && index > 0) {
      [this.facilitiesRentableItems[index], this.facilitiesRentableItems[index - 1]] = [
        this.facilitiesRentableItems[index - 1],
        this.facilitiesRentableItems[index],
      ];
      this.facilitiesRentableItems.forEach((it, idx) => {
        it.order = idx;
      });
      this.onModuleSettingsChange();
    } else if (direction === 'down' && index < this.facilitiesRentableItems.length - 1) {
      [this.facilitiesRentableItems[index], this.facilitiesRentableItems[index + 1]] = [
        this.facilitiesRentableItems[index + 1],
        this.facilitiesRentableItems[index],
      ];
      this.facilitiesRentableItems.forEach((it, idx) => {
        it.order = idx;
      });
      this.onModuleSettingsChange();
    }
  }

  onSettingsChange(): void {
    if (this.config.paletteMode === 'preset') {
      this.config.tokens = resolveTokens(this.config);
    }
    saveUiConfig(this.config);
    applyUiConfig(this.config);
    this.lastSavedConfig = cloneConfig(this.config);
    this.showSaveStatus('Saved');
  }

  selectPreset(preset: UiPreset): void {
    this.config.paletteMode = 'preset';
    this.config.activePresetId = preset.id;
    this.config.tokens = resolveTokens(this.config);
    this.onSettingsChange();
  }

  onTokenChange(): void {
    this.config.paletteMode = 'custom';
    this.config.activePresetId = null;
    this.onSettingsChange();
  }

  onStatusTokenChange(): void {
    this.config.statusMode = 'custom';
    this.config.activeStatusPresetId = null;
    this.onTokenChange();
  }

  selectStatusPreset(preset: UiStatusPreset): void {
    this.config.statusMode = 'preset';
    this.config.activeStatusPresetId = preset.id;
    this.config.tokens = {
      ...this.config.tokens,
      ...preset.tokens,
    };
    this.onSettingsChange();
  }

  resetToDefault(): void {
    // Reset global theme settings
    this.config = cloneConfig(DEFAULT_UI_CONFIG);
    this.config.themeMode = DEFAULT_UI_CONFIG.themeMode;
    this.config.paletteMode = DEFAULT_UI_CONFIG.paletteMode;
    this.config.activePresetId = DEFAULT_UI_CONFIG.activePresetId;
    this.config.statusMode = DEFAULT_UI_CONFIG.statusMode;
    this.config.activeStatusPresetId = DEFAULT_UI_CONFIG.activeStatusPresetId;
    this.config.tokens = resolveTokens(this.config);
    
    // Clear all module overrides
    this.config.moduleOverrides = {};
    
    // Reset module-specific configs
    this.areaStatusConfig = JSON.parse(JSON.stringify(this.defaultAreaStatusConfig));
    this.facilitiesChipItems = [
      { id: 'electricity', type: 'electricity', color: '#FFD700', label: 'ไฟฟ้า', icon: 'pi-bolt', enabled: true, order: 0 },
      { id: 'water', type: 'water', color: '#4CA3FF', label: 'น้ำ', icon: 'pi-circle', enabled: true, order: 1 },
      { id: 'gas', type: 'gas', color: '#FF6384', label: 'แก๊ส', icon: 'pi-circle', enabled: true, order: 2 },
      { id: 'ac', type: 'ac', color: '#80E08E', label: 'แอร์', icon: 'pi-snowflake', enabled: true, order: 3 },
    ];
    this.facilitiesRentableItems = [];
    
    // Save and apply
    saveUiConfig(this.config);
    applyUiConfig(this.config);
    this.lastSavedConfig = cloneConfig(this.config);
    
    // Reload module configs to reflect reset
    this.loadModuleConfigs();
    
    this.showSaveStatus('Reset to default');
  }

  cancelChanges(): void {
    this.config = cloneConfig(this.lastSavedConfig);
    applyUiConfig(this.config);
  }

  setSelectedElement(label: string): void {
    this.selectedElement = label;
  }

  private syncPresetTokens(): void {
    if (this.config.paletteMode === 'preset') {
      this.config.tokens = resolveTokens(this.config);
    }
  }

  private showSaveStatus(message: string): void {
    this.saveStatus = message;
    if (this.saveStatusTimer) {
      clearTimeout(this.saveStatusTimer);
    }
    this.saveStatusTimer = setTimeout(() => {
      this.saveStatus = '';
    }, 2000);
  }

  trackByItemId(index: number, item: AreaRentableItem): string {
    return item.id;
  }

  trackByIconIndex(index: number, icon: { name: string; class: string; category: string }): string {
    return icon.class;
  }

  startEditingIconName(index: number): void {
    this.editingIconName = { index, originalName: this.iconLibrary[index].name };
  }

  saveIconName(index: number): void {
    if (this.editingIconName && this.editingIconName.index === index) {
      // Name is already updated via ngModel
      this.editingIconName = null;
    }
  }

  cancelEditingIconName(): void {
    if (this.editingIconName) {
      this.iconLibrary[this.editingIconName.index].name = this.editingIconName.originalName;
      this.editingIconName = null;
    }
  }

  isEditingIcon(index: number): boolean {
    return this.editingIconName?.index === index;
  }

  getIconCategories(): string[] {
    const categories = new Set(this.iconLibrary.map(icon => icon.category));
    return Array.from(categories);
  }

  getIconsByCategory(category: string): Array<{ name: string; class: string; category: string; editable?: boolean }> {
    return this.iconLibrary.filter(icon => icon.category === category);
  }

  getIconIndex(icon: { name: string; class: string; category: string }): number {
    return this.iconLibrary.findIndex(i => i.class === icon.class);
  }

  // Icon picker methods
  openIconPicker(module: string, itemId: string, field: string): void {
    this.showIconPicker = { module, itemId, field };
    // Set default category based on context
    if (module === 'areaAvailability' && field.startsWith('status_')) {
      this.selectedIconCategory = 'Status';
    } else if (module === 'facilitiesUtilities') {
      if (field === 'rentable') {
        this.selectedIconCategory = 'Rentable';
      } else {
        this.selectedIconCategory = 'Utilities';
      }
    } else {
      this.selectedIconCategory = '';
    }
  }

  closeIconPicker(): void {
    this.showIconPicker = null;
    this.selectedIconCategory = '';
    this.editingIconName = null;
  }

  selectIcon(iconClass: string): void {
    if (!this.showIconPicker) return;
    
    const { module, itemId, field } = this.showIconPicker;
    
    if (module === 'areaAvailability') {
      if (field.startsWith('status_')) {
        const statusKey = field.replace('status_', '') as keyof typeof this.areaStatusConfig;
        (this.areaStatusConfig[statusKey] as any).icon = iconClass;
      }
    } else if (module === 'facilitiesUtilities') {
      if (field === 'rentable') {
        const item = this.facilitiesRentableItems.find(i => i.id === itemId);
        if (item) item.icon = iconClass;
      } else {
        const item = this.facilitiesChipItems.find(i => i.id === itemId);
        if (item) item.icon = iconClass;
      }
    }
    
    this.onModuleSettingsChange();
    this.closeIconPicker();
  }

  // Facilities item management
  addFacilitiesItem(): void {
    const newItem: typeof this.facilitiesChipItems[0] = {
      id: `facility-${Date.now()}`,
      type: `new-type-${Date.now()}`,
      color: '#667eea',
      label: 'ประเภทใหม่',
      icon: 'pi-circle',
      enabled: true,
      order: this.facilitiesChipItems.length,
    };
    this.facilitiesChipItems.push(newItem);
    this.onModuleSettingsChange();
  }

  removeFacilitiesItem(item: typeof this.facilitiesChipItems[0]): void {
    const index = this.facilitiesChipItems.indexOf(item);
    if (index > -1) {
      this.facilitiesChipItems.splice(index, 1);
      this.facilitiesChipItems.forEach((it, idx) => {
        it.order = idx;
      });
      this.onModuleSettingsChange();
    }
  }

  moveFacilitiesItem(item: typeof this.facilitiesChipItems[0], direction: 'up' | 'down'): void {
    const index = this.facilitiesChipItems.indexOf(item);
    if (direction === 'up' && index > 0) {
      [this.facilitiesChipItems[index], this.facilitiesChipItems[index - 1]] = [
        this.facilitiesChipItems[index - 1],
        this.facilitiesChipItems[index],
      ];
      this.facilitiesChipItems.forEach((it, idx) => {
        it.order = idx;
      });
      this.onModuleSettingsChange();
    } else if (direction === 'down' && index < this.facilitiesChipItems.length - 1) {
      [this.facilitiesChipItems[index], this.facilitiesChipItems[index + 1]] = [
        this.facilitiesChipItems[index + 1],
        this.facilitiesChipItems[index],
      ];
      this.facilitiesChipItems.forEach((it, idx) => {
        it.order = idx;
      });
      this.onModuleSettingsChange();
    }
  }

  isIconDataUrl(icon: string | undefined): boolean {
    if (!icon) return false;
    return icon.startsWith('data:') || icon.startsWith('http');
  }

  trackByStatusKey(index: number, status: { key: string; label: string; defaultColor: string }): string {
    return status.key;
  }

  trackByFacilityId(index: number, item: typeof this.facilitiesChipItems[0]): string {
    return item.id;
  }

  getContrastColor(hexColor: string): string {
    // Remove # if present
    const color = hexColor.replace('#', '');
    // Convert to RGB
    const r = parseInt(color.substr(0, 2), 16);
    const g = parseInt(color.substr(2, 2), 16);
    const b = parseInt(color.substr(4, 2), 16);
    // Calculate luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    // Return white or black based on luminance
    return luminance > 0.5 ? '#000000' : '#FFFFFF';
  }

  // Helper methods for template type safety
  getStatusConfig(key: string): { color: string; label: string; labelEn?: string; icon: string } {
    return this.areaStatusConfig[key] || { color: '#667eea', label: '', icon: '' };
  }

  getStatusColor(key: string): string {
    return this.getStatusConfig(key).color;
  }

  getStatusLabel(key: string): string {
    return this.getStatusConfig(key).label;
  }

  getStatusLabelEn(key: string): string {
    return this.getStatusConfig(key).labelEn || '';
  }

  getStatusIcon(key: string): string {
    return this.getStatusConfig(key).icon;
  }

  setStatusColor(key: string, color: string): void {
    if (this.areaStatusConfig[key]) {
      this.areaStatusConfig[key].color = color;
      this.onModuleSettingsChange();
    }
  }

  setStatusLabel(key: string, label: string): void {
    if (this.areaStatusConfig[key]) {
      this.areaStatusConfig[key].label = label;
      this.onModuleSettingsChange();
    }
  }

  setStatusLabelEn(key: string, labelEn: string): void {
    if (this.areaStatusConfig[key]) {
      this.areaStatusConfig[key].labelEn = labelEn;
      this.onModuleSettingsChange();
    }
  }

  setStatusIcon(key: string, icon: string): void {
    if (this.areaStatusConfig[key]) {
      this.areaStatusConfig[key].icon = icon;
      this.onModuleSettingsChange();
    }
  }

  // Save module settings explicitly
  saveModuleSettings(): void {
    this.saveModuleSettingsInternal();
    this.showSaveStatus('Saved successfully');
  }

  // Reset module to default values
  resetModuleToDefault(): void {
    if (!this.selectedModule) {
      return;
    }

    if (this.selectedModule === 'areaAvailability') {
      // Reset Area Availability to default
      this.areaStatusConfig = JSON.parse(JSON.stringify(this.defaultAreaStatusConfig));
      
      // Clear module overrides for areaAvailability
      if (this.config.moduleOverrides) {
        delete this.config.moduleOverrides.areaAvailability;
      }
    } else if (this.selectedModule === 'facilitiesUtilities') {
      // Reset Facilities to default
      this.facilitiesChipItems = [
        { id: 'electricity', type: 'electricity', color: '#FFD700', label: 'ไฟฟ้า', icon: 'pi-bolt', enabled: true, order: 0 },
        { id: 'water', type: 'water', color: '#4CA3FF', label: 'น้ำ', icon: 'pi-circle', enabled: true, order: 1 },
        { id: 'gas', type: 'gas', color: '#FF6384', label: 'แก๊ส', icon: 'pi-circle', enabled: true, order: 2 },
        { id: 'ac', type: 'ac', color: '#80E08E', label: 'แอร์', icon: 'pi-snowflake', enabled: true, order: 3 },
      ];
      this.facilitiesRentableItems = [];
      
      // Clear module overrides for facilitiesUtilities
      if (this.config.moduleOverrides) {
        delete this.config.moduleOverrides.facilitiesUtilities;
      }
    }

    // Save the reset config
    saveUiConfig(this.config);
    applyUiConfig(this.config);
    this.lastSavedConfig = cloneConfig(this.config);
    
    // Reload module configs to reflect the reset
    this.loadModuleConfigs();
    
    this.showSaveStatus('Reset to default');
  }
}

const cloneConfig = (config: UiConfig): UiConfig =>
  JSON.parse(JSON.stringify(config)) as UiConfig;
