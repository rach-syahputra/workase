'use client';

import { useState } from 'react';
import { Sparkles } from 'lucide-react';

import { OPEN_ROUTER_API_KEYS } from '@/lib/constants/constants';
import { generateCvSummary } from '@/lib/apis/cv';
import { IUserInformation } from '@/lib/cv-summary-generation';
import { useToast } from '@/hooks/use-toast';
import { useCvEditFormContext } from '@/context/cv-edit-form-context';
import { Button } from '@/components/shadcn-ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/shadcn-ui/dialog';
import LoadingOverlay from '@/components/ui/loading-overlay';
import AutoGenerateSummaryForm from './auto-generate-summary-form';

const AutoGenerateSummaryModal = () => {
  const { toast } = useToast();
  const { setIsComparingSummary, setShowPreview, setGeneratedSummary } =
    useCvEditFormContext();
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleGenerateCvSummary = async (userInformation: IUserInformation) => {
    // Auto-generate cv summary flow
    // - set the default api key
    // - generate the cv summary
    // - if cv summary generation returns 429, then change the api key
    // - if cv summary generation returns 429 more than once, than all api keys have reached daily limit

    setIsLoading(true);
    setOpen(false);

    let response;
    let apiKeyIndex = 0;
    let retry = 1;
    let apiKey = OPEN_ROUTER_API_KEYS[apiKeyIndex];
    let isValid = false;

    if (!apiKey) {
      setIsLoading(false);
      return toast({
        title: 'Unable to generate CV summary',
        description: 'Something went wrong when generating CV summary',
        variant: 'destructive',
      });
    }

    // Regenerate cv summary if returned content is incorrect
    while (retry <= 3 && apiKey && apiKeyIndex <= 4 && !isValid) {
      response = await generateCvSummary({
        userInformation,
        apiKey,
      });

      const summary = response?.data?.summary;

      // Ensure no blank lines or space breaks or symbols or any additional word and sentence except summary
      isValid = summary
        ? !/\n|\r|\s{2,}|[^a-zA-Z0-9.,()\- ]/.test(summary)
        : false;

      if (isValid) {
        setIsLoading(false);
        setOpen(false);
        break;
      }

      retry++;

      // Change the api key if current api key has reached daily limit
      if (response?.code === 'ERR_TOO_MANY_REQUESTS') {
        apiKeyIndex++;
        apiKey = OPEN_ROUTER_API_KEYS[apiKeyIndex];
        retry = 1;
      }
    }

    if (response?.success && isValid) {
      setGeneratedSummary(response.data?.summary || '');
      setShowPreview(false);
      setIsComparingSummary(true);
    } else {
      toast({
        title: 'Unable to generate CV summary',
        description:
          response?.error?.message ||
          'Something went wrong when generating CV summary',
        variant: 'destructive',
      });
    }

    setIsLoading(false);
    setOpen(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button type="button" variant="dark" className="w-fit">
            <Sparkles size={16} />
            Auto-generate Summary
          </Button>
        </DialogTrigger>
        <DialogContent className="md:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Additional CV Summary Information
            </DialogTitle>
            <DialogDescription>
              Providing the information below is optional, but it can help
              generate a more tailored and impactful summary.
            </DialogDescription>
          </DialogHeader>
          <AutoGenerateSummaryForm
            setOpen={setOpen}
            isLoading={isLoading}
            onSubmit={handleGenerateCvSummary}
          />
        </DialogContent>
      </Dialog>
      {isLoading && <LoadingOverlay label="Generating your CV Summary" />}
    </>
  );
};

export default AutoGenerateSummaryModal;
