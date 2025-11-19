export enum ViewType {
  LANDING = 'LANDING',
  BOUNDARIES = 'BOUNDARIES',
  PROXIMITY = 'PROXIMITY',
  INTERACTIVE = 'INTERACTIVE',
  VIRTUAL_STAGING = 'VIRTUAL_STAGING',
}

export interface POI {
  id: string;
  label: string;
  distance: string;
  position: [number, number, number];
  icon?: string;
}

export interface LotInfo {
  id: string;
  price: string;
  size: string;
  status: 'available' | 'sold' | 'reserved';
  position: [number, number, number];
}