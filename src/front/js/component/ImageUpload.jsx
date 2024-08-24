import React, { useState } from 'react';
import { backendApi } from '../store/flux';

const ImageUpload = ({ setFieldValue }) => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleImageUpload = async () => {
    const formData = new FormData();
    formData.append('file', image);

    try {
      const response = await backendApi.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setFieldValue('image_url', response.data.url);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <input className="form-control" type="file" onChange={handleImageChange} />
        </div>
        <div className="col-md-6">
          <button className="btn btn-primary" type="button" onClick={handleImageUpload}>Subir Imagen</button>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;