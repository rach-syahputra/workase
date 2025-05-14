'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Clock, Pencil, Plus } from 'lucide-react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

import { formatTableDate } from '@/lib/utils';
import { addCv } from '@/lib/apis/cv';
import { useAppToast } from '@/hooks/use-app-toast';
import { useToast } from '@/hooks/use-toast';
import { useUserDetailContext } from '@/context/user-detail-context';
import { useUserStatsContext } from '@/context/user-stats-context';
import { Button } from '@/components/shadcn-ui/button';
import { Card } from '@/components/shadcn-ui/card';
import LoadingOverlay from '@/components/ui/loading-overlay';
import CvPreviewModal from './cv-preview-modal';
import CvDownloadButton from './cv-download-button';

const Cv = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { appToast } = useAppToast();
  const { toast } = useToast();
  const { user } = useUserDetailContext();
  const { userStats, setUpdate } = useUserStatsContext();
  const isOwner = session?.user?.slug === user?.slug;
  const isSubscriber =
    userStats?.subscription.plan === 'PROFESSIONAL' ||
    userStats?.subscription.plan === 'STANDARD';
  const [isAddingCv, setIsAddingCv] = useState<boolean>(false);

  useEffect(() => {
    setUpdate(true);
  }, [setUpdate]);

  const handleCreateCv = async () => {
    setIsAddingCv(true);

    const response = await addCv({
      data: {
        header: {
          content: {
            email: user?.email || '',
            name: '',
            phoneNumber: '',
            role: '',
          },
        },
      },
      template: 1,
    });

    if (response.success) {
      router.push(`/cv/${response.data?.cv.slug}/edit`);
    } else {
      if (response.code === 'ERR_NETWORK') {
        appToast('ERROR_NETWORK');
      } else if (response.code === 'ERR_UNAUTHENTICATED') {
        appToast('ERROR_UNAUTHENTICATED');
      } else if (response.code === 'ERR_UNAUTHORIZED') {
        appToast('ERROR_UNAUTHORIZED');
      }
    }

    setIsAddingCv(false);
  };

  const handleUpgradePlan = () => {
    if (session?.user?.isVerified) {
      router.push('/subscription');
    } else {
      toast({
        title: 'Email is Unverified',
        description: 'Verify your email before upgrading plan',
        variant: 'destructive',
        duration: 5000,
        action: (
          <Link
            href="/profile-management/verification"
            className="rounded-md border border-white px-3 py-2 text-sm"
          >
            Verify Email
          </Link>
        ),
      });
    }
  };

  return (
    <div className="flex w-full flex-col items-start gap-4 p-5">
      <h1 className="heading-3">CV</h1>
      {user?.cv && isSubscriber ? (
        <Card className="flex w-full flex-col gap-1 p-4">
          <h2 className="heading-5">{user.cv.data.header?.content.name}</h2>
          <span className="text-primary-gray text-sm">
            {user.cv.data.header?.content.role}
          </span>
          <div className="text-primary-gray flex items-center justify-start gap-2 text-sm">
            <Clock size={14} />
            <span>
              Last updated: {formatTableDate(new Date(user.cv.updatedAt))}
            </span>
          </div>
          <div className="text-primary-gray flex items-center justify-start gap-2 text-sm">
            <Clock size={14} />
            <span>Created: {formatTableDate(new Date(user.cv.createdAt))}</span>
          </div>
          <div className="mt-2 flex flex-col items-center gap-2 md:flex-row">
            {isOwner && (
              <Button asChild className="max-md:w-full">
                <Link
                  href={`/cv/${user.cv.slug}/edit`}
                  aria-label="Edit CV Page"
                  target="_blank"
                >
                  <Pencil size={14} />
                  Edit
                </Link>
              </Button>
            )}

            <CvPreviewModal />
            <CvDownloadButton cv={user.cv} />
          </div>
        </Card>
      ) : isOwner && isSubscriber ? (
        <Button disabled={isAddingCv} onClick={handleCreateCv}>
          <Plus size={14} />
          Create CV
        </Button>
      ) : isOwner && !isSubscriber ? (
        <div className="flex flex-col gap-2">
          <p className="text-primary-gray text-sm">
            Upgrade your plan to access CV Generator feature
          </p>
          <Button variant="dark" onClick={handleUpgradePlan} className="w-fit">
            Upgrade Plan
          </Button>
        </div>
      ) : (
        <p className="text-primary-gray text-sm">No CV.</p>
      )}

      {isAddingCv && <LoadingOverlay label="Generating your CV" />}
    </div>
  );
};

export default Cv;
