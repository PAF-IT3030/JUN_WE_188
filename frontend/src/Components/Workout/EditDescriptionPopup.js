// EditDescriptionPopup.js

import React, { useState } from "react";

function EditDescriptionPopup({ currentDescription, onSave, onClose }) {
  const [newDescription, setNewDescription] = useState(currentDescription);

  const handleSave = () => {
    onSave(newDescription);
    onClose();
  };

  return (
    <div className="popup-container">
      <textarea
        value={newDescription}
        onChange={(e) => setNewDescription(e.target.value)}
        placeholder="Enter new description"
        className="description-input border border-gray-300 p-2 rounded mb-4"
      />
      <button onClick={handleSave}>Save</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
}

export default EditDescriptionPopup;
