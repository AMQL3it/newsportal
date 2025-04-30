import React, { useEffect, useState } from "react";
import Modal from "../../General/Modal";
import categoryService from "../../../services/categoryService";
import tagService from "../../../services/tagService";
import SweetAlert from "../../../utils/SweetAlert";

const ViewModal = ({
  cid,
  onClose
}) => {
    const [category, setCategory ] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]); 
    const [allTags, setAllTags] = useState([]); I
    const [selectedTagId, setSelectedTagId] = useState(""); 

    useEffect(() => {
        fetchAllTags();
        fetchCategoryById(cid);
    }, []);

    // 👉 API Call to fetch all tags
    const fetchAllTags = async () => {
        const res = await tagService.getAll("tags");
        setAllTags(res.data);
    };

    // 👉 API Call to fetch category by id
    const fetchCategoryById = async (cid) => {
        const res = await categoryService.getById(cid);
        console.log(res.data);
        
        setCategory(res.data);
        setSelectedTags(res.data.tags);
    };

    // ✅ Handle dropdown change
    const handleSelectTag = (e) => {
        setSelectedTagId(e.target.value);
    };

    // ✅ Add tag to selectedTags
    const handleAddTag = async () => {
        const tagToAdd = allTags.find(tag => tag.id === parseInt(selectedTagId));
        if (!tagToAdd) return;

        await categoryService.addTag(cid, { tag_id: tagToAdd.id });
        fetchCategoryById(cid);
        SweetAlert.successAlert("Tag added successfully!");
    };

    // ✅ Toggle tag active/inactive
    const handleToggleTagStatus = (tagId) => {
        setSelectedTags(prev =>
        prev.map(tag =>
            tag.id === tagId ? { ...tag, is_active: !tag.is_active } : tag
        )
        );
    };

    // ✅ Remove tag from list
    const handleRemoveTag = async (tagId) => {
        await categoryService.removeTag(cid, tagId);
        fetchCategoryById(cid);
        SweetAlert.successAlert("Tag removed successfully!");
    };

    return (
        <Modal onClose={onClose} title="Category Details">
        <div style={stylesObj.container}>
            {/* Category Info */}
            <div style={stylesObj.infoSection}>
            <p><strong>Name:</strong> {category.name}</p>
            <p><strong>Slug:</strong> {category.slug}</p>
            <p><strong>Description:</strong> {category.description || '—'}</p>
            <p><strong>Layout:</strong> {category.layout}</p>
            <p><strong>Status:</strong> {category.is_active ? "Active" : "Inactive"}</p>
            </div>

            {/* Tag Table and Tag Select */}
            <div style={stylesObj.bottomSection}>
            {/* Left: Tag Table */}
            <div style={stylesObj.tagTableContainer}>
                <table style={stylesObj.table}>
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Slug</th>
                    <th>ST</th>
                    <th>Act</th>
                    </tr>
                </thead>
                <tbody>
                    {selectedTags.length > 0 ? (
                    selectedTags.map((tag) => (
                        <tr key={tag.id}>
                        <td>{tag.name}</td>
                        <td>{tag.slug}</td>
                        <td>
                            <input
                            type="checkbox"
                            checked={tag.is_active}
                            onChange={() => handleToggleTagStatus(tag.id)}
                            />
                        </td>
                        <td>
                            <button onClick={() => handleRemoveTag(tag.id)} style={stylesObj.removeBtn}>
                            <i className="fa fa-trash" title="Remove"></i>
                            </button>
                        </td>
                        </tr>
                    ))
                    ) : (
                    <tr>
                        <td colSpan="4" style={{ textAlign: "center" }}>No tags added.</td>
                    </tr>
                    )}
                </tbody>
                </table>
            </div>

            {/* Right: Tag Selector */}
            <div style={stylesObj.tagSelector}>
                <label htmlFor="tagSelect">Select Tag:</label>
                <select id="tagSelect" onChange={handleSelectTag} style={stylesObj.select}>
                <option value="">-- Select a tag --</option>
                {allTags
                    .filter(tag => !selectedTags.some(t => t.id === tag.id))
                    .map((tag) => (
                    <option key={tag.id} value={tag.id}>
                        {tag.name}
                    </option>
                    ))}
                </select>
                <button onClick={handleAddTag} style={stylesObj.addBtn}>Add Tag</button>
            </div>
            </div>
        </div>
        </Modal>
    );
};

const stylesObj = {
    container: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
    infoSection: {
      backgroundColor: "#f9f9f9",
      padding: "15px",
      borderRadius: "8px",
      boxShadow: "0 0 4px rgba(0,0,0,0.1)",
      lineHeight: "1.8"
    },
    bottomSection: {
      display: "flex",
      gap: "20px",
      flexDirection: "row"
    },
    tagTableContainer: {
      flex: 2,
      overflowX: "auto"
    },
    table: {
      width: "90%",
      border: "1px solid #ccc",
      color: "#333",
      borderCollapse: "collapse"
    },
    tagSelector: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      gap: "10px"
    },
    select: {
      padding: "8px 10px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      fontSize: "14px"
    },
    addBtn: {
      padding: "8px 12px",
      backgroundColor: "#28a745",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer"
    },
    removeBtn: {
      padding: "4px 8px",
      backgroundColor: "#dc3545",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer"
    }
};
  

export default ViewModal;
