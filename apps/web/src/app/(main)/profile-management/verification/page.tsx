'use client';
import { Button } from '@/components/shadcn-ui/button';
import { axiosPrivate } from '@/lib/axios';
import { Info } from 'lucide-react';
import { useSession } from 'next-auth/react';
import * as React from 'react';
import { CiRedo } from 'react-icons/ci';
import { FaCheckCircle } from 'react-icons/fa';
import { useState } from 'react';
const roleUrl = {
  ADMIN: 'companies',
  USER: 'users',
};
export default function VaerifivationSettingsPage() {
  const { data: session } = useSession();
  const [showTooltip, setShowTooltip] = useState(false);
  const varificationRequest = async () => {
    try {
      const axiosInstance = axiosPrivate(session?.user?.accessToken as string); // Replace 'your-token-here' with the actual token
      const result = await axiosInstance.post(
        `/${roleUrl[session?.user?.role as keyof typeof roleUrl]}/email-verification-request`,
      );
      alert('Verification link has been send successfully to your email');
    } catch (e) {
      alert('Verification link has failed to send to your email');
    }
  };
  return (
    <div className="w-full py-5 md:px-4 md:py-8">
      <div className="flex justify-center text-[24px] font-medium md:justify-normal">
        Verification
      </div>
      <div className="my-4 w-full rounded-md border bg-white px-4 pb-[30px] md:py-4 md:pb-[30px]">
        <div className="max-w-[1065px] md:px-[30px]">
          <div className="flex w-full items-center justify-between gap-2 pt-[20px] md:justify-normal md:pt-0">
            <div className="pb-[5px] pt-[13px] font-medium md:w-fit">
              Verification Status :
            </div>
            {session?.user?.isVerified ? (
              <div className="flex items-center gap-1 pb-[5px] pt-[13px] md:w-fit">
                <FaCheckCircle className="text-green-500" />
                Email Verified
              </div>
            ) : (
              <div className="md:w-fit">
                <div className="flex justify-end pb-[5px] pt-[13px]">
                  <Button className="w-[140px]" onClick={varificationRequest}>
                    <CiRedo className="" />
                    Resend Again
                  </Button>
                </div>
              </div>
            )}
          </div>
          <div className="flex items-center pt-2 text-[14px] text-gray-400">
            <div className=""> Email must be re-verified if changed</div>
            <div className="flex w-6 justify-center font-medium">
              <div className="relative flex justify-center">
                <span
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                  className="inline-flex cursor-help text-gray-500"
                >
                  <Info size={14} />
                </span>
                {showTooltip && (
                  <div className="absolute bottom-full left-1/2 z-10 mb-2 w-64 -translate-x-1/2 transform rounded bg-gray-800 p-3 text-xs text-white shadow-lg">
                    <div className="mb-1 font-semibold">Attention:</div>
                    <ul className="list-disc space-y-1 pl-4">
                      <li>Email must be verified in one hour</li>
                    </ul>
                    <div className="absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 translate-y-1/2 rotate-45 transform bg-gray-800"></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
