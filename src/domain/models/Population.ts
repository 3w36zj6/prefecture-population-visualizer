export interface PopulationCompositionPerYear {
  boundaryYear: number;
  totalPopulation: PopulationCompositionPerYearValue[];
  youngPopulation: PopulationCompositionPerYearValue[];
  productiveAgePopulation: PopulationCompositionPerYearValue[];
  elderlyPopulation: PopulationCompositionPerYearValue[];
}

export interface PopulationCompositionPerYearValue {
  year: number;
  value: number;
  rate?: number;
}
