import { Request } from 'express';
import prisma from '@/prisma';
class GetJobsRepository {
  static async getJobs(req: Request) {
    const limit = req.query.limit || 10;
    const sort = req.query.sort == 'asc' ? 'asc' : 'desc';
    const jobs = await prisma.job.findMany({
      take: Number(limit),
      orderBy: {
        createdAt: sort,
      },
      where: {
        title:
          req.query.title && typeof req.query.title === 'string'
            ? { contains: req.query.title, mode: 'insensitive' }
            : undefined,

        company: {
          category:
            req.query.category && typeof req.query.category === 'string'
              ? { contains: req.query.category, mode: 'insensitive' }
              : undefined,

          location:
            req.query.location && typeof req.query.location === 'string'
              ? { contains: req.query.location, mode: 'insensitive' }
              : undefined,
        },
      },
      select: {
        id: true,
        title: true,
        category: true,
        companyId: true,
        isDeleted: true,
        createdAt: true,
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
    return jobs;
  }
}
export default GetJobsRepository;
