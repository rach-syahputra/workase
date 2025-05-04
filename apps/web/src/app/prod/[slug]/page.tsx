import PageContent from './_components/page-content';

interface ProdPageProps {
  params: { slug: string };
}

const ProdPage = ({ params }: ProdPageProps) => {
  return (
    <center className="py-10 font-bold">
      SLUG: {params.slug}
      <PageContent />
    </center>
  );
};

export default ProdPage;
