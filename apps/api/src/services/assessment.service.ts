import {
  CLOUDINARY_ASSESSMENT_IMAGE_FOLDER,
  CLOUDINARY_ASSESSMENT_QUESTION_IMAGE_FOLDER,
} from '@/config';
import ImageRepository from '@/repositories/cloudinary/image.repository';
import GetAssessmentRepository from '@/repositories/assessments/get-assessment.repository';
import AddAssessmentRepository from '@/repositories/assessments/add-assessment.repository';
import AssessmentQuestionRepository from '@/repositories/assessments/assessment-question.repository';
import {
  AddAssessmentQuestionServiceRequest,
  AddAssessmentServiceRequest,
  GetAssessmentByIdRequest,
  GetAssessmentQuestionsRequest,
  GetAssessmentsRequest,
  GetAvailableSkillsRequest,
} from '@/interfaces/assessment.interface';
import { addAssessmentQuestionSchema } from '@/validations/assessment.validation';
import { validate } from '@/helpers/validation';
import { ResponseError } from '@/helpers/error';

class AssessmentService {
  private imageRepository: ImageRepository;
  private getAssessmentRepository: GetAssessmentRepository;
  private addAssessmentRepository: AddAssessmentRepository;
  private assessmentQuestionRepository: AssessmentQuestionRepository;

  constructor() {
    this.imageRepository = new ImageRepository();
    this.getAssessmentRepository = new GetAssessmentRepository();
    this.addAssessmentRepository = new AddAssessmentRepository();
    this.assessmentQuestionRepository = new AssessmentQuestionRepository();
  }

  getAssessments = async (req: GetAssessmentsRequest) => {
    return await this.getAssessmentRepository.getAssessments(req);
  };

  getAssessmentById = async (req: GetAssessmentByIdRequest) => {
    const assessment =
      await this.getAssessmentRepository.getAssessmentById(req);

    if (!assessment) {
      throw new ResponseError(404, 'Assessment not found');
    }

    return assessment;
  };

  getAvailableSkills = async (req: GetAvailableSkillsRequest) => {
    return await this.getAssessmentRepository.getAvailableSkills(req);
  };

  addAssessment = async (req: AddAssessmentServiceRequest) => {
    let assessmentImage;

    if (req.image) {
      assessmentImage = await this.imageRepository.upload(
        req.image.path,
        CLOUDINARY_ASSESSMENT_IMAGE_FOLDER,
      );
    }

    return await this.addAssessmentRepository.addAssessment({
      skillId: req.skillId,
      image: assessmentImage?.secure_url,
      shortDescription: req.shortDescription,
    });
  };

  getAssessmentQuestions = async (req: GetAssessmentQuestionsRequest) => {
    return await this.assessmentQuestionRepository.getAssessmentQuestions(req);
  };

  addAssessmentQuestion = async (req: AddAssessmentQuestionServiceRequest) => {
    validate(addAssessmentQuestionSchema, req);

    let questionImage;

    if (req.image) {
      questionImage = await this.imageRepository.upload(
        req.image.path,
        CLOUDINARY_ASSESSMENT_QUESTION_IMAGE_FOLDER,
      );
    }

    return await this.assessmentQuestionRepository.addAssessmentQuestion({
      assessmentId: req.assessmentId,
      question: req.question,
      options: req.options,
      image: questionImage?.secure_url,
    });
  };
}

export default AssessmentService;
