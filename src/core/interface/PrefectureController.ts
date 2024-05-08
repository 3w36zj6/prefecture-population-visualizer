import { PrefectureUseCase } from "../application/PrefectureUseCase";
import { Prefecture } from "../domain/models/Prefecture";
import { PrefectureRepositoryImpl } from "../infrastructure/repositories/PrefectureRepositoryImpl";

export class PrefectureController {
  private prefectureUseCase: PrefectureUseCase;
  constructor() {
    this.prefectureUseCase = new PrefectureUseCase(
      new PrefectureRepositoryImpl(),
    );
  }
  async getPrefectures(): Promise<Prefecture[]> {
    return await this.prefectureUseCase.getPrefectures();
  }
}
