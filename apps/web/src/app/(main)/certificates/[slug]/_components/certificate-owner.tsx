'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';

import { cn, formatCertificateDate } from '@/lib/utils';
import { useCertificateDetailContext } from '@/context/certificate-detail-context';
import { Card } from '@/components/shadcn-ui/card';
import { Separator } from '@/components/shadcn-ui/separator';
import { Button } from '@/components/shadcn-ui/button';
import Icon from '@/components/ui/icon';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/shadcn-ui/tooltip';

interface CertificateOwnerProps {
  className?: string;
}

interface OwnerEmailProps {
  email: string;
}

const CertificateOwner = ({ className }: CertificateOwnerProps) => {
  const session = useSession();
  const { certificate, owner } = useCertificateDetailContext();
  const isOwner = session.data?.user?.id === owner?.id;
  const certificateUrl = encodeURIComponent(
    `https://workase.vercel.app/certificates/${certificate?.slug}`,
  );

  return (
    <div
      className={cn(
        'mx-auto flex w-full max-w-screen-sm flex-col items-center justify-center gap-4 lg:p-4',
        className,
      )}
    >
      <Card className="flex w-full flex-col items-center justify-center gap-4 p-6">
        <div className="flex flex-col items-center justify-center gap-2">
          {owner?.profilePhoto ? (
            <Image
              src={owner.profilePhoto}
              alt="User image"
              width={100}
              height={100}
              className="aspect-square w-full max-w-[84px] overflow-hidden rounded-full bg-gray-200 object-cover"
            />
          ) : (
            <div className="aspect-square w-full max-w-[84px] overflow-hidden rounded-full bg-gray-200"></div>
          )}

          <OwnerEmail email={owner?.email || ''} />
        </div>
        <div className="flex flex-col items-center justify-center">
          <span className="text-primary-gray text-sm">ID</span>
          <p className="text-sm font-medium">{certificate?.slug}</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <span className="text-primary-gray text-sm">Issued At</span>
          <p className="text-sm font-medium">
            {formatCertificateDate(new Date(certificate?.createdAt as string))}
          </p>
        </div>
        {!isOwner && (
          <>
            <Separator />
            <Link
              href={`/w/${owner?.slug}`}
              className="text-primary-blue text-sm hover:underline"
            >
              View Profile
            </Link>
          </>
        )}
      </Card>

      {isOwner && (
        <div className="w-full">
          <Button
            asChild
            className="flex w-full items-center justify-center gap-2"
          >
            <Link
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${certificateUrl}`}
              aria-label="Share certificate to Linkedin feed"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Icon
                icon={faLinkedin}
                className="text-primary-dark w-5 text-white"
              />
              Share to LinkedIn
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
};

const OwnerEmail = ({ email }: OwnerEmailProps) => {
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <p className="line-clamp-1 text-wrap text-base font-medium">
            {email}
          </p>
        </TooltipTrigger>
        <TooltipContent>
          <p>{email}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CertificateOwner;
