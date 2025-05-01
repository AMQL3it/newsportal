import React, { useEffect, useState } from 'react';
import Modal from '../../General/Modal';
import categoryService from '../../../services/categoryService';

const NewsForm = ({
  title,
  formData,
  setFormData,
  handleSubmit,
  setIsModalOpen,
  editingId
}) => {
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const layouts = ["Standard", "Featured", "Minimal"];

  useEffect(() => {
    fetchCategoriesWithTags();
  }, []);

  const fetchCategoriesWithTags = async () => {
    try {
      const res = await categoryService.getAll(); // Make sure this returns `tags` inside each category
      setCategories(res.data);

      // Pre-load tags if editing existing post
      if (formData.category_id) {
        const cat = res.data.find(c => c.id === formData.category_id);
        if (cat) setTags(cat.tags || []);
      }
    } catch (error) {
      console.error("Failed to load categories", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "category_id") {
      const selectedCatId = parseInt(value);
      const selectedCategory = categories.find(c => c.id === selectedCatId);
      setTags(selectedCategory?.tags || []);
      setFormData({ ...formData, [name]: selectedCatId, tagIds: [] }); // reset selected tags
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleTagToggle = (tagId) => {
    const currentTags = formData.tagIds || [];
    const updatedTags = currentTags.includes(tagId)
      ? currentTags.filter(id => id !== tagId)
      : [...currentTags, tagId];
    setFormData({ ...formData, tagIds: updatedTags });
  };

  return (
    <Modal
      onClose={() => setIsModalOpen(false)}
      onSubmit={handleSubmit}
      status="form"
      title={editingId ? `Edit ${title}` : `Add ${title}`}
    >
      <form style={styleObj.form}>
        <div style={styleObj.inputSection}>
          <label>Headline:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            style={styleObj.input}
            required
          />
        </div>

        <div style={styleObj.inputSection}>
          <label>Author:</label>
          <input
            type="text"
            name="auther"
            value={formData.auther}
            onChange={handleInputChange}
            style={styleObj.input}
            required
          />
        </div>

        <div style={styleObj.inputSection}>
          <label>Content:</label>
          <textarea
            name="content"
            rows="5"
            value={formData.content}
            onChange={handleInputChange}
            style={styleObj.textarea}
            required
          />
        </div>

        <div style={styleObj.inputSection}>
          <label>Cover Image:</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {imagePreview && (
            <img src={imagePreview} alt="preview" style={{ height: 80, marginTop: 5 }} />
          )}
        </div>

        <div style={styleObj.inputSection}>
          <label>Layout:</label>
          <select
            name="layout"
            value={formData.layout}
            onChange={handleInputChange}
            style={styleObj.select}
            required
          >
            <option value="">Select Layout</option>
            {layouts.map((layout, idx) => (
              <option key={idx} value={layout}>{layout}</option>
            ))}
          </select>
        </div>

        <div style={styleObj.inputSection}>
          <label>Category:</label>
          <select
            name="category_id"
            value={formData.category_id || ''}
            onChange={handleInputChange}
            style={styleObj.select}
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        {tags.length > 0 && (
            <div style={styleObj.inputSection}>
                <label>Tags:</label>
                <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '10px'
                }}>
                {tags.map((tag) => (
                    <label key={tag.id} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <input
                        type="checkbox"
                        checked={formData.tagIds?.includes(tag.id) || false}
                        onChange={() => handleTagToggle(tag.id)}
                    />
                    <span>{tag.name}</span>
                    </label>
                ))}
                </div>
            </div>
        )}


        {/* <div style={styleObj.buttonSection}>
          <button type="submit" style={styleObj.submitBtn}>
            {editingId ? "Update" : "Create"}
          </button>
          <button type="button" onClick={() => setIsModalOpen(false)} style={styleObj.cancelBtn}>
            Cancel
          </button>
        </div> */}
      </form>
    </Modal>
  );
};

const styleObj = {
  form: {
    padding: "15px",
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },
  inputSection: {
    display: "flex",
    flexDirection: "column",
    gap: "5px"
  },
  input: {
    padding: "8px 12px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "14px"
  },
  textarea: {
    padding: "8px 12px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "14px",
    resize: "vertical"
  },
  select: {
    padding: "8px 12px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "14px",
    backgroundColor: "#fff",
    width: "100%",
    cursor: "pointer"
  },
  buttonSection: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px"
  },
  submitBtn: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "8px 16px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer"
  },
  cancelBtn: {
    backgroundColor: "gray",
    color: "#fff",
    padding: "8px 16px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer"
  }
};

export default NewsForm;
