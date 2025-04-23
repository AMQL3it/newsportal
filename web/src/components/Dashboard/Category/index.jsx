import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Category.module.css";
import Pagination from "../../General/Pagination";
import TitleLine from "../../General/TitleLine";
import AddButton from "../../General/AddButton";
import Modal from "../../General/Modal"; // new modal component
import apiService from "../../../services/apiService";
import { IoIosCheckmarkCircleOutline, IoIosCloseCircleOutline } from "react-icons/io";

const Category = () => {
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ name: "", slug: "", description: "", layout: "", color: "", is_active: true });

  const [isModalOpen, setIsModalOpen] = useState(false); // modal state
  const [newCategory, setNewCategory] = useState({ name: "", color: ""});

  const [currentPage, setCurrentPage] = useState(1);
  const categoriesPerPage = 5;
  const totalPages = Math.ceil(categories.length / categoriesPerPage);

  useEffect(() => {
    // Dummy fallback data (for design/testing)
   
    getCategories(); // pass dummy as fallback
  }, []);
  
  
  // ✅ Fixed async function with await + fallback
  const getCategories = async () => {
    try {
      const data = await apiService.getAll("categories"); // 🔥 await added
      console.log(data);
      setCategories(data.data); // ✅ use actual API data
    } catch (error) {
      console.error("Error fetching categories:", error);
      // setCategories(fallback); // 🛠 fallback to dummy if API fails
    }
  };

  const handleEdit = (cat) => {
    setEditingId(cat.id);
    setEditData({
      name: cat.name,
      slug: cat.slug,
      description: cat.description,
      layout: cat.layout,
      color: cat.color,
      is_active: cat.is_active
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleSave = async (id) => {
    try {
      const data = await apiService.put("categories", id, editData, { "Content-Type": "application/json" });
      console.log(data);
      getCategories();
      setEditingId(null);
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      try {
        // await fetch(`/api/categories/${id}`, { method: "DELETE" });
        setCategories((prev) => prev.filter((c) => c.id !== id));
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleAddCategory = () => {
    const newId = categories.length ? Math.max(...categories.map(c => c.id)) + 1 : 1;
    const newCat = { id: newId, ...newCategory };
    setCategories([...categories, newCat]);
    setNewCategory({ name: "", color: ""});
    setIsModalOpen(false);
  };

  const handleNewInput = (e) => {
    const { name, value } = e.target;
    setNewCategory({ ...newCategory, [name]: value });
  };

  // Paginated categories
  const startIndex = (currentPage - 1) * categoriesPerPage;
  const displayedCategories = categories.slice(startIndex, startIndex + categoriesPerPage);

  return (
    <div className={styles.container}>
      <TitleLine title="Categories">
        <AddButton onClick={() => setIsModalOpen(true)} />
      </TitleLine>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Layout</th>
            <th>Color</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayedCategories.map((cat) => (
            <tr key={cat.id}>
              <td>
                {editingId === cat.id ? (
                  <input type="number" name="is_active" value={editData.is_active} onChange={handleChange} />
                ) : (
                  cat.is_active ? <IoIosCheckmarkCircleOutline style={{ color: "green" }} /> : <IoIosCloseCircleOutline style={{ color: "red" }} />
                )}  
              </td>
              <td>
                {editingId === cat.id ? (
                  <input name="name" value={editData.name} onChange={handleChange} />
                ) : (
                  cat.name
                )}
              </td>

              <td>
                {editingId === cat.id ? (
                  <input name="description" value={editData.description} onChange={handleChange} />
                ) : (
                  cat.description
                )}
              </td>

              <td>
                {editingId === cat.id ? (
                  <input name="layout" value={editData.layout} onChange={handleChange} />
                ) : (
                  cat.layout
                )}
              </td>

              <td>
                {editingId === cat.id ? (
                  <input name="color" value={editData.color} onChange={handleChange} />
                ) : (
                  cat.color
                )}
              </td>
              
              <td>
                {editingId === cat.id ? (
                  <i className="fa fa-save" title="Save" onClick={() => handleSave(cat.id)} style={{ marginRight: "10px", cursor: "pointer" }}></i>
                ) : (
                  <i className="fa fa-edit" title="Edit" onClick={() => handleEdit(cat)} style={{ marginRight: "10px", cursor: "pointer" }}></i>
                )}
                <i className="fa fa-trash" title="Delete" onClick={() => handleDelete(cat.id)} style={{ color: "crimson", cursor: "pointer" }}></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {/* Modal for adding category */}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)} title="Add Category">
          <div className={styles.modalForm} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            
            <input name="name" value={newCategory.name} onChange={handleNewInput} placeholder="Category Name" style={{ width: "100%", padding: "5px", borderRadius: "5px", border: "1px solid #ccc", boxShadow: "0 2px 4px hsla(0, 0.00%, 0.00%, 0.30)", outline: "none", fontSize: "16px" }}/>
            
            <input type="number" name="color" value={newCategory.color} onChange={handleNewInput} placeholder="Category Color" style={{ width: "100%", padding: "5px", borderRadius: "5px", border: "1px solid #ccc", boxShadow: "0 2px 4px hsla(0, 0.00%, 0.00%, 0.30)", outline: "none", fontSize: "16px" }} />
            
            <button onClick={handleAddCategory} style={{ width: "fit-content", alignSelf: "center", backgroundColor: "var(--header-body-color)", color: "floralwhite", border: "none", padding: "5px 10px", borderRadius: "5px", cursor: "pointer", display: "flex", alignItems: "center", gap: "5px", transition: "all 1s ease"}}>Submit</button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Category;
