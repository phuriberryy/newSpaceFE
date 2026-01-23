import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, output, signal, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AreaDataService, StatusDistribution } from '@core/services/area/area-data.service';
import { AreaStatus } from '@core/models/area.model';
import { getModuleOverride, applyModuleOverrides, AreaAvailabilityOverride, AreaRentableItem, FacilitiesUtilitiesOverride } from '@core/services/ui-settings';

export interface FilterChangeEvent {
  selectedStatuses: AreaStatus[];
}

@Component({
  selector: 'app-area-availability',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './area-availability.component.html',
  styleUrl: './area-availability.component.css'
})
export class AreaAvailabilityComponent implements OnInit, AfterViewInit {
  @ViewChild('containerRef', { static: false }) containerRef?: ElementRef<HTMLElement>;

  mode = input<'per-building' | 'per-floor'>('per-building');

  statusDistribution = signal<StatusDistribution[]>([]);
  selectedStatuses = signal<Set<AreaStatus>>(new Set());

  // Show all 4 statuses (service now returns only 4 statuses, no 'inactive')
  mainStatusDistribution = computed(() => {
    return this.statusDistribution();
  });

  hasSelection = computed(() => this.selectedStatuses().size > 0);

  filterChanged = output<FilterChangeEvent>();

  // Module config
  areaConfig = signal<AreaAvailabilityOverride | undefined>(undefined);
  rentableItems = signal<AreaRentableItem[]>([]);

  constructor(private areaDataService: AreaDataService) {}

  ngOnInit(): void {
    this.loadStatusDistribution();
    this.loadModuleConfig();
  }

  ngAfterViewInit(): void {
    // Apply scoped CSS variables
    if (this.containerRef?.nativeElement) {
      applyModuleOverrides('areaAvailability', this.containerRef.nativeElement);
    }
  }

  private loadModuleConfig(): void {
    const config = getModuleOverride<AreaAvailabilityOverride>('areaAvailability');
    this.areaConfig.set(config);
    
    // Load rentable items from Facilities config instead
    const facilitiesConfig = getModuleOverride<FacilitiesUtilitiesOverride>('facilitiesUtilities');
    this.rentableItems.set(facilitiesConfig?.rentableItems || []);
  }

  getStatusIcon(statusId: AreaStatus): string {
    const config = this.areaConfig();
    const icon = config?.statusIcons?.[statusId];
    if (icon) {
      // If it's a dataURL, return it; otherwise it's an icon class
      if (icon.startsWith('data:') || icon.startsWith('http')) {
        return icon;
      }
      return icon; // Icon class
    }
    return 'pi-building'; // Default fallback
  }

  isIconDataUrl(icon: string): boolean {
    return icon.startsWith('data:') || icon.startsWith('http');
  }

  private loadStatusDistribution(): void {
    const building = this.areaDataService.building();
    if (!building.floors || building.floors.length === 0) {
      console.warn('No floors available');
      return;
    }

    if (this.mode() === 'per-building') {
      // Aggregate all floors
      const distribution = this.areaDataService.getBuildingStatusDistribution();
      this.statusDistribution.set(distribution);
    } else {
      // Per-floor (for future use)
      const floor = building.floors[0];
      const distribution = this.areaDataService.getStatusDistribution(floor);
      this.statusDistribution.set(distribution);
    }
  }

  toggleFilter(statusId: AreaStatus): void {
    const current = new Set(this.selectedStatuses());
    if (current.has(statusId)) {
      current.delete(statusId);
    } else {
      current.add(statusId);
    }
    this.selectedStatuses.set(current);
    this.emitFilterChange();
  }

  isSelected(statusId: AreaStatus): boolean {
    return this.selectedStatuses().has(statusId);
  }

  shouldDim(statusId: AreaStatus): boolean {
    return this.hasSelection() && !this.isSelected(statusId);
  }

  getStatusCardClasses(statusId: AreaStatus): string {
    const classes = ['status-card'];
    if (this.isSelected(statusId)) {
      classes.push('active');
    }
    if (this.shouldDim(statusId)) {
      classes.push('dimmed');
    }
    return classes.join(' ');
  }

  private emitFilterChange(): void {
    this.filterChanged.emit({
      selectedStatuses: Array.from(this.selectedStatuses())
    });
  }

  getBarWidth(status: StatusDistribution): number {
    return status.percentage;
  }

  formatPercentage(percentage: number): string {
    return `${percentage.toFixed(0)}%`;
  }
}
