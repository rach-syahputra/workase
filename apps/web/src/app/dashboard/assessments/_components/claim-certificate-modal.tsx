'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { generateCertificateToken } from '@/lib/apis/certificate';
import { UserAssessmentStatus } from '@/lib/interfaces/user-assessment';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/shadcn-ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/shadcn-ui/dialog';
import { Input } from '@/components/shadcn-ui/input';
import { Label } from '@/components/shadcn-ui/label';

interface ClaimCertificateModalProps {
  status: UserAssessmentStatus;
  certificateSlug?: string;
  userAssessmentId: string;
}

const ClaimCertificateModal = ({
  status,
  certificateSlug,
  userAssessmentId,
}: ClaimCertificateModalProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>('');

  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setisLoading] = useState<boolean>(false);
  const hasCertificate = !!certificateSlug;

  const onSubmit = async () => {
    setisLoading(true);

    const response = await generateCertificateToken({
      userAssessmentId,
      userName,
    });

    if (response.success) {
      const certificateToken = response.data?.certificateToken;

      if (certificateToken) {
        router.push(`/certificates/generation?token=${certificateToken}`);
      } else {
        toast({
          title: 'Unable to Generate Certificate',
          description:
            'Something went wrong when generating your certificate. Please try again.',
          variant: 'destructive',
        });

        setisLoading(false);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {hasCertificate && status === 'PASSED' ? (
        <Link
          href={`/certificates/${certificateSlug}`}
          aria-label="Certificate page"
          className="hover:text-primary-blue underline transition-all duration-300 ease-in-out"
        >
          View Certificate
        </Link>
      ) : !hasCertificate && status === 'PASSED' ? (
        <Button onClick={() => setOpen(true)}>Claim Certificate</Button>
      ) : (
        <p className="text-primary-gray">Not Available</p>
      )}
      <DialogContent className="md:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Generate your certificate
          </DialogTitle>
          <DialogDescription>
            Fill in the details to be shown on your certificate.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-2">
          <Label htmlFor="userName">Full Name</Label>
          <Input
            name="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>

        <div className="mt-4 flex flex-col items-center justify-center gap-2 md:flex-row md:justify-between">
          <Button
            variant="outline"
            type="button"
            onClick={() => setOpen(false)}
            className="w-full"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={onSubmit}
            disabled={isLoading || userName.length < 3}
            className="w-full"
          >
            Generate
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ClaimCertificateModal;
