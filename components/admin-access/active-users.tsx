"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { use, useMemo } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { getActiveUsersFromMonths } from "@/lib/user-activity";
import { MonthlyActiveUserRecord } from "@/types";

const chartConfig = {
  desktop: {
    label: "Desktop",
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
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={monthlyActiveUsers}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="activeUsers" fill="hsl(var(--primary))" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default ActiveUsers;
