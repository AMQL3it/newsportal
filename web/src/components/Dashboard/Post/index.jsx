import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Post.module.css";
import Pagination from "../../General/Pagination";
import TitleLine from "../../General/TitleLine";
import AddButton from "../../General/AddButton";
import SweetAlert from "../../../utils/SweetAlert";
import postService from "../../../services/postService";
import NewsForm from "./NewsForm";

const Post = () => {
  const [posts, setPosts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    auther: "",
    content: "",
    image: "",
    is_active: true,
    seo_score: 0,
    readable_score: 0,
    layout: "",
    category_id: "",
    tag_ids: [],
    folder: "posts",
  });
  const tableHead = ["ID", "Title", "Auther", "Content", "Image", "Activity"];

  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = async () => {
    try {
      const result = await postService.getAll("posts");
      console.log(result.data);
      
      const formattedPosts = result.data.map(post => ({
        id: post.id,
        title: post.title,
        auther: post.auther,
        content: post.content,
        image: post.image,
        is_active: post.is_active,
        seo_score: post.seo_score,
        readable_score: post.readable_score,
        layout: post.layout,
        category_id: post.category_id,
        tag_ids: post.tag_ids,
      }));
      setPosts(formattedPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const onAdd = () => {
    setEditingId(null);
    setFormData({ title: "", auther: "", content: "", image: "", is_active: true, seo_score: 0, readable_score: 0, layout: "", category_id: "", tag_ids: [], folder: "posts" });
    setIsModalOpen(true);
  };

  const onEdit = (id) => {
    const postToEdit = posts.find(post => post.id === id);
    if (postToEdit) {
      setFormData({
        title: postToEdit.title,
        auther: postToEdit.auther,
        content: postToEdit.content,
        image: postToEdit.image,
        is_active: postToEdit.is_active,
        seo_score: postToEdit.seo_score,
        readable_score: postToEdit.readable_score,
        layout: postToEdit.layout,
        category_id: postToEdit.category_id,
        tag_ids: postToEdit.tag_ids,
      });
      setEditingId(id);
      setIsModalOpen(true);
    }
  };

  const onDelete = async (id) => {
    const deleteConfirmed = await SweetAlert.deleteAlert();

    if (deleteConfirmed) {
      try {
        await postService.delete(id);
        getAllPosts();
        SweetAlert.successAlert("Post deleted successfully!");
      } catch (error) {
        console.error("Error deleting post:", error);
        SweetAlert.errorAlert("Failed to delete post!");
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
      const formDataCopy = { ...formData, folder: "posts" }; // formData কপি নিচ্ছি
  
      // ✅ name থেকে slug বানানো
      if (formDataCopy.name) {
        formDataCopy.slug = formDataCopy.name
          .toLowerCase()
          .replace(/\s+/g, "_")    // এক বা একাধিক space কে _ দিয়ে বদলাও
          .replace(/[^\w_]+/g, ""); // অক্ষর আর _ ছাড়া সব রিমুভ করো
      }

      console.log(formDataCopy);
      
  
      if (editingId) {
        await postService.update(editingId, formDataCopy);
        SweetAlert.successAlert("Post updated successfully!");
      } else {
        await postService.create(formDataCopy, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        SweetAlert.successAlert("Post added successfully!");
      }
  
      setIsModalOpen(false);
      getAllPosts();
    } catch (error) {
      console.error("Error saving post:", error);
      SweetAlert.errorAlert("Failed to save post!");
    }
  };

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const displayPerPage = 5;
  const totalPages = Math.ceil(posts.length / displayPerPage);
  const startIndex = (currentPage - 1) * displayPerPage;
  const displayedPosts = posts.slice(startIndex, startIndex + displayPerPage);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <>
      <TitleLine title="Posts">
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
          {displayedPosts.length > 0 ? (
            displayedPosts.map((row, index) => (
              <tr key={index}>
                <td>{row.id}</td>
                <td>{row.title}</td>
                <td>{row.auther}</td>
                <td>{row.content}</td>
                <td>
                  {row.image ? (
                    <img src={`http://localhost:5000/${row.image}`} alt="cover" height={100} width={100} />
                  ) : (
                    <span>No Image</span>
                  )}
                </td>
                {/* <td>{row.is_active ? "Active" : "Inactive"}</td> */}
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
        <NewsForm
          title={editingId ? "Edit Post" : "Add Post"}
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          setIsModalOpen={setIsModalOpen}
          editingId={editingId}
        />
      )}
    </>
  );
};

export default Post;
