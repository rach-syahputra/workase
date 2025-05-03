export interface ICvHeaderSection {
  content: {
    role: string;
    name: string;
    email: string;
    phoneNumber: string;
  };
}

export interface ICvSummarySection {
  content: string;
}

export interface ICvExperienceSection {
  contents: {
    role: string;
    company: string;
    startDate: string;
    endDate: string;
    tasks: string[];
  }[];
}

export interface ICvEducationSection {
  contents: {
    major: string;
    institution: string;
    startDate: string;
    endDate: string;
  }[];
}

export interface ICvSkillSection {
  contents: string[];
}

export interface ICvData {
  header?: ICvHeaderSection;
  summary?: ICvSummarySection;
  experience?: ICvExperienceSection;
  education?: ICvEducationSection;
  skill?: ICvSkillSection;
}

export interface ICv {
  id: string;
  slug: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  data: ICvData;
  isDeleted: boolean;
}
