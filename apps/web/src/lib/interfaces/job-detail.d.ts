export interface JobDetail {
  id: string;
  title: string;
  description: string;
  company: {
    id: string;
    name: string;
    logoUrl: string;
    location: string;
  };
  category: string;
  slug: string;
}
