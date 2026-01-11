import { SizeData, ClothingMeasurement, Gender } from './types';

// ==========================================
// SHOES DATASETS
// ==========================================

export const SHOES_MEN: SizeData[] = [
  { us: 6, uk: 5.5, eu: 38.5, kr: 240, jp: 24 },
  { us: 6.5, uk: 6, eu: 39, kr: 245, jp: 24.5 },
  { us: 7, uk: 6, eu: 40, kr: 250, jp: 25 },
  { us: 7.5, uk: 6.5, eu: 40.5, kr: 255, jp: 25.5 },
  { us: 8, uk: 7, eu: 41, kr: 260, jp: 26 },
  { us: 8.5, uk: 7.5, eu: 42, kr: 265, jp: 26.5 },
  { us: 9, uk: 8, eu: 42.5, kr: 270, jp: 27 },
  { us: 9.5, uk: 8.5, eu: 43, kr: 275, jp: 27.5 },
  { us: 10, uk: 9, eu: 44, kr: 280, jp: 28 },
  { us: 10.5, uk: 9.5, eu: 44.5, kr: 285, jp: 28.5 },
  { us: 11, uk: 10, eu: 45, kr: 290, jp: 29 },
  { us: 11.5, uk: 10.5, eu: 45.5, kr: 295, jp: 29.5 },
  { us: 12, uk: 11, eu: 46, kr: 300, jp: 30 },
  { us: 13, uk: 12, eu: 47.5, kr: 310, jp: 31 },
  { us: 14, uk: 13, eu: 48.5, kr: 320, jp: 32 },
];

export const SHOES_WOMEN: SizeData[] = [
  { us: 5, uk: 2.5, eu: 35.5, kr: 220, jp: 22 },
  { us: 5.5, uk: 3, eu: 36, kr: 225, jp: 22.5 },
  { us: 6, uk: 3.5, eu: 36.5, kr: 230, jp: 23 },
  { us: 6.5, uk: 4, eu: 37.5, kr: 235, jp: 23.5 },
  { us: 7, uk: 4.5, eu: 38, kr: 240, jp: 24 },
  { us: 7.5, uk: 5, eu: 38.5, kr: 245, jp: 24.5 },
  { us: 8, uk: 5.5, eu: 39, kr: 250, jp: 25 },
  { us: 8.5, uk: 6, eu: 40, kr: 255, jp: 25.5 },
  { us: 9, uk: 6.5, eu: 40.5, kr: 260, jp: 26 },
  { us: 9.5, uk: 7, eu: 41, kr: 265, jp: 26.5 },
  { us: 10, uk: 7.5, eu: 42, kr: 270, jp: 27 },
  { us: 10.5, uk: 8, eu: 42.5, kr: 275, jp: 27.5 },
  { us: 11, uk: 8.5, eu: 43, kr: 280, jp: 28 },
];

// Toddler & Little Kid (0-7 Years)
export const SHOES_KIDS: SizeData[] = [
  { us: '2C', uk: 1.5, eu: 17, kr: 80, jp: 8 },
  { us: '3C', uk: 2.5, eu: 18.5, kr: 90, jp: 9 },
  { us: '4C', uk: 3.5, eu: 19.5, kr: 100, jp: 10 },
  { us: '5C', uk: 4.5, eu: 21, kr: 110, jp: 11 },
  { us: '6C', uk: 5.5, eu: 22, kr: 120, jp: 12 },
  { us: '7C', uk: 6.5, eu: 23.5, kr: 130, jp: 13 },
  { us: '8C', uk: 7.5, eu: 25, kr: 140, jp: 14 },
  { us: '9C', uk: 8.5, eu: 26, kr: 150, jp: 15 },
  { us: '10C', uk: 9.5, eu: 27, kr: 160, jp: 16 },
  { us: '11C', uk: 10.5, eu: 28, kr: 170, jp: 17 },
  { us: '12C', uk: 11.5, eu: 29.5, kr: 180, jp: 18 },
  { us: '13C', uk: 12.5, eu: 31, kr: 190, jp: 19 },
];

