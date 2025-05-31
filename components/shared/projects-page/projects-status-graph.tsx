"use client";

import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Project } from "@/types";
import { useMemo } from "react";

type ProjectsStatusGraphProps = {
  projects: Project[];
};

const ProjectsStatusGraph = ({ projects }: ProjectsStatusGraphProps) => {
  const chartData = useMemo(() => {
    const statusCounts = projects.reduce((acc, project) => {
      acc[project.status] = (acc[project.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(statusCounts).map(([status, count]) => ({
      status,
      count,
      fill: (() => {
        switch (status) {
          case "completed":
            return "hsl(var(--chart-3))";
          case "in-progress":
            return "hsl(var(--chart-2))";
          case "planned":
            return "hsl(var(--chart-1))";
          default:
            return "hsl(var(--chart-1))";
        }
      })(),
    }));
  }, [projects]);
  const chartConfig = {
    count: {
      label: "Count",
    },
    planned: {
      label: "Planned",
    },
    "in-progress": {
      label: "In progress",
    },
    completed: {
      label: "Completed",
    },
  };

  return (
    <Card className="flex flex-col p-4 h-full">
      <div className="flex flex-col gap-1">
        <h1 className="font-semibold text-xl">Projects status</h1>
        <p className="text-muted-foreground text-sm">
          Statuses of all projects
        </p>
      </div>
      <CardContent className="flex-1 p-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie data={chartData} dataKey="count" nameKey="status" />
            <ChartLegend
              content={<ChartLegendContent nameKey="status" />}
              className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default ProjectsStatusGraph;
