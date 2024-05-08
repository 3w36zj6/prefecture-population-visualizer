import { Prefecture } from "../domain/models/Prefecture";
import { PrefectureRepository } from "../domain/repositories/PrefectureRepository";

export class PrefectureUseCase {
  constructor(private prefectureRepository: PrefectureRepository) {}

  async getPrefectures(): Promise<Prefecture[]> {
    return this.prefectureRepository.getPrefectures();
  }
}