// Big Kid (8-14 Years)
export const SHOES_JUNIORS: SizeData[] = [
  { us: '1Y', uk: 13.5, eu: 32, kr: 200, jp: 20 },
  { us: '1.5Y', uk: 1, eu: 33, kr: 205, jp: 20.5 },
  { us: '2Y', uk: 1.5, eu: 33.5, kr: 210, jp: 21 },
  { us: '2.5Y', uk: 2, eu: 34, kr: 215, jp: 21.5 },
  { us: '3Y', uk: 2.5, eu: 35, kr: 220, jp: 22 },
  { us: '3.5Y', uk: 3, eu: 35.5, kr: 225, jp: 22.5 },
  { us: '4Y', uk: 3.5, eu: 36, kr: 230, jp: 23 },
  { us: '4.5Y', uk: 4, eu: 36.5, kr: 235, jp: 23.5 },
  { us: '5Y', uk: 4.5, eu: 37.5, kr: 235, jp: 23.5 }, // Overlap starts here
  { us: '5.5Y', uk: 5, eu: 38, kr: 240, jp: 24 },
  { us: '6Y', uk: 5.5, eu: 38.5, kr: 240, jp: 24 },
  { us: '6.5Y', uk: 6, eu: 39, kr: 245, jp: 24.5 },
  { us: '7Y', uk: 6, eu: 40, kr: 250, jp: 25 },
];


// ==========================================
// CLOTHING DATASETS
// ==========================================

export const CLOTHING_MEN: SizeData[] = [
  { us: 'XS', uk: '32-34', eu: '42', kr: '90', jp: 'XS' },
  { us: 'S', uk: '34-36', eu: '44-46', kr: '95', jp: 'S' },
  { us: 'M', uk: '38-40', eu: '48-50', kr: '100', jp: 'M' },
  { us: 'L', uk: '42-44', eu: '52-54', kr: '105', jp: 'L' },
  { us: 'XL', uk: '46-48', eu: '56-58', kr: '110', jp: 'XL' },
  { us: 'XXL', uk: '50-52', eu: '60-62', kr: '115', jp: 'XXL' },
  { us: '3XL', uk: '54-56', eu: '64-66', kr: '120', jp: '3XL' },
];

export const CLOTHING_WOMEN: SizeData[] = [
  { us: 'XS (0-2)', uk: '4-6', eu: '32-34', kr: '80 (44)', jp: '5-7' },
  { us: 'S (4-6)', uk: '8-10', eu: '36-38', kr: '85 (55)', jp: '9' },
  { us: 'M (8-10)', uk: '12-14', eu: '40-42', kr: '90 (66)', jp: '11' },
  { us: 'L (12-14)', uk: '16-18', eu: '44-46', kr: '95 (77)', jp: '13' },
  { us: 'XL (16-18)', uk: '20-22', eu: '48-50', kr: '100 (88)', jp: '15' },
  { us: 'XXL (20)', uk: '24', eu: '52', kr: '105 (99)', jp: '17' },
];

export const CLOTHING_KIDS: SizeData[] = [
  { us: '2T', uk: '2-3Y', eu: '92', kr: '100', jp: '90' },
  { us: '3T', uk: '3-4Y', eu: '98', kr: '110', jp: '100' },
  { us: '4T', uk: '4-5Y', eu: '104-110', kr: '120', jp: '110' },
  { us: '5', uk: '5-6Y', eu: '110-116', kr: '130', jp: '120' },
  { us: '6-7', uk: '6-7Y', eu: '116-122', kr: '140', jp: '130' },
];

export const CLOTHING_JUNIORS: SizeData[] = [
  { us: 'S (8)', uk: '8Y', eu: '128', kr: '145', jp: '135' },
  { us: 'M (10-12)', uk: '10-12Y', eu: '140-152', kr: '155', jp: '150' },
  { us: 'L (14-16)', uk: '14-16Y', eu: '158-164', kr: '165', jp: '160' },
  { us: 'XL (18)', uk: '16Y+', eu: '170', kr: '170', jp: '170' },
];


// ==========================================
// MEASUREMENT MAPPING
// ==========================================

export const MEASUREMENTS_MEN_CLOTHING: ClothingMeasurement[] = [
  { sizeKey: 'XS', chestWidthMm: 480, totalLengthMm: 660, shoulderWidthMm: 420, sleeveLengthMm: 590 },
  { sizeKey: 'S', chestWidthMm: 500, totalLengthMm: 680, shoulderWidthMm: 440, sleeveLengthMm: 600 },
  { sizeKey: 'M', chestWidthMm: 520, totalLengthMm: 700, shoulderWidthMm: 460, sleeveLengthMm: 610 },
  { sizeKey: 'L', chestWidthMm: 550, totalLengthMm: 720, shoulderWidthMm: 480, sleeveLengthMm: 620 },
  { sizeKey: 'XL', chestWidthMm: 580, totalLengthMm: 740, shoulderWidthMm: 500, sleeveLengthMm: 630 },
  { sizeKey: 'XXL', chestWidthMm: 610, totalLengthMm: 760, shoulderWidthMm: 520, sleeveLengthMm: 640 },
];

