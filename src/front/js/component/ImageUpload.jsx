import React, { useState } from 'react';
import { backendApi } from '../store/flux';

const ImageUpload = ({ form, field }) => {
  const [uploading, setUploading] = useState(false);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      await handleImageUpload(file);
    }
  };

  const handleImageUpload = async (image) => {
    setUploading(true);
    const formData = new FormData();
    formData.append('file', image);

    console.log(formData)

    if (formData.get('file').size > 1024 * 1024) {
      form.setFieldError(field.name, 'La imagen no puede pesar más de 1MB');
      setUploading(false);
      return;
    }

    if (!['image/jpeg', 'image/png'].includes(formData.get('file').type)) {
      form.setFieldError(field.name, 'La imagen debe ser de tipo JPG o PNG');
      setUploading(false);
      return;
    }

    try {
      const response = await backendApi.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      form.setFieldValue(field.name, response.data.url);
    } catch (error) {
      form.setFieldError(field.name, 'Error subiendo la imagen');
      console.error('Error uploading image:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <input className="form-control" type="file" onChange={handleImageChange} />
          {uploading && <p>Subiendo imagen...</p>}
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;