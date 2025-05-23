import { IGeneratedQuestion } from '@/lib/interfaces/assessment-question';
import * as yup from 'yup';

export const addAssessmentSchema = yup
  .object()
  .shape({
    skillId: yup
      .string()
      .typeError('Skill ID must be a text')
      .required('Skill ID is required'),
    image: yup
      .mixed<File>()
      .required('Image is required')
      .test(
        'fileFormat',
        'Only image files are allowed (jpg, jpeg, png)',
        (value) => {
          return (
            value &&
            ['image/jpeg', 'image/jpg', 'image/png'].includes(value.type)
          );
        },
      ),
    shortDescription: yup
      .string()
      .typeError('Short description must be a string')
      .required('Short description is required')
      .max(150, 'Short description must be less than 150 characters'),
  })
  .strict();

export const addAssessmentQuestionSchema = yup
  .object()
  .shape({
    assessmentId: yup
      .string()
      .typeError('Assessment ID must be a text')
      .required('Assessment ID is required'),
    question: yup
      .string()
      .typeError('Question must be a string')
      .required('Question is required')
      .min(10, 'Question must be at least 10 characters'),
    image: yup
      .mixed<File>()
      .nullable()
      .test(
        'fileFormat',
        'Only image files are allowed (jpg, jpeg, png)',
        (value) => {
          if (!value) return true;
          return ['image/jpeg', 'image/jpg', 'image/png'].includes(value.type);
        },
      ),
    options: yup
      .array()
      .of(
        yup.object().shape({
          text: yup.string().trim().required('Options are required'),
          isCorrect: yup
            .number()
            .oneOf([0, 1], 'isCorrect must be 0 or 1')
            .required('isCorrect is required'),
        }),
      )
      .min(4, 'Four options are required')
      .test(
        'only-one-correct',
        'Must have one correct option',
        (options) => options?.filter((opt) => opt.isCorrect === 1).length === 1,
      ),
  })
  .strict(true);

export const isGeneratedQuestionValid = (content: IGeneratedQuestion) => {
  return (
    content?.correctOption && content?.incorrectOptions && content?.question
  );
};
