import { checkPassword } from 'src/validations/user-login.validation';
import cloudinary, { getPublicId } from '../../helpers/cloudinary';
import { ResponseError } from '../../helpers/error';
import { generateHashedPassword } from '../../helpers/utils';
import { UserRequest } from '../../interfaces/middleware.interface';
import prisma from '../../prisma';
import { Prisma } from '@prisma/client';

class getUserProfileRepository {
  async getUserProfile(req: UserRequest) {
    const id = req.user?.id;
    return await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        slug: true,
        email: true,
        authProvider: true,
        isVerified: true,
        profilePhoto: true,
        placeOfBirth: true,
        dateOfBirth: true,
        gender: true,
        lastEducation: true,
        address: true,
        jobId: true,
      },
    });
  }
}

class updateUserProfileRepository {
  static async updateUserProfile(req: UserRequest) {
    const {
      email,
      newPassword,
      currentPassword,
      placeOfBirth,
      dateOfBirth,
      gender,
      lastEducation,
      address,
    } = req.body;
    const id = req.user?.id;
    const yourEmail = req.user?.email;
    const data: Prisma.UserUpdateInput = {};
    if (currentPassword && yourEmail) {
      try {
        await checkPassword(yourEmail, currentPassword);
      } catch (error) {
        if (error instanceof ResponseError) {
          throw error;
        }
        throw new ResponseError(500, 'Internal Server Error');
      }

      data.password = await generateHashedPassword(newPassword);
    }
    if (email) data.email = email;
    if (email) data.slug = email.split('../..')[0];
    if (email) data.isVerified = false;
    if (placeOfBirth) data.placeOfBirth = placeOfBirth;
    if (dateOfBirth) data.dateOfBirth = dateOfBirth;
    if (gender) data.gender = gender;
    if (lastEducation) data.lastEducation = lastEducation;
    if (address) data.address = address;
    await prisma.user.update({
      where: {
        id,
      },
      data,
    });
    return prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        slug: true,
        email: true,
        authProvider: true,
        placeOfBirth: true,
        isVerified: true,
        dateOfBirth: true,
        gender: true,
        lastEducation: true,
        address: true,
      },
    });
  }
}

class updateUserPhotoProfileRepository {
  static async updateUserPhotoProfile(req: UserRequest) {
    const id = req.user?.id;
    const user = await prisma.user.findUnique({ where: { id } });
    //remove image from cloudinary
    if (user?.profilePhoto) {
      const publicId = getPublicId(user.profilePhoto);
      await cloudinary.uploader.destroy(publicId);
    }
    // upload new image
    const filePath = req.file?.path;
    if (!filePath || typeof filePath !== 'string') {
      throw new ResponseError(400, 'Invalid file provided for upload');
    }
    let result;
    try {
      result = await cloudinary.uploader.upload(filePath, {
        folder: 'user-photo-profile',
      });
    } catch (error) {
      throw new ResponseError(500, 'failed to upload image to Cloudinary');
    }
    // save logo to database
    await prisma.user.update({
      where: { id },
      data: {
        profilePhoto: result.secure_url,
      },
    });
    return await prisma.user.findUnique({
      where: { id },
      select: {
        profilePhoto: true,
      },
    });
  }
}
export default new getUserProfileRepository();
export { updateUserProfileRepository, updateUserPhotoProfileRepository };
