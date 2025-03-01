import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { Bold, Italic, List, ListOrdered, Strikethrough } from "lucide-react";
import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { Toggle } from "@/components/ui/toggle";

type RichTextEditorProps = {
  content: string;
};

const RichTextEditor = ({ content }: RichTextEditorProps) => {
  const { setValue } = useFormContext();
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal pl-4",
          },
        },
        bulletList: {
          HTMLAttributes: {
            class: "list-disc pl-4",
          },
        },
      }),
      Placeholder.configure({
        placeholder: "Start writing...",
      }),
    ],
    onUpdate: ({ editor }) => {
      const content = editor.getHTML();

      setValue("content", content, {
        shouldValidate: true,
        shouldDirty: true,
      });
    },
  });

  useEffect(() => {
    if (editor?.isEmpty) editor.commands.setContent(content);
  }, [content]);

  return (
    <div>
      {editor && (
        <>
          <div className="flex gap-2 pb-2">
            <Toggle
              pressed={editor.isActive("bold")}
              onPressedChange={() => {
                editor.chain().focus().toggleBold().run();
              }}
              size="sm"
            >
              <Bold className="w-4 h-4" />
            </Toggle>
            <Toggle
              pressed={editor.isActive("italic")}
              onPressedChange={() => {
                editor.chain().focus().toggleItalic().run();
              }}
              size="sm"
            >
              <Italic className="w-4 h-4" />
            </Toggle>
            <Toggle
              pressed={editor.isActive("strike")}
              onPressedChange={() => {
                editor.chain().focus().toggleStrike().run();
              }}
              size="sm"
            >
              <Strikethrough className="w-4 h-4" />
            </Toggle>
            <Toggle
              pressed={editor.isActive("orderedList")}
              onPressedChange={() => {
                editor.chain().focus().toggleOrderedList().run();
              }}
              size="sm"
            >
              <ListOrdered className="w-4 h-4" />
            </Toggle>
            <Toggle
              pressed={editor.isActive("bulletList")}
              onPressedChange={() => {
                editor.chain().focus().toggleBulletList().run();
              }}
              size="sm"
            >
              <List className="w-4 h-4" />
            </Toggle>
          </div>
          <EditorContent
            placeholder="Start writing"
            editor={editor}
            className="border-2 rounded-lg p-3 outline-none"
          />
        </>
      )}
    </div>
  );
};

export default RichTextEditor;
