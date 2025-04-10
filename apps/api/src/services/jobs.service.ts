import prisma from '@/prisma';
import { Request } from 'express';

class JobsService {
  async getJobs(req: Request) {
    const limit = req.query.limit || 10;
    const sort = req.query.sort == 'asc' ? 'asc' : 'desc';
    if (req.query.title) {
      const title = req.query.title;
    }
    if (req.query.category) {
      const category = req.query.category;
    }
    if (req.query.location) {
      const location = req.query.location;
    }
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
        description: true,
        companyId: true,
        isDeleted: true,
        createdAt: true,
        company: {
          select: {
            id: true,
            name: true,
            logoUrl: true,
            category: true,
            location: true,
          },
        },
      },
    });
    return jobs;
  }
}

export default new JobsService();
