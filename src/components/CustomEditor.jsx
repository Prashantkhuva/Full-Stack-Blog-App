import React, { useRef } from "react";
import { Controller } from "react-hook-form";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import LinkExtension from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link,
  TextQuote,
  Code2,
  SeparatorHorizontal,
  RemoveFormatting,
  Undo2,
  Redo2,
} from "lucide-react";

function ToolbarButton({ icon: Icon, label, isActive, onClick }) {
  return (
    <button
      type="button"
      title={label}
      className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-200 active:scale-90 ${
        isActive
          ? "bg-accent/20 text-accent shadow-[inset_0_0_0_1px_rgba(245,158,11,0.3)]"
          : "text-text-muted hover:bg-bg-secondary hover:text-text"
      }`}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      <Icon size={16} />
    </button>
  );
}

function Divider() {
  return <div className="mx-1 h-6 w-px bg-border" />;
}

function Editor({ label, defaultValue, onChangeRef }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Underline,
      LinkExtension.configure({
        openOnClick: false,
        HTMLAttributes: { class: "text-accent underline" },
      }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: defaultValue || "",
    onUpdate: ({ editor }) => {
      onChangeRef.current?.(editor.isEmpty ? "" : editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-invert max-w-none min-h-[400px] w-full bg-bg-secondary px-5 py-4 text-text outline-none focus:outline-none " +
          "[&_h1]:text-[2em] [&_h1]:font-bold [&_h1]:leading-[1.2] [&_h1]:mb-3 [&_h1]:mt-2 [&_h1]:text-white " +
          "[&_h2]:text-[1.5em] [&_h2]:font-semibold [&_h2]:leading-[1.3] [&_h2]:mb-2.5 [&_h2]:mt-2 [&_h2]:text-white " +
          "[&_h3]:text-[1.25em] [&_h3]:font-semibold [&_h3]:leading-[1.4] [&_h3]:mb-2 [&_h3]:mt-1.5 [&_h3]:text-gray-100 " +
          "[&_blockquote]:border-l-3 [&_blockquote]:border-accent [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-gray-400 [&_blockquote]:my-4 " +
          "[&_pre]:bg-[#111] [&_pre]:rounded-lg [&_pre]:p-4 [&_pre]:overflow-x-auto [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-sm [&_pre_code]:text-gray-300 " +
          "[&_code]:bg-[#222] [&_code]:rounded [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-sm [&_code]:text-accent " +
          "[&_ul]:pl-5 [&_ol]:pl-5 [&_li]:my-1 " +
          "[&_a]:text-accent [&_a]:underline " +
          "[&_hr]:border-border [&_hr]:my-6 " +
          "[&_p]:leading-relaxed [&_p]:mb-2",
      },
    },
  });

  if (!editor) return null;

  const items = [
    { icon: Undo2, label: "Undo", onClick: () => editor.chain().focus().undo().run(), isActive: false },
    { icon: Redo2, label: "Redo", onClick: () => editor.chain().focus().redo().run(), isActive: false },
    "divider",
    { icon: Bold, label: "Bold", onClick: () => editor.chain().focus().toggleBold().run(), isActive: editor.isActive("bold") },
    { icon: Italic, label: "Italic", onClick: () => editor.chain().focus().toggleItalic().run(), isActive: editor.isActive("italic") },
    { icon: UnderlineIcon, label: "Underline", onClick: () => editor.chain().focus().toggleUnderline().run(), isActive: editor.isActive("underline") },
    { icon: Strikethrough, label: "Strikethrough", onClick: () => editor.chain().focus().toggleStrike().run(), isActive: editor.isActive("strike") },
    "divider",
    { icon: Heading1, label: "Heading 1", onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(), isActive: editor.isActive("heading", { level: 1 }) },
    { icon: Heading2, label: "Heading 2", onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), isActive: editor.isActive("heading", { level: 2 }) },
    { icon: Heading3, label: "Heading 3", onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(), isActive: editor.isActive("heading", { level: 3 }) },
    "divider",
    { icon: List, label: "Bullet List", onClick: () => editor.chain().focus().toggleBulletList().run(), isActive: editor.isActive("bulletList") },
    { icon: ListOrdered, label: "Numbered List", onClick: () => editor.chain().focus().toggleOrderedList().run(), isActive: editor.isActive("orderedList") },
    "divider",
    { icon: AlignLeft, label: "Align Left", onClick: () => editor.chain().focus().setTextAlign("left").run(), isActive: editor.isActive({ textAlign: "left" }) },
    { icon: AlignCenter, label: "Center", onClick: () => editor.chain().focus().setTextAlign("center").run(), isActive: editor.isActive({ textAlign: "center" }) },
    { icon: AlignRight, label: "Align Right", onClick: () => editor.chain().focus().setTextAlign("right").run(), isActive: editor.isActive({ textAlign: "right" }) },
    "divider",
    {
      icon: Link, label: "Link", onClick: () => {
        const url = prompt("Enter URL:");
        if (url) editor.chain().focus().setLink({ href: url }).run();
      }, isActive: editor.isActive("link"),
    },
    { icon: TextQuote, label: "Blockquote", onClick: () => editor.chain().focus().toggleBlockquote().run(), isActive: editor.isActive("blockquote") },
    { icon: Code2, label: "Code Block", onClick: () => editor.chain().focus().toggleCodeBlock().run(), isActive: editor.isActive("codeBlock") },
    "divider",
    { icon: SeparatorHorizontal, label: "Horizontal Rule", onClick: () => editor.chain().focus().setHorizontalRule().run(), isActive: false },
    { icon: RemoveFormatting, label: "Remove Format", onClick: () => editor.chain().focus().unsetAllMarks().run(), isActive: false },
  ];

  return (
    <div className="w-full">
      {label && (
        <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
          {label}
        </label>
      )}

      <div className="overflow-hidden rounded-2xl border border-border transition-all duration-300 focus-within:border-accent focus-within:ring-1 focus-within:ring-accent/50">
        <div className="flex flex-wrap items-center gap-0.5 border-b border-border bg-bg-secondary/50 px-2 py-2">
          {items.map((item, i) =>
            item === "divider" ? <Divider key={i} /> : <ToolbarButton key={i} {...item} />,
          )}
        </div>

        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

export default function CustomEditor({ name, control, label, defaultValue = "" }) {
  const onChangeRef = useRef(null);

  return (
    <Controller
      name={name || "content"}
      control={control}
      render={({ field: { onChange } }) => {
        onChangeRef.current = onChange;
        return <Editor label={label} defaultValue={defaultValue} onChangeRef={onChangeRef} />;
      }}
    />
  );
}
