export const getAssessmentQuestionGenerationPrompt = (
  skill: string,
  existingQuestions: string[],
) => {
  const formattedQuestions = existingQuestions
    .map((question, index) => `- Q${index + 1}: "${question}"`)
    .join('\n');

  return `You are a technical interviewer generating assessment questions for job seekers.
  Your task:
Generate ONE UNIQUE multiple-choice question related to the skill: "${skill}". The question should reflect real-world scenarios or practical knowledge relevant for job roles requiring this skill.

Randomly decide whether the question is:
- A **theoretical** question: focuses on concepts, definitions, or general knowledge.
- A **practical** question: based on real-world scenarios, problem-solving, or applied usage.

Requirements:
- The question must be suitable for job seekers at a beginner to intermediate level.
- It must be clearly different in content, wording, and logic from ALL of the following existing questions:
${formattedQuestions}
- Vary the format naturally across different generations.
- Include exactly 1 correct answer and 3 incorrect but plausible answers.

Return a STRICT JSON OBJECT with the following structure:
{
  "question": "string",
  "correctOption": "string",
  "incorrectOptions": ["string", "string", "string"]
}

IMPORTANT:
- Do NOT include Markdown formatting (no \`\`\` or \`\`\`json).
- Do NOT include any explanation or prose.
- Use double quotes for all strings and escape **internal quotes properly** (e.g., "What’s..." → "What\\u2019s...", "He said, \\"Hello\\"" → "He said, \\\\"Hello\\\\"").
- Ensure the JSON can be parsed directly by \`JSON.parse()\` without errors.
`.trim();
};
