import * as React from 'react';

import { FormikProps } from 'formik';
import { IUpdateForm } from '@/lib/interfaces/profile';

interface FormValues {
  formik: FormikProps<IUpdateForm>;
}

export default function CategoryAndLocation({
  formik,
}: {
  formik: FormValues['formik'];
}) {
  return (
    <div className="max-w-[1065px] md:px-[30px]">
      <div className="flex items-center gap-1">
        <div className="flex w-full flex-col justify-center">
          <div className="pb-[5px] pt-[13px] font-medium">Category</div>
          <input
            value={formik.values.category}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            className="w-full rounded-lg border-[1px] border-gray-300 py-[8px] pl-2 text-[14px] font-medium text-black"
            placeholder="E.g. IT / Education / Health"
            id="category"
            name="category"
          />
        </div>
        <div className="flex w-full flex-col justify-center">
          <div className="pb-[5px] pt-[13px] font-medium">Location</div>
          <input
            type="text"
            className="w-full rounded-lg border-[1px] border-gray-300 py-[8px] pl-2 text-[14px] font-medium text-black"
            placeholder="E.g. Mojokerto, Jawa Timur, Indonesia"
            value={formik.values.location}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="location"
            name="location"
          />
        </div>
      </div>
    </div>
  );
}
