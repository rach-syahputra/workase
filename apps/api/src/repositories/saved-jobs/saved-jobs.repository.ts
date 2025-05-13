import { UserRequest } from '../../interfaces/middleware.interface';
import prisma from '../../prisma';
import { skip } from '@prisma/client/runtime/library';

class savedJobsRepository {
  async saveJob(req: UserRequest) {
    const { jobId } = req.body;
    const userId = req.user?.id;
    if (!userId) {
      throw new Error('User ID is required to save a job.');
    }
    await prisma.savedJob.create({
      data: {
        jobId: jobId,
        userId: userId,
      },
    });
  }
  async unsaveJob(req: UserRequest) {
    const jobId = req.params.jobId as string;
    const userId = req.user?.id;
    if (!userId) {
      throw new Error('User ID is required to unsave a job.');
    }
    await prisma.savedJob.delete({
      where: {
        jobId_userId: {
          jobId: jobId,
          userId: userId,
        },
      },
    });
  }

  async getSavedJobs(req: UserRequest) {
    const userId = req.user?.id;
    if (!userId) {
      throw new Error('User ID is required to fetch saved jobs.');
    }
    const limit = Number(req.query.limit || 10);
    const skip = Number(req.query.skip || 0);

    const sortField = req.query.sortField || 'title';
    const sortOrder = req.query.sortOrder === 'asc' ? 'asc' : 'desc';
    const filterCondition = {
      title:
        req.query.title && typeof req.query.title === 'string'
          ? { contains: req.query.title, mode: 'insensitive' }
          : undefined,
    };
    const savedJobs = await prisma.savedJob.findMany({
      where: {
        userId: userId,
        job: filterCondition as any,
      },
      skip: skip,
      take: limit,
      orderBy: {
        job: {
          [sortField === 'title' ? 'title' : 'title']: sortOrder,
        },
      },
      select: {
        jobId: true,
        job: {
          select: {
            title: true,
            category: true,
            slug: true,
            company: {
              select: {
                name: true,
                location: true,
              },
            },
          },
        },
      },
    });
    const totalCount = await prisma.savedJob.count({
      where: {
        userId: userId,
      },
    });
    const hasMore = skip + savedJobs.length < totalCount;
    return {
      totalCount,
      savedJobs,
      hasMore,
      nextSkip: hasMore ? skip + limit : null,
      sortInfo: {
        field: sortField,
        order: sortOrder,
      },
    };
  }
}
export default new savedJobsRepository();
