import { useCallback, useState } from "react";
import "./App.css";
import reactLogo from "./assets/react.svg";
import PopulationCategoryRadioButtonGroup from "./components/organisms/PopulationCategoryRadioButtonGroup";
import {
  PopulationChart,
  PopulationPlotPoint,
} from "./components/organisms/PopulationChart";
import { PrefectureCheckBoxGroup } from "./components/organisms/PrefectureCheckBoxGroup";
import { PopulationCompositionPerYearValue } from "./domain/models/Population";
import { PopulationController } from "./interface/PopulationController";
import viteLogo from "/vite.svg";

import { PopulationCategory } from "./domain/models/Population";

interface CategoryPopulationPlotPoints {
  totalPopulationPlotPoints: PopulationPlotPoint[];
  youngPopulationPlotPoints: PopulationPlotPoint[];
  productiveAgePopulationPlotPoints: PopulationPlotPoint[];
  elderlyPopulationPlotPoints: PopulationPlotPoint[];
}

const App = () => {
  const [count, setCount] = useState(0);
  const [populationPlotPoints, setPopulationPlotPoints] = useState<
    CategoryPopulationPlotPoints | undefined
  >(undefined);
  const [selectedCategory, setSelectedCategory] =
    useState<PopulationCategory>("総人口");

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
      <section>
        <PrefectureCheckBoxGroup
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
          onSelectedCategoryChange={useCallback((selectedCategory) => {
            setSelectedCategory(selectedCategory);
          }, [])}
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
