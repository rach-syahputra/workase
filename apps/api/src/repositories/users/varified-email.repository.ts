import { UserRequest } from '../../interfaces/middleware.interface';
import prisma from '../../prisma';
import { Prisma } from '@prisma/client';

class verifiedUserEmailRepository {
  async verifiedEmail(req: UserRequest) {
    const id = req.user?.id;
    const data: Prisma.UserUpdateInput = {};
    data.isVerified = true;
    await prisma.user.update({
      where: {
        id,
      },
      data,
    });
  }
}
export default new verifiedUserEmailRepository();
