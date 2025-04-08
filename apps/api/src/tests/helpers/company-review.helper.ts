import prisma from '@/prisma';

export const getCompanyReviewById = async (companyReviewId: string) => {
  return await prisma.companyReview.findUnique({
    where: {
      id: companyReviewId,
    },
  });
};

export const deleteCompanyReview = async (companyReviewId: string) => {
  return await prisma.companyReview.delete({
    where: {
      id: companyReviewId,
    },
  });
};
