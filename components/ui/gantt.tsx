"use client";

import { Card } from "@/components/ui/card";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { projectStatuses } from "@/constants/project";
import { cn } from "@/lib/utils";
import { User } from "@/types";
import {
  DndContext,
  MouseSensor,
  useDraggable,
  useSensor,
} from "@dnd-kit/core";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
import { useMouse, useThrottle, useWindowScroll } from "@uidotdev/usehooks";
import { formatDate, getDate, subMonths } from "date-fns";
import { formatDistance, isSameDay } from "date-fns";
import { format } from "date-fns";
import {
  addDays,
  addMonths,
  differenceInDays,
  differenceInHours,
  differenceInMonths,
  endOfDay,
  endOfMonth,
  getDaysInMonth,
  startOfDay,
  startOfMonth,
} from "date-fns";
import { atom, useAtom } from "jotai";
import throttle from "lodash.throttle";
import { PlusIcon, TrashIcon } from "lucide-react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import type {
  CSSProperties,
  FC,
  KeyboardEventHandler,
  MouseEventHandler,
  ReactNode,
  RefObject,
} from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import Link from "next/link";

const draggingAtom = atom(false);
const scrollXAtom = atom(0);

export const useGanttDragging = () => useAtom(draggingAtom);
export const useGanttScrollX = () => useAtom(scrollXAtom);

export type GanttStatus = {
  id: string;
  name: string;
  color: string;
  value: "planned" | "in-progress" | "completed";
};

export type GanttFeature = any & {
  owner: User | null;
};

export type GanttMarkerProps = {
  id: string;
  date: Date;
  label: string;
};

export type Range = "daily" | "monthly" | "quarterly";

export type TimelineData = {
  year: number;
  quarters: {
    months: {
      days: number;
    }[];
  }[];
}[];

export type GanttContextProps = {
  zoom: number;
  setZoom?: (zoom: number) => void;
  range: Range;
  columnWidth: number;
  sidebarWidth: number;
  headerHeight: number;
  rowHeight: number;
  onAddItem: ((date: Date) => void) | undefined;
  placeholderLength: number;
  timelineData: TimelineData;
  ref: RefObject<HTMLDivElement | null> | null;
  currentMonth?: Date;
  setCurrentMonth?: (date: Date) => void;
  scrollToToday?: () => void;
};

const getsDaysIn = (range: Range) => {
  let fn = (_date: Date) => 1;

  if (range === "daily") {
    fn = getDaysInMonth;
  } else if (range === "monthly" || range === "quarterly") {
    fn = getDaysInMonth;
  }

  return fn;
};

const getDifferenceIn = (range: Range) => {
  let fn = differenceInDays;

  if (range === "daily") {
    fn = differenceInDays;
  } else if (range === "monthly" || range === "quarterly") {
    fn = differenceInMonths;
  }

  return fn;
};

const getInnerDifferenceIn = (range: Range) => {
  let fn = differenceInHours;

  if (range === "daily") {
    fn = differenceInHours;
  } else if (range === "monthly" || range === "quarterly") {
    fn = differenceInDays;
  }

  return fn;
};

const getStartOf = (range: Range) => {
  let fn = startOfDay;

  if (range === "daily") {
    fn = startOfDay;
  } else if (range === "monthly" || range === "quarterly") {
    fn = startOfMonth;
  }

  return fn;
};

const getEndOf = (range: Range) => {
  let fn = endOfDay;

  if (range === "daily") {
    fn = endOfDay;
  } else if (range === "monthly" || range === "quarterly") {
    fn = endOfMonth;
  }

  return fn;
};

const getAddRange = (range: Range) => {
  let fn = addDays;

  if (range === "daily") {
    fn = addDays;
  } else if (range === "monthly" || range === "quarterly") {
    fn = addMonths;
  }

  return fn;
};

const getDateByMousePosition = (context: GanttContextProps, mouseX: number) => {
  if (context.range === "daily" && context.currentMonth) {
    const year = context.currentMonth.getFullYear();
    const month = context.currentMonth.getMonth();
    const columnWidth = (context.columnWidth * context.zoom) / 100;
    const dayOffset = Math.floor(mouseX / columnWidth);

    return new Date(year, month, dayOffset + 1);
  } else {
    const timelineStartDate = new Date(context.timelineData[0].year, 0, 1);
    const columnWidth = (context.columnWidth * context.zoom) / 100;
    const offset = Math.floor(mouseX / columnWidth);
    const daysIn = getsDaysIn(context.range);
    const addRange = getAddRange(context.range);
    const month = addRange(timelineStartDate, offset);
    const daysInMonth = daysIn(month);
    const pixelsPerDay = columnWidth / daysInMonth;
    const dayOffset = Math.floor((mouseX % columnWidth) / pixelsPerDay);
    const actualDate = addDays(month, dayOffset);

    return actualDate;
  }
};

const createInitialTimelineData = (today: Date) => {
  const data: TimelineData = [];

  data.push(
    { year: today.getFullYear() - 1, quarters: new Array(4).fill(null) },
    { year: today.getFullYear(), quarters: new Array(4).fill(null) },
    { year: today.getFullYear() + 1, quarters: new Array(4).fill(null) }
  );

  for (const yearObj of data) {
    yearObj.quarters = new Array(4).fill(null).map((_, quarterIndex) => ({
      months: new Array(3).fill(null).map((_, monthIndex) => {
        const month = quarterIndex * 3 + monthIndex;
        return {
          days: getDaysInMonth(new Date(yearObj.year, month, 1)),
        };
      }),
    }));
  }

  return data;
};

const getOffset = (
  date: Date,
  timelineStartDate: Date,
  context: GanttContextProps
) => {
  const parsedColumnWidth = (context.columnWidth * context.zoom) / 100;

  if (context.range === "daily" && context.currentMonth) {
    const currentMonth = context.currentMonth.getMonth();
    const currentYear = context.currentMonth.getFullYear();

    if (
      date.getMonth() !== currentMonth ||
      date.getFullYear() !== currentYear
    ) {
      if (
        date.getFullYear() > currentYear ||
        (date.getFullYear() === currentYear && date.getMonth() > currentMonth)
      ) {
        const daysInMonth = getDaysInMonth(
          new Date(currentYear, currentMonth, 1)
        );
        return daysInMonth * parsedColumnWidth;
      }

      return 0;
    }

    const dayOfMonth = date.getDate() - 1;
    return dayOfMonth * parsedColumnWidth;
  } else {
    const differenceIn = getDifferenceIn(context.range);
    const startOf = getStartOf(context.range);
    const fullColumns = differenceIn(startOf(date), timelineStartDate);
    const partialColumns = date.getDate();
    const daysInMonth = getDaysInMonth(date);
    const pixelsPerDay = parsedColumnWidth / daysInMonth;

    return fullColumns * parsedColumnWidth + partialColumns * pixelsPerDay;
  }
};

const getWidth = (
  startDate: Date,
  endDate: Date | null,
  context: GanttContextProps
) => {
  const parsedColumnWidth = (context.columnWidth * context.zoom) / 100;

  if (!endDate) {
    return parsedColumnWidth * 2;
  }

  if (context.range === "daily" && context.currentMonth) {
    const currentMonth = context.currentMonth.getMonth();
    const currentYear = context.currentMonth.getFullYear();
    const daysInCurrentMonth = getDaysInMonth(
      new Date(currentYear, currentMonth, 1)
    );

    const projectInPreviousMonth =
      startDate.getFullYear() < currentYear ||
      (startDate.getFullYear() === currentYear &&
        startDate.getMonth() < currentMonth);

    const projectInNextMonth =
      endDate.getFullYear() > currentYear ||
      (endDate.getFullYear() === currentYear &&
        endDate.getMonth() > currentMonth);

    const projectStartsInCurrentMonth =
      startDate.getFullYear() === currentYear &&
      startDate.getMonth() === currentMonth;

    const projectEndsInCurrentMonth =
      endDate.getFullYear() === currentYear &&
      endDate.getMonth() === currentMonth;

    if (
      !projectInPreviousMonth &&
      !projectStartsInCurrentMonth &&
      projectInNextMonth
    ) {
      return 0;
    }

    let start = new Date(startDate);
    let end = new Date(endDate);

    if (projectInPreviousMonth) {
      start = new Date(currentYear, currentMonth, 1);
    }

    if (projectInNextMonth) {
      end = new Date(currentYear, currentMonth, daysInCurrentMonth);
    }

    if (isSameDay(start, end)) {
      return parsedColumnWidth;
    }

    const daysDiff = differenceInDays(end, start);
    return Math.max(1, daysDiff + 1) * parsedColumnWidth;
  }

  const differenceIn = getDifferenceIn(context.range);
  const daysInStartMonth = getDaysInMonth(startDate);
  const pixelsPerDayInStartMonth = parsedColumnWidth / daysInStartMonth;

  if (isSameDay(startDate, endDate)) {
    return pixelsPerDayInStartMonth;
  }

  const innerDifferenceIn = getInnerDifferenceIn(context.range);
  const startOf = getStartOf(context.range);

  if (isSameDay(startOf(startDate), startOf(endDate))) {
    return innerDifferenceIn(endDate, startDate) * pixelsPerDayInStartMonth;
  }

  const startRangeOffset = daysInStartMonth - getDate(startDate);
  const endRangeOffset = getDate(endDate);
  const fullRangeOffset = differenceIn(startOf(endDate), startOf(startDate));
  const daysInEndMonth = getDaysInMonth(endDate);
  const pixelsPerDayInEndMonth = parsedColumnWidth / daysInEndMonth;

  return (
    (fullRangeOffset - 1) * parsedColumnWidth +
    startRangeOffset * pixelsPerDayInStartMonth +
    endRangeOffset * pixelsPerDayInEndMonth
  );
};

const calculateInnerOffset = (
  date: Date,
  range: Range,
  columnWidth: number
) => {
  if (range === "daily") {
    return 0;
  }

  const startOf = getStartOf(range);
  const endOf = getEndOf(range);
  const differenceIn = getInnerDifferenceIn(range);
  const startOfRange = startOf(date);
  const endOfRange = endOf(date);
  const totalRangeDays = differenceIn(endOfRange, startOfRange);
  const dayOfMonth = date.getDate();

  return (dayOfMonth / totalRangeDays) * columnWidth;
};

const GanttContext = createContext<GanttContextProps>({
  zoom: 100,
  setZoom: undefined,
  range: "monthly",
  columnWidth: 50,
  headerHeight: 60,
  sidebarWidth: 300,
  rowHeight: 36,
  onAddItem: undefined,
  placeholderLength: 2,
  timelineData: [],
  ref: null,
  currentMonth: undefined,
  setCurrentMonth: undefined,
  scrollToToday: undefined,
});

export { GanttContext };

export type GanttContentHeaderProps = {
  renderHeaderItem: (index: number) => ReactNode;
  title: string;
  columns: number;
};

export const GanttContentHeader: FC<GanttContentHeaderProps> = ({
  title,
  columns,
  renderHeaderItem,
}) => {
  const id = useId();
  const gantt = useContext(GanttContext);

  return (
    <div
      className="top-0 z-20 sticky flex flex-col bg-backdrop/90 backdrop-blur-sm w-full shrink-0"
      style={{ height: "var(--gantt-header-height)" }}
    >
      <div className="h-8">
        {" "}
        <div
          className="inline-flex sticky px-3 py-2 text-muted-foreground text-xs whitespace-nowrap"
          style={{
            left: "300px",
          }}
        >
          <p>{title}</p>
        </div>
      </div>
      <div
        className="flex-1 grid w-full"
        style={{
          gridTemplateColumns: `repeat(${columns}, var(--gantt-column-width))`,
        }}
      >
        {Array.from({ length: columns }).map((_, index) => (
          <div
            key={`${id}-${index}`}
            className="flex flex-col justify-center border-b border-border/50 text-xs text-center shrink-0"
          >
            {renderHeaderItem(index)}
          </div>
        ))}
      </div>
    </div>
  );
};

