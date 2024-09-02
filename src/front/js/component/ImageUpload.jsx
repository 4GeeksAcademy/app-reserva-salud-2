import React, { useState } from 'react';
import { backendApi } from '../store/flux';

const ImageUpload = ({ form, field }) => {
  const [uploading, setUploading] = useState(false);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log(file);
      await handleImageUpload(file);
    }
  };

  const handleImageUpload = async (image) => {
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', image);

      const response = await backendApi.post('/upload', formData);

      form.setFieldValue(field.name, response.data.url);
    } catch (error) {
      form.setFieldError(field.name, error.response.data.message);
      console.error('Error uploading image:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <input className="file-input file-input-bordered w-full" type="file" onChange={handleImageChange} />
          {uploading && <p>Subiendo imagen...</p>}
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;