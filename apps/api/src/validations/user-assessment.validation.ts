import * as yup from 'yup';

export const addUserAssessmentSchema = yup.object().shape({
  userId: yup
    .string()
    .typeError('User ID must be a string')
    .required('User ID is required'),
  assessment: yup.object().shape({
    id: yup
      .string()
      .typeError('Assessment ID must be a string')
      .required('Assessment ID is required'),
    slug: yup
      .string()
      .typeError('Assessment slug must be a string')
      .required('Assessment slug is required'),
  }),
  subscriptionId: yup
    .string()
    .typeError('Subscription ID must be a string')
    .required('Subscription ID is required'),
  score: yup
    .number()
    .typeError('Score must be a number')
    .required('Scoreis required')
    .min(0, 'Mininum score is 0')
    .max(100, 'Maximum score is 100'),
  sessionToken: yup
    .string()
    .typeError('Session token must be a string')
    .nullable(),
  status: yup
    .mixed<'ON_GOING' | 'PASSED' | 'FAILED'>()
    .oneOf(
      ['ON_GOING', 'PASSED', 'FAILED'],
      'Status must be ON_GOING, PASSED, or FAILED',
    )
    .required('Status is required'),
});

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
