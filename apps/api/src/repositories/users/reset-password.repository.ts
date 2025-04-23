import { generateHashedPassword } from '@/helpers/utils';
import { UserRequest } from '@/interfaces/middleware.interface';
import prisma from '@/prisma';
import { Prisma } from '@prisma/client';

class resetUserPasswordRepository {
  async resetPassword(req: UserRequest) {
    const { password } = req.body;
    const id = req.user?.id;
    const data: Prisma.UserUpdateInput = {};
    if (password) data.password = await generateHashedPassword(password);
    await prisma.user.update({
      where: {
        id,
      },
      data,
    });
  }
}
export default new resetUserPasswordRepository();
