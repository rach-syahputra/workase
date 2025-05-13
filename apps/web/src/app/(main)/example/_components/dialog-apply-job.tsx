'use client';
import { Button } from '@/components/shadcn-ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/shadcn-ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useFormik } from 'formik';
import { axiosPrivate } from '@/lib/axios';
import {
  DialogApplyJobProps,
  ApplicationSchema,
} from '@/types/submit-cv-types-and-validation';
import { FileUpload, SalaryInput } from './dialog-form-component';

export function DialogApplyJob({
  jobId,
  className,
  variant,
}: DialogApplyJobProps) {
  const { data: session, status } = useSession();
  const { toast } = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState('');
  const [uploadError, setUploadError] = useState('');

  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen && status !== 'authenticated') {
      setOpen(false);
      sessionStorage.setItem('redirectAfterLogin', window.location.pathname);
      toast({
        title: 'Login Required',
        description: 'You need to login before applying for this job',
        variant: 'destructive',
      });
      window.location.href = '/users/login';
      return;
    }
    if (
      (newOpen && session?.user?.isVerified === false) ||
      session?.user?.role !== 'USER'
    ) {
      setOpen(false);
      sessionStorage.setItem('redirectAfterLogin', window.location.pathname);
      toast({
        title: 'Verification Required',
        description:
          session?.user?.role == 'USER'
            ? 'You need to verify your account before applying for this job'
            : 'You need login as user before applying for this job',
        variant: 'destructive',
      });
      return;
    }
    setOpen(newOpen);
    if (!newOpen) {
      formik.resetForm();
      setSelectedFileName('');
      setUploadError('');
    }
  };

  const formik = useFormik({
    initialValues: {
      expectedSalary: '',
      cv: null as File | null,
    },
    validationSchema: ApplicationSchema,
    onSubmit: async (values) => {
      if (!session) {
        toast({
          title: 'Login Required',
          description: 'You need to login before applying for this job',
          variant: 'destructive',
        });
        window.location.href = '/users/login';
        return;
      }

      if (!values.cv) {
        toast({
          title: 'CV Required',
          description: 'Please upload your CV',
          variant: 'destructive',
        });
        return;
      }

      try {
        setIsSubmitting(true);
        const formData = new FormData();
        formData.append('salaryEstimate', values.expectedSalary);
        formData.append('cv', values.cv);
        const axiosInstance = axiosPrivate(
          session?.user?.accessToken ?? '',
          'multipart/form-data',
        );
        const response = await axiosInstance.post(
          `/job-applications/${jobId}/apply`,
          formData,
        );

        if (response.status < 200 || response.status >= 300) {
          throw new Error(
            `Failed to apply for the job: ${response.statusText}`,
          );
        }

        toast({
          title: 'Application submitted',
          description: 'Your application has been submitted successfully',
        });

        setOpen(false);
        formik.resetForm();
        setSelectedFileName('');
        setUploadError('');
      } catch (error) {
        console.error('Error applying for job:', error);
        toast({
          title: 'Submission Failed',
          description:
            error instanceof Error
              ? `${error.message}, Maybe you have already applied for this job`
              : 'Failed to submit application, Maybe you have already applied for this job',

          variant: 'destructive',
        });
      } finally {
        setIsSubmitting(false);
      }
    },
  });
  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger className={`default-style w-full ${className}`} asChild>
        <Button
          variant={
            variant as
              | 'link'
              | 'default'
              | 'destructive'
              | 'dark'
              | 'outline'
              | 'secondary'
              | 'ghost'
              | undefined
          }
        >
          Apply Job
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={formik.handleSubmit}>
          <DialogHeader>
            <DialogTitle>Apply This Job</DialogTitle>
            <DialogDescription>
              Fill in the Required Information to Apply for This Position.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <SalaryInput formik={formik} />
            <FileUpload
              formik={formik}
              selectedFileName={selectedFileName}
              setSelectedFileName={setSelectedFileName}
              uploadError={uploadError}
              setUploadError={setUploadError}
            />
          </div>
          <DialogFooter>
            <Button
              type="submit"
              disabled={
                isSubmitting ||
                !formik.values.cv ||
                !formik.values.expectedSalary
              }
              className="bg-primary-blue hover:bg-blue-700"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
