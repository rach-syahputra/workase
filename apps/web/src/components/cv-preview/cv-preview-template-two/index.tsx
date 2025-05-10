'use client';

import React from 'react';

import { cn } from '@/lib/utils';
import { useCvEditFormContext } from '@/context/cv-edit-form-context';
import { Card } from '@/components/shadcn-ui/card';

interface CvPreviewTemplateTwoProps {
  className?: string;
}

interface SectionProps {
  title: string;
  className?: string;
  children: React.ReactNode;
}

const CvPreviewTemplateTwo = ({ className }: CvPreviewTemplateTwoProps) => {
  const { cvData } = useCvEditFormContext();
  const header = cvData?.data.header;
  const summary = cvData?.data.summary;
  const experience = cvData?.data.experience;
  const education = cvData?.data.education;
  const skill = cvData?.data.skill;

  return (
    <div className={cn('w-full px-4', className)}>
      <Card className="flex aspect-[877/620] w-full max-w-screen-md flex-col gap-6 border pb-5 text-xs md:text-sm lg:h-[calc(100svh-96px)] lg:overflow-y-auto">
        {header?.content && (
          <div className="bg-primary-dark-background flex w-full flex-col gap-4 rounded-t-md px-7 py-5 text-white">
            <div className="flex flex-col gap-1">
              <h1 className="text-lg font-bold md:text-2xl">
                {header?.content.name}
              </h1>
              <p className="font-bold">{header?.content.role}</p>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-primary-dark w-fit bg-white px-2 py-1 text-sm font-medium">
                CONTACTS
              </h2>
              <div className="flex flex-col gap-1">
                <span>{header?.content.email}</span>
                <span>{header?.content.phoneNumber}</span>
              </div>
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

const CvSection = ({ title, className, children }: SectionProps) => {
  return (
    <div className={cn('flex w-full flex-col gap-2 px-7', className)}>
      <h2 className="bg-primary-dark-background w-fit px-2 py-1 text-sm font-medium uppercase text-white">
        {title.toUpperCase()}
      </h2>
      {children}
    </div>
  );
};

export default CvPreviewTemplateTwo;
