import * as Yup from 'yup';
export const AllCompaniesFilterSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .matches(
      /^[a-zA-Z0-9 &.,'’\-\s]+$/,
      'Title hanya boleh mengandung huruf, angka, dan spasi',
    )
    .optional(),
  location: Yup.string().optional(),
  sort: Yup.string()
    .oneOf(['asc', 'desc'], 'Sort must be either "asc" or "desc"')
    .optional(),
  page: Yup.number().optional().min(1),
});
