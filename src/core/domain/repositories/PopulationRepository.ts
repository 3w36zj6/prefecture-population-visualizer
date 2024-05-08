import { PopulationCompositionPerYear } from "../models/Population";

export interface PopulationRepository {
  getPopulationCompositionPerYear(
    prefCode: number,
    cityCode?: string,
  ): Promise<PopulationCompositionPerYear>;
}
