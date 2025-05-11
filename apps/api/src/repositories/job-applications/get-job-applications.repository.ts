import { UserRequest } from '@/interfaces/middleware.interface';
import prisma from '@/prisma';

class jobApplicationsRepository {
  static async getJobApplications(req: UserRequest) {
    const userId = req.user?.id;
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
    const applications = await prisma.appliedJob.findMany({
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
        status: true,
        appliedAt: true,
        hrReview: true,
        preselectionPassed: true,
        interviewSchedule: true,
        job: {
          select: {
            title: true,
            company: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
    const totalCount = await prisma.appliedJob.count({
      where: {
        userId: userId,
      },
    });
    const hasMore = skip + applications.length < totalCount;
    return {
      totalCount,
      applications,
      hasMore,
      nextSkip: hasMore ? skip + limit : null,
      sortInfo: {
        field: sortField,
        order: sortOrder,
      },
    };
  }
  static async getJobApplicationById(req: UserRequest) {
    const userId = req.user?.id;
    const applicationId = req.params.jobApplicationId;

    if (!userId) {
      throw new Error('User ID is required');
    }

    const application = await prisma.appliedJob.findUnique({
      where: {
        jobId_userId: {
          jobId: applicationId,
          userId: userId,
        },
      },
      select: {
        jobId: true,
        status: true,
        appliedAt: true,
        hrReview: true,
        preselectionPassed: true,
        interviewSchedule: true,
        salaryEstimate: true,
        cvUrl: true,
        job: {
          select: {
            title: true,
            company: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
    return application;
  }
}
export default jobApplicationsRepository;
