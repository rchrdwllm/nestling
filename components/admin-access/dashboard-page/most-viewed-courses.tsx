"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type MostViewedCourses = {
  data: { title: string; viewCount: number }[];
};

const MostViewedCourses = ({ data }: MostViewedCourses) => {
  const chartConfig = {
    viewCount: {
      label: "Views",
    },
  } satisfies ChartConfig;

  const getBarColor = (index: number) => {
    const colors = [
      "hsl(var(--chart-1))",
      "hsl(var(--chart-2))",
      "hsl(var(--chart-3))",
      "hsl(var(--chart-4))",
      "hsl(var(--chart-5))",
    ];
    return colors[index % colors.length];
  };

  return (
    <Card className="flex flex-col p-4 h-full max-h-[550px]">
      <div className="flex flex-col gap-1">
        <h1 className="font-semibold text-xl">Most Viewed Courses</h1>
        <p className="text-muted-foreground text-sm">
          Courses with the highest view counts
        </p>
      </div>
      <CardContent className="flex justify-center items-center p-4 h-full">
        <ChartContainer className="w-full" config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={data}
            layout="vertical"
            margin={{
              right: 16,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="title"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              hide
            />
            <XAxis dataKey="viewCount" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />{" "}
            <Bar
              dataKey="viewCount"
              layout="vertical"
              radius={4}
              shape={(props: any) => {
                const { payload, x, y, width, height, index } = props;
                return (
                  <rect
                    x={x}
                    y={y}
                    width={width}
                    height={height}
                    fill={getBarColor(index)}
                    rx={4}
                    ry={4}
                  />
                );
              }}
            >
              <LabelList
                dataKey="title"
                position="insideLeft"
                offset={8}
                fill="white"
                fontSize={12}
              />
              <LabelList
                dataKey="viewCount"
                position="right"
                offset={8}
                className="text-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default MostViewedCourses;
