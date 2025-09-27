import axios from 'axios';

const CLOUDINARY_CLOUD_NAME = 'diqh5xoe1';
const CLOUDINARY_UPLOAD_PRESET = 'EventBook';
const CLOUDINARY_API_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`;

/**
 * Handles the upload of a file to Cloudinary.
 * @param {File} file - The file to be uploaded (e.g., from an <input type="file">).
 * @param {'image' | 'video' | 'raw'} resourceType - The type of resource being uploaded.
 * @returns {Promise<object>} A promise that resolves with the Cloudinary upload response.
 */
export const uploadToCloudinary = async (file, resourceType = 'image') => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
  formData.append('resource_type', resourceType);

  try {
    const response = await axios.post(CLOUDINARY_API_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data; // The response contains the secure_url and other details
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    // Handle the error appropriately in the UI
    throw new Error('Failed to upload file.');
  }
};