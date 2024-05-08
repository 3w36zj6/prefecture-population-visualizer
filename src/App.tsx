import { useCallback, useEffect, useState } from "react";
import "./App.css";
import reactLogo from "./assets/react.svg";
import PopulationCategoryRadioButtonGroup from "./components/organisms/PopulationCategoryRadioButtonGroup";
import {
  PopulationChart,
  PopulationPlotPoint,
} from "./components/organisms/PopulationChart";
import { PrefectureCheckBoxGroup } from "./components/organisms/PrefectureCheckBoxGroup";
import { PopulationCompositionPerYearValue } from "./core/domain/models/Population";
import { PopulationController } from "./core/interface/PopulationController";
import viteLogo from "/vite.svg";

import { PopulationCategory } from "./core/domain/models/Population";
import { Prefecture } from "./core/domain/models/Prefecture";
import { PrefectureController } from "./core/interface/PrefectureController";

interface CategoryPopulationPlotPoints {
  totalPopulationPlotPoints: PopulationPlotPoint[];
  youngPopulationPlotPoints: PopulationPlotPoint[];
  productiveAgePopulationPlotPoints: PopulationPlotPoint[];
  elderlyPopulationPlotPoints: PopulationPlotPoint[];
}

const App = () => {
  const [count, setCount] = useState(0);
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined,
  );
  const [populationPlotPoints, setPopulationPlotPoints] = useState<
    CategoryPopulationPlotPoints | undefined
  >(undefined);
  const [selectedCategory, setSelectedCategory] =
    useState<PopulationCategory>("総人口");
  const [pendingSelectedCategory, setPendingSelectedCategory] =
    useState<PopulationCategory | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const controller = new PrefectureController();
        const prefectures = await controller.getPrefectures();
        setPrefectures(prefectures);
      } catch (e) {
        if (e instanceof Error) {
          setErrorMessage(e.message);
          // eslint-disable-next-line no-console -- 意図的な標準エラー出力
          console.error(e);
        }
      }
    })();
  }, []);

  useEffect(() => {
    if (pendingSelectedCategory !== null) {
      setSelectedCategory(pendingSelectedCategory);
      setPendingSelectedCategory(null);
    }
  }, [pendingSelectedCategory]);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      {errorMessage && (
        <section>
          <div>
            <p>都道府県一覧の取得に失敗しました。</p>
            <p>{errorMessage}</p>
          </div>
        </section>
      )}
      <section>
        <PrefectureCheckBoxGroup
          prefectures={prefectures}
          onSelectedPrefecturesChange={useCallback(async (prefectures) => {
            const populationController = new PopulationController();
            const populationCompositionPerYearList: {
              prefName: string;
              totalPopulation: PopulationCompositionPerYearValue[];
              youngPopulation: PopulationCompositionPerYearValue[];
              productiveAgePopulation: PopulationCompositionPerYearValue[];
              elderlyPopulation: PopulationCompositionPerYearValue[];
            }[] = [];

            for (const prefecture of prefectures) {
              const population =
                await populationController.getPopulationCompositionPerYear(
                  prefecture.prefCode,
                );
              populationCompositionPerYearList.push({
                prefName: prefecture.prefName,
                totalPopulation: population.totalPopulation,
                youngPopulation: population.youngPopulation,
                productiveAgePopulation: population.productiveAgePopulation,
                elderlyPopulation: population.elderlyPopulation,
              });
            }

            if (populationCompositionPerYearList.length === 0) {
              return;
            }

            const totalPopulationPlotPoints: PopulationPlotPoint[] = [];
            const youngPopulationPlotPoints: PopulationPlotPoint[] = [];
            const productiveAgePopulationPlotPoints: PopulationPlotPoint[] = [];
            const elderlyPopulationPlotPoints: PopulationPlotPoint[] = [];

            for (const index of Array(
              populationCompositionPerYearList[0].totalPopulation.length,
            ).keys()) {
              const totalPopulationPlotPoint: PopulationPlotPoint = {
                year: populationCompositionPerYearList[0].totalPopulation[index]
                  .year,
              };
              const youngPopulationPlotPoint = { ...totalPopulationPlotPoint };
              const productiveAgePopulationPlotPoint = {
                ...totalPopulationPlotPoint,
              };
              const elderlyPopulationPlotPoint = {
                ...totalPopulationPlotPoint,
              };
              for (const {
                prefName,
                totalPopulation,
                youngPopulation,
                productiveAgePopulation,
                elderlyPopulation,
              } of populationCompositionPerYearList) {
                totalPopulationPlotPoint[prefName] =
                  totalPopulation[index].value;
                youngPopulationPlotPoint[prefName] =
                  youngPopulation[index].value;
                productiveAgePopulationPlotPoint[prefName] =
                  productiveAgePopulation[index].value;
                elderlyPopulationPlotPoint[prefName] =
                  elderlyPopulation[index].value;
              }
              totalPopulationPlotPoints.push(totalPopulationPlotPoint);
              youngPopulationPlotPoints.push(youngPopulationPlotPoint);
              productiveAgePopulationPlotPoints.push(
                productiveAgePopulationPlotPoint,
              );
              elderlyPopulationPlotPoints.push(elderlyPopulationPlotPoint);
            }
            setPopulationPlotPoints({
              totalPopulationPlotPoints,
              youngPopulationPlotPoints,
              productiveAgePopulationPlotPoints,
              elderlyPopulationPlotPoints,
            });
          }, [])}
        />
      </section>
      <section>
        <PopulationCategoryRadioButtonGroup
          onSelectedCategoryChange={setPendingSelectedCategory}
        />
      </section>
      <section>
        {populationPlotPoints && (
          <PopulationChart
            selectedCategory={selectedCategory}
            {...populationPlotPoints}
          />
        )}
      </section>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
};

export default App;
