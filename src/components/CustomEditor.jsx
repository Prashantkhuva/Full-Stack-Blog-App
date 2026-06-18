import { useRef, useMemo } from "react";
import { Controller } from "react-hook-form";
import JoditEditor from "jodit-react";
import "jodit/es5/jodit.min.css";

export default function CustomEditor({ name, control, label, defaultValue = "" }) {
  const editorRef = useRef(null);

  const config = useMemo(() => ({
    height: 500,
    placeholder: "Start typing...",
    theme: "dark",
    hidePoweredByJodit: true,
    toolbarButtonSize: "small",
    buttons: [
      "undo", "redo", "|",
      "bold", "italic", "underline", "strikethrough", "|",
      "superscript", "subscript", "|",
      "ul", "ol", "|",
      "outdent", "indent", "|",
      "paragraph", "|",
      "align", "|",
      "link", "|",
      "hr", "eraser", "|",
      "fullsize",
    ],
    showCharsCounter: false,
    showWordsCounter: false,
    showXPathInStatusbar: false,
    statusbar: false,
    askBeforePasteHTML: false,
    askBeforePasteFromWord: false,
    defaultActionOnPaste: "insert_clear_html",
    disablePlugins: [
      "source", "image", "video", "file", "table",
      "print", "about", "speechRecognize", "ai-assistant",
    ],
  }), []);

  return (
    <Controller
      name={name || "content"}
      control={control}
      render={({ field: { onChange } }) => (
        <div className="w-full">
          {label && (
            <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
              {label}
            </label>
          )}
          <div className="overflow-hidden rounded-2xl border border-border transition-all duration-300 focus-within:border-accent focus-within:ring-1 focus-within:ring-accent/50">
            <JoditEditor
              ref={editorRef}
              value={defaultValue}
              config={config}
              onChange={(newContent) => onChange(newContent)}
            />
          </div>
        </div>
      )}
    />
  );
}
