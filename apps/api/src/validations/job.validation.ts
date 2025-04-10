import prisma from '@/prisma';
import * as Yup from 'yup';

const validTitle = async (): Promise<string[]> => {
  const titles = await prisma.job.findMany({
    select: {
      title: true,
    },
  });
  return titles.map((item) => item.title);
};

const validCategory = async (): Promise<string[]> => {
  const categories = await prisma.job.findMany({
    select: {
      company: {
        select: {
          category: true,
        },
      },
    },
  });
  return categories.map((item) => item.company.category);
};

const validLocation = async (): Promise<string[]> => {
  const locations = await prisma.job.findMany({
    select: {
      company: {
        select: {
          location: true,
        },
      },
    },
  });
  return locations.map((item) => item.company.location);
};

const jobFilterSchema = async () => {
  const categories = await validCategory();
  const locations = await validLocation();
  const titles = await validTitle();
  return Yup.object().shape({
    title: Yup.string()
      .trim()
      .matches(
        /^[a-zA-Z0-9\s]+$/,
        'Title hanya boleh mengandung huruf, angka, dan spasi',
      )
      .test(
        'is-valid-title',
        'Pekerjaan dengan judul tersebut tidak ditemukan',
        (value) =>
          !value ||
          titles.some((t) => t.toLowerCase().includes(value.toLowerCase())),
      )
      .optional(),
    category: Yup.string()
      .test(
        'is-valid-category',
        'Pekerjaan dengan kategori tersebut tidak ditemukan',
        (value) =>
          !value ||
          categories.some((c) => c.toLowerCase().includes(value.toLowerCase())),
      )
      .optional(),
    location: Yup.string()
      .test(
        'is-valid-location',
        'Pekerjaan dengan lokasi tersebut tidak ditemukan',
        (value) =>
          !value ||
          locations.some((l) => l.toLowerCase().includes(value.toLowerCase())),
      )
      .optional(),
  });
};

export default jobFilterSchema;
