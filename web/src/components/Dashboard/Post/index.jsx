import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "../Category/Category.module.css";
import Pagination from "../../General/Pagination";
import TitleLine from "../../General/TitleLine";
import AddButton from "../../General/AddButton";
import Modal from "../../General/Modal"; // new modal component
import apiService from "../../../services/apiService";
import { IoIosCheckmarkCircleOutline, IoIosCloseCircleOutline } from "react-icons/io";

const Post = () => {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ title: "", auther: "", content: "", image: "", is_active: true });

  const [isModalOpen, setIsModalOpen] = useState(false); // modal state
  const [newPost, setNewPost] = useState({ title: "", auther: "", content: "", image: "", is_active: true });

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;
  const totalPages = Math.ceil(posts.length / postsPerPage);

  useEffect(() => {
    // Dummy fallback data (for design/testing)
   
    getPosts(); // pass dummy as fallback
  }, []);
  
  
  // ✅ Fixed async function with await + fallback
  const getPosts = async () => {
    try {
      const data = await apiService.getAll("posts"); // 🔥 await added
      console.log(data);
      setPosts(data.data); // ✅ use actual API data
    } catch (error) {
      console.error("Error fetching posts:", error);
      // setPosts(fallback); // 🛠 fallback to dummy if API fails
    }
  };

  const handleEdit = (cat) => {
    setEditingId(cat.id);
    setEditData({
      title: cat.title,
      auther: cat.auther,
      content: cat.content,
      image: cat.image,
      // is_active: cat.is_active
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleSave = async (id) => {
    try {
      const data = await apiService.put("posts", id, editData, { "Content-Type": "application/json" });
      console.log(data);
      getPosts();
      setEditingId(null);
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      try {
        // await fetch(`/api/posts/${id}`, { method: "DELETE" });
        setPosts((prev) => prev.filter((c) => c.id !== id));
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

  const [selectedImage, setSelectedImage] = useState(null);

// const handleNewInput = (e) => {
//   const { name, value } = e.target;
//   setNewPost({ ...newPost, [name]: value });
// };

const handleImageChange = (e) => {
  setSelectedImage(e.target.files[0]);
};

  const handleAddPost = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
for (let key in newPost) {
  formData.append(key, newPost[key]);
}
formData.append("folder", "news"); 
formData.append("image", selectedImage);

// 🔥 FormData দেখা এইভাবে
for (let pair of formData.entries()) {
  console.log(pair[0], pair[1]);
}
    
  
    try {
      const res = await apiService.post("posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // console.log("Post Added:", formData) ;
      setIsModalOpen(false);
      // reload post list or show success
    } catch (err) {
      console.error("Error adding post:", err);
    }
  };

  const handleNewInput = (e) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };

  // Paginated posts
  const startIndex = (currentPage - 1) * postsPerPage;
  const displayedCategories = posts.slice(startIndex, startIndex + postsPerPage);

  return (
    <div className={styles.container}>
      <TitleLine title="Categories">
        <AddButton onClick={() => setIsModalOpen(true)} />
      </TitleLine>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Content</th>
            <th>Auther</th>
            <th>Date</th>
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
                  cat.id
                )}  
              </td>
              <td>
                {editingId === cat.id ? (
                  <input name="title" value={editData.title} onChange={handleChange} />
                ) : (
                  cat.title
                )}
              </td>

              <td style={{ whiteSpace: "pre-line", maxWidth: "250px" }}>
                {editingId === cat.id ? (
                  <input name="content" value={editData.content} onChange={handleChange} />
                ) : (
                  cat.content
                )}
              </td>

              <td>
                {editingId === cat.id ? (
                  <input name="auther" value={editData.auther} onChange={handleChange} />
                ) : (
                  cat.auther
                )}
              </td>

              <td>
              {new Date(cat.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric"
                })}{" "}
                -{" "}
                {new Date(cat.createdAt).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true
                })}
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
        <Modal onClose={() => setIsModalOpen(false)} title="Add Post">
          <form onSubmit={handleAddPost} encType="multipart/form-data">
            <div>
              <label>Title:</label>
              <input type="text" name="title" value={newPost.title} onChange={handleNewInput} required />
            </div>

            <div>
              <label>Content:</label>
              <input type="text" name="content" value={newPost.content} onChange={handleNewInput} required />
            </div>

            <div>
              <label>Author:</label>
              <input type="text" name="auther" value={newPost.auther} onChange={handleNewInput} required />
            </div>

            <div>
              <label>Image:</label>
              <input type="file" name="image" accept="image/*" onChange={handleImageChange} required />
            </div>

            <div>
              <label>Date:</label>
              <input type="date" name="createdAt" value={newPost.createdAt} onChange={handleNewInput} required />
            </div>

            <div>
              <label>is_active:</label>
              <input type="number" name="is_active" value={newPost.is_active} onChange={handleNewInput} />
            </div>

            <button type="submit">Add Post</button>
          </form>
        </Modal>
      )}

    </div>
  );
};

export default Post;
