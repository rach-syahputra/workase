import CvRepository from '../repositories/cvs/cv.repository';
import {
  AddCvRequest,
  CheckCvOwnershipRequest,
  GetCvBySlugRequest,
  UpdateCvRequest,
} from '../interfaces/cv.interface';
import { addCvSchema } from '../validations/cv.validation';
import { ResponseError } from '../helpers/error';
import { validate } from '../helpers/validation';

class CvService {
  private cvRepository: CvRepository;

  constructor() {
    this.cvRepository = new CvRepository();
  }

  checkCvOwnership = async (req: CheckCvOwnershipRequest) => {
    const cv = await this.cvRepository.checkCvOwnership(req);

    if (cv?.userId !== req.userId)
      throw new ResponseError(403, `You don't have access to this CV.`);
  };

  getCvBySlug = async (req: GetCvBySlugRequest) => {
    return await this.cvRepository.getCvBySlug(req);
  };

  addCv = async (req: AddCvRequest) => {
    validate(addCvSchema, req);
    return await this.cvRepository.addCv(req);
  };

  updateCv = async (req: UpdateCvRequest) => {
    await this.checkCvOwnership({ cvId: req.cvId, userId: req.userId });
    return await this.cvRepository.updateCv(req);
  };
}

export default CvService;
