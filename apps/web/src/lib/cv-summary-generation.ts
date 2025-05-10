export interface IUserInformation {
  coreSkills: string[];
  desiredRole: string;
  softSkills?: string[];
  yearsOfExperience?: number;
  lastEducation?: {
    major: string;
    startYear: string;
    graduationYear: string;
  };
  achievement?: string;
  careerObjective?: string;
}

export const getCvSummaryGenerationPrompt = (user: IUserInformation) => {
  let userInfo = '';

  if (user.coreSkills && user.coreSkills.length > 0) {
    userInfo += `- Core Skills: ${user.coreSkills.join(', ')}\n`;
  }
  if (user.desiredRole) {
    userInfo += `- Desired Role: ${user.desiredRole}\n`;
  }
  if (user.softSkills && user.softSkills.length > 0) {
    userInfo += `- Soft Skills: ${user.softSkills.join(', ')}\n`;
  }
  if (user.yearsOfExperience && user.yearsOfExperience > 0) {
    userInfo += `- Years of Experience: ${user.yearsOfExperience}\n`;
  }
  if (user.lastEducation) {
    userInfo += `- Last Education: Major in ${user.lastEducation.major}, studied from ${user.lastEducation.startYear} to ${user.lastEducation.graduationYear}\n`;
  }
  if (user.achievement) {
    userInfo += `- Unique Trait or Achievement: ${user.achievement}\n`;
  }
  if (user.careerObjective) {
    userInfo += `- Career Objective: ${user.careerObjective}\n`;
  }

  return `
You are a professional CV and career summary writer.

Based on my available information below, generate a concise and professional CV summary. Use an achievement-oriented tone and adapt the content to match my target industry and role.

Include relevant strengths, skills, background, and career objectives when provided. If experience is limited, emphasize education, core skills, and potential. If experience or achievements are included, highlight them appropriately.

Use only the information given.

Do not assume or add extra details.

Avoid formatting symbols such as *, -, _, #, or :.

Use only letters, numbers, commas, periods, and spaces.

Output only the final summary in plain text. No headers, labels, or line breaks. Limit to 3 well-structured sentences.

My Info (may include optional fields):
${userInfo.trim()}
`.trim();
};
