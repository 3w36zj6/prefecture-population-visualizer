export type PopulationCategory =
  | "総人口"
  | "年少人口"
  | "生産年齢人口"
  | "老年人口";

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
