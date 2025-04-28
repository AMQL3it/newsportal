import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Tag.module.css";
import Pagination from "../../General/Pagination";
import TitleLine from "../../General/TitleLine";
import AddButton from "../../General/AddButton";
import Modal from "../../General/Modal";
import apiService from "../../../services/apiService";
import SweetAlert from "../../../utils/SweetAlert";

const Tag = () => {
  const { id } = useParams();
  const [tags, setTags] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", description: "" });
  const tableHead = ["ID", "Name", "Description", "Response", "Activity"];

  useEffect(() => {
    getAllTags();
  }, []);

  const getAllTags = async () => {
    try {
      const result = await apiService.getAll("tags");
      const formattedTags = result.data.map(tag => ({
        id: tag.id,
        name: `${tag.name} (${tag.slug})`,
        description: tag.description || "No description",
        response: tag.is_active ? "Enable" : "Disable",
      }));
      setTags(formattedTags);
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };

  const onAdd = () => {
    setEditingId(null);
    setFormData({ name: "", description: "" });
    setIsModalOpen(true);
  };

  const onEdit = (id) => {
    const tagToEdit = tags.find(tag => tag.id === id);
    if (tagToEdit) {
      setFormData({
        name: tagToEdit.name.split(' (')[0], // remove slug part
        description: tagToEdit.description !== "No description" ? tagToEdit.description : "",
      });
      setEditingId(id);
      setIsModalOpen(true);
    }
  };

  const onDelete = async (id) => {
    const deleteConfirmed = await SweetAlert.deleteAlert();

    if (deleteConfirmed) {
      try {
        await apiService.deleteById("tags", id);
        getAllTags();
        SweetAlert.successAlert("Tag deleted successfully!");
      } catch (error) {
        console.error("Error deleting tag:", error);
        SweetAlert.errorAlert("Failed to delete tag!");
      }
    }
  };

  const onView = async (id) => {
    alert(`View button pressed for ID: ${id}`);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const formDataCopy = { ...formData }; // formData কপি নিচ্ছি
  
      // ✅ name থেকে slug বানানো
      if (formDataCopy.name) {
        formDataCopy.slug = formDataCopy.name
          .toLowerCase()
          .replace(/\s+/g, "_")    // এক বা একাধিক space কে _ দিয়ে বদলাও
          .replace(/[^\w_]+/g, ""); // অক্ষর আর _ ছাড়া সব রিমুভ করো
      }
  
      if (editingId) {
        await apiService.update("tags", editingId, formDataCopy);
        SweetAlert.successAlert("Tag updated successfully!");
      } else {
        await apiService.create("tags", formDataCopy);
        SweetAlert.successAlert("Tag added successfully!");
      }
  
      setIsModalOpen(false);
      getAllTags();
    } catch (error) {
      console.error("Error saving tag:", error);
      SweetAlert.errorAlert("Failed to save tag!");
    }
  };

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const displayPerPage = 5;
  const totalPages = Math.ceil(tags.length / displayPerPage);
  const startIndex = (currentPage - 1) * displayPerPage;
  const displayedTags = tags.slice(startIndex, startIndex + displayPerPage);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <>
      <TitleLine title="Tags">
        <AddButton onClick={onAdd} />
      </TitleLine>

      <table className={styles.table}>
        <thead>
          <tr>
            {tableHead.map((head, index) => (
              <th key={index}>{head}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {displayedTags.length > 0 ? (
            displayedTags.map((row, index) => (
              <tr key={index}>
                <td>{row.id}</td>
                <td>{row.name}</td>
                <td>{row.description}</td>
                <td>{row.response}</td>
                <td>
                  <button className={styles.viewBtn} onClick={() => onView(row.id)}>
                    <i className="fa fa-eye" title="View"></i>
                  </button>
                  <button className={styles.editBtn} onClick={() => onEdit(row.id)}>
                    <i className="fa fa-edit" title="Edit"></i>
                  </button>
                  <button className={styles.deleteBtn} onClick={() => onDelete(row.id)}>
                    <i className="fa fa-trash" title="Delete"></i>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={tableHead.length} style={{ textAlign: "center" }}>
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {/* Modal */}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)} title={editingId ? "Edit Tag" : "Add New Tag"}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputSection}>
              <label>Name: </label>
              <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter tag name"
                  required
                />
            </div>

            <div className={styles.inputSection}>
              <label >
                Description:
              </label>
              <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter tag description"
                  rows="3"
                />
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button type="submit" className={styles.viewBtn} style={{borderRadius: "5px"}}>
                {editingId ? "Update" : "Add"}
              </button>
              <button type="button" className={styles.deleteBtn} onClick={() => setIsModalOpen(false)} style={{ backgroundColor: "gray", borderRadius: "5px" }}>
                Cancel
              </button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};

export default Tag;
