function MovieModal({
  show,
  onClose,
  onSubmit,
  formData,
  setFormData,
  isEditing,
}) {
  if (!show) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="modal">
      <form className="modal-content" onSubmit={onSubmit}>
        <h3>{isEditing ? "Edit Movie" : "Add Movie"}</h3>

        <input
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
        />

        <input
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />

        <input
          name="year"
          placeholder="Year"
          value={formData.year}
          onChange={handleChange}
        />

        <input
          name="poster"
          placeholder="Poster URL"
          value={formData.poster}
          onChange={handleChange}
        />

        <button type="submit">
          {isEditing ? "Update" : "Add"}
        </button>

        <button type="button" className="close-btn" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default MovieModal;