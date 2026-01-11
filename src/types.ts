export enum Category {
  SHOES = 'SHOES',
  CLOTHING = 'CLOTHING'
}

export enum Gender {
  MEN = 'MEN',
  WOMEN = 'WOMEN',
  KIDS = 'KIDS',       // 0-7 years
  JUNIORS = 'JUNIORS'  // 8-14 years
}

export interface SizeData {
  us: string | number;
  uk: string | number;
  eu: string | number;
  kr: string | number; // mm for shoes
  jp: string | number; // cm for shoes
}

export interface ConversionResult {
  region: string;
  size: string | number;
}

// Approximate body measurements for clothing logic (in mm)
// Chest Width (Half), Total Length (Top)
export interface ClothingMeasurement {
  sizeKey: string; // matches US size in CLOTHING_SIZES
  chestWidthMm: number; // 단면
  totalLengthMm: number; // 총장
  shoulderWidthMm: number; // 어깨 너비
  sleeveLengthMm: number; // 소매 길이
}