import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    [{ size: ["small", false, "large", "huge"] }],
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ color: [] }, { background: [] }],
    ["clean"],
  ],
};

const formats = [
  "header",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "code-block",
  "list",
  "bullet",
  "color",
  "background",
];

export default function RichTextEditor({ value, onChange }) {
  const [editorContent, setEditorContent] = useState(value || "");

  const handleChange = (content) => {
    setEditorContent(content);
    if (onChange) onChange(content);
  };

  return (
    <div className="rounded-lg border border-gray-300 bg-white">
      <ReactQuill
        theme="snow"
        value={editorContent}
        onChange={handleChange}
        modules={modules}
        formats={formats}
        placeholder="Write your content here..."
        className="min-h-[200px]"
      />
    </div>
  );
}
