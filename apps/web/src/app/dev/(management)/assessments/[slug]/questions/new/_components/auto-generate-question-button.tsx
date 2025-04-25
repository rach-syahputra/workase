'use client';

import { useState } from 'react';
import { FormikErrors } from 'formik';

import { AddAssessmentQuestionFormValues } from '@/lib/interfaces/form/assessment';
import {
  generateAssessmentQuestion,
  getAssessmentQuestions,
} from '@/lib/apis/assessment-question';
import { scrollToTop } from '@/lib/utils';
import { OPEN_ROUTER_API_KEYS } from '@/lib/constants/constants';
import { isGeneratedQuestionValid } from '@/validations/assessment';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/shadcn-ui/button';
import { Card } from '@/components/shadcn-ui/card';
import AppLoading from '@/components/ui/app-loading';
import LoadingOverlay from '@/components/ui/loading-overlay';

interface AutoGenerateQuestionButtonProps {
  slug: string;
  skill: string;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean,
  ) => Promise<void> | Promise<FormikErrors<AddAssessmentQuestionFormValues>>;
  setStatus: (status: any) => void;
}

const AutoGenerateQuestionButton = ({
  slug,
  skill,
  setFieldValue,
  setStatus,
}: AutoGenerateQuestionButtonProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchGetAssessmentQuestions = async () => {
    const response = await getAssessmentQuestions({ slug, limit: 25 });

    return (
      response.data?.assessmentQuestions.map((question) => question.question) ||
      []
    );
  };

  const handleGenerate = async () => {
    // Auto-generate question flow
    // - fetch the existing questions to prevent duplicate questions
    // - set the default api key
    // - generate the assessment question
    // - if assessment question generation returns 429, then change the api key
    // - if assessment question generation returns 429 more than once, than all api keys have reached daily limit

    setIsLoading(true);

    let response;
    let retry = 1;
    let apiKeyIndex = 0;
    let apiKey = OPEN_ROUTER_API_KEYS[apiKeyIndex];

    const existingQuestions = await fetchGetAssessmentQuestions();

    // Regenerate question if returned json format is incorrect
    while (retry <= 3 && apiKey && apiKeyIndex <= 4) {
      response = await generateAssessmentQuestion({
        skill,
        existingQuestions,
        apiKey,
      });

      // Change the api key if current api key has reached daily limit
      if (response?.code === 'ERR_TOO_MANY_REQUESTS') {
        apiKeyIndex++;
        apiKey = OPEN_ROUTER_API_KEYS[apiKeyIndex];
        retry = 1;
      }

      if (isGeneratedQuestionValid(response?.data?.content!)) {
        break;
      }

      retry++;
    }

    const generatedQuestion = response?.data?.content;

    if (response?.success && generatedQuestion) {
      // Set form input values based on generated question
      setFieldValue('question', generatedQuestion.question);

      for (let i = 0; i <= 3; i++) {
        if (i === 0) {
          setFieldValue(`options[${i}].text`, generatedQuestion.correctOption);
        } else {
          setFieldValue(
            `options[${i}].text`,
            generatedQuestion.incorrectOptions[i - 1],
          );
        }
      }

      scrollToTop();
    } else {
      toast({
        title: 'Unable to Generate Question',
        description: response?.error?.message,
        variant: 'destructive',
      });
      setStatus(response?.error?.message);
    }

    setIsLoading(false);
  };

  return (
    <>
      <Button
        type="button"
        onClick={handleGenerate}
        variant="ghost"
        className="hover:underline"
      >
        Auto-generate Question
      </Button>

      {isLoading && <LoadingOverlay label="Generating your question" />}
    </>
  );
};

export default AutoGenerateQuestionButton;
