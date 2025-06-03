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

type MostViewedCoursesProps = {
  data: { title: string; viewCount: number }[];
};

const MostViewedCourses = ({ data }: MostViewedCoursesProps) => {
  const chartConfig = {
    viewCount: {
      label: "Views",
    },
  } satisfies ChartConfig;

  return (
    <Card className="p-4 flex flex-col h-full">
      <div className="flex flex-col gap-1">
        <h1 className="font-semibold text-xl">Top Courses</h1>
        <p className="text-muted-foreground text-sm">
          Courses with the highest views
        </p>
      </div>
      <CardContent className="h-full flex justify-center items-center">
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
            />
            <Bar
              dataKey="viewCount"
              layout="vertical"
              fill="hsl(var(--primary))"
              radius={4}
            >
              <LabelList
                dataKey="title"
                position="insideLeft"
                offset={8}
                fill="hsl(var(--primary-foreground))"
                fontSize={12}
              />
              <LabelList
                dataKey="viewCount"
                position="right"
                offset={8}
                className="text-primary-foreground"
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
