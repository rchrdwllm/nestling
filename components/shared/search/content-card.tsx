"use client";

import { Content } from "@/types";
import Link from "next/link";
import { ScrollText, FilePen, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSearchStore } from "@/context/search-context";

const ContentCard = ({ id, courseId, title, type }: Content) => {
  const { setSearchItemClicked } = useSearchStore();

  const Icon =
    type === "lesson"
      ? ScrollText
      : type === "assignment"
      ? FilePen
      : Paperclip;

  return (
    <Link
      href={`/courses/${courseId}/modules/content/${id}`}
      onClick={() => {
        setSearchItemClicked(true);
      }}
    >
      <Button
        variant="link"
        className="inline-flex justify-start items-center gap-3 p-0 w-full text-left"
      >
        <span>
          <Icon className="size-4" />
        </span>
        <h1>{title}</h1>
      </Button>
    </Link>
  );
};

export default ContentCard;
