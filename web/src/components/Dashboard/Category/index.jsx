import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Category.module.css";
import Pagination from "../../General/Pagination";
import TitleLine from "../../General/TitleLine";
import AddButton from "../../General/AddButton";
import Modal from "../../General/Modal"; // new modal component

const Category = () => {
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ name: "", color: ""});

  const [isModalOpen, setIsModalOpen] = useState(false); // modal state
  const [newCategory, setNewCategory] = useState({ name: "", color: ""});

  const [currentPage, setCurrentPage] = useState(1);
  const categoriesPerPage = 5;
  const totalPages = Math.ceil(categories.length / categoriesPerPage);

  useEffect(() => {
    const dummy = [
      { id: 1, name: "Politics", color: "blue" },
      { id: 2, name: "Sports", color: "red" },
      { id: 3, name: "Business", color: "green" },
      { id: 4, name: "Gadget", color: "yellow" },
      { id: 5, name: "Tech", color: "orange" },
      { id: 6, name: "Entertainment", color: "pink" },
      { id: 7, name: "Health", color: "blue" },
      { id: 8, name: "Travel", color: "green" },
      { id: 9, name: "Fashion", color: "red" },
      { id: 10, name: "Lifestyle", color: "yellow" },
      { id: 11, name: "Music", color: "orange" },
      { id: 12, name: "Food", color: "pink" },
      { id: 13, name: "Science", color: "blue" },
    ];
    setCategories(dummy);
  }, []);

  const handleEdit = (cat) => {
    setEditingId(cat.id);
    setEditData({
      name: cat.name,
      color: cat.color
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleSave = (id) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...editData } : c))
    );
    setEditingId(null);
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
            <th>Color</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayedCategories.map((cat) => (
            <tr key={cat.id}>
              <td>{cat.id}</td>
              <td>
                {editingId === cat.id ? (
                  <input name="name" value={editData.name} onChange={handleChange} />
                ) : (
                  cat.name
                )}
              </td>
              <td>
                {editingId === cat.id ? (
                  <input type="number" name="color" value={editData.color} onChange={handleChange} />
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
