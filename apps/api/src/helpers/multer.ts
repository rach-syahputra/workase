import multer from 'multer';

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const MAX_DEVELOPER_IMAGE_SIZE = 1024000; // 1mb
const MAX_ASSESSMENT_IMAGE_SIZE = 512000; // 500kb
const MAX_ASSESSMENT_QUESTION_IMAGE_SIZE = 1024000; // 1mb
const MAX_CERTIFICATE_PDF_SIZE = 2048000; // 2mb

export const uploadDeveloperImage = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
  limits: {
    fileSize: MAX_DEVELOPER_IMAGE_SIZE,
  },
});

export const uploadAssessmentImage = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
  limits: {
    fileSize: MAX_ASSESSMENT_IMAGE_SIZE,
  },
});

export const uploadAssessmentQuestionImage = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
  limits: {
    fileSize: MAX_ASSESSMENT_QUESTION_IMAGE_SIZE,
  },
});

export const uploadCertificatePdf = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
  limits: {
    fileSize: MAX_CERTIFICATE_PDF_SIZE,
  },
});

export const uploadUserImage = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
  limits: {
    fileSize: MAX_DEVELOPER_IMAGE_SIZE,
  },
});

export const uploadCompanyImage = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
  limits: {
    fileSize: MAX_DEVELOPER_IMAGE_SIZE,
  },
});
