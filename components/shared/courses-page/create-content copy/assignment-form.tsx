import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TimePicker } from "@/components/ui/time-picker";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useFormContext } from "react-hook-form";

const AssignmentForm = () => {
  const form = useFormContext();

  return (
    <>
      <FormField
        control={form.control}
        name="points"
        render={({ field }) => (
          <FormItem>
            <Input
              placeholder="Points"
              type="number"
              {...field}
              onChange={(e) => field.onChange(e.target.valueAsNumber)}
            />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="maxAttempts"
        render={({ field }) => (
          <FormItem>
            <Input
              placeholder="Allowed attempts"
              type="number"
              {...field}
              onChange={(e) => field.onChange(e.target.valueAsNumber)}
            />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="date"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  notAnimated
                  variant={"outline"}
                  className={cn(
                    "border-2 rounded-lg justify-start text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon />
                  {field.value?.from ? (
                    field.value.to ? (
                      <>
                        {format(field.value.from, "LLL dd, y p")} -{" "}
                        {format(field.value.to, "LLL dd, y p")}
                      </>
                    ) : (
                      format(field.value.from, "LLL dd, y p")
                    )
                  ) : (
                    <span>Deadline</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={field.value?.from}
                  selected={field.value}
                  onSelect={field.onChange}
                  numberOfMonths={2}
                />
                <div className="flex items-center justify-between p-4 pt-0">
                  <TimePicker
                    setDate={(date) => {
                      field.onChange({ ...field.value, from: date });
                    }}
                    date={field.value?.from}
                  />
                  <TimePicker
                    setDate={(date) => {
                      field.onChange({ ...field.value, to: date });
                    }}
                    date={field.value?.to}
                  />
                </div>
              </PopoverContent>
            </Popover>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="submissionType"
        render={({ field }) => (
          <FormItem>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Select submission type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Submission type</SelectLabel>
                  <SelectItem value="file">File</SelectItem>
                  <SelectItem value="text">Text</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />
    </>
  );
};

export default AssignmentForm;
