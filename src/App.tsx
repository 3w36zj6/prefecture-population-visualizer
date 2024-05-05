import { useCallback, useState } from "react";
import "./App.css";
import reactLogo from "./assets/react.svg";
import {
  PopulationChart,
  PopulationChartProps,
  PopulationPlotPoint,
} from "./components/organisms/PopulationChart";
import { PrefectureCheckBoxGroup } from "./components/organisms/PrefectureCheckBoxGroup";
import { PopulationCompositionPerYearValue } from "./domain/models/Population";
import { PopulationController } from "./interface/PopulationController";
import viteLogo from "/vite.svg";

const App = () => {
  const [count, setCount] = useState(0);
  const [populationChartProps, setPopulationChartProps] = useState<
    PopulationChartProps | undefined
  >(undefined);

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
              populationCompositionPerYear: PopulationCompositionPerYearValue[];
            }[] = [];

            for (const prefecture of prefectures) {
              const population =
                await populationController.getPopulationCompositionPerYear(
                  prefecture.prefCode,
                );
              populationCompositionPerYearList.push({
                prefName: prefecture.prefName,
                populationCompositionPerYear: population.totalPopulation,
              });
            }

            if (populationCompositionPerYearList.length === 0) {
              return;
            }

            const populationPlotPoints: PopulationPlotPoint[] = [];

            for (const index of Array(
              populationCompositionPerYearList[0].populationCompositionPerYear
                .length,
            ).keys()) {
              const populationPlotPoint: PopulationPlotPoint = {
                year: populationCompositionPerYearList[0]
                  .populationCompositionPerYear[index].year,
              };
              for (const {
                prefName,
                populationCompositionPerYear,
              } of populationCompositionPerYearList) {
                populationPlotPoint[prefName] =
                  populationCompositionPerYear[index].value;
              }
              populationPlotPoints.push(populationPlotPoint);
            }
            setPopulationChartProps({
              populationPlotPoints,
            });
          }, [])}
        />
      </section>
      <section>
        {populationChartProps && <PopulationChart {...populationChartProps} />}
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
