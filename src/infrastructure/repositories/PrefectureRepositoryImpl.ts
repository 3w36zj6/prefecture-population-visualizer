import { Prefecture } from "../../domain/models/Prefecture";
import { PrefectureRepository } from "../../domain/repositories/PrefectureRepository";
import { fetchResasAPI } from "../api/fetchResasAPI";

export class PrefectureRepositoryImpl implements PrefectureRepository {
  async getPrefectures(): Promise<Prefecture[]> {
    const prefectures = await fetchResasAPI("api/v1/prefectures");
    return prefectures;
  }
}
