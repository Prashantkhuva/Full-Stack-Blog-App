import React, { useRef, useState, useCallback, useEffect } from "react";
import { Controller } from "react-hook-form";
import {
  Bold,
  Italic,
  Underline,
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
  Code,
  SeparatorHorizontal,
  RemoveFormatting,
} from "lucide-react";

const TOOLBAR_ITEMS = [
  { label: "Bold", cmd: "bold", icon: Bold },
  { label: "Italic", cmd: "italic", icon: Italic },
  { label: "Underline", cmd: "underline", icon: Underline },
  { label: "Strikethrough", cmd: "strikeThrough", icon: Strikethrough },
  { type: "divider" },
  { label: "Heading 1", cmd: "heading", value: "h1", icon: Heading1 },
  { label: "Heading 2", cmd: "heading", value: "h2", icon: Heading2 },
  { label: "Heading 3", cmd: "heading", value: "h3", icon: Heading3 },
  { type: "divider" },
  { label: "Bullet List", cmd: "insertUnorderedList", icon: List },
  { label: "Numbered List", cmd: "insertOrderedList", icon: ListOrdered },
  { type: "divider" },
  { label: "Align Left", cmd: "justifyLeft", icon: AlignLeft },
  { label: "Center", cmd: "justifyCenter", icon: AlignCenter },
  { label: "Align Right", cmd: "justifyRight", icon: AlignRight },
  { type: "divider" },
  { label: "Link", cmd: "link", icon: Link },
  { label: "Blockquote", cmd: "formatBlock", value: "blockquote", icon: TextQuote },
  { label: "Code Block", cmd: "formatBlock", value: "pre", icon: Code },
  { type: "divider" },
  { label: "Horizontal Rule", cmd: "insertHorizontalRule", icon: SeparatorHorizontal },
  { label: "Remove Format", cmd: "removeFormat", icon: RemoveFormatting },
];

const TOGGLE_CMDS = new Set([
  "bold", "italic", "underline", "strikeThrough",
  "insertUnorderedList", "insertOrderedList",
  "justifyLeft", "justifyCenter", "justifyRight",
]);

function ToolbarButton({ item, isActive, onAction }) {
  if (item.type === "divider") {
    return <div className="mx-1 h-6 w-px bg-border" />;
  }

  const Icon = item.icon;

  return (
    <button
      type="button"
      title={item.label}
      className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-200 active:scale-90 ${
        isActive
          ? "bg-accent/20 text-accent shadow-[inset_0_0_0_1px_rgba(245,158,11,0.3)]"
          : "text-text-muted hover:bg-bg-secondary hover:text-text"
      }`}
      onMouseDown={(e) => e.preventDefault()}
      onClick={(e) => {
        e.preventDefault();
        onAction(item);
      }}
    >
      <Icon size={16} />
    </button>
  );
}

function getBlockTag(node) {
  while (node && node !== document.body && node !== document.documentElement) {
    const tag = node.nodeName?.toLowerCase();
    if (["h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "pre", "li"].includes(tag)) {
      return tag;
    }
    node = node.parentNode;
  }
  return null;
}

function scanDOM() {
  const sel = window.getSelection();
  let block = null;
  if (sel && sel.rangeCount && sel.getRangeAt(0).commonAncestorContainer) {
    block = getBlockTag(sel.getRangeAt(0).commonAncestorContainer);
  }
  return {
    bold: document.queryCommandState("bold"),
    italic: document.queryCommandState("italic"),
    underline: document.queryCommandState("underline"),
    strikeThrough: document.queryCommandState("strikeThrough"),
    insertUnorderedList: document.queryCommandState("insertUnorderedList"),
    insertOrderedList: document.queryCommandState("insertOrderedList"),
    justifyLeft: document.queryCommandState("justifyLeft"),
    justifyCenter: document.queryCommandState("justifyCenter"),
    justifyRight: document.queryCommandState("justifyRight"),
    block,
  };
}

export default function CustomEditor({ name, control, label, defaultValue = "" }) {
  const editorRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const states = useRef({});

  const [, forceRender] = useState(0);
  const set = useCallback((key, val) => {
    states.current[key] = val;
    forceRender((n) => n + 1);
  }, []);

  const syncFromDOM = useCallback(() => {
    const s = scanDOM();
    states.current.bold = s.bold;
    states.current.italic = s.italic;
    states.current.underline = s.underline;
    states.current.strikeThrough = s.strikeThrough;
    states.current.insertUnorderedList = s.insertUnorderedList;
    states.current.insertOrderedList = s.insertOrderedList;
    states.current.justifyLeft = s.justifyLeft;
    states.current.justifyCenter = s.justifyCenter;
    states.current.justifyRight = s.justifyRight;
    states.current.block = s.block;
    forceRender((n) => n + 1);
  }, []);

  useEffect(() => {
    const el = editorRef.current;
    if (!el) return;
    const handler = () => {
      if (document.activeElement === el || el.contains(document.activeElement)) {
        syncFromDOM();
      }
    };
    document.addEventListener("selectionchange", handler);
    return () => document.removeEventListener("selectionchange", handler);
  }, [syncFromDOM]);

  const exec = useCallback((item) => {
    const editor = editorRef.current;
    if (!editor) return;
    editor.focus();

    if (item.cmd === "link") {
      const url = prompt("Enter URL:");
      if (url) document.execCommand("createLink", false, url);
      syncFromDOM();
      return;
    }

    if ((item.cmd === "heading" || item.cmd === "formatBlock") && item.value) {
      const curBlock = states.current.block;
      document.execCommand("formatBlock", false, curBlock === item.value ? `<p>` : `<${item.value}>`);
      syncFromDOM();
      return;
    }

    if (TOGGLE_CMDS.has(item.cmd)) {
      document.execCommand(item.cmd, false, item.value || null);
      states.current[item.cmd] = !states.current[item.cmd];
      forceRender((n) => n + 1);
      return;
    }

    document.execCommand(item.cmd, false, item.value || null);
    syncFromDOM();
  }, [syncFromDOM]);

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

  const isActive = useCallback((item) => {
    if (item.cmd === "heading" && item.value) return states.current.block === item.value;
    if (item.cmd === "formatBlock" && item.value) return states.current.block === item.value;
    return !!states.current[item.cmd];
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
                  isActive={isActive(item)}
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
              className="min-h-[400px] w-full bg-bg-secondary px-5 py-4 text-text outline-none"
              style={{ whiteSpace: "pre-wrap" }}
              onInput={() => handleChange(onChange)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onPaste={handlePaste}
              onMouseUp={syncFromDOM}
              onKeyUp={syncFromDOM}
              dangerouslySetInnerHTML={{ __html: defaultValue }}
            />
          </div>
        )}
      />
    </div>
  );
}
