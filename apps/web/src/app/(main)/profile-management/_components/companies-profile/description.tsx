import { Button } from '@/components/shadcn-ui/button';
import { FormikProps } from 'formik';
import { IUpdateForm } from '@/types/profile';
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
    <div className="right-0 flex justify-end pt-[20px]">
      <Button
        className="bg-primary-blue right-0 h-10 w-full cursor-pointer rounded-md px-8 pt-[-2px] text-center text-[15px] font-semibold md:w-fit"
        type="submit"
      >
        Save
      </Button>
    </div>
  </div>
);
