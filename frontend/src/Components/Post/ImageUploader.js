import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faTrash } from "@fortawesome/free-solid-svg-icons";
import "../../Styles/ImageUploader.css"; // Import CSS file for styling

const ImageUploader = () => {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handleClear = () => {
    window.location.reload();
    setFile(null);
    setDescription("");
    setPreviewUrl("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("description", description);
      // Make POST request to backend API
      const response = await axios.post("http://localhost:8070/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      window.location.reload();

      console.log("Image uploaded successfully. Image ID:", response.data);
      // Reset form fields after successful upload
      handleClear();
    } catch (error) {
      toast.error("Failed to upload Post...");
      console.error("Error uploading image:", error);
      setUploadError("Error uploading image. Please try again.");
    }
    setIsUploading(false);
  };
  return (
    <div className="imageuploder">
      <div className="image-uploader-container">
        <h2 className="title">Upload Image</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="image" id="ssss">
              Choose Image:
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          {previewUrl && (
            <img src={previewUrl} alt="Preview" className="preview-image" />
          )}
          <div className="form-group">
            <label className="descriptioncolor" htmlFor="description">
              Description:
            </label>
            <input
              type="text"
              id="description"
              className="description-input"
              value={description}
              onChange={handleDescriptionChange}
            />
          </div>
          <div className="button-group">
            <button
              type="submit"
              className="submit-button"
              disabled={isUploading}
            >
              <FontAwesomeIcon icon={faUpload} />{" "}
              {isUploading ? "Uploading..." : "Upload"}
            </button>
            <button
              type="button"
              className="clear-button"
              onClick={handleClear}
            >
              <FontAwesomeIcon icon={faTrash} /> Clear
            </button>
          </div>
          {uploadError && <div className="error-message">{uploadError}</div>}
        </form>
      </div>
    </div>
  );
};
export default ImageUploader;
