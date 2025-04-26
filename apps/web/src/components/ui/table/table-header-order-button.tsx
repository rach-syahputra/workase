import React from 'react';
import { ArrowDownUp } from 'lucide-react';

interface TableHeaderOrderButtonProps {
  label: string;
  onClick: () => void;
}

const TableHeaderOrderButton = ({
  label,
  onClick,
}: TableHeaderOrderButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="hover:text-primary-blue-hover group flex select-none flex-row items-center gap-1 transition-all duration-300 ease-in-out"
    >
      {label}
      <ArrowDownUp
        size={14}
        className="text-primary-gray group-hover:text-primary-blue-hover opacity-70 transition-all duration-300 ease-in-out"
      />
    </button>
  );
};

export default TableHeaderOrderButton;
