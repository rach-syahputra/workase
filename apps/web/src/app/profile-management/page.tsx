'use client';
import { axiosPublic } from '@/lib/axios';
import { useFormik } from 'formik';
import { signOut, useSession } from 'next-auth/react';
import * as React from 'react';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { ProfilePhoto } from './_components/photo-profile';
import { UserInfo } from './_components/users-or-companies-info';
import { BirthInfo } from './_components/users-profile/birth-info';
import { GenderEducation } from './_components/users-profile/gender-and-education-info';
import { Address } from './_components/users-profile/adress-info';
import NameAndPhoneNumber from './_components/companies-profile/name-and-phone-number-info';
import CategoryAndLocation from './_components/companies-profile/category-and-location-info';
import { Description } from './_components/companies-profile/description';
import { useRouter } from 'next/navigation';
import { SaveButton } from './_components/companies-profile/save-button';
import { IUpdateForm, roleUrl, UpdateSchema } from '@/types/profile-management';
import AppLoading from '@/components/ui/app-loading';
import { title } from 'process';
import { useToast } from '@/hooks/use-toast';
export default function ProfileSettingPage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [initialValues, setInitialValues] = useState<IUpdateForm>({
    name: (session?.user?.name as string) || (undefined as unknown as string),
    phoneNumber:
      (session?.user?.phoneNumber as string) ||
      (undefined as unknown as string),
    category:
      (session?.user?.category as string) || (undefined as unknown as string),
    location:
      (session?.user?.location as string) || (undefined as unknown as string),
    description:
      (session?.user?.description as string) ||
      (undefined as unknown as string),
    email: session?.user?.email as string,
    placeOfBirth:
      (session?.user?.placeOfBirth as string) ||
      (undefined as unknown as string),
    dateOfBirth: session?.user?.dateOfBirth
      ? new Date(session?.user?.dateOfBirth)
      : (undefined as unknown as Date),
    gender:
      (session?.user?.gender as 'MALE' | 'FEMALE') ||
      (undefined as unknown as string),
    lastEducation:
      (session?.user?.lastEducation as string) ||
      (undefined as unknown as string),
    address:
      (session?.user?.address as string) || (undefined as unknown as string),
  });
  useEffect(() => {
    if (status === 'authenticated' && session) {
      setInitialValues({
        name:
          (session?.user?.name as string) || (undefined as unknown as string),
        phoneNumber:
          (session?.user?.phoneNumber as string) ||
          (undefined as unknown as string),
        category:
          (session?.user?.category as string) ||
          (undefined as unknown as string),
        location:
          (session?.user?.location as string) ||
          (undefined as unknown as string),
        description:
          (session?.user?.description as string) ||
          (undefined as unknown as string),
        email: session?.user?.email as string,
        placeOfBirth:
          (session?.user?.placeOfBirth as string) ||
          (undefined as unknown as string),
        dateOfBirth: session?.user?.dateOfBirth
          ? new Date(session?.user?.dateOfBirth)
          : (undefined as unknown as Date),
        gender:
          (session?.user?.gender as 'MALE' | 'FEMALE') ||
          (undefined as unknown as string),
        lastEducation:
          (session?.user?.lastEducation as string) ||
          (undefined as unknown as string),
        address:
          (session?.user?.address as string) ||
          (undefined as unknown as string),
      });
    }
  }, [session, status]);
  const submitUpdate = async (values: IUpdateForm) => {
    try {
      if (values.email === session?.user?.email) {
        values.email = '';
      }
      const response = await axiosPublic.patch(
        `/${roleUrl[session?.user?.role as keyof typeof roleUrl]}`,
        {
          name: values?.name,
          phoneNumber: values?.phoneNumber,
          category: values?.category,
          location: values?.location,
          description: values?.description,
          email: values?.email,
          placeOfBirth: values?.placeOfBirth,
          dateOfBirth: values?.dateOfBirth,
          gender: values?.gender,
          lastEducation: values?.lastEducation,
          address: values?.address,
        },
        {
          headers: {
            Authorization: `Bearer ${session?.user?.accessToken}`,
          },
        },
      );
      if (response.status >= 200 && response.status < 300) {
        toast({
          title: 'Success',
          description: 'Update Success',
          variant: 'default',
        });
        if (values.email && values.email !== session?.user?.email) {
          toast({
            title: 'Success',
            description: 'Your email has been changed, please login again',
            variant: 'default',
          });
          router.push(
            `/${roleUrl[session?.user?.role as keyof typeof roleUrl]}/login`,
          );
        } else {
          await update();
        }
      }
    } catch (err) {
      toast({
        title: 'Failed',
        description: 'Update Failed: Please try again.',
        variant: 'destructive',
      });
    }
  };
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: UpdateSchema,
    onSubmit: (values) => {
      submitUpdate(values);
    },
  });
  const timer = setTimeout(() => {
    setLoading(false);
  }, 1000);
  return loading ? (
    <div className="bg-background fixed left-0 top-0 flex min-h-screen w-screen flex-1 items-center justify-center lg:pl-[320px]">
      <AppLoading size="md" label="Loading data, please stand by..." />
    </div>
  ) : (
    <div className="w-full py-5 md:px-4 md:py-8">
      <div className="flex justify-center text-[24px] font-medium md:justify-normal">
        Personal Information
      </div>
      <div className="my-4 w-full rounded-md border bg-white px-4 pb-[30px] md:py-4 md:pb-[30px]">
        <div className="flex max-w-[1065px] flex-col px-0 pt-[18px] md:flex-row md:gap-10 md:px-[30px] md:pb-[18px] md:pt-[30px]">
          <ProfilePhoto photoProfile={session?.user?.profilePhoto as string} />
          <UserInfo formik={formik} role={session?.user?.role ?? undefined} />
        </div>

        {session?.user?.role === 'USER' ? (
          <form onSubmit={formik.handleSubmit}>
            <BirthInfo formik={formik} />
            <GenderEducation formik={formik} />
            <Address formik={formik} />
            <SaveButton formik={formik} />
          </form>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <NameAndPhoneNumber formik={formik} />
            <CategoryAndLocation formik={formik} />
            <Description formik={formik} />
            <SaveButton formik={formik} />
          </form>
        )}
      </div>
    </div>
  );
}
