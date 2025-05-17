import { companyCheckPassword } from 'src/validations/company-login.validation';
import cloudinary, { getPublicId } from '../../helpers/cloudinary';
import { ResponseError } from '../../helpers/error';
import { generateHashedPassword } from '../../helpers/utils';
import { CompanyRequest } from '../../interfaces/middleware.interface';
import prisma from '../../prisma';
import { Prisma } from '@prisma/client';

class updateCompanyProfileRepository {
  static async updateCompanyProfile(req: CompanyRequest) {
    const {
      name,
      email,
      newPassword,
      currentPassword,
      phoneNumber,
      description,
      category,
      location,
    } = req.body;
    const id = req.user?.id;
    const yourEmail = req.user?.email;
    const data: Prisma.CompanyUpdateInput = {};
    if (currentPassword && yourEmail) {
      try {
        await companyCheckPassword(yourEmail, currentPassword);
      } catch (error) {
        if (error instanceof ResponseError) {
          throw error;
        }
        throw new ResponseError(500, 'Internal Server Error');
      }

      data.password = await generateHashedPassword(newPassword);
    }
    if (name) data.name = name;
    if (email) data.email = email;
    if (email) data.slug = email.split('../..')[0];
    if (email) data.isVerified = false;
    if (phoneNumber) data.phoneNumber = phoneNumber;
    if (description) data.description = description;
    if (category) data.category = category;
    if (location) data.location = location;
    await prisma.company.update({
      where: {
        id,
      },
      data,
    });
    return prisma.company.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        slug: true,
        name: true,
        email: true,
        authProvider: true,
        phoneNumber: true,
        isVerified: true,
        logoUrl: true,
        description: true,
        location: true,
        category: true,
      },
    });
  }
}

class updateCompanyLogoRepository {
  static async updateCompanyLogo(req: CompanyRequest) {
    const id = req.user?.id;
    const company = await prisma.company.findUnique({ where: { id } });
    // remave old image from repository
    if (company?.logoUrl) {
      const publicId = getPublicId(company.logoUrl);
      await cloudinary.uploader.destroy(publicId);
    }
    // upload image to cloudinary
    const filePath = req.file?.path;
    if (!filePath || typeof filePath !== 'string') {
      throw new ResponseError(400, 'Invalid file provided for upload');
    }
    let result;
    try {
      result = await cloudinary.uploader.upload(filePath, {
        folder: 'company-logo',
      });
    } catch (error) {
      throw new ResponseError(500, 'failed to upload image to Cloudinary');
    }
    // save image to the database
    await prisma.company.update({
      where: { id },
      data: {
        logoUrl: result.secure_url,
      },
    });
    return await prisma.company.findUnique({
      where: { id },
      select: {
        logoUrl: true,
      },
    });
  }
}

export { updateCompanyProfileRepository, updateCompanyLogoRepository };
