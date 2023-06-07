import React, { useState } from "react";
import "./DragDrop.css";

const DragDrop = () => {
  const [imageSrc, setImageSrc] = useState("");
  const [fileName, setFileName] = useState("");
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
        setFileName(file.name);
      };
      reader.readAsDataURL(file);
    } else {
      setImageSrc(event.dataTransfer.getData("text"));
      setFileName("");
    }

    setIsFileSelected(true);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const contents = event.target.result;
      setImageSrc(contents);
      setFileName(file.name);
    };

    reader.readAsDataURL(file);
    setIsFileSelected(true);
  };

  const handleDeleteImage = () => {
    setImageSrc("");
    setFileName("");
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
              Izbriši
            </button>
            <p className="image-name">{fileName}</p>
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