const MonthlyHeader: FC = () => {
  const gantt = useContext(GanttContext);

  return gantt.timelineData.map((year) => (
    <div className="relative flex flex-col" key={year.year}>
      <GanttContentHeader
        title={`${year.year}`}
        columns={year.quarters.flatMap((quarter) => quarter.months).length}
        renderHeaderItem={(item: number) => (
          <p>{format(new Date(year.year, item, 1), "MMM")}</p>
        )}
      />
      <GanttColumns
        columns={year.quarters.flatMap((quarter) => quarter.months).length}
      />
    </div>
  ));
};

const DailyHeader: FC = () => {
  const gantt = useContext(GanttContext);
  const currentDate = gantt.currentMonth || new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(new Date(year, month));

  return (
    <div
      className="relative flex flex-col"
      key={`daily-header-${year}-${month}`}
    >
      <GanttContentHeader
        title={`${format(new Date(year, month), "MMMM yyyy")}`}
        columns={daysInMonth}
        renderHeaderItem={(item: number) => {
          const date = new Date(year, month, item + 1);
          const dayOfWeek = date.getDay();
          const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
          const isToday = isSameDay(date, new Date());

          return (
            <div
              className={`flex h-full flex-col items-center justify-center ${
                isWeekend ? "text-muted-foreground" : ""
              }`}
            >
              <span
                className={`${
                  isToday
                    ? "bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center"
                    : "font-medium"
                } ${isWeekend && !isToday ? "text-muted-foreground" : ""}`}
              >
                {item + 1}
              </span>
              <span className="text-muted-foreground text-xs">
                {format(date, "EEE")}
              </span>
            </div>
          );
        }}
      />
      <GanttColumns
        columns={daysInMonth}
        isColumnSecondary={(day) => {
          const date = new Date(year, month, day + 1);
          const dayOfWeek = date.getDay();
          return dayOfWeek === 0 || dayOfWeek === 6;
        }}
      />
    </div>
  );
};

const QuarterlyHeader: FC = () => {
  const gantt = useContext(GanttContext);

  return gantt.timelineData.map((year) =>
    year.quarters.map((quarter, quarterIndex) => (
      <div
        className="relative flex flex-col"
        key={`${year.year}-${quarterIndex}`}
      >
        <GanttContentHeader
          title={`Q${quarterIndex + 1} ${year.year}`}
          columns={quarter.months.length}
          renderHeaderItem={(item: number) => (
            <p>
              {format(new Date(year.year, quarterIndex * 3 + item, 1), "MMM")}
            </p>
          )}
        />
        <GanttColumns columns={quarter.months.length} />
      </div>
    ))
  );
};

const headers: Record<Range, FC> = {
  daily: DailyHeader,
  monthly: MonthlyHeader,
  quarterly: QuarterlyHeader,
};

export type GanttHeaderProps = {
  className?: string;
};

export const GanttHeader: FC<GanttHeaderProps> = ({ className }) => {
  const gantt = useContext(GanttContext);
  const Header = headers[gantt.range];
  return <Header />;
};

export type GanttSidebarItemProps = {
  feature: GanttFeature;
  onSelectItem?: (id: string) => void;
  className?: string;
};

export const GanttSidebarItem: FC<GanttSidebarItemProps> = ({
  feature,
  onSelectItem,
  className,
}) => {
  const tempendDate =
    feature.endDate &&
    isSameDay(new Date(feature.startDate), new Date(feature.endDate))
      ? addDays(new Date(feature.endDate), 1)
      : new Date(feature.endDate);
  const duration = tempendDate
    ? formatDistance(new Date(feature.startDate), tempendDate)
    : `${formatDistance(new Date(feature.startDate), new Date())} so far`;

  const handleClick: MouseEventHandler<HTMLDivElement> = (event) => {
    if (event.target === event.currentTarget) {
      onSelectItem?.(feature.id);
    }
  };

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.key === "Enter") {
      onSelectItem?.(feature.id);
    }
  };

  const statusMapping = projectStatuses.find(
    (status) => status.value === feature.status
  )!;

  return (
    <Link
      // biome-ignore lint/a11y/useSemanticElements: <explanation>
      role="button"
      href={`/projects/${feature.projectId ? feature.projectId : feature.id}`}
      onClick={handleClick as any}
      onKeyDown={handleKeyDown as any}
      tabIndex={0}
      key={feature.id}
      className={cn(
        "relative flex items-center gap-2.5 p-2.5 text-xs",
        className
      )}
      style={{
        height: "var(--gantt-row-height)",
      }}
    >
      <div
        className="rounded-full w-2 h-2 pointer-events-none shrink-0"
        style={{
          backgroundColor: statusMapping.color,
        }}
      />
      <div className="flex items-center gap-2">
        <p className="flex-1 font-medium text-left truncate pointer-events-none">
          {feature.title}
        </p>
        {feature.owner && feature.owner.image ? (
          <Avatar className="w-4 h-4">
            <AvatarImage src={feature.owner.image} />
            <AvatarFallback>{feature.owner.name?.slice(0, 2)}</AvatarFallback>
          </Avatar>
        ) : feature.ownwer ? (
          <div className="flex justify-center items-center bg-muted rounded-full size-6">
            <p className="font-semibold text-xs">{feature.owner!.name![0]}</p>
          </div>
        ) : null}
      </div>
      <p className="ml-auto text-muted-foreground pointer-events-none">
        {duration}
      </p>
    </Link>
  );
};

export const GanttSidebarHeader: FC = () => {
  const gantt = useContext(GanttContext);

  return (
    <div
      className="top-0 z-10 sticky flex flex-col justify-between bg-backdrop/90 backdrop-blur-sm border-b border-border/50 font-medium text-muted-foreground text-xs shrink-0"
      style={{ height: "var(--gantt-header-height)" }}
    >
      <div className="flex justify-between items-center px-3 py-2 h-8">
        <p className="flex-1 text-left truncate">Projects</p>
        <p className="shrink-0">Duration</p>
      </div>
      <div className="flex flex-1 items-end"></div>
    </div>
  );
};

