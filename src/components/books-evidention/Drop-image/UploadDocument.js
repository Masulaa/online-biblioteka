import React from 'react';
import './UploadDocument.css';

const UploadDocument = () => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
      const contents = event.target.result;
      console.log('Učitani sadržaj:', contents);
    };

    reader.readAsText(file);
  };

  return (
    <div>
      <input type="file" className='' onChange={handleFileChange} />
    </div>
  );
};

export default UploadDocument;
