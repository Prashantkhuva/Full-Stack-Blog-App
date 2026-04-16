import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";
import { div } from "framer-motion/client";

export default function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-text-muted mb-2">
        {label}
      </label>

      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            apiKey="o7wexp2vgdy9k5ooiu81z0iacjovoli1f5k270udt2ijz2mn"
            initialValue={defaultValue}
            init={{
              initialValue: defaultValue,
              height: 500,
              menubar: true,
              plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
              ],
              toolbar:
                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
              content_style:
                "body { font-family: 'Syne', Helvetica, Arial, sans-serif; font-size: 15px; background-color: #1a1a1a; color: #f5f5f5; }",
              skin: "oxide-dark",
              content_css: "dark",
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}
