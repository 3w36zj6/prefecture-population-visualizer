import { PopulationCompositionPerYear } from "../../domain/models/Population";
import { PopulationRepository } from "../../domain/repositories/PopulationRepository";
import { fetchResasAPI } from "../api/fetchResasAPI";

type PopulationCompositionPerYearAPIResponse = {
  boundaryYear: number;
  data: {
    label: string;
    data: {
      year: number;
      value: number;
      rate?: number;
    }[];
  }[];
};

export class PopulationRepositoryImpl implements PopulationRepository {
  async getPopulationCompositionPerYear(
    prefCode: string,
    cityCode: string = "-",
  ): Promise<PopulationCompositionPerYear> {
    const apiResponse: PopulationCompositionPerYearAPIResponse =
      await fetchResasAPI(
        `api/v1/population/composition/perYear?prefCode=${prefCode}&cityCode=${cityCode}`,
      );
    const populationCompositionPerYear = {
      boundaryYear: apiResponse.boundaryYear,
      totalPopulation:
        apiResponse.data.find((data) => data.label === "総人口")?.data || [],
      youngPopulation:
        apiResponse.data.find((data) => data.label === "年少人口")?.data || [],
      productiveAgePopulation:
        apiResponse.data.find((data) => data.label === "生産年齢人口")?.data ||
        [],
      elderlyPopulation:
        apiResponse.data.find((data) => data.label === "老年人口")?.data || [],
    } satisfies PopulationCompositionPerYear;
    return populationCompositionPerYear;
  }
}
