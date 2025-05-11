import { Request } from 'express';
<<<<<<< HEAD
import prisma from '../../prisma';
class GetJobsRepository {
=======
import prisma from '@/prisma';
class getJobsRepository {
>>>>>>> 178cd18 (feat: complete all core features for initial release)
  static async getJobs(req: Request) {
    const limit = req.query.limit || 10;
    const sort = req.query.sort == 'asc' ? 'asc' : 'desc';
    const page = req.query.page ? Number(req.query.page) : 1;
    const offset = (page - 1) * Number(limit);

    const filterCondition = {
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

      createdAt: {
        ...(req.query.startDate
          ? { gte: new Date(req.query.startDate as string) }
          : {}),
        ...(req.query.endDate
          ? { lte: new Date(req.query.endDate as string) }
          : {}),
      },
    };
    const jobs = await prisma.job.findMany({
      skip: offset,
      take: Number(limit),
      orderBy: {
        createdAt: sort,
      },

      where: filterCondition as any,
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
      where: filterCondition as any,
    });
    const totalPage = Math.ceil(totalCount / Number(limit));
    return {
      jobs,
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

  static async getJobBySlug(req: Request) {
    console.log('ini slugnya', req.params.slug);
    const job = await prisma.job.findUnique({
      where: {
        slug: req.params.slug as string,
      },
      select: {
        id: true,
        title: true,
        description: true,
        category: true,
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
    return job;
  }
}
export default getJobsRepository;
