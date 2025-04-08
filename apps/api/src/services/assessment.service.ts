import { CLOUDINARY_ASSESSMENT_QUESTION_IMAGE_FOLDER } from '@/config';
import ImageRepository from '@/repositories/cloudinary/image.repository';
import AssessmentRepository from '@/repositories/assessments/assessment.repository';
import AssessmentQuestionRepository from '@/repositories/assessments/assessment-question.repository';
import {
  AddAssessmentQuestionServiceRequest,
  AddAssessmentRequest,
  GetAssessmentByIdRequest,
  GetAssessmentQuestionsRequest,
  GetAssessmentsRequest,
} from '@/interfaces/assessment.interface';
import { validate } from '@/helpers/validation';
import { ResponseError } from '@/helpers/error';
import { addAssessmentQuestionSchema } from '@/validations/assessment.validation';

class AssessmentService {
  private imageRepository: ImageRepository;
  private assessmentRepository: AssessmentRepository;
  private assessmentQuestionRepository: AssessmentQuestionRepository;

  constructor() {
    this.imageRepository = new ImageRepository();
    this.assessmentRepository = new AssessmentRepository();
    this.assessmentQuestionRepository = new AssessmentQuestionRepository();
  }

  getAssessments = async (req: GetAssessmentsRequest) => {
    return await this.assessmentRepository.getAssessments(req);
  };

  getAssessmentById = async (req: GetAssessmentByIdRequest) => {
    const assessment = await this.assessmentRepository.getAssessmentById(req);

    if (!assessment) {
      throw new ResponseError(404, 'Assessment not found');
    }

    return assessment;
  };

  addAssessment = async (req: AddAssessmentRequest) => {
    return await this.assessmentRepository.addAssessment({
      skillId: req.skillId,
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