export type GanttSidebarGroupProps = {
  children: ReactNode;
  name: string;
  className?: string;
};

export const GanttSidebarGroup: FC<GanttSidebarGroupProps> = ({
  children,
  name,
  className,
}) => (
  <div className={className}>
    <p
      style={{ height: "var(--gantt-row-height)" }}
      className="p-2.5 w-full font-medium text-muted-foreground text-xs text-left truncate"
    >
      {name}
    </p>
    <div className="divide-y divide-border/50">{children}</div>
  </div>
);

export type GanttSidebarProps = {
  children: ReactNode;
  className?: string;
};

export const GanttSidebar: FC<GanttSidebarProps> = ({
  children,
  className,
}) => (
  <div
    data-roadmap-ui="gantt-sidebar"
    className={cn(
      "sticky left-0 z-30 h-max min-h-full overflow-clip border-border/50 border-r bg-background/90 backdrop-blur-md",
      className
    )}
  >
    <GanttSidebarHeader />
    <div className="space-y-4">{children}</div>
  </div>
);

export type GanttAddFeatureHelperProps = {
  top: number;
  className?: string;
};

export const GanttAddFeatureHelper: FC<GanttAddFeatureHelperProps> = ({
  top,
  className,
}) => {
  const [scrollX] = useGanttScrollX();
  const gantt = useContext(GanttContext);
  const [mousePosition, mouseRef] = useMouse<HTMLDivElement>();

  const handleClick = () => {
    const ganttRect = gantt.ref?.current?.getBoundingClientRect();
    const x =
      mousePosition.x - (ganttRect?.left ?? 0) + scrollX - gantt.sidebarWidth;
    const currentDate = getDateByMousePosition(gantt, x);

    gantt.onAddItem?.(currentDate);
  };

  return (
    <div
      className={cn("absolute top-0 w-full px-0.5", className)}
      style={{
        marginTop: -gantt.rowHeight / 2,
        transform: `translateY(${top}px)`,
      }}
      ref={mouseRef}
    >
      <button
        onClick={handleClick}
        type="button"
        className="flex justify-center items-center p-2 border border-dashed rounded-md w-full h-full"
      >
        <PlusIcon
          size={16}
          className="text-muted-foreground pointer-events-none select-none"
        />
      </button>
    </div>
  );
};

export type GanttColumnProps = {
  index: number;
  isColumnSecondary?: (item: number) => boolean;
};

export const GanttColumn: FC<GanttColumnProps> = ({
  index,
  isColumnSecondary,
}) => {
  const gantt = useContext(GanttContext);
  const [dragging] = useGanttDragging();
  const [mousePosition, mouseRef] = useMouse<HTMLDivElement>();
  const [hovering, setHovering] = useState(false);
  const [windowScroll] = useWindowScroll();

  const handleMouseEnter = () => setHovering(true);
  const handleMouseLeave = () => setHovering(false);

  const top = useThrottle(
    mousePosition.y -
      (mouseRef.current?.getBoundingClientRect().y ?? 0) -
      (windowScroll.y ?? 0),
    10
  );
  return (
    // biome-ignore lint/nursery/noStaticElementInteractions: <explanation>
    <div
      className={cn(
        "group relative h-full overflow-hidden",
        isColumnSecondary?.(index) ? "bg-secondary" : ""
      )}
      ref={mouseRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {!dragging && hovering && gantt.onAddItem ? (
        <GanttAddFeatureHelper top={top} />
      ) : null}
    </div>
  );
};

export type GanttColumnsProps = {
  columns: number;
  isColumnSecondary?: (item: number) => boolean;
};

export const GanttColumns: FC<GanttColumnsProps> = ({
  columns,
  isColumnSecondary,
}) => {
  const id = useId();

  return (
    <div
      className="grid divide-x divide-border/50 w-full h-full divide"
      style={{
        gridTemplateColumns: `repeat(${columns}, var(--gantt-column-width))`,
      }}
    >
      {Array.from({ length: columns }).map((_, index) => (
        <GanttColumn
          key={`${id}-${index}`}
          index={index}
          isColumnSecondary={isColumnSecondary}
        />
      ))}
    </div>
  );
};

export type GanttCreateMarkerTriggerProps = {
  onCreateMarker: (date: Date) => void;
  className?: string;
};

export const GanttCreateMarkerTrigger: FC<GanttCreateMarkerTriggerProps> = ({
  onCreateMarker,
  className,
}) => {
  const gantt = useContext(GanttContext);
  const [mousePosition, mouseRef] = useMouse<HTMLDivElement>();
  const [windowScroll] = useWindowScroll();
  const x = useThrottle(
    mousePosition.x -
      (mouseRef.current?.getBoundingClientRect().x ?? 0) -
      (windowScroll.x ?? 0),
    10
  );

  const date = getDateByMousePosition(gantt, x);

  const handleClick = () => onCreateMarker(date);

  return (
    <div
      className={cn(
        "group pointer-events-none absolute top-0 left-0 h-full w-full select-none overflow-visible",
        className
      )}
      ref={mouseRef}
    >
      <div
        className="top-6 z-20 sticky flex flex-col justify-center items-center gap-1 opacity-0 group-hover:opacity-100 -ml-2 w-4 overflow-visible pointer-events-auto"
        style={{ transform: `translateX(${x}px)` }}
      >
        <button
          type="button"
          className="inline-flex z-50 justify-center items-center bg-card rounded-full w-4 h-4"
          onClick={handleClick}
        >
          <PlusIcon size={12} className="text-muted-foreground" />
        </button>
        <div className="bg-background/90 backdrop-blur-lg px-2 py-1 border border-border/50 rounded-full text-foreground text-xs whitespace-nowrap">
          {formatDate(date, "MMM dd, yyyy")}
        </div>
      </div>
    </div>
  );
};

export type GanttFeatureDragHelperProps = {
  featureId: GanttFeature["id"];
  direction: "left" | "right";
  date: Date | null;
};

export const GanttFeatureDragHelper: FC<GanttFeatureDragHelperProps> = ({
  direction,
  featureId,
  date,
}) => {
  const [, setDragging] = useGanttDragging();
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: `feature-drag-helper-${featureId}`,
  });

  const isPressed = Boolean(attributes["aria-pressed"]);

  useEffect(() => setDragging(isPressed), [isPressed, setDragging]);

  return (
    <div
      className={cn(
        "group -translate-y-1/2 !cursor-col-resize absolute top-1/2 z-[3] h-full w-6 rounded-md outline-none",
        direction === "left" ? "-left-2.5" : "-right-2.5"
      )}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      <div
        className={cn(
          "-translate-y-1/2 absolute top-1/2 h-[80%] w-1 rounded-sm bg-muted-foreground opacity-0 transition-all",
          direction === "left" ? "left-2.5" : "right-2.5",
          direction === "left" ? "group-hover:left-0" : "group-hover:right-0",
          isPressed && (direction === "left" ? "left-0" : "right-0"),
          "group-hover:opacity-100",
          isPressed && "opacity-100"
        )}
      />
      {date && (
        <div
          className={cn(
            "-translate-x-1/2 absolute top-10 hidden whitespace-nowrap rounded-lg border border-border/50 bg-background/90 px-2 py-1 text-foreground text-xs backdrop-blur-lg group-hover:block",
            isPressed && "block"
          )}
        >
          {format(date, "MMM dd, yyyy")}
        </div>
      )}
    </div>
  );
};

