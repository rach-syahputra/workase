import prisma from '@/prisma';
import { Request } from 'express';
class getCompaniesRepository {
  async getCompanies(req: Request) {
    const sort = req.query.sort == 'desc' ? 'desc' : 'asc';
    const limit = req.query.limit || 9;
    const page = req.query.page ? Number(req.query.page) : 1;
    const offset = (page - 1) * Number(limit);

    const filterCondition = {
      name:
        req.query.name && typeof req.query.name === 'string'
          ? { contains: req.query.name, mode: 'insensitive' }
          : undefined,
      location:
        req.query.location && typeof req.query.location === 'string'
          ? { contains: req.query.location, mode: 'insensitive' }
          : undefined,
    };

    const companies = await prisma.company.findMany({
      skip: offset,
      take: Number(limit),
      orderBy: {
        name: sort,
      },
      where: filterCondition as any,
      select: {
        slug: true,
        name: true,
        logoUrl: true,
        location: true,
        category: true,
        _count: {
          select: {
            Job: true,
          },
        },
      },
    });
    const sortedCompanies = companies.sort((a, b) => {
      if (sort === 'asc') {
        return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
      } else {
        return b.name.toLowerCase().localeCompare(a.name.toLowerCase());
      }
    });
    const totalCount = await prisma.company.count({
      where: filterCondition as any,
    });
    const totalPage = Math.ceil(totalCount / Number(limit));
    return {
      sortedCompanies,
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

  async getCompanyBySlug(req: Request) {
    const company = await prisma.company.findUnique({
      where: {
        slug: req.params.slug as string,
      },
      select: {
        id: true,
        slug: true,
        name: true,
        email: true,
        phoneNumber: true,
        description: true,
        logoUrl: true,
        location: true,
        category: true,
      },
    });
    return company;
  }
}
export default new getCompaniesRepository();
