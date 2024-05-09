import React, { useEffect, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { PopulationCategory } from "../../core/domain/models/Population";
import { stringToRgbHex } from "../../helpers/stringToRgbHex";

export interface PopulationChartProps {
  selectedCategory: PopulationCategory;
  totalPopulationPlotPoints: PopulationPlotPoint[];
  youngPopulationPlotPoints: PopulationPlotPoint[];
  productiveAgePopulationPlotPoints: PopulationPlotPoint[];
  elderlyPopulationPlotPoints: PopulationPlotPoint[];
}

export interface PopulationPlotPoint {
  year: number;
  [key: string]: number;
}

export const PopulationChart: React.FC<PopulationChartProps> = ({
  selectedCategory,
  totalPopulationPlotPoints,
  youngPopulationPlotPoints,
  productiveAgePopulationPlotPoints,
  elderlyPopulationPlotPoints,
}) => {
  const [populationPlotPoints, setPopulationPlotPoints] = useState<
    PopulationPlotPoint[]
  >([]);
  useEffect(() => {
    setPopulationPlotPoints(
      {
        総人口: totalPopulationPlotPoints,
        年少人口: youngPopulationPlotPoints,
        生産年齢人口: productiveAgePopulationPlotPoints,
        老年人口: elderlyPopulationPlotPoints,
      }[selectedCategory],
    );
  }, [
    selectedCategory,
    totalPopulationPlotPoints,
    youngPopulationPlotPoints,
    productiveAgePopulationPlotPoints,
    elderlyPopulationPlotPoints,
  ]);

  return (
    <div style={{ height: "50vw" }}>
      <ResponsiveContainer>
        <LineChart
          data={populationPlotPoints}
          margin={{
            top: 10,
            right: 10,
            left: 10,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          {/* NOTE: https://github.com/recharts/recharts/issues/3615 にある通りWarningが発生する */}
          <XAxis dataKey="year" />
          <YAxis />
          {populationPlotPoints.length > 0 &&
            Object.keys(populationPlotPoints[0])
              .filter((key) => key !== "year")
              .map((key) => {
                return (
                  <Line
                    key={key}
                    type="monotone"
                    dataKey={key}
                    stroke={stringToRgbHex(key)}
                  />
                );
              })}
          <Legend />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
