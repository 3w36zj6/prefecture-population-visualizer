import { PopulationCompositionPerYear } from "../models/Population";

export interface PopulationRepository {
  getPopulationCompositionPerYear(
    prefCode: string,
    cityCode?: string,
  ): Promise<PopulationCompositionPerYear>;
}
