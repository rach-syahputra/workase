import prisma from '@/prisma';

export const assessmentId = 'a52d7242-84eb-4067-a36e-f6985757a5a2';

export const getSkillById = async (skillId: string) => {
  return await prisma.skill.findUnique({
    where: {
      id: skillId,
    },
  });
};

export const addSkill = async () => {
  return await prisma.skill.create({
    data: {
      title: 'skill-test',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
};

export const deleteSkill = async (skillId: string) => {
  await prisma.skill.delete({
    where: {
      id: skillId,
    },
  });
};

export const getAssessmentById = async (assessmentId: string) => {
  await prisma.assessment.findUnique({
    where: {
      id: assessmentId,
    },
  });
};

export const deleteAssessment = async (assessmentId: string) => {
  await prisma.assessment.delete({
    where: {
      id: assessmentId,
    },
  });
};

export const getAssessmentQuestionById = async (
  assessmentQuestionId: string,
) => {
  return await prisma.assessmentQuestion.findUnique({
    where: {
      id: assessmentQuestionId,
    },
  });
};

export const deleteAssessmentQuestion = async (
  assessmentQuestionId: string,
) => {
  return await prisma.assessmentQuestion.delete({
    where: {
      id: assessmentQuestionId,
    },
  });
};
