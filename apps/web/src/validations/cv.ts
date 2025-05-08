import * as yup from 'yup';

export const addCvSchema = yup.object().shape({
  data: yup.object({
    header: yup.object({
      content: yup.object({
        role: yup.string().required('Role is required'),
        name: yup.string().required('Name is required'),
        email: yup
          .string()
          .email('Invalid email')
          .required('Email is required'),
        phoneNumber: yup.string().required('Phone number is required'),
      }),
    }),

    summary: yup.object({
      content: yup.string().required('Summary content is required'),
    }),

    experience: yup.object({
      contents: yup
        .array()
        .of(
          yup.object({
            role: yup.string().required('Experience role is required'),
            company: yup.string().required('Company name is required'),
            startDate: yup.string().required('Start date is required'),
            endDate: yup.string().required('End date is required'),
            tasks: yup
              .array()
              .of(yup.string().required('Task is required'))
              .min(1, 'At least one task is required'),
          }),
        )
        .min(1, 'At least one experience content is required'),
    }),

    education: yup.object({
      contents: yup
        .array()
        .of(
          yup.object({
            major: yup.string().required('Major is required'),
            institution: yup.string().required('Institution is required'),
            startDate: yup.string().required('Start date is required'),
            endDate: yup.string().required('End date is required'),
          }),
        )
        .min(1, 'At least one education item is required'),
    }),
  }),
});

export const autoGenerateSummarySchema = yup.object().shape({
  softSkills: yup.string().typeError('Soft skills must be a text').optional(),
  yearsOfExperience: yup
    .string()
    .typeError('Years of experience must be a number')
    .optional(),
  achievement: yup.string().typeError('Achievement must be a text').optional(),
  careerObjective: yup
    .string()
    .typeError('Career objective must be a text')
    .optional(),
});
