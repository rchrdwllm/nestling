"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { GeneralSearchSchema } from "@/schemas/GeneralSearchSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useMemo } from "react";
import { useCurrentUser } from "@/hooks/use-current-user";

type SearchBarProps = {
  isInbox?: boolean;
};

const SearchBar = ({ isInbox }: SearchBarProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const form = useForm<z.infer<typeof GeneralSearchSchema>>({
    defaultValues: {
      query: searchParams.get("query") || "",
      tab: (searchParams.get("tab") as any) || "students",
    },
    resolver: zodResolver(GeneralSearchSchema),
  });
  const { user } = useCurrentUser();
  const entities = useMemo(() => {
    if (isInbox) {
      if (user.role === "admin") {
        return ["students", "instructors", "admins"];
      }

      return ["students", "instructors"];
    }

    if (user.role === "admin") {
      return [
        "students",
        "instructors",
        "admins",
        "courses",
        "contents",
        "projects",
      ];
    }

    if (user.role === "instructor") {
      return ["students", "courses", "contents", "projects"];
    }

    if (user.role === "student") {
      return ["courses", "contents"];
    }

    return [];
  }, [isInbox, user.role]);

  const handleSearch = useDebouncedCallback(
    async (term: string, page: number = 1) => {
      const params = new URLSearchParams(searchParams);

      if (term) {
        params.set("query", term);
        params.set("page", page.toString());
        params.set(
          "tab",
          form.getValues("tab") ||
            (user.role === "student" ? "courses" : "students")
        );
      } else {
        params.delete("query");
        params.delete("page");
        params.delete("tab");
      }

      replace(`${pathname}?${params.toString()}`);
    },
    200
  );

  const handleSubmit = (data: z.infer<typeof GeneralSearchSchema>) => {
    handleSearch(data.query);
  };

  useEffect(() => {
    form.setValue("tab", entities[0] as any);
  }, []);

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormField
          control={form.control}
          name="query"
          render={({ field }) => (
            <FormItem>
              <Input Icon={Search} placeholder="Search" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />{" "}
        <FormField
          control={form.control}
          name="tab"
          render={({ field }) => (
            <FormItem>
              <Tabs
                value={field.value || "all"}
                onValueChange={(value) => {
                  field.onChange(value);
                  // Reset pagination when tab changes
                  const currentQuery = form.getValues("query");
                  if (currentQuery) {
                    handleSearch(currentQuery, 1); // Reset to page 1
                  }
                }}
                className="w-full"
                defaultValue={field.value}
              >
                <TabsList className="w-full">
                  {entities.map((entity) => (
                    <TabsTrigger className="w-full" value={entity} key={entity}>
                      {entity.charAt(0).toUpperCase() + entity.slice(1)}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default SearchBar;
