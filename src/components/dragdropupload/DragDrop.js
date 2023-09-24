import React, { useState } from "react";
import "./DragDrop.css";
import { ImBin } from "react-icons/im";

const DragDrop = ({ handleFileNameChange }) => {
  const [imageSrc, setImageSrc] = useState("");
  const [isFileSelected, setIsFileSelected] = useState(false);

  const handleDrop = (event) => {
    event.preventDefault();

    const file = event.dataTransfer.files[0];
    const isImage = file.type.startsWith("image/");
    if (isImage) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const contents = event.target.result;
        setImageSrc(contents);
        handleFileNameChange(file.name); // Call the callback function with the file name
      };
      reader.readAsDataURL(file);
    } else {
      setImageSrc(event.dataTransfer.getData("text"));
      handleFileNameChange(""); // Clear the file name
    }

    setIsFileSelected(true);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log("Selected file name:", file.name); // Display the file name in the console
    const reader = new FileReader();

    reader.onload = (event) => {
      const contents = event.target.result;
      setImageSrc(contents);
      handleFileNameChange(file.name); // Call the callback function with the file name
    };

    reader.readAsDataURL(file);
    setIsFileSelected(true);
  };

  const handleDeleteImage = () => {
    setImageSrc("");
    handleFileNameChange(""); // Clear the file name
    setIsFileSelected(false);
  };

  return (
    <div className="drag-drop-container">
      <div
        className={`drop-area${imageSrc ? " with-image" : ""}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {imageSrc ? (
          <div className="image-container">
            <img className="uploaded-image" src={imageSrc} alt="" />
            <button className="delete-button" onClick={handleDeleteImage}>
              <ImBin />
            </button>
          </div>
        ) : (
          <React.Fragment>
            <div className="dashed-border" />
            <p className="drop-text">Prevuci sliku ovdje za dodavanje ili</p>
            <label htmlFor="fileInput" className="browse-button">
              Pretraži
            </label>
            <input
              type="file"
              id="fileInput"
              className="file-input"
              onChange={handleFileChange}
            />
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default DragDrop;