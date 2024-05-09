import { useCallback, useEffect, useState } from "react";
import PopulationCategoryRadioButtonGroup from "./components/organisms/PopulationCategoryRadioButtonGroup";
import {
  PopulationChart,
  PopulationPlotPoint,
} from "./components/organisms/PopulationChart";
import { PrefectureCheckBoxGroup } from "./components/organisms/PrefectureCheckBoxGroup";
import { PopulationCompositionPerYearValue } from "./core/domain/models/Population";
import { PopulationController } from "./core/interface/PopulationController";

import { PopulationCategory } from "./core/domain/models/Population";
import { Prefecture } from "./core/domain/models/Prefecture";
import { PrefectureController } from "./core/interface/PrefectureController";

import { Reset } from "styled-reset";

import styled from "styled-components";
import { ErrorAlert } from "./components/atoms/ErrorAlert";
import Title from "./components/atoms/Title";

const Root = styled.div`
  min-height: 100vh;
  background: #f7f7fd;
`;

const Container = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  padding: 1rem;
  text-align: center;
`;

const Section = styled.section`
  padding: 1em;
  margin: 1em;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const ChartSection = styled(Section)`
  & > * {
    max-height: 500px;
  }
`;

interface CategoryPopulationPlotPoints {
  totalPopulationPlotPoints: PopulationPlotPoint[];
  youngPopulationPlotPoints: PopulationPlotPoint[];
  productiveAgePopulationPlotPoints: PopulationPlotPoint[];
  elderlyPopulationPlotPoints: PopulationPlotPoint[];
}

const App = () => {
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
    <Root>
      <Reset />
      <Container>
        <Title text="prefecture-population-visualizer" level="h1" />
        {errorMessage && (
          <section>
            <ErrorAlert title="Error">
              <p>都道府県一覧の取得に失敗しました。</p>
              <p>{errorMessage}</p>
            </ErrorAlert>
          </section>
        )}
        <Section>
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
              const productiveAgePopulationPlotPoints: PopulationPlotPoint[] =
                [];
              const elderlyPopulationPlotPoints: PopulationPlotPoint[] = [];

              for (const index of Array(
                populationCompositionPerYearList[0].totalPopulation.length,
              ).keys()) {
                const totalPopulationPlotPoint: PopulationPlotPoint = {
                  year: populationCompositionPerYearList[0].totalPopulation[
                    index
                  ].year,
                };
                const youngPopulationPlotPoint = {
                  ...totalPopulationPlotPoint,
                };
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
        </Section>
        <Section>
          <PopulationCategoryRadioButtonGroup
            onSelectedCategoryChange={setPendingSelectedCategory}
          />
        </Section>

        {populationPlotPoints && (
          <ChartSection>
            <PopulationChart
              selectedCategory={selectedCategory}
              {...populationPlotPoints}
            />
          </ChartSection>
        )}
      </Container>
    </Root>
  );
};

export default App;
