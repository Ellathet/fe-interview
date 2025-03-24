import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DateTime } from "luxon";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart";
import { useState } from "react";

export interface SalesData {
  order_date: number;
  [city: string]: number | null;
}

interface StackedBarChartProps {
  data: SalesData[];
  cities: string[];
}

const COLORS = [
  "#1f77b4",
  "#ff7f0e",
  "#2ca02c",
  "#d62728",
  "#9467bd",
  "#8c564b",
  "#e377c2",
  "#7f7f7f",
  "#bcbd22",
  "#17becf",
  "#aec7e8",
  "#ffbb78",
  "#98df8a",
  "#ff9896",
  "#c5b0d5",
  "#c49c94",
  "#f7b6d2",
  "#c7c7c7",
  "#dbdb8d",
  "#9edae5",
];

export const StackedBarChart: React.FC<StackedBarChartProps> = ({
  data,
  cities,
}) => {
  const dateFormatter = (timestamp: number) => {
    return DateTime.fromMillis(timestamp).toFormat("MMM yyyy");
  };

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "hsl(var(--chart-1))",
    },
    mobile: {
      label: "Mobile",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  console.log("cities", cities);
  const [activeCities, setActiveCities] = useState<string[]>(cities);

  const toggleCity = (city: string) => {
    setActiveCities((prevActiveCities) =>
      prevActiveCities.includes(city)
        ? prevActiveCities.filter((c) => c !== city)
        : [...prevActiveCities, city]
    );
  };

  const renderLegend = () => {
    return (
      <div
        style={{
          display: "flex",
          overflowX: "auto",
          marginBottom: "20px",
        }}
      >
        <button
          onClick={() => setActiveCities(cities)}
          style={{ marginRight: "10px" }}
        >
          All
        </button>
        {cities.map((city, index) => (
          <div
            key={city}
            style={{
              display: "flex",
              alignItems: "center",
              marginRight: "10px",
              cursor: "pointer",
              opacity: activeCities.includes(city) ? 1 : 0.5,
            }}
            onClick={() => toggleCity(city)}
          >
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "2px",
                backgroundColor: COLORS[index % COLORS.length],
                marginRight: "5px",
              }}
            />
            {city}
          </div>
        ))}
      </div>
    );
  };

  const filteredData = data.map((item) => {
    const newItem = { ...item };
    cities.forEach((city) => {
      if (!activeCities.includes(city)) {
        newItem[city] = null;
      }
    });
    return newItem;
  });

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-[90vw] h-[80vh]">
        <CardHeader>
          <CardTitle>Sales by City</CardTitle>
        </CardHeader>
        <CardContent className="h-[85%] flex justify-center items-center">
          <ChartContainer config={chartConfig} className="w-full h-full">
            {renderLegend()}
            <BarChart
              data={filteredData}
              margin={{ top: 0, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="order_date"
                tickFormatter={dateFormatter}
                label={{ value: "Order Date", position: "bottom" }}
              />
              <YAxis label={{ value: "Sales", angle: -90, position: "left" }} />
              <ChartTooltip content={<ChartTooltipContent />} />
              {cities.map((city, index) => (
                <Bar
                  key={city}
                  dataKey={city}
                  stackId="a"
                  fill={COLORS[index % COLORS.length]}
                  hide={!activeCities.includes(city)}
                  name={city}
                />
              ))}
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};
