import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
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
import { Switch } from "@/components/ui/switch";

const AssignmentForm = () => {
  const form = useFormContext();
  const isGraded = form.watch("isGraded");

  return (
    <>
      <FormField
        control={form.control}
        name="isGraded"
        render={({ field }) => (
          <FormItem className="flex items-center gap-8">
            <FormLabel>Grade required?</FormLabel>
            <FormControl>
              <Switch
                defaultChecked={field.value}
                onCheckedChange={field.onChange}
                className="[margin-top:_0_!important]"
              />
            </FormControl>
          </FormItem>
        )}
      />
      {isGraded && (
        <FormField
          control={form.control}
          name="points"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Points</FormLabel>
              <Input
                placeholder="Points"
                type="number"
                {...field}
                onChange={(e) => field.onChange(e.target.valueAsNumber)}
              />
              <FormMessage />
            </FormItem>
          )}
        />
      )}
      <FormField
        control={form.control}
        name="maxAttempts"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Allowed attempts</FormLabel>
            <Input
              placeholder="Allowed attempts"
              type="number"
              {...field}
              onChange={(e) => field.onChange(e.target.valueAsNumber)}
            />
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="date"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Deadline</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  notAnimated
                  variant={"outline"}
                  className={cn(
                    "border rounded-lg justify-start text-left font-normal",
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
                    <span>Select dates</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0 w-auto" align="start">
                <Calendar
                  mode="range"
                  defaultMonth={field.value?.from}
                  selected={field.value}
                  onSelect={field.onChange}
                  numberOfMonths={2}
                />
                <div className="flex justify-between items-center p-4 pt-0">
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
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="submissionType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Submission type</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Select submission type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Submission type</SelectLabel>
                  <SelectItem value="text">Text</SelectItem>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="docx">Docs</SelectItem>
                  <SelectItem value="xlsx">Excel</SelectItem>
                  <SelectItem value="pptx">PPT</SelectItem>
                  <SelectItem value="mp4">MP4</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default AssignmentForm;
