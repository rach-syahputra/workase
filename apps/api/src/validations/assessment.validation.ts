import * as yup from 'yup';

const MAX_IMAGE_SIZE = 1024000; // 1MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

export const addAssessmentSchema = yup
  .object()
  .shape({
    skillId: yup
      .string()
      .typeError('Skill ID must be a string')
      .required('Skill ID is required'),
    image: yup
      .mixed<Express.Multer.File>()
      .test('fileType', 'Image format is not supported', (file) => {
        return file ? ACCEPTED_IMAGE_TYPES.includes(file.mimetype) : true;
      })
      .test('fileSize', 'Max image size is 1MB', (file) => {
        return file ? file.size <= MAX_IMAGE_SIZE : true;
      })
      .nullable(),
    shortDescription: yup
      .string()
      .typeError('Short description must be a string')
      .required('Short description is required')
      .max(150, 'Short description must be less than 50 characters'),
  })
  .strict(true);

const questionOptionSchema = yup.object().shape({
  text: yup.string().trim().required('Option text is required'),
  isCorrect: yup.boolean().required(),
});

export const addAssessmentQuestionSchema = yup.object().shape({
  assessmentId: yup.string().required('Assessment ID is required'),
  question: yup.string().trim().required('Question is required'),
  image: yup
    .mixed<Express.Multer.File>()
    .test('fileType', 'Image format is not supported', (file) => {
      return file ? ACCEPTED_IMAGE_TYPES.includes(file.mimetype) : true;
    })
    .test('fileSize', 'Max image size is 1MB', (file) => {
      return file ? file.size <= MAX_IMAGE_SIZE : true;
    })
    .nullable(),
  options: yup
    .array()
    .of(questionOptionSchema)
    .min(2, 'At least two options are required')
    .max(4, 'At most four options are allowed')
    .test('one-correct-option', 'Only one option can be correct', (options) => {
      return options?.filter((option) => option.isCorrect).length === 1;
    }),
});
