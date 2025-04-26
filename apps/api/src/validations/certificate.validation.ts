import * as yup from 'yup';

const MAX_PDF_SIZE = 2048000; // 2MB
const ACCEPTED_PDF_TYPES = ['application/pdf'];

export const AddCertificateSchema = yup
  .object()
  .shape({
    userAssessmentId: yup.string().required('User assessment id is required'),
    pdf: yup
      .mixed<Express.Multer.File>()
      .required('PDF file is required')
      .test('fileType', 'Only PDF format is supported', (file) => {
        return file ? ACCEPTED_PDF_TYPES.includes(file.mimetype) : false;
      })
      .test('fileSize', 'Max file size is 2MB', (file) => {
        return file ? file.size <= MAX_PDF_SIZE : false;
      }),
  })
  .strict(true);
