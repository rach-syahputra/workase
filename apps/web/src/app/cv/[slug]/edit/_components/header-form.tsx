'use client';

import { getIn } from 'formik';

import { useCvEditFormContext } from '@/context/cv-edit-form-context';
import { Card } from '@/components/shadcn-ui/card';
import FormInput from '@/components/ui/form-input';

const HeaderForm = () => {
  const { formik } = useCvEditFormContext();

  return (
    <Card className="flex flex-col gap-4 p-5">
      <h2 className="text-xl font-bold">Header</h2>
      <div className="grid w-full grid-cols-2 gap-x-4 gap-y-6">
        <FormInput
          type="text"
          labelColor="gray"
          name="data.header.content.name"
          label="Name"
          onChange={formik.handleChange}
          value={formik.values.data.header?.content.name as string}
          errorMessage={getIn(formik.errors, 'data.header.content.name')}
        />
        <FormInput
          type="text"
          labelColor="gray"
          name="data.header.content.role"
          label="Role"
          onChange={formik.handleChange}
          value={formik.values.data.header?.content.role as string}
          errorMessage={getIn(formik.errors, 'data.header.content.role')}
        />
        <FormInput
          type="text"
          labelColor="gray"
          name="data.header.content.email"
          label="Email"
          onChange={formik.handleChange}
          value={formik.values.data.header?.content.email as string}
          errorMessage={getIn(formik.errors, 'data.header.content.email')}
        />
        <FormInput
          type="text"
          labelColor="gray"
          name="data.header.content.phoneNumber"
          label="Phone Number"
          onChange={formik.handleChange}
          value={formik.values.data.header?.content.phoneNumber as string}
          errorMessage={getIn(formik.errors, 'data.header.content.phoneNumber')}
        />
      </div>
    </Card>
  );
};

export default HeaderForm;
