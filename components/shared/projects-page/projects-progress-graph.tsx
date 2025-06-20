"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useMemo } from "react";
import { Project, Task } from "@/types";

type ProjectsProgressGraphProps = {
  projects: (Project & { tasks: Task[] })[];
};

const ProjectsProgressGraph = ({ projects }: ProjectsProgressGraphProps) => {
  const chartData = useMemo(() => {
    return projects.map((project) => {
      const totalTasks = project.tasks.length;
      const completedTasks = project.tasks.filter(
        (task) => task.status === "completed"
      ).length;

      const completedPercentage =
        totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
      const incompletePercentage =
        totalTasks > 0 ? ((totalTasks - completedTasks) / totalTasks) * 100 : 0;

      return {
        title: project.title,
        completed: Math.round(completedPercentage * 10) / 10,
        incomplete: Math.round(incompletePercentage * 10) / 10,
        totalTasks,
      };
    });
  }, [projects]);

  const chartConfig = {
    completed: {
      label: "Completed",
      color: "hsl(var(--chart-3))",
    },
    incomplete: {
      label: "Incomplete",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  return (
    <Card className="flex flex-col gap-8 p-4 h-full">
      <div className="flex flex-col gap-1">
        <h1 className="font-semibold text-xl">Projects progress</h1>
        <p className="text-muted-foreground text-sm">
          Completion percentage by tasks for each project
        </p>
      </div>
      <CardContent className="flex flex-1 justify-center items-center p-0">
        <ChartContainer className="w-full max-w-[700px]" config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="title"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => {
                return value.length > 16
                  ? `${value.substring(0, 16)}...`
                  : value;
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  formatter={(value, name) => [
                    `${value}% `,
                    name === "completed" ? "Completed" : "Incomplete",
                  ]}
                  labelFormatter={(label) => `Project: ${label}`}
                />
              }
            />
            <Bar
              dataKey="completed"
              stackId="a"
              radius={[0, 0, 4, 4]}
              fill="var(--color-completed)"
            />
            <Bar
              dataKey="incomplete"
              stackId="a"
              radius={[4, 4, 0, 0]}
              fill="var(--color-incomplete)"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default ProjectsProgressGraph;
