import { PopulationCompositionPerYear } from "../domain/models/Population";
import { PopulationRepository } from "../domain/repositories/PopulationRepository";

export class PopulationUseCase {
  constructor(private populationRepository: PopulationRepository) {}

  async getPopulationCompositionPerYear(
    prefCode: number,
    cityCode?: string,
  ): Promise<PopulationCompositionPerYear> {
    return this.populationRepository.getPopulationCompositionPerYear(
      prefCode,
      cityCode,
    );
  }
}
