import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "./button";
import { Popover, PopoverTrigger, PopoverContent } from "./popover";
import { FormControl } from "./form";
import { cn } from "@/lib/utils";
import { Calendar } from "./calendar";
import { format } from "date-fns";

type DatePickerProps = {
  field: any;
};

const DatePicker = ({ field }: DatePickerProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant={"outline"}
            className={cn(
              "w-[240px] pl-3 text-left font-normal",
              !field.value && "text-muted-foreground"
            )}
          >
            {field.value ? (
              format(field.value, "PPP")
            ) : (
              <span>Pick a date</span>
            )}
            <CalendarIcon className="opacity-50 ml-auto w-4 h-4" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-auto" align="start">
        <Calendar
          mode="single"
          selected={field.value}
          onSelect={field.onChange}
          disabled={(date) =>
            date > new Date() || date < new Date("1900-01-01")
          }
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
