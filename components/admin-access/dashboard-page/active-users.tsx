"use client";

import { useMemo } from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { MonthlyActiveUserRecord } from "@/types";

const chartConfig = {
  activeUsers: {
    label: "Active users",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

type ActiveUserProps = {
  monthlyActiveUsers: MonthlyActiveUserRecord[];
};

const ActiveUsers = ({ monthlyActiveUsers }: ActiveUserProps) => {
  const totalUsers = useMemo(() => {
    const total = monthlyActiveUsers.reduce((acc, curr) => {
      return acc + curr.activeUsers;
    }, 0);

    return total;
  }, [monthlyActiveUsers]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-mono text-6xl">{totalUsers}</CardTitle>
        <CardDescription>
          Total active users for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className="max-h-[450px] w-full" config={chartConfig}>
          <AreaChart
            className="max-h-[450px] w-full"
            accessibilityLayer
            data={monthlyActiveUsers}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" hideLabel />}
            />
            <Area
              dataKey="activeUsers"
              type="linear"
              fill="hsl(var(--chart-1))"
              fillOpacity={0.4}
              stroke="hsl(var(--chart-1))"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default ActiveUsers;
