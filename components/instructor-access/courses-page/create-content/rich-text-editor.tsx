import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import ImageResize from "tiptap-extension-resize-image";
import {
  Bold,
  ImageIcon,
  Italic,
  List,
  ListOrdered,
  Strikethrough,
  Heading as HeadingIcon,
} from "lucide-react";
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Toggle } from "@/components/ui/toggle";
import { uploadImgToCloudinary } from "@/server/actions/upload-to-cloudinary";
import { toast } from "sonner";
import { uploadImage } from "@/server/actions/upload-image";
import { deleteImgFromCloudinary } from "@/server/actions/delete-from-cloudinary";
import { deleteImage } from "@/server/actions/delete-image";
import Heading from "@tiptap/extension-heading";

type RichTextEditorProps = {
  content: string;
};

const extractImageUrls = (html: string) => {
  const doc = new DOMParser().parseFromString(html, "text/html");

  return Array.from(doc.querySelectorAll("img")).map((img) => ({
    src: img.src,
    alt: img.alt,
  }));
};

const RichTextEditor = ({ content }: RichTextEditorProps) => {
  const [imgs, setImgs] = useState<
    {
      src: string;
      alt: string;
    }[]
  >([]);
  const { setValue, getValues } = useFormContext();
  const editor = useEditor({
    immediatelyRender: false,
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
        heading: {
          HTMLAttributes: {
            class: "text-2xl font-semibold",
          },
        },
      }),
      Placeholder.configure({
        placeholder: "Start writing...",
      }),
      ImageResize,
    ],
    editorProps: {
      attributes: {
        class: "text-sm border-none outline-none min-h-64",
      },
    },
    onUpdate: ({ editor }) => {
      const content = editor.getHTML();
      const newImages = extractImageUrls(editor.getHTML());
      const deletedImages = imgs.filter(
        (img) => !newImages.find((newImg) => newImg.src === img.src)
      );

      deletedImages.forEach(async (img) => {
        try {
          await deleteImgFromCloudinary(img.alt);
          await deleteImage({ public_id: img.alt });
        } catch (error) {
          console.error("Image deletion failed:", error);
        }
      });

      setImgs(newImages);

      setValue("content", content, {
        shouldValidate: true,
        shouldDirty: true,
      });
    },
  });

  useEffect(() => {
    if (editor?.isEmpty) editor.commands.setContent(content);
  }, [content]);

  const addImage = useCallback(
    async (e: ChangeEvent) => {
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0];

      if (file) {
        const { success: uploadedImg, error } = await uploadImgToCloudinary(
          file
        );

        if (uploadedImg) {
          try {
            await uploadImage({
              ...uploadedImg,
              content_id: getValues("id"),
            });

            editor
              ?.chain()
              .focus()
              .setImage({
                src: uploadedImg.secure_url,
                alt: uploadedImg.public_id,
              })
              .run();
          } catch (error) {
            console.log(error);
          }
        } else {
          toast.error(JSON.stringify(error));
        }
      }
    },
    [editor]
  );

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
            <Toggle
              pressed={editor.isActive("heading")}
              onPressedChange={() => {
                editor.chain().focus().toggleHeading({ level: 2 }).run();
              }}
              size="sm"
            >
              <HeadingIcon className="w-4 h-4" />
            </Toggle>
            <button
              type="button"
              onClick={() => console.log("clicked")}
              className="flex justify-center items-center hover:bg-accent hover:text-accent-foreground rounded-md transition-colors p-0 size-[36px] cursor-pointer"
            >
              <label htmlFor="img-input" className="px-2 py-2 cursor-pointer">
                <ImageIcon className="w-4 h-4 pointer-events-none" />
              </label>
            </button>
            <input
              type="file"
              onChange={addImage}
              className="hidden"
              name="img-input"
              id="img-input"
              accept="image/*"
            />
          </div>
          <EditorContent
            placeholder="Start writing"
            editor={editor}
            className="border-2 rounded-lg py-2 px-3 outline-none"
          />
        </>
      )}
    </div>
  );
};

export default RichTextEditor;