export type GanttFeatureItemCardProps = Pick<GanttFeature, "id"> & {
  children?: ReactNode;
};

export const GanttFeatureItemCard: FC<GanttFeatureItemCardProps> = ({
  id,
  children,
}) => {
  const [, setDragging] = useGanttDragging();
  const { attributes, listeners, setNodeRef } = useDraggable({ id });
  const isPressed = Boolean(attributes["aria-pressed"]);

  useEffect(() => setDragging(isPressed), [isPressed, setDragging]);

  return (
    <Card className="bg-background shadow-sm p-2 rounded-md w-full h-full text-xs">
      <div
        className={cn(
          "flex h-full w-full items-center justify-between gap-2 text-left",
          isPressed && "cursor-grabbing"
        )}
        {...attributes}
        {...listeners}
        ref={setNodeRef}
      >
        {children}
      </div>
    </Card>
  );
};

export type GanttFeatureItemProps = GanttFeature & {
  onMove?: (id: string, startDate: Date, endDate: Date | null) => void;
  children?: ReactNode;
  className?: string;
};

export const GanttFeatureItem: FC<GanttFeatureItemProps> = ({
  onMove,
  children,
  className,
  ...feature
}) => {
  const [scrollX] = useGanttScrollX();
  const gantt = useContext(GanttContext);
  const timelineStartDate = new Date(gantt.timelineData.at(0)?.year ?? 0, 0, 1);

  const parseDate = (dateString: string) => {
    const parsedDate = new Date(dateString);

    if (isNaN(parsedDate.getTime())) {
      return new Date();
    }

    if (parsedDate.getFullYear() < 2020) {
      return new Date(2025, parsedDate.getMonth(), parsedDate.getDate());
    }

    return parsedDate;
  };

  const [startDate, setstartDate] = useState<Date>(
    parseDate(feature.startDate)
  );
  const [endDate, setendDate] = useState<Date | null>(
    parseDate(feature.endDate)
  );
  const width = getWidth(startDate, endDate, gantt);
  const offset = getOffset(startDate, timelineStartDate, gantt);
  const addRange = getAddRange(gantt.range);
  const [mousePosition] = useMouse<HTMLDivElement>();

  const [previousMouseX, setPreviousMouseX] = useState(0);
  const [previousstartDate, setPreviousstartDate] = useState(startDate);
  const [previousendDate, setPreviousendDate] = useState(endDate);

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const handleItemDragStart = () => {
    setPreviousMouseX(mousePosition.x);
    setPreviousstartDate(startDate);
    setPreviousendDate(endDate);
  };

  const handleItemDragMove = () => {
    const currentDate = getDateByMousePosition(gantt, mousePosition.x);
    const originalDate = getDateByMousePosition(gantt, previousMouseX);

    if (gantt.range === "daily") {
      const delta = differenceInDays(currentDate, originalDate);
      const newStartDate = addDays(previousstartDate, delta);
      const newEndDate = previousendDate
        ? addDays(previousendDate, delta)
        : null;

      setstartDate(newStartDate);
      setendDate(newEndDate);
    } else {
      const delta = getInnerDifferenceIn(gantt.range)(
        currentDate,
        originalDate
      );
      const newStartDate = addDays(previousstartDate, delta);
      const newEndDate = previousendDate
        ? addDays(previousendDate, delta)
        : null;

      setstartDate(newStartDate);
      setendDate(newEndDate);
    }
  };

  const onDragEnd = () => onMove?.(feature.id, startDate, endDate);

  const handleLeftDragMove = () => {
    const ganttRect = gantt.ref?.current?.getBoundingClientRect();
    const x =
      mousePosition.x - (ganttRect?.left ?? 0) + scrollX - gantt.sidebarWidth;
    const newstartDate = getDateByMousePosition(gantt, x);

    setstartDate(newstartDate);
  };

  const handleRightDragMove = () => {
    const ganttRect = gantt.ref?.current?.getBoundingClientRect();
    const x =
      mousePosition.x - (ganttRect?.left ?? 0) + scrollX - gantt.sidebarWidth;
    const newendDate = getDateByMousePosition(gantt, x);

    setendDate(newendDate);
  };

  const isVisible = () => {
    if (gantt.range !== "daily" || !gantt.currentMonth) {
      return true;
    }

    const currentMonth = gantt.currentMonth.getMonth();
    const currentYear = gantt.currentMonth.getFullYear();
    const projectStartsInFutureMonth =
      startDate.getFullYear() > currentYear ||
      (startDate.getFullYear() === currentYear &&
        startDate.getMonth() > currentMonth);

    const projectOverlapsWithCurrentMonth =
      endDate &&
      (endDate.getFullYear() > currentYear ||
        (endDate.getFullYear() === currentYear &&
          endDate.getMonth() >= currentMonth)) &&
      (startDate.getFullYear() < currentYear ||
        (startDate.getFullYear() === currentYear &&
          startDate.getMonth() <= currentMonth));

    return (
      !projectStartsInFutureMonth &&
      (projectOverlapsWithCurrentMonth ||
        startDate.getMonth() === currentMonth) &&
      width > 0
    );
  };

  if (gantt.range === "daily" && !isVisible()) {
    return null;
  }

  return (
    <div
      className={cn("relative flex w-max min-w-full py-0.5", className)}
      style={{ height: "var(--gantt-row-height)" }}
    >
      <div
        className="top-0.5 absolute pointer-events-auto"
        style={{
          height: "calc(var(--gantt-row-height) - 4px)",
          width: Math.round(width),
          left: Math.round(offset),
        }}
      >
        {onMove && (
          <DndContext
            sensors={[mouseSensor]}
            modifiers={[restrictToHorizontalAxis]}
            onDragMove={handleLeftDragMove}
            onDragEnd={onDragEnd}
          >
            <GanttFeatureDragHelper
              direction="left"
              featureId={feature.id}
              date={startDate}
            />
          </DndContext>
        )}
        <DndContext
          sensors={[mouseSensor]}
          modifiers={[restrictToHorizontalAxis]}
          onDragStart={handleItemDragStart}
          onDragMove={handleItemDragMove}
          onDragEnd={onDragEnd}
        >
          <GanttFeatureItemCard id={feature.id}>
            {children ?? (
              <p className="flex-1 text-xs truncate">{feature.title}</p>
            )}
          </GanttFeatureItemCard>
        </DndContext>
        {onMove && (
          <DndContext
            sensors={[mouseSensor]}
            modifiers={[restrictToHorizontalAxis]}
            onDragMove={handleRightDragMove}
            onDragEnd={onDragEnd}
          >
            <GanttFeatureDragHelper
              direction="right"
              featureId={feature.id}
              date={endDate ?? addRange(startDate, 2)}
            />
          </DndContext>
        )}
        {width < 100 && (
          <p className="top-1/2 left-0 absolute text-xs whitespace-nowrap -translate-x-[calc(100%+0.5rem)] -translate-y-1/2">
            {feature.title}
          </p>
        )}
      </div>
    </div>
  );
};

export type GanttFeatureListGroupProps = {
  children: ReactNode;
  className?: string;
};

export const GanttFeatureListGroup: FC<GanttFeatureListGroupProps> = ({
  children,
  className,
}) => (
  <div className={className} style={{ paddingTop: "var(--gantt-row-height)" }}>
    {children}
  </div>
);

export type GanttFeatureListProps = {
  className?: string;
  children: ReactNode;
};

export const GanttFeatureList: FC<GanttFeatureListProps> = ({
  className,
  children,
}) => (
  <div
    className={cn("absolute top-0 left-0 h-full w-max space-y-4", className)}
    style={{ marginTop: "var(--gantt-header-height)" }}
  >
    {children}
  </div>
);

export const GanttMarker: FC<
  GanttMarkerProps & {
    onRemove?: (id: string) => void;
    className?: string;
  }
> = ({ label, date, id, onRemove, className }) => {
  const gantt = useContext(GanttContext);
  const differenceIn = getDifferenceIn(gantt.range);
  const timelineStartDate = new Date(gantt.timelineData.at(0)?.year ?? 0, 0, 1);
  const offset = differenceIn(date, timelineStartDate);
  const innerOffset = calculateInnerOffset(
    date,
    gantt.range,
    (gantt.columnWidth * gantt.zoom) / 100
  );
  const handleRemove = () => onRemove?.(id);

  return (
    <div
      className="top-0 left-0 z-20 absolute flex flex-col justify-center items-center h-full overflow-visible pointer-events-none select-none"
      style={{
        width: 0,
        transform: `translateX(calc(var(--gantt-column-width) * ${offset} + ${innerOffset}px))`,
      }}
    >
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <div
            className={cn(
              "group pointer-events-auto sticky top-0 flex select-auto flex-col flex-nowrap items-center justify-center whitespace-nowrap rounded-b-md bg-primary px-2 py-1 text-primary-foreground text-xs",
              className
            )}
          >
            {label}
            <span className="opacity-80 max-h-[0] group-hover:max-h-[2rem] overflow-hidden transition-all">
              {formatDate(date, "MMM dd, yyyy")}
            </span>
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          {onRemove ? (
            <ContextMenuItem
              className="flex items-center gap-2 text-destructive"
              onClick={handleRemove}
            >
              <TrashIcon size={16} />
              Remove marker
            </ContextMenuItem>
          ) : null}
        </ContextMenuContent>
      </ContextMenu>
      <div className={cn("h-full w-px bg-primary", className)} />
    </div>
  );
};

export type GanttProviderProps = {
  range?: Range;
  zoom?: number;
  onAddItem?: (date: Date) => void;
  children: ReactNode;
  className?: string;
  currentMonth?: Date;
};

export const GanttProvider: FC<GanttProviderProps> = ({
  zoom: initialZoom = 200,
  range = "monthly",
  onAddItem,
  children,
  className,
  currentMonth: propCurrentMonth,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [timelineData, setTimelineData] = useState<TimelineData>(
    createInitialTimelineData(propCurrentMonth || new Date())
  );
  const [, setScrollX] = useGanttScrollX();
  const [zoom, setZoom] = useState(initialZoom);
  const [isZooming, setIsZooming] = useState(false);

  const MIN_ZOOM = 50;
  const MAX_ZOOM = 500;
  const updateZoom = useCallback((newZoom: number) => {
    if (!scrollRef.current) return;

    const clampedZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, newZoom));

    setIsZooming(true);

    const currentScrollLeft = scrollRef.current.scrollLeft;
    const currentViewportCenter =
      currentScrollLeft + scrollRef.current.clientWidth / 2;

    setZoom((currentZoom) => {
      const zoomFactor = clampedZoom / currentZoom;
      const newViewportCenter = Math.round(currentViewportCenter * zoomFactor);
      const newScrollLeft = Math.round(
        newViewportCenter - scrollRef.current!.clientWidth / 2
      );

      const targetScrollLeft = Math.max(0, newScrollLeft);
      scrollRef.current!.scrollLeft = targetScrollLeft;

      requestAnimationFrame(() => {
        if (
          scrollRef.current &&
          Math.abs(scrollRef.current.scrollLeft - targetScrollLeft) > 1
        ) {
          scrollRef.current.scrollLeft = targetScrollLeft;
        }
        setScrollX(scrollRef.current?.scrollLeft || 0);
      });

      return clampedZoom;
    });

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsZooming(false);
      });
    });
  }, []);
  const sidebarElement = scrollRef.current?.querySelector(
    '[data-roadmap-ui="gantt-sidebar"]'
  );
  const headerHeight = 70;
  const sidebarWidth = 300; // Always set to 300 since we always have a sidebar
  const rowHeight = 36;
  let columnWidth = 50;
  if (range === "daily") {
    columnWidth = 60;
  } else if (range === "monthly") {
    columnWidth = 150;
  } else if (range === "quarterly") {
    columnWidth = 100;
  }

  const cssVariables = {
    "--gantt-zoom": `${zoom}`,
    "--gantt-column-width": `${(zoom / 100) * columnWidth}px`,
    "--gantt-header-height": `${headerHeight}px`,
    "--gantt-row-height": `${rowHeight}px`,
    "--gantt-sidebar-width": `${sidebarWidth}px`,
  } as CSSProperties;
  useEffect(() => {
    if (scrollRef.current && range !== "daily") {
      scrollRef.current.scrollLeft =
        scrollRef.current.scrollWidth / 2 - scrollRef.current.clientWidth / 2;
      setScrollX(scrollRef.current.scrollLeft);
    }
  }, [range, setScrollX]);
  const handleScroll = useCallback(
    throttle(() => {
      if (!scrollRef.current || isZooming) {
        return;
      }

      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

      setScrollX(scrollLeft);

      if (range === "daily") {
        return;
      }

      if (scrollLeft === 0) {
        const firstYear = timelineData[0]?.year;

        if (!firstYear) {
          return;
        }

        const newTimelineData: TimelineData = [...timelineData];
        newTimelineData.unshift({
          year: firstYear - 1,
          quarters: new Array(4).fill(null).map((_, quarterIndex) => ({
            months: new Array(3).fill(null).map((_, monthIndex) => {
              const month = quarterIndex * 3 + monthIndex;
              return {
                days: getDaysInMonth(new Date(firstYear, month, 1)),
              };
            }),
          })),
        });

        setTimelineData(newTimelineData);
        scrollRef.current.scrollLeft = scrollRef.current.clientWidth;
        setScrollX(scrollRef.current.scrollLeft);
      } else if (scrollLeft + clientWidth >= scrollWidth - 1) {
        const lastYear = timelineData.at(-1)?.year;

        if (!lastYear) {
          return;
        }
        const newTimelineData: TimelineData = [...timelineData];
        newTimelineData.push({
          year: lastYear + 1,
          quarters: new Array(4).fill(null).map((_, quarterIndex) => ({
            months: new Array(3).fill(null).map((_, monthIndex) => {
              const month = quarterIndex * 3 + monthIndex;
              return {
                days: getDaysInMonth(new Date(lastYear + 1, month, 1)),
              };
            }),
          })),
        });

        setTimelineData(newTimelineData);

        scrollRef.current.scrollLeft =
          scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
        setScrollX(scrollRef.current.scrollLeft);
      }
    }, 100),
    [timelineData, setScrollX, range, isZooming]
  );

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [handleScroll]);
  useEffect(() => {
    if (range === "daily" && scrollRef.current) {
      setScrollX(scrollRef.current.scrollLeft);

      const handleDailyScroll = (e: Event) => {
        if (isZooming) return;

        const target = e.target as HTMLElement;
        setScrollX(target.scrollLeft);
      };

      scrollRef.current.addEventListener("scroll", handleDailyScroll, {
        passive: true,
      });

      return () => {
        if (scrollRef.current) {
          scrollRef.current.removeEventListener("scroll", handleDailyScroll);
        }
      };
    }
  }, [range, setScrollX, isZooming]);
  const [currentMonth, setCurrentMonth] = useState<Date>(() => {
    return propCurrentMonth || new Date();
  });

  const scrollToToday = useCallback(() => {
    if (!scrollRef.current) return;

    const today = new Date();

    if (range === "daily") {
      if (currentMonth) {
        const currentMonthValue = currentMonth.getMonth();
        const currentYear = currentMonth.getFullYear();

        if (
          today.getMonth() === currentMonthValue &&
          today.getFullYear() === currentYear
        ) {
          const dayOfMonth = today.getDate() - 1;
          const columnWidth = (zoom / 100) * 60;
          const scrollPosition = dayOfMonth * columnWidth;

          scrollRef.current.scrollTo({
            left: scrollPosition,
            behavior: "smooth",
          });
        } else {
          setCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1));
          setTimeout(() => {
            if (scrollRef.current) {
              const dayOfMonth = today.getDate() - 1;
              const columnWidth = (zoom / 100) * 60;
              const scrollPosition = dayOfMonth * columnWidth;

              scrollRef.current.scrollTo({
                left: scrollPosition,
                behavior: "smooth",
              });
            }
          }, 100);
        }
      }
    } else {
      const timelineStartDate = new Date(timelineData.at(0)?.year ?? 0, 0, 1);
      const offset = getOffset(today, timelineStartDate, {
        zoom,
        range,
        columnWidth: range === "monthly" ? 150 : 100,
        sidebarWidth: 300,
        headerHeight: 70,
        rowHeight: 36,
        onAddItem,
        placeholderLength: 2,
        timelineData,
        ref: scrollRef,
        currentMonth,
        setCurrentMonth,
        scrollToToday,
      });

      const viewportWidth = scrollRef.current.clientWidth;
      const scrollPosition = offset - viewportWidth / 2;
      scrollRef.current.scrollTo({
        left: Math.max(0, scrollPosition),
        behavior: "smooth",
      });
    }
  }, [range, currentMonth, timelineData, onAddItem, setCurrentMonth]);

  useEffect(() => {
    if (propCurrentMonth) {
      setCurrentMonth(propCurrentMonth);
    }
  }, [propCurrentMonth]);

  const providerKey =
    range === "daily"
      ? `gantt-provider-${range}`
      : `gantt-provider-${range}-${currentMonth?.getFullYear()}-${currentMonth?.getMonth()}`;

  return (
    <GanttContext.Provider
      value={{
        zoom,
        setZoom: updateZoom,
        range,
        headerHeight,
        columnWidth,
        sidebarWidth,
        rowHeight,
        onAddItem,
        timelineData,
        placeholderLength: 2,
        ref: scrollRef,
        currentMonth,
        setCurrentMonth,
        scrollToToday,
      }}
    >
      <div
        key={providerKey}
        className={cn(
          "gantt relative grid h-full w-full flex-none select-none overflow-auto rounded-sm bg-secondary",
          range,
          className
        )}
        style={{
          ...cssVariables,
          gridTemplateColumns: "300px 1fr",
          scrollSnapType: "none",
          overscrollBehavior: "auto",
        }}
        ref={scrollRef}
      >
        {children}
      </div>
    </GanttContext.Provider>
  );
};

export type GanttTimelineProps = {
  children: ReactNode;
  className?: string;
};

export const GanttTimeline: FC<GanttTimelineProps> = ({
  children,
  className,
}) => {
  const gantt = useContext(GanttContext);
  const timelineRef = useRef<HTMLDivElement>(null);
  const handleWheel = useCallback(
    (event: WheelEvent) => {
      if (!gantt.setZoom) return;

      const target = event.target as HTMLElement;
      const sidebarElement = target.closest(
        '[data-roadmap-ui="gantt-sidebar"]'
      );
      if (sidebarElement) return;

      if (event.ctrlKey) {
        event.preventDefault();

        const ZOOM_SENSITIVITY = 0.1;
        const zoomDelta = -event.deltaY * ZOOM_SENSITIVITY;
        const newZoom = gantt.zoom + zoomDelta;

        gantt.setZoom(newZoom);
      }
    },
    [gantt]
  );
  useEffect(() => {
    const element = timelineRef.current;
    if (!element) return;

    element.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      element.removeEventListener("wheel", handleWheel);
    };
  }, [handleWheel]);

  return (
    <div
      ref={timelineRef}
      className={cn(
        "gantt-timeline relative flex h-full w-max flex-none overflow-clip",
        className
      )}
    >
      {children}
    </div>
  );
};

export type GanttTodayProps = {
  className?: string;
};

export const GanttToday: FC<GanttTodayProps> = ({ className }) => {
  const label = "Today";
  const date = new Date();
  const gantt = useContext(GanttContext);

  if (gantt.range === "daily" && gantt.currentMonth) {
    const currentMonth = gantt.currentMonth.getMonth();
    const currentYear = gantt.currentMonth.getFullYear();

    if (
      date.getMonth() === currentMonth &&
      date.getFullYear() === currentYear
    ) {
      const columnWidth = (gantt.columnWidth * gantt.zoom) / 100;
      const dayOfMonth = date.getDate() - 1;
      const offset = dayOfMonth;

      return (
        <div
          className="top-0 left-0 z-20 absolute flex flex-col justify-center items-center h-full overflow-visible pointer-events-none select-none"
          style={{
            width: 0,
            transform: `translateX(calc(var(--gantt-column-width) * ${offset} + ${
              columnWidth / 2
            }px))`,
          }}
          key={`today-marker-${currentYear}-${currentMonth}`}
        >
          <div
            className={cn(
              "group pointer-events-auto sticky top-0 flex select-auto flex-col flex-nowrap items-center justify-center whitespace-nowrap rounded-b-md bg-primary px-2 py-1 text-primary-foreground text-xs",
              className
            )}
          >
            {label}
            <span className="opacity-80 max-h-[0] group-hover:max-h-[2rem] overflow-hidden transition-all">
              {formatDate(date, "MMM dd, yyyy")}
            </span>
          </div>
          <div className={cn("h-full w-px bg-primary", className)} />
        </div>
      );
    }

    return null;
  }

  const differenceIn = getDifferenceIn(gantt.range);
  const timelineStartDate = new Date(gantt.timelineData.at(0)?.year ?? 0, 0, 1);
  const offset = differenceIn(date, timelineStartDate);
  const innerOffset = calculateInnerOffset(
    date,
    gantt.range,
    (gantt.columnWidth * gantt.zoom) / 100
  );

  return (
    <div
      className="top-0 left-0 z-20 absolute flex flex-col justify-center items-center h-full overflow-visible pointer-events-none select-none"
      style={{
        width: 0,
        transform: `translateX(calc(var(--gantt-column-width) * ${offset} + ${innerOffset}px))`,
      }}
    >
      <div
        className={cn(
          "group pointer-events-auto sticky top-0 flex select-auto flex-col flex-nowrap items-center justify-center whitespace-nowrap rounded-b-md bg-primary px-2 py-1 text-primary-foreground text-xs",
          className
        )}
      >
        {label}
        <span className="opacity-80 max-h-[0] group-hover:max-h-[2rem] overflow-hidden transition-all">
          {formatDate(date, "MMM dd, yyyy")}
        </span>
      </div>
      <div className={cn("h-full w-px bg-primary", className)} />
    </div>
  );
};
