import {
  CLOUDINARY_ASSESSMENT_IMAGE_FOLDER,
  CLOUDINARY_ASSESSMENT_QUESTION_IMAGE_FOLDER,
} from '../config';
import ImageRepository from '../repositories/cloudinary/image.repository';
import GetAssessmentRepository from '../repositories/assessments/get-assessment.repository';
import GetAssessmentDetailRepository from '../repositories/assessments/get-assessment-detail.repository';
import AddAssessmentRepository from '../repositories/assessments/add-assessment.repository';
import AssessmentQuestionRepository from '../repositories/assessments/assessment-question.repository';
import DeleteAssessmentRepository from '../repositories/assessments/delete-assessment.repository';
import GetSkillRepository from '../repositories/assessments/get-skills.repository';
import UserStatsService from './user-stats.service';
import {
  AddAssessmentQuestionServiceRequest,
  AddAssessmentServiceRequest,
  DeleteAssessmentQuestionRequest,
  DeleteAssessmentRequest,
  GetAssessmentBySlugRequest,
  GetAssessmentDiscoveryRequest,
  GetAssessmentMetadataRequest,
  GetAssessmentQuestionsRequest,
  GetAssessmentsRequest,
  GetAvailableSkillsRequest,
} from '../interfaces/assessment.interface';
import {
  addAssessmentQuestionSchema,
  addAssessmentSchema,
} from '../validations/assessment.validation';
import { validate } from '../helpers/validation';
import { ResponseError } from '../helpers/error';
import { getPublicId } from '../helpers/cloudinary';

class AssessmentService {
  private imageRepository: ImageRepository;
  private getAssessmentRepository: GetAssessmentRepository;
  private getAssessmentDetailRepository: GetAssessmentDetailRepository;
  private addAssessmentRepository: AddAssessmentRepository;
  private assessmentQuestionRepository: AssessmentQuestionRepository;
  private deleteAssessmentRepository: DeleteAssessmentRepository;
  private getSkillRepository: GetSkillRepository;
  private userStatsService: UserStatsService;

  constructor() {
    this.imageRepository = new ImageRepository();
    this.getAssessmentRepository = new GetAssessmentRepository();
    this.getAssessmentDetailRepository = new GetAssessmentDetailRepository();
    this.addAssessmentRepository = new AddAssessmentRepository();
    this.assessmentQuestionRepository = new AssessmentQuestionRepository();
    this.deleteAssessmentRepository = new DeleteAssessmentRepository();
    this.getSkillRepository = new GetSkillRepository();
    this.userStatsService = new UserStatsService();
  }

  getAssessments = async (req: GetAssessmentsRequest) => {
    return await this.getAssessmentRepository.getAssessments(req);
  };

  getAssessmentDisovery = async (req: GetAssessmentDiscoveryRequest) => {
    const userStats = await this.userStatsService.getUserStats({
      userId: req.userId,
    });

    if (!userStats.stats.subscription.plan)
      throw new ResponseError(403, 'Unauthorized');

    return await this.getAssessmentRepository.getAssessmentDiscovery(req);
  };

  getAssessmentBySlug = async (req: GetAssessmentBySlugRequest) => {
    const assessment =
      await this.getAssessmentDetailRepository.getAssessmentBySlug(req);

    if (!assessment) {
      throw new ResponseError(404, 'Assessment not found');
    }

    return assessment;
  };

  getAvailableSkills = async (req: GetAvailableSkillsRequest) => {
    return await this.getSkillRepository.getAvailableSkills(req);
  };

  addAssessment = async (req: AddAssessmentServiceRequest) => {
    validate(addAssessmentSchema, req);

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

    const hasReachedLimit =
      (await this.assessmentQuestionRepository.getTotalAssessmentQuestions(
        req.assessmentId,
      )) >= 25;
    if (hasReachedLimit)
      throw new ResponseError(
        409,
        'Unable to add more questions. Max limit of 25 has been reached.',
      );

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

  deleteAssessmentQuestion = async (req: DeleteAssessmentQuestionRequest) => {
    const { question } =
      await this.assessmentQuestionRepository.getAssessmentQuestionById(req);

    if (question?.image) {
      const publicId = getPublicId(question.image);
      await this.imageRepository.delete(publicId);
    }

    return await this.assessmentQuestionRepository.deleteAssessmentQuestion(
      req,
    );
  };

  getTopAssessments = async () => {
    return await this.getAssessmentRepository.getTopAssessments();
  };

  getAssessmentMetadata = async (req: GetAssessmentMetadataRequest) => {
    return await this.getAssessmentDetailRepository.getAssessmentMetadata(req);
  };

  deleteAssessment = async (req: DeleteAssessmentRequest) => {
    const assessment =
      await this.getAssessmentDetailRepository.getAssessmentById(req);

    if (assessment?.image) {
      const publicId = getPublicId(assessment.image);
      await this.imageRepository.delete(publicId);
    }

    return await this.deleteAssessmentRepository.deleteAssessment(req);
  };
}

export default AssessmentService;
