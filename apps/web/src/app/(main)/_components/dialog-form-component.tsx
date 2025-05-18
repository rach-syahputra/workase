'use client';
import { Input } from '@/components/shadcn-ui/input';
import { Label } from '@/components/shadcn-ui/label';
import { Button } from '@/components/shadcn-ui/button';
import { FormikProps } from 'formik';
import { useRef } from 'react';
import { BsCurrencyDollar } from 'react-icons/bs';
import { ApplicationFormValues } from '@/lib/interfaces/submit-cv-types-and-validation';

// Salary Input Component
export function SalaryInput({
  formik,
}: {
  formik: FormikProps<ApplicationFormValues>;
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor="expectedSalary">Expected Salary / Month</Label>
      <div className="relative w-full">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
          <BsCurrencyDollar />
        </span>
        <Input
          id="expectedSalary"
          name="expectedSalary"
          value={formik.values.expectedSalary}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="e.g. 5000"
          className="border-input pl-8"
        />
      </div>
      <div className="mt-1 text-sm text-gray-500">
        *Please Input Your Expected Salary in USD
      </div>
      {formik.touched.expectedSalary && formik.errors.expectedSalary && (
        <p className="text-sm text-red-500">{formik.errors.expectedSalary}</p>
      )}
    </div>
  );
}

// File Upload Component
export function FileUpload({
  formik,
  selectedFileName,
  setSelectedFileName,
  uploadError,
  setUploadError,
}: {
  formik: FormikProps<ApplicationFormValues>;
  selectedFileName: string;
  setSelectedFileName: (fileName: string) => void;
  uploadError: string;
  setUploadError: (error: string) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError('');

    const files = e.target.files;
    if (!files || files.length === 0) {
      return;
    }

    const file = files[0];

    // Validate file size
    if (file.size > 2048000) {
      setUploadError('File size must be less than 2MB');
      formik.setFieldError('cv', 'File size must be less than 2MB');
      formik.setFieldValue('cv', null);
      setSelectedFileName('');
      return;
    }

    // Validate file type
    if (file.type !== 'application/pdf') {
      setUploadError('Only PDF files are allowed');
      formik.setFieldError('cv', 'Only PDF files are allowed');
      formik.setFieldValue('cv', null);
      setSelectedFileName('');
      return;
    }

    // Set the file to formik state
    formik.setFieldValue('cv', file);
    setSelectedFileName(file.name);
  };

  const handleRemoveFile = () => {
    formik.setFieldValue('cv', null);
    setSelectedFileName('');
    setUploadError('');

    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="grid gap-2">
      <Label htmlFor="cv">Upload CV</Label>
      <div className="flex flex-col gap-2">
        {/* Hidden file input */}
        <Input
          ref={fileInputRef}
          id="cv"
          name="cv"
          type="file"
          onChange={handleFileChange}
          accept=".pdf,application/pdf"
          className="hidden"
          multiple
        />

        {/* Custom upload button */}
        <Button
          type="button"
          variant="outline"
          onClick={handleFileClick}
          className="flex cursor-pointer items-center justify-center border border-blue-600 bg-white text-blue-600 hover:bg-blue-50"
        >
          <span className="text-base font-medium">
            {selectedFileName ? 'Change PDF File' : 'Select PDF File'}
          </span>
        </Button>

        {/* Display selected file */}
        {selectedFileName && (
          <div className="flex items-center justify-between rounded border bg-gray-50 p-2">
            <span className="truncate text-sm">{selectedFileName}</span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleRemoveFile}
              className="h-6 w-6 p-0 text-red-500 hover:bg-red-50 hover:text-red-700"
            >
              ✕
            </Button>
          </div>
        )}

        {/* Upload requirements and errors */}
        <div className="mt-1 text-sm text-gray-500">
          *PDF Format Only, Max 2MB
        </div>

        {uploadError && <p className="text-sm text-red-500">{uploadError}</p>}

        {formik.touched.cv && formik.errors.cv && !uploadError && (
          <p className="text-sm text-red-500">{formik.errors.cv as string}</p>
        )}
      </div>
    </div>
  );
}
