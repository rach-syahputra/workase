import prisma from '../prisma';
import * as Yup from 'yup';

const validCompanyNames = async (): Promise<string[]> => {
  const companyNames = await prisma.company.findMany({
    select: {
      name: true,
    },
  });
  return companyNames.map((item) => item.name);
};

const validLocation = async (): Promise<string[]> => {
  const locations = await prisma.company.findMany({
    select: {
      location: true,
    },
  });
  console.log('ini locations', locations);
  return locations
    .map((item) => item.location)
    .filter((location): location is string => location !== null);
};

const companiesFilterSchema = async () => {
  const locations = await validLocation();
  const companyNames = await validCompanyNames();
  return Yup.object().shape({
    name: Yup.string()
      .trim()
      .optional()
      .test(
        'is-valid-name',
        'Company with this name does not exist and Company name just contain letters, numbers, spaces, and some signs',
        (value) => {
          if (!value) {
            return true;
          }
          const isValidFormat = /^[a-zA-Z0-9 &.,'’\-\s]+$/.test(value);
          const isMatch = companyNames.some((t) =>
            t.toLowerCase().includes(value.toLowerCase()),
          );
          return isValidFormat && isMatch;
        },
      ),
    location: Yup.string()
      .optional()
      .test(
        'is-valid-location',
        'companies with this location does not exist',
        (value) =>
          !value ||
          locations.some((l) => l.toLowerCase().includes(value.toLowerCase())),
      ),
    sort: Yup.string()
      .oneOf(['asc', 'desc'], 'Sort must be either "asc" or "desc"')
      .optional(),
    page: Yup.number().optional().min(1, 'Page must be at least 1'),
  });
};

export default companiesFilterSchema;
