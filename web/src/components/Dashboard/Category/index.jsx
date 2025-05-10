import { useEffect, useState } from "react";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import categoryService from "../../../services/categoryService";
import SweetAlert from "../../../utils/SweetAlert";
import AddButton from "../../General/AddButton";
import Pagination from "../../General/Pagination";
import TitleLine from "../../General/TitleLine";
import styles from "./Category.module.css";
import EditForm from "./EditForm";
import ViewModal from "./ViewModal";

const Category = () => {
  const [categories, setCategorys] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    layout: "",
    icon: "",
  });
  const tableHead = [
    "ID",
    "Name",
    "Description",
    "Layout",
    "Response",
    "Activity",
  ];

  useEffect(() => {
    getAllCategories();
  }, []);

  const getAllCategories = async () => {
    try {
      const result = await categoryService.getAll();

      const formattedCategorys = result.data.map((categorie) => ({
        id: categorie.id,
        name: `${categorie.name} (${categorie.slug})`,
        description: categorie.description || "No description",
        layout: categorie.layout || "default",
        icon: categorie.icon || "default",
        response: categorie.is_active ? "Enable" : "Disable",
      }));

      setCategorys(formattedCategorys);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const onAdd = () => {
    setEditingId(null);
    setFormData({ name: "", description: "", layout: "", icon: "" });
    setIsModalOpen(true);
  };

  const onEdit = (id) => {
    const categorieToEdit = categories.find((categorie) => categorie.id === id);
    if (categorieToEdit) {
      setFormData({
        name: categorieToEdit.name.split(" (")[0], // remove slug part
        description:
          categorieToEdit.description !== "No description"
            ? categorieToEdit.description
            : "",
        layout:
          categorieToEdit.layout !== "default" ? categorieToEdit.layout : "",
        icon: categorieToEdit.icon !== "default" ? categorieToEdit.icon : "",
        tags: [],
      });
      setEditingId(id);
      setIsModalOpen(true);
    }
  };

  const onDelete = async (id) => {
    const deleteConfirmed = await SweetAlert.deleteAlert();

    if (deleteConfirmed) {
      try {
        await categoryService.delete(id);
        getAllCategories();
        SweetAlert.successAlert("Category deleted successfully!");
      } catch (error) {
        console.error("Error deleting categorie:", error);
        SweetAlert.errorAlert("Failed to delete categorie!");
      }
    }
  };

  const [cid, setCid] = useState(null);
  const onView = async (id) => {
    setCid(id);
    setIsViewModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataCopy = { ...formData }; // formData কপি নিচ্ছি

      // ✅ name থেকে slug বানানো
      if (formDataCopy.name) {
        formDataCopy.slug = formDataCopy.name
          .toLowerCase()
          .replace(/\s+/g, "_") // এক বা একাধিক space কে _ দিয়ে বদলাও
          .replace(/[^\w_]+/g, ""); // অক্ষর আর _ ছাড়া সব রিমুভ করো
      }

      if (editingId) {
        await categoryService.update(editingId, formDataCopy);
        SweetAlert.successAlert("Category updated successfully!");
      } else {
        await categoryService.create(formDataCopy);
        SweetAlert.successAlert("Category added successfully!");
      }

      setIsModalOpen(false);
      getAllCategories();
    } catch (error) {
      console.error("Error saving categorie:", error);
      SweetAlert.errorAlert("Failed to save categorie!");
    }
  };

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const displayPerPage = 5;
  const totalPages = Math.ceil(categories.length / displayPerPage);
  const startIndex = (currentPage - 1) * displayPerPage;
  const displayedCategories = categories.slice(
    startIndex,
    startIndex + displayPerPage
  );

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <>
      <TitleLine title="Categorys">
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
          {displayedCategories.length > 0 ? (
            displayedCategories.map((row, index) => (
              <tr key={index}>
                <td>{row.id}</td>
                <td>{row.name}</td>
                <td>{row.description}</td>
                <td>{row.layout}</td>
                <td>{row.response}</td>
                <td>
                  <button
                    className={styles.viewBtn}
                    onClick={() => onView(row.id)}
                  >
                    <FaEye title="View" />
                  </button>
                  <button
                    className={styles.editBtn}
                    onClick={() => onEdit(row.id)}
                  >
                    <FaEdit title="Edit" />
                  </button>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => onDelete(row.id)}
                  >
                    <FaTrashAlt title="Delete" />
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
        <EditForm
          title="Category"
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          setIsModalOpen={setIsModalOpen}
          editingId={editingId}
        />
      )}

      {/* Modal */}

      {isViewModalOpen && (
        <ViewModal cid={cid} onClose={() => setIsViewModalOpen(false)} />
      )}
    </>
  );
};

export default Category;
