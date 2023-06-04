import React, { useState } from 'react';
import './DragDrop.css';

const DragDrop = () => {
  const [imageSrc, setImageSrc] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragOver(false);

    const file = event.dataTransfer.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const contents = event.target.result;
      setImageSrc(contents);
    };

    reader.readAsDataURL(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const contents = event.target.result;
      setImageSrc(contents);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="drag-drop-container">
      <div
        className={`drop-area ${isDragOver ? 'with-image' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {!imageSrc && (
          <>
            <div className="dashed-border"></div>
            <p className="drop-text">Drop image to attach or</p>
            <label htmlFor="file-input" className="browse-button">
              Browse
            </label>
            <input
              id="file-input"
              className="file-input"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </>
        )}
        {imageSrc && (
          <div className="image-container">
            <img className="uploaded-image" src={imageSrc} alt="" />
          </div>
        )}
      </div>
    </div>
  );
};

export default DragDrop;
