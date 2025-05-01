import React, { useEffect, useState } from "react";
import Modal from "../../General/Modal";
import categoryService from "../../../services/categoryService";

const PostForm = ({
  title,
  formData,
  setFormData,
  handleSubmit,
  setIsModalOpen,
  editingId,
}) => {
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [preview, setPreview] = useState(null);
  const layouts = ["Standard", "Featured", "Minimal"];

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const res = await categoryService.getAll();
    setCategories(res.data);

    if (formData.category_id) {
      const selected = res.data.find(c => c.id === formData.category_id);
      setTags(selected?.tags || []);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "category_id") {
      const id = parseInt(value);
      const selected = categories.find(c => c.id === id);
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

  const handleTagToggle = (tagId) => {
    const exists = formData.tag_ids.includes(tagId);
    const updated = exists
      ? formData.tag_ids.filter(id => id !== tagId)
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
      <form style={style.form}>
        <div style={style.group}>
          <label>Title:</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required />
        </div>

        <div style={style.group}>
          <label>Author:</label>
          <input type="text" name="auther" value={formData.auther} onChange={handleChange} required />
        </div>

        <div style={style.group}>
          <label>Content:</label>
          <textarea name="content" rows={4} value={formData.content} onChange={handleChange} required />
        </div>

        <div style={style.group}>
          <label>Cover Image:</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {preview && <img src={preview} alt="preview" height={80} />}
        </div>

        <div style={style.group}>
          <label>Layout:</label>
          <select name="layout" value={formData.layout} onChange={handleChange} required>
            <option value="">Select layout</option>
            {layouts.map((l, i) => <option key={i} value={l}>{l}</option>)}
          </select>
        </div>

        <div style={style.group}>
          <label>Category:</label>
          <select name="category_id" value={formData.category_id || ''} onChange={handleChange} required>
            <option value="">Select category</option>
            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>

        {tags.length > 0 && (
          <div style={style.group}>
            <label>Tags:</label>
            <div style={style.tagGrid}>
              {tags.map(tag => (
                <label key={tag.id} style={style.tagItem}>
                  <input
                    type="checkbox"
                    checked={formData.tag_ids.includes(tag.id)}
                    onChange={() => handleTagToggle(tag.id)}
                  />
                  {tag.name}
                </label>
              ))}
            </div>
          </div>
        )}
      </form>
    </Modal>
  );
};

const style = {
  form: { display: "flex", flexDirection: "column", gap: 15 },
  group: { display: "flex", flexDirection: "column", gap: 5 },
  tagGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 },
  tagItem: { display: "flex", alignItems: "center", gap: 5 },
};

export default PostForm;
