import { CLOUDINARY_CERTIFICATE_FOLDER } from '../config';
import CertificateRepository from '../repositories/certificates/certificate.repository';
import ImageRepository from '../repositories/cloudinary/image.repository';
import {
  AddCertificateServiceRequest,
  GenerateCertificateTokenRequest,
  GetCertificateDetailRequest,
} from '../interfaces/certificate.interface';
import {
  AddCertificateSchema,
  generateCertificateTokenSchema,
} from '../validations/certificate.validation';
import { validate } from '../helpers/validation';
import { generateCertificateSlug } from '../helpers/utils';
import { generateCertificateCrCodeToken } from '../helpers/jwt';

class CertificateService {
  private imageRepository: ImageRepository;
  private certificateRepository: CertificateRepository;

  constructor() {
    this.imageRepository = new ImageRepository();
    this.certificateRepository = new CertificateRepository();
  }

  checkCertificateExistenceBySlug = async (slug: string) => {
    const { certificate } =
      await this.certificateRepository.getCertificateBySlug({ slug });

    return certificate;
  };

  generateCertificateToken = async (req: GenerateCertificateTokenRequest) => {
    validate(generateCertificateTokenSchema, req);

    let slug;

    do {
      slug = generateCertificateSlug();
    } while (await this.checkCertificateExistenceBySlug(slug));

    const { userAssessment } =
      await this.certificateRepository.getUserAssessmentById({
        userAssessmentId: req.userAssessmentId,
      });

    if (userAssessment) {
      const certificateToken = await generateCertificateCrCodeToken({
        userAssessment: {
          id: userAssessment.id,
          skill: {
            id: userAssessment.assessment.skill.id,
            title: userAssessment.assessment.skill.title,
          },
          user: {
            id: userAssessment.user.id,
            name: req.userName,
          },
        },
        createdAt: new Date().toISOString(),
        slug,
      });

      return {
        certificateToken,
      };
    }
  };

  addCertificate = async (req: AddCertificateServiceRequest) => {
    validate(AddCertificateSchema, req);

    let certificatePdf;

    if (req.pdf) {
      certificatePdf = await this.imageRepository.upload(
        req.pdf.path,
        CLOUDINARY_CERTIFICATE_FOLDER,
      );
    }

    if (certificatePdf) {
      const certificate = await this.certificateRepository.addCertificate({
        userAssessmentId: req.userAssessmentId,
        slug: req.slug,
        url: certificatePdf?.secure_url,
      });

      return certificate;
    }
  };

  getCertificateDetail = async (req: GetCertificateDetailRequest) => {
    return await this.certificateRepository.getCertificateDetail(req);
  };
}

export default CertificateService;