export const MEASUREMENTS_WOMEN_CLOTHING: ClothingMeasurement[] = [
  { sizeKey: 'XS (0-2)', chestWidthMm: 400, totalLengthMm: 560, shoulderWidthMm: 340, sleeveLengthMm: 550 },
  { sizeKey: 'S (4-6)', chestWidthMm: 420, totalLengthMm: 580, shoulderWidthMm: 350, sleeveLengthMm: 560 },
  { sizeKey: 'M (8-10)', chestWidthMm: 440, totalLengthMm: 600, shoulderWidthMm: 360, sleeveLengthMm: 570 },
  { sizeKey: 'L (12-14)', chestWidthMm: 460, totalLengthMm: 620, shoulderWidthMm: 370, sleeveLengthMm: 580 },
  { sizeKey: 'XL (16-18)', chestWidthMm: 480, totalLengthMm: 640, shoulderWidthMm: 380, sleeveLengthMm: 590 },
];

// Kids averages (based on height/weight correlations standardized)
export const MEASUREMENTS_KIDS_CLOTHING: ClothingMeasurement[] = [
  { sizeKey: '2T', chestWidthMm: 300, totalLengthMm: 380, shoulderWidthMm: 240, sleeveLengthMm: 320 },
  { sizeKey: '3T', chestWidthMm: 310, totalLengthMm: 400, shoulderWidthMm: 250, sleeveLengthMm: 340 },
  { sizeKey: '4T', chestWidthMm: 320, totalLengthMm: 420, shoulderWidthMm: 260, sleeveLengthMm: 360 },
  { sizeKey: '5', chestWidthMm: 330, totalLengthMm: 440, shoulderWidthMm: 270, sleeveLengthMm: 380 },
  { sizeKey: '6-7', chestWidthMm: 340, totalLengthMm: 470, shoulderWidthMm: 280, sleeveLengthMm: 410 },
];

export const MEASUREMENTS_JUNIORS_CLOTHING: ClothingMeasurement[] = [
  { sizeKey: 'S (8)', chestWidthMm: 360, totalLengthMm: 520, shoulderWidthMm: 300, sleeveLengthMm: 450 },
  { sizeKey: 'M (10-12)', chestWidthMm: 400, totalLengthMm: 580, shoulderWidthMm: 340, sleeveLengthMm: 510 },
  { sizeKey: 'L (14-16)', chestWidthMm: 440, totalLengthMm: 640, shoulderWidthMm: 380, sleeveLengthMm: 570 },
  { sizeKey: 'XL (18)', chestWidthMm: 470, totalLengthMm: 680, shoulderWidthMm: 410, sleeveLengthMm: 610 },
];

export const REGIONS = [
  { id: 'us', label: 'US' },
  { id: 'uk', label: 'UK' },
  { id: 'eu', label: 'EU' },
  { id: 'kr', label: 'KR' },
  { id: 'jp', label: 'JP' },
];

// Helper to get data by category and gender
export const getDataset = (category: string, gender: Gender): SizeData[] => {
    if (category === 'SHOES') {
        switch(gender) {
            case Gender.MEN: return SHOES_MEN;
            case Gender.WOMEN: return SHOES_WOMEN;
            case Gender.KIDS: return SHOES_KIDS;
            case Gender.JUNIORS: return SHOES_JUNIORS;
            default: return SHOES_MEN;
        }
    } else {
        switch(gender) {
            case Gender.MEN: return CLOTHING_MEN;
            case Gender.WOMEN: return CLOTHING_WOMEN;
            case Gender.KIDS: return CLOTHING_KIDS;
            case Gender.JUNIORS: return CLOTHING_JUNIORS;
            default: return CLOTHING_MEN;
        }
    }
}

export const getMeasurementDataset = (gender: Gender): ClothingMeasurement[] => {
    switch(gender) {
        case Gender.MEN: return MEASUREMENTS_MEN_CLOTHING;
        case Gender.WOMEN: return MEASUREMENTS_WOMEN_CLOTHING;
        case Gender.KIDS: return MEASUREMENTS_KIDS_CLOTHING;
        case Gender.JUNIORS: return MEASUREMENTS_JUNIORS_CLOTHING;
        default: return MEASUREMENTS_MEN_CLOTHING;
    }
}