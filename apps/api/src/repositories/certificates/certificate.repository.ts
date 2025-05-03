import { prisma } from '../../helpers/prisma';
import {
  AddCertificateRepositoryRequest,
  GetCertificateBySlugRequest,
  GetCertificateDetailRequest,
} from '../../interfaces/certificate.interface';
import { GetUserAssessmentByIdRequest } from '../../interfaces/user-assessment.interface';
import { generateCertificateSlug } from '../../helpers/utils';

class CertificateRepository {
  private prisma: typeof prisma;

  constructor() {
    this.prisma = prisma;
  }

  getUserAssessmentById = async (req: GetUserAssessmentByIdRequest) => {
    const userAssessment = await this.prisma.userAssessment.findUnique({
      where: {
        id: req.userAssessmentId,
      },
      include: {
        user: true,
        assessment: {
          include: {
            skill: true,
          },
        },
      },
    });

    return {
      userAssessment,
    };
  };

  getCertificateBySlug = async (req: GetCertificateBySlugRequest) => {
    const certificate = await this.prisma.certificate.findUnique({
      where: {
        slug: req.slug,
        isDeleted: false,
      },
    });

    return {
      certificate,
    };
  };

  addCertificate = async (req: AddCertificateRepositoryRequest) => {
    let slug;

    if (req.slug) {
      slug = req.slug;
    } else {
      // If slug is not provided on request body, then generate a new one
      do {
        slug = generateCertificateSlug();
      } while ((await this.getCertificateBySlug({ slug })).certificate);
    }

    const transaction = await this.prisma.$transaction(async (trx) => {
      // Adds the new certificate
      const certificate = await trx.certificate.create({
        data: {
          slug,
          url: req.url,
          userAssessmentId: req.userAssessmentId,
          createdAt: new Date(),
        },
      });

      // Updates the skillId in the users table for skill badge display.
      const userAssessment = await trx.userAssessment.findUnique({
        where: {
          id: certificate.userAssessmentId,
        },
        include: {
          assessment: {
            include: {
              skill: true,
            },
          },
          user: true,
        },
      });

      await trx.user.update({
        where: {
          id: userAssessment?.user.id,
        },
        data: {
          skillId: userAssessment?.assessment.skillId,
        },
      });

      return certificate;
    });

    return {
      certificate: transaction,
    };
  };

  getCertificateDetail = async (req: GetCertificateDetailRequest) => {
    const certificate = await this.prisma.certificate.findUnique({
      where: {
        slug: req.slug,
        isDeleted: false,
      },
      include: {
        userAssessment: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
                slug: true,
                profilePhoto: true,
              },
            },
            assessment: {
              include: {
                skill: true,
              },
            },
          },
        },
      },
    });

    const owner = certificate?.userAssessment.user;
    const assessment = certificate?.userAssessment.assessment;

    return {
      certificate,
      owner,
      assessment,
    };
  };
}

export default CertificateRepository;
