import React from "react";
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
import { stringToRgbHex } from "../../helpers/stringToRgbHex";

export interface PopulationChartProps {
  populationPlotPoints: PopulationPlotPoint[];
}

export interface PopulationPlotPoint {
  year: number;
  [key: string]: number;
}

export const PopulationChart: React.FC<PopulationChartProps> = ({
  populationPlotPoints,
}) => {
  return (
    <div style={{ height: "50vw" }}>
      <ResponsiveContainer>
        <LineChart
          data={populationPlotPoints}
          margin={{
            top: 20,
            right: 40,
            left: 40,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
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
