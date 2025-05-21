import Modal from "../../General/Modal";

const EditForm = ({
  title,
  formData,
  handleInputChange,
  handleSubmit,
  setIsModalOpen,
  editingId,
}) => {
  return (
    <Modal
      onClose={() => setIsModalOpen(false)}
      onSubmit={handleSubmit}
      status="form"
      title={editingId ? `Edit ${title}` : `Add ${title}`}
    >
      <form onSubmit={handleSubmit} style={styleObj.form}>
        <div style={styleObj.inputSection}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter category name"
            required
            style={styleObj.input}
          />
        </div>

        <div style={styleObj.inputSection}>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter category description"
            rows="3"
            style={styleObj.textarea}
          />
        </div>

        <div style={styleObj.inputSection}>
          <label>Layout:</label>
          <select
            name="layout"
            value={formData.layout}
            onChange={handleInputChange}
            style={styleObj.select}
          >
            <option value="">Select layout</option>
            <option value="YouTubeDisplay">YouTubeDisplay</option>
            <option value="GalleryDisplay">GalleryDisplay</option>
            <option value="FoodDisplay">FoodDisplay</option>
          </select>
        </div>
      </form>
    </Modal>
  );
};

const styleObj = {
  form: {
    padding: "15px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  inputSection: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  input: {
    padding: "8px 12px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "14px",
  },
  textarea: {
    padding: "8px 12px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "14px",
    resize: "vertical",
  },
  select: {
    padding: "8px 12px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "14px",
    backgroundColor: "#fff",
    width: "100%",
    cursor: "pointer",
  },
  buttonSection: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
  },
  submitBtn: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "8px 16px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
  },
  cancelBtn: {
    backgroundColor: "gray",
    color: "#fff",
    padding: "8px 16px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
  },
};

export default EditForm;
