interface CompanyOverviewProps {
  description: string;
}

const CompanyOverview = ({ description }: CompanyOverviewProps) => {
  return (
    <div
      className="py-4 text-justify text-[90%]"
      dangerouslySetInnerHTML={{
        __html: description || '',
      }}
    />
  );
};

export default CompanyOverview;
