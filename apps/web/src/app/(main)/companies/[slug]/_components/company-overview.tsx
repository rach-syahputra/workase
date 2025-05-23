interface CompanyOverviewProps {
  description: string;
}

const CompanyOverview = ({ description }: CompanyOverviewProps) => {
  return (
    <div
      className="p-4 text-justify text-[90%]"
      dangerouslySetInnerHTML={{
        __html: description || '',
      }}
    />
  );
};

export default CompanyOverview;
