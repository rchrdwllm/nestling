"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const SidebarBackBtn = () => {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      size="sm"
      className="ml-2 px-2 w-max text-muted-foreground"
      onClick={() => router.back()}
    >
      <ArrowLeft className="size-4" />
    </Button>
  );
};

export default SidebarBackBtn;
