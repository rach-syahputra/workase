import cloudinary from '@/helpers/cloudinary';

class ImageRepository {
  upload = async (imagePath: string, folder: string) => {
    const response = await cloudinary.uploader.upload(imagePath, {
      folder,
    });

    return response;
  };

  delete = async (imagePath: string) => {
    const response = await cloudinary.uploader.destroy(imagePath);

    return response;
  };
}

export default ImageRepository;
