import { FC } from "react";

type DateDividerProps = {
  date: string;
};

const DateDivider: FC<DateDividerProps> = ({ date }) => (
  <div className="flex items-center my-2">
    <div className="flex-grow border-t border-border" />
    <span className="bg-card mx-4 px-2 rounded text-muted-foreground text-xs">
      {date}
    </span>
    <div className="flex-grow border-t border-border" />
  </div>
);

export default DateDivider;
