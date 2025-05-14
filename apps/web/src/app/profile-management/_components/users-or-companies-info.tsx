'use client';
import { IUpdateForm } from '@/types/profile';
import { FormikProps } from 'formik';
import { Info } from 'lucide-react';
import { useState } from 'react';
interface UserInfoProps {
  email?: string;
  role?: string;
  formik: FormikProps<IUpdateForm>;
}

export const UserInfo: React.FC<UserInfoProps> = ({ formik, role }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  return (
    <div className="flex w-full flex-col justify-center pt-[20px] md:pt-0">
      <div className="flex">
        <div className="pb-[5px] font-medium">Email</div>
        <div className="flex w-6 items-center justify-center pb-[5px] font-medium">
          <div className="relative flex items-center justify-center">
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
                  <li>Email must be re-verified if changed</li>
                </ul>
                <div className="absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 translate-y-1/2 rotate-45 transform bg-gray-800"></div>
              </div>
            )}
          </div>
        </div>
      </div>
      <input
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        type="text"
        className="w-full rounded-lg border-[1px] border-gray-300 py-[8px] pl-2 text-[14px] font-medium text-black"
        placeholder="E.g. Pacifista@mail.com"
        id="email"
        name="email"
      />
      <div className="pb-[5px] pt-[13px] font-medium">Role</div>

      <input
        value={
          (role ?? '')
            .toLowerCase()
            .split(' ')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ') || ' '
        }
        type="text"
        className="w-full rounded-lg border-[1px] border-gray-300 py-[8px] pl-2 text-[14px] font-medium text-black"
        placeholder="E.g. Pacifista@mail.com"
        id="role"
        name="role"
        readOnly
      />
    </div>
  );
};
