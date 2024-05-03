import { PopulationUseCase } from "../application/PopulationUseCase";
import { PopulationCompositionPerYear } from "../domain/models/Population";
import { PopulationRepositoryImpl } from "../infrastructure/repositories/PopulationRepositoryImpl";

export class PopulationController {
  private populationUseCase: PopulationUseCase;
  constructor() {
    this.populationUseCase = new PopulationUseCase(
      new PopulationRepositoryImpl(),
    );
  }
  async getPopulationCompositionPerYear(
    prefCode: string,
    cityCode?: string,
  ): Promise<PopulationCompositionPerYear> {
    return await this.populationUseCase.getPopulationCompositionPerYear(
      prefCode,
      cityCode,
    );
  }
}
