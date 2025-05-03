import prisma from '../prisma';
import { Request, Response, NextFunction } from 'express';
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
  return categories
    .map((item) => item.company.category)
    .filter((category): category is string => category !== null);
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
  return locations
    .map((item) => item.company.location)
    .filter((location): location is string => location !== null);
};

const jobFilterSchema = async () => {
  const categories = await validCategory();
  const locations = await validLocation();
  const titles = await validTitle();
  return Yup.object().shape({
    title: Yup.string()
      .trim()
      .optional()
      .test(
        'is-valid-title',
        'Pekerjaan dengan judul tersebut tidak ditemukan dan Title hanya boleh mengandung huruf, angka, dan spasi',
        (value) => {
          if (!value) {
            return true;
          }
          const isValidFormat = /^[a-zA-Z0-9\s]+$/.test(value);
          const isMatch = titles.some((t) =>
            t.toLowerCase().includes(value.toLowerCase()),
          );
          return isValidFormat && isMatch;
        },
      ),

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
