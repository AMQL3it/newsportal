import React, { useEffect, useState } from "react";
import styles from "./Post.module.css";
import Pagination from "../../General/Pagination";
import TitleLine from "../../General/TitleLine";
import AddButton from "../../General/AddButton";
import SweetAlert from "../../../utils/SweetAlert";
import postService from "../../../services/postService";
import PostForm from "./PostForm";

const PostManagement = () => {
  const [posts, setPosts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    content: "",
    image: "",
    is_active: true,
    layout: "",
    category_id: "",
    tag_ids: [],
    folder: "posts",
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const result = await postService.getAll();
      
      const formatted = result.data.map(p => ({
        ...p,
        tag_ids: p.tags.map(t => t.id) || [],
      }));

      setPosts(formatted);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleAdd = () => {
    setEditingId(null);
    setFormData({
      title: "",
      author: "",
      content: "",
      image: "",
      is_active: true,
      layout: "",
      category_id: "",
      tag_ids: [],
      folder: "posts",
    });
    setIsModalOpen(true);
  };

  const handleEdit = (id) => {
    const post = posts.find(p => p.id === id);
    if (post) {
      setFormData({
        title: post.title,
        author: post.author,
        content: post.content,
        image: post.image,
        is_active: post.is_active,
        layout: post.layout,
        category_id: post.category_id,
        tag_ids: post.tags.map(t => t.id) || [],
        folder: "posts",
      });
      setEditingId(id);
      setIsModalOpen(true);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = await SweetAlert.deleteAlert();
    if (confirmed) {
      try {
        await postService.delete(id);
        fetchPosts();
        SweetAlert.successAlert("Post deleted successfully!");
      } catch (error) {
        console.error("Delete error:", error);
        SweetAlert.errorAlert("Failed to delete post!");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const sendData = new FormData();
      sendData.append("title", formData.title);
      sendData.append("author", formData.author);
      sendData.append("content", formData.content);
      sendData.append("is_active", formData.is_active);
      sendData.append("layout", formData.layout);
      sendData.append("category_id", formData.category_id);
      sendData.append("folder", formData.folder);

      if (formData.image instanceof File) {
        sendData.append("image", formData.image);
      }

      sendData.append("tag_ids", JSON.stringify(formData.tag_ids));

      // sendData.append("tag_ids", formData.tag_ids);


      if (editingId) {
        await postService.update(editingId, sendData);
        SweetAlert.successAlert("Post updated!");
      } else {
        await postService.create(sendData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        SweetAlert.successAlert("Post added!");
      }

      setIsModalOpen(false);
      fetchPosts();
    } catch (err) {
      console.error("Submit error:", err);
      SweetAlert.errorAlert("Failed to save post!");
    }
  };

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5;
  const totalPages = Math.ceil(posts.length / perPage);
  const displayedPosts = posts.slice((currentPage - 1) * perPage, currentPage * perPage);

  return (
    <>
      <TitleLine title="Posts">
        <AddButton onClick={handleAdd} />
      </TitleLine>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Content</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayedPosts.length ? displayedPosts.map((p, idx) => (
            <tr key={idx}>
              <td>{p.id}</td>
              <td>{p.title}</td>
              <td>{p.author}</td>
              <td>{p.content?.slice(0, 50)}...</td>
              <td>
                {p.image ? (
                  <img src={`http://localhost:5000/${p.image}`} width={80} height={80} alt="cover" />
                ) : "No Image"}
              </td>
              <td>
                <button className={styles.editBtn} onClick={() => handleEdit(p.id)}>
                  <i className="fa fa-edit" />
                </button>
                <button className={styles.deleteBtn} onClick={() => handleDelete(p.id)}>
                  <i className="fa fa-trash" />
                </button>
              </td>
            </tr>
          )) : (
            <tr><td colSpan="6" style={{ textAlign: "center" }}>No data found</td></tr>
          )}
        </tbody>
      </table>

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />

      {isModalOpen && (
        <PostForm
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

export default PostManagement;
