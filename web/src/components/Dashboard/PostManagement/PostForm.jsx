/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import categoryService from "../../../services/categoryService";
import Modal from "../../General/Modal";
import RichTextEditor from "./RichTextEditor";

const PostForm = ({
  title,
  formData,
  setFormData,
  handleSubmit,
  setIsModalOpen,
  // editingId,
}) => {
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [preview, setPreview] = useState(null);
  const layouts = ["Standard", "Featured", "Minimal"];
  const [content, setContent] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const res = await categoryService.getAll();
    setCategories(res.data);
    console.log(res.data);

    setContent(formData.content);

    if (formData.category_id) {
      const selected = res.data.find((c) => c.id === formData.category_id);
      setTags(selected?.tags || []);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "category_id") {
      const id = parseInt(value);
      const selected = categories.find((c) => c.id === id);
      setTags(selected?.tags || []);
      setFormData({ ...formData, category_id: id, tag_ids: [] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleContentChange = (newContent) => {
    setContent(newContent);
    setFormData({ ...formData, content: newContent });
  };

  const handleTagToggle = (tagId) => {
    const exists = formData.tag_ids.includes(tagId);
    const updated = exists
      ? formData.tag_ids.filter((id) => id !== tagId)
      : [...formData.tag_ids, tagId];

    setFormData({ ...formData, tag_ids: updated });
  };

  return (
    <Modal
      title={title}
      status="form"
      onClose={() => setIsModalOpen(false)}
      onSubmit={handleSubmit}
    >
      <form className="flex flex-col gap-4">
        {/* Title */}
        <div className="flex flex-col gap-1">
          <label className="font-medium">Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="border rounded px-3 py-2 text-sm"
          />
        </div>

        {/* Author */}
        <div className="flex flex-col gap-1">
          <label className="font-medium">Author:</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
            className="border rounded px-3 py-2 text-sm"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-1">
          <label className="font-medium">Content:</label>
          {/* <textarea
            name="content"
            rows={4}
            value={formData.content}
            onChange={handleChange}
            required
            className="border rounded px-3 py-2 text-sm"
          /> */}
          <RichTextEditor
            value={formData.content || content}
            onChange={handleContentChange}
          />
        </div>

        {/* <Preview /> */}

        {/* Image */}
        <div className="flex flex-col gap-1">
          <label className="font-medium">Cover Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="text-sm"
          />
          {preview && (
            <img src={preview} alt="preview" className="h-20 mt-2 rounded" />
          )}
        </div>

        {/* Layout */}
        <div className="flex flex-col gap-1">
          <label className="font-medium">Layout:</label>
          <select
            name="layout"
            value={formData.layout}
            onChange={handleChange}
            required
            className="border rounded px-3 py-2 text-sm"
          >
            <option value="">Select layout</option>
            {layouts.map((l, i) => (
              <option key={i} value={l}>
                {l}
              </option>
            ))}
          </select>
        </div>

        {/* Category */}
        <div className="flex flex-col gap-1">
          <label className="font-medium">Category:</label>
          <select
            name="category_id"
            value={formData.category_id || ""}
            onChange={handleChange}
            required
            className="border rounded px-3 py-2 text-sm"
          >
            <option value="">Select category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-col gap-1">
            <label className="font-medium">Tags:</label>
            <div className="grid grid-cols-2 gap-3">
              {tags.map((tag) => (
                <label key={tag.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.tag_ids.includes(tag.id)}
                    onChange={() => handleTagToggle(tag.id)}
                  />
                  <span className="text-sm">{tag.name}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </form>
    </Modal>
  );
};

export default PostForm;
