import { v2 as cloudinary } from 'cloudinary';

export const getPublicId = (imagePath: string) => {
  return imagePath
    .split('/image/upload/')[1]
    .split('.')[0]
    .split('/')
    .slice(1)
    .join('/');
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
