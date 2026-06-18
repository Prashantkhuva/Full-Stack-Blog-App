import React, { useRef, useState, useCallback, useEffect } from "react";
import { Controller } from "react-hook-form";
import { motion } from "framer-motion";

const TOOLBAR_ITEMS = [
  { label: "Bold", cmd: "bold", icon: "B" },
  { label: "Italic", cmd: "italic", icon: "I" },
  { label: "Underline", cmd: "underline", icon: "U" },
  { label: "Strikethrough", cmd: "strikeThrough", icon: "S" },
  { type: "divider" },
  { label: "Heading 1", cmd: "heading", value: "h1", icon: "H1" },
  { label: "Heading 2", cmd: "heading", value: "h2", icon: "H2" },
  { label: "Heading 3", cmd: "heading", value: "h3", icon: "H3" },
  { type: "divider" },
  { label: "Bullet List", cmd: "insertUnorderedList", icon: "UL" },
  { label: "Numbered List", cmd: "insertOrderedList", icon: "OL" },
  { type: "divider" },
  { label: "Align Left", cmd: "justifyLeft", icon: "AL" },
  { label: "Center", cmd: "justifyCenter", icon: "AC" },
  { label: "Align Right", cmd: "justifyRight", icon: "AR" },
  { type: "divider" },
  { label: "Link", cmd: "link", icon: "🔗" },
  { label: "Blockquote", cmd: "formatBlock", value: "blockquote", icon: "❝" },
  { label: "Code Block", cmd: "formatBlock", value: "pre", icon: "</>" },
  { type: "divider" },
  { label: "Horizontal Rule", cmd: "insertHorizontalRule", icon: "—" },
  { label: "Remove Format", cmd: "removeFormat", icon: "✕" },
];

function ToolbarButton({ item, editorRef, onAction }) {
  if (item.type === "divider") {
    return <div className="mx-1 h-6 w-px bg-border" />;
  }

  return (
    <button
      type="button"
      title={item.label}
      className="flex h-8 w-8 items-center justify-center rounded-lg text-xs font-semibold text-text-muted transition-all duration-200 hover:bg-bg-secondary hover:text-text active:scale-90"
      onMouseDown={(e) => {
        e.preventDefault();
        onAction(item);
      }}
    >
      {item.icon}
    </button>
  );
}

export default function CustomEditor({ name, control, label, defaultValue = "" }) {
  const editorRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  const exec = useCallback((item) => {
    const editor = editorRef.current;
    if (!editor) return;

    editor.focus();

    if (item.cmd === "link") {
      const url = prompt("Enter URL:");
      if (url) document.execCommand("createLink", false, url);
      return;
    }

    if (item.cmd === "formatBlock" && item.value) {
      const selection = window.getSelection();
      if (selection && selection.toString()) {
        document.execCommand("formatBlock", false, `<${item.value}>`);
      }
      return;
    }

    document.execCommand(item.cmd, false, item.value || null);
  }, []);

  const handlePaste = useCallback((e) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain");
    document.execCommand("insertText", false, text);
  }, []);

  const handleChange = useCallback((onChange) => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  }, []);

  return (
    <div className="w-full">
      {label && (
        <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
          {label}
        </label>
      )}

      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => (
          <div
            className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
              isFocused
                ? "border-accent ring-1 ring-accent/50"
                : "border-border"
            }`}
          >
            <div className="flex flex-wrap items-center gap-0.5 border-b border-border bg-bg-secondary/50 px-2 py-2">
              {TOOLBAR_ITEMS.map((item, i) => (
                <ToolbarButton
                  key={i}
                  item={item}
                  editorRef={editorRef}
                  onAction={(action) => {
                    exec(action);
                    handleChange(onChange);
                  }}
                />
              ))}
            </div>

            <div
              ref={editorRef}
              contentEditable
              suppressContentEditableWarning
              className="min-h-[400px] w-full bg-bg-secondary px-5 py-4 text-text outline-none placeholder:text-text-muted/30"
              style={{ whiteSpace: "pre-wrap" }}
              data-placeholder="Write your content here..."
              onInput={() => handleChange(onChange)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onPaste={handlePaste}
              dangerouslySetInnerHTML={{ __html: defaultValue }}
            />
          </div>
        )}
      />
    </div>
  );
}
