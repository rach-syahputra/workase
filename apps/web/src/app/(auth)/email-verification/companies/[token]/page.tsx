'use client';
import Container from '@/components/layout/container';
import { Button } from '@/components/shadcn-ui/button';
import Footer from '@/components/ui/footer-for-auth';
import Logo from '@/components/ui/logo-for-auth';
import { axiosPrivate } from '@/lib/axios';
import { Building2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

import * as React from 'react';

export interface IEmailVerificationProps {
  params: any;
}

export default function EmailVerification(props: IEmailVerificationProps) {
  const decodedToken = decodeURIComponent(props.params.token);
  const cleanToken = decodedToken.replace(/^Bearer\s/, '');
  const router = useRouter();
  const verifyEmail = async () => {
    try {
      const axiosInstance = axiosPrivate(cleanToken);
      const response = await axiosInstance.patch('/companies/verify');
      alert('Your email has been verified successfully');
      router.push('/companies/login');
    } catch (e) {
      alert('Verification link has failed to send to your email');
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-[#f8f5f0] to-[#e4e0da]">
      <Logo />
      <main className="flex-grow">
        <Container className="px-7 pt-[0px] md:flex md:items-center md:justify-center">
          <div className="font-geist md:w-[500px]">
            <div className="flex flex-col justify-center p-1 pb-2">
              <div className="flex items-center justify-center gap-3 p-3 text-center text-[26px] font-medium">
                {' '}
                <Building2 className="w-4 scale-150" />
                Verify Your Email
              </div>
              <div className="flex justify-center text-center md:pt-[10px]">
                By Enter This Button, You Have Verify Your Email, Thank You For
                Your Verification
              </div>
              <div className="flex w-full items-center justify-center pt-[23px]">
                <Button onClick={() => verifyEmail()} className="w-[50%]">
                  Verify
                </Button>
              </div>
              <div className="flex justify-center pt-[18px] text-center">
                After This We`ll Redirect You To Login Page`
              </div>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
