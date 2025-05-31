"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Task } from "@/types";
import { useMemo } from "react";

type TasksPriorityGraphProps = {
  tasks: Task[];
};

const TasksPriorityGraph = ({ tasks }: TasksPriorityGraphProps) => {
  const chartData = useMemo(() => {
    const priorities = ["high", "medium", "low"];
    const priorityCounts = tasks.reduce((acc, task) => {
      acc[task.priority] = (acc[task.priority] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return priorities.map((priority) => ({
      priority,
      count: priorityCounts[priority] || 0,
      fill: (() => {
        switch (priority) {
          case "high":
            return "hsl(var(--chart-3))";
          case "medium":
            return "hsl(var(--chart-2))";
          case "low":
            return "hsl(var(--chart-1))";
          default:
            return "hsl(var(--chart-1))";
        }
      })(),
    }));
  }, [tasks]);
  const chartConfig = {
    count: {
      label: "Count",
    },
    high: {
      label: "High priority",
    },
    medium: {
      label: "Medium priority",
    },
    low: {
      label: "Low priority",
    },
  } satisfies ChartConfig;

  return (
    <Card className="p-4 flex flex-col h-full">
      <div className="flex flex-col gap-1">
        <h1 className="font-semibold text-xl">Task priorities</h1>
        <p className="text-muted-foreground text-sm">
          Priorities of all incomplete tasks across all projects
        </p>
      </div>
      <CardContent className="flex-1 p-0 flex items-center justify-center">
        <ChartContainer className="w-full" config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="priority"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => {
                switch (value) {
                  case "high":
                    return "High";
                  case "medium":
                    return "Medium";
                  case "low":
                    return "Low";
                  default:
                    return value;
                }
              }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent nameKey="priority" hideLabel />}
            />
            <Bar dataKey="count" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default TasksPriorityGraph;
