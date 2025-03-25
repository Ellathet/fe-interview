import React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DateTime } from 'luxon';
import { ChartConfig, ChartContainer, ChartTooltipContent } from './ui/chart';

export interface SalesData {
  order_date: number;
  [city: string]: number | null;
}

interface StackedBarChartProps {
  data: SalesData[];
  cities: string[];
  label: string;
}

const COLORS = [
  '#1f77b4',
  '#ff7f0e',
  '#2ca02c',
  '#d62728',
  '#9467bd',
  '#8c564b',
  '#e377c2',
  '#7f7f7f',
  '#bcbd22',
  '#17becf',
  '#aec7e8',
  '#ffbb78',
  '#98df8a',
  '#ff9896',
  '#c5b0d5',
  '#c49c94',
  '#f7b6d2',
  '#c7c7c7',
  '#dbdb8d',
  '#9edae5',
];

const calculateTotals = (data: SalesData[], cities: string[]) => {
  return data.map((item) => {
    const total = cities.reduce((acc, city) => acc + (item[city] || 0), 0);
    return { ...item, total };
  });
};

const calculateGrandTotal = (data: SalesData[], cities: string[]) => {
  return data.reduce(
    (acc, item) =>
      acc + cities.reduce((sum, city) => sum + (item[city] || 0), 0),
    0,
  );
};

export const OrdersBarChart: React.FC<StackedBarChartProps> = ({
  data,
  cities,
  label,
}) => {
  const totalsData = calculateTotals(data, cities);
  const grandTotal = calculateGrandTotal(data, cities);

  const dateFormatter = (timestamp: number) =>
    DateTime.fromMillis(timestamp).toFormat('MMM yyyy');

  const chartConfig = {
    desktop: { label: 'Desktop', color: 'hsl(var(--chart-1))' },
    mobile: { label: 'Mobile', color: 'hsl(var(--chart-2))' },
  } satisfies ChartConfig;

  return (
    <div className="flex justify-center items-center">
      <Card className="md:w-[30vw] w-[50vw] h-[40vh]">
        <CardHeader>
          <CardTitle className="text-gray-500">{label}</CardTitle>
          <h4 className="text-2xl  font-bold">{grandTotal.toFixed()}</h4>
        </CardHeader>
        <CardContent className="h-[100%] flex justify-center items-center">
          <ChartContainer config={chartConfig} className="w-full h-full">
            <BarChart
              data={totalsData}
              margin={{ top: 0, right: 30, left: 20, bottom: 5 }}
              width={500}
              height={300}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="order_date"
                tickFormatter={dateFormatter}
                label={{ value: 'Order Date', position: 'bottom' }}
              />
              <YAxis label={{ angle: -90, position: 'left' }} />
              <Tooltip content={<ChartTooltipContent />} />
              {cities.map((city, index) => (
                <Bar
                  key={city}
                  dataKey={city}
                  stackId="a"
                  fill={COLORS[index % COLORS.length]}
                  name={city}
                ></Bar>
              ))}
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};
