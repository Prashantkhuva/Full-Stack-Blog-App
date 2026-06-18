import React, { useRef, useState, useCallback, useEffect } from "react";
import { Controller } from "react-hook-form";

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

function getActiveBlock() {
  const sel = window.getSelection();
  if (!sel || !sel.rangeCount) return null;
  let node = sel.getRangeAt(0).commonAncestorContainer;
  while (node && node !== document.body) {
    const tag = node.nodeName?.toLowerCase();
    if (["h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "pre"].includes(tag)) {
      return tag;
    }
    node = node.parentNode;
  }
  return null;
}

function ToolbarButton({ item, isActive, onAction }) {
  if (item.type === "divider") {
    return <div className="mx-1 h-6 w-px bg-border" />;
  }

  return (
    <button
      type="button"
      title={item.label}
      className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-semibold transition-all duration-200 active:scale-90 ${
        isActive
          ? "bg-accent/20 text-accent shadow-[inset_0_0_0_1px_rgba(245,158,11,0.3)]"
          : "text-text-muted hover:bg-bg-secondary hover:text-text"
      }`}
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
  const [activeStates, setActiveStates] = useState({});

  const updateActiveStates = useCallback(() => {
    const states = {
      bold: document.queryCommandState("bold"),
      italic: document.queryCommandState("italic"),
      underline: document.queryCommandState("underline"),
      strikeThrough: document.queryCommandState("strikeThrough"),
      insertUnorderedList: document.queryCommandState("insertUnorderedList"),
      insertOrderedList: document.queryCommandState("insertOrderedList"),
      justifyLeft: document.queryCommandState("justifyLeft"),
      justifyCenter: document.queryCommandState("justifyCenter"),
      justifyRight: document.queryCommandState("justifyRight"),
    };

    const block = getActiveBlock();
    TOOLBAR_ITEMS.forEach((item) => {
      if (item.cmd === "heading" && item.value) {
        states[`heading:${item.value}`] = block === item.value;
      }
      if (item.cmd === "formatBlock" && item.value) {
        states[`formatBlock:${item.value}`] = block === item.value;
      }
    });

    setActiveStates(states);
  }, []);

  const exec = useCallback((item) => {
    const editor = editorRef.current;
    if (!editor) return;

    editor.focus();

    if (item.cmd === "link") {
      const url = prompt("Enter URL:");
      if (url) document.execCommand("createLink", false, url);
      updateActiveStates();
      return;
    }

    if (item.cmd === "formatBlock" && item.value) {
      const active = item.value === getActiveBlock();
      document.execCommand("formatBlock", false, active ? `<p>` : `<${item.value}>`);
      updateActiveStates();
      return;
    }

    if (item.cmd === "heading" && item.value) {
      const active = item.value === getActiveBlock();
      document.execCommand("formatBlock", false, active ? `<p>` : `<${item.value}>`);
      updateActiveStates();
      return;
    }

    document.execCommand(item.cmd, false, item.value || null);
    updateActiveStates();
  }, [updateActiveStates]);

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

  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;

    const onSelectionChange = () => {
      if (document.activeElement === editor) {
        updateActiveStates();
      }
    };

    document.addEventListener("selectionchange", onSelectionChange);
    return () => document.removeEventListener("selectionchange", onSelectionChange);
  }, [updateActiveStates]);

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
              {TOOLBAR_ITEMS.map((item, i) => {
                let isActive = false;
                if (item.cmd === "heading" && item.value) {
                  isActive = activeStates[`heading:${item.value}`];
                } else if (item.cmd === "formatBlock" && item.value) {
                  isActive = activeStates[`formatBlock:${item.value}`];
                } else if (item.cmd) {
                  isActive = activeStates[item.cmd];
                }

                return (
                  <ToolbarButton
                    key={i}
                    item={item}
                    isActive={isActive}
                    onAction={(action) => {
                      exec(action);
                      handleChange(onChange);
                    }}
                  />
                );
              })}
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
              onBlur={() => {
                setIsFocused(false);
                setActiveStates({});
              }}
              onPaste={handlePaste}
              onMouseUp={updateActiveStates}
              onKeyUp={updateActiveStates}
              dangerouslySetInnerHTML={{ __html: defaultValue }}
            />
          </div>
        )}
      />
    </div>
  );
}
