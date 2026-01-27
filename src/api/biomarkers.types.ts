/**
 * Biomarker high and low reference range
 */
export interface ReferenceRange {
  low: number;
  high: number;
}

/**
 * Biomarker data
 */
export interface Biomarker {
  id: string;
  name: string;
  standardUnit: string;
  referenceRange: ReferenceRange;
  category: string;
  importance: number;
}
