'use client';

import { Minus } from 'lucide-react';

import { useUserDetailContext } from '@/context/user-detail-context';

interface RoleItemProps {
  title: string;
  value: string;
}

const Role = () => {
  const { user } = useUserDetailContext();

  return (
    <div className="flex w-full flex-col gap-4 p-4">
      <div className="flex flex-col">
        <h1 className="heading-3">Role</h1>
        <p className="text-primary-gray text-sm">
          User&rsquo;s role at the company
        </p>
      </div>
      <RoleItem title="Role" value={user?.company.role || ''} />
    </div>
  );
};

const RoleItem = ({ title, value }: RoleItemProps) => {
  return (
    <div className="flex flex-col">
      <span className="text-primary-gray text-sm">{title}</span>
      <div>
        <p className="line-clamp-3 font-medium">
          {value ? value : <Minus size={16} />}
        </p>
      </div>
    </div>
  );
};

export default Role;
