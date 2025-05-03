import * as yup from 'yup';

const assessmentAnswer = yup.object().shape({
  assessmentQuestionId: yup
    .string()
    .required('Assessment question ID is required'),
  selectedOptionId: yup.string().required('Selected option ID is required'),
});

export const CalculateAssessmentResultSchema = yup
  .object()
  .shape({
    userAssessmentId: yup.string().required('User assessment ID is required'),
    assessmentAnswers: yup.array().of(assessmentAnswer),
  })
  .strict(true);
