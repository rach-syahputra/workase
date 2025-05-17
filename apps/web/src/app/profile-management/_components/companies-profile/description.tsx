import { Button } from '@/components/shadcn-ui/button';
import { FormikProps } from 'formik';
import { IUpdateForm } from '@/lib/interfaces/profile';
import { TiptapEditor } from '../tiptap-editor';

interface AddressProps {
  formik: FormikProps<IUpdateForm>;
}

export const Description: React.FC<AddressProps> = ({ formik }) => (
  <div className="max-w-[1065px] md:px-[30px]">
    <div className="pb-[5px] pt-[13px] font-medium">Description</div>
    <div className="max-w-full">
      <TiptapEditor
        onChange={(val) => formik.setFieldValue('description', val)}
        formik={formik}
      />
    </div>
  </div>
);
