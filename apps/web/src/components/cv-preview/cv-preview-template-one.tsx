'use client';

import React from 'react';

import { cn } from '@/lib/utils';
import { useCvEditFormContext } from '@/context/cv-edit-form-context';
import { Card } from '@/components/shadcn-ui/card';

interface CvPreviewTemplateOneProps {
  className?: string;
}

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const CvPreviewTemplateOne = ({ className }: CvPreviewTemplateOneProps) => {
  const { cvData } = useCvEditFormContext();
  const header = cvData?.data.header;
  const summary = cvData?.data.summary;
  const experience = cvData?.data.experience;
  const education = cvData?.data.education;
  const skill = cvData?.data.skill;

  return (
    <div className={cn('w-full px-4', className)}>
      <Card className="flex aspect-[877/620] w-full max-w-screen-md flex-col gap-5 border p-5 font-[family-name:var(--font-times-new-roman)] lg:h-[calc(100svh-96px)] lg:overflow-y-auto">
        {header?.content && (
          <div className="flex w-full flex-col items-center justify-center">
            <h1 className="font-bold">{header?.content.name}</h1>
            <p>{header?.content.role}</p>
            <div className="flex items-center justify-center gap-2">
              <span>{header?.content.email}</span>
              <span>•</span>
              <span>{header?.content.phoneNumber}</span>
            </div>
          </div>
        )}

        {summary?.content && (
          <CvSection title="SUMMARY">
            <p className="leading-snug">{summary.content}</p>
          </CvSection>
        )}

        {education?.contents && education.contents.length > 0 && (
          <CvSection title="EDUCATION">
            {education.contents.map((content, index) => (
              <div
                key={index}
                className="flex w-full items-start justify-between gap-4"
              >
                <div className="flex flex-col items-start">
                  <h3 className="font-bold">{content.institution}</h3>
                  <span>{content.major}</span>
                </div>
                <span>
                  {content.startDate} - {content.endDate}
                </span>
              </div>
            ))}
          </CvSection>
        )}

        {experience?.contents && experience.contents.length > 0 && (
          <CvSection title="EXPERIENCE">
            <div className="flex w-full flex-col gap-4">
              {experience.contents.map((content, index) => (
                <div key={index} className="flex w-full flex-col">
                  <div className="flex w-full items-center justify-between gap-4">
                    <h3 className="font-bold">{content.company}</h3>
                    <span>
                      {content.startDate} - {content.endDate}
                    </span>
                  </div>
                  <div className="flex w-full flex-col gap-0.5">
                    <span className="italic">{content.role}</span>
                    <ul className="flex w-full flex-col gap-1 pl-3.5">
                      {content.tasks &&
                        content.tasks.length > 0 &&
                        content.tasks.map((task, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <div className="pt-2.5">
                              <div className="aspect-square w-[5px] rounded-full bg-black" />
                            </div>
                            <p className="leading-snug">{task}</p>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </CvSection>
        )}

        {skill?.contents && skill.contents.length > 0 && (
          <CvSection title="SKILL">
            <ul className="flex flex-col">
              {skill.contents.map((content, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="pt-2.5">
                    <div className="aspect-square w-[5px] rounded-full bg-black" />
                  </div>
                  <p className="leading-snug">{content}</p>
                </li>
              ))}
            </ul>
          </CvSection>
        )}
      </Card>
    </div>
  );
};

const CvSection = ({ title, children }: SectionProps) => {
  return (
    <div className="flex w-full flex-col px-2">
      <h2 className="font-bold uppercase">{title.toUpperCase()}</h2>
      <div className="mb-1 h-0.5 w-full bg-black" />
      {children}
    </div>
  );
};

export default CvPreviewTemplateOne;
