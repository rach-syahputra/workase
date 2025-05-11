import prisma from '@/prisma';
import { Request } from 'express';

class getCompanyJobsRepository {
  async getCompanyJobs(req: Request) {
    const limit = req.query.limit || 9;
    const page = req.query.page ? Number(req.query.page) : 1;
    const offset = (page - 1) * Number(limit);
    const companyId = req.params.id;
    const companyJobs = await prisma.job.findMany({
      skip: offset,
      take: Number(limit),
      where: {
        companyId: companyId,
      },
      select: {
        id: true,
        title: true,
        category: true,
        companyId: true,
        isDeleted: true,
        createdAt: true,
        slug: true,
        company: {
          select: {
            id: true,
            name: true,
            logoUrl: true,
            location: true,
          },
        },
      },
    });
    const totalCount = await prisma.job.count({
      where: { companyId: companyId },
    });
    const totalPage = Math.ceil(totalCount / Number(limit));
    return {
      companyJobs,
      pagination: {
        totalItem: totalCount,
        totalPage,
        currentPage: page,
        pageSize: limit,
        hasNextPage: page < totalPage,
        hasPreviousPage: page > 1,
      },
    };
  }
}
export default new getCompanyJobsRepository();
