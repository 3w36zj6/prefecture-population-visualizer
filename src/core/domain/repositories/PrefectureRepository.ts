import { Prefecture } from "../models/Prefecture";

export interface PrefectureRepository {
  getPrefectures(): Promise<Prefecture[]>;
}
