'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowDownToLine, Clock, Pencil, Plus } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useSession } from 'next-auth/react';

import { formatTableDate } from '@/lib/utils';
import { addCv } from '@/lib/apis/cv';
import { useAppToast } from '@/hooks/use-app-toast';
import { useUserDetailContext } from '@/context/user-detail-context';
import CvPreviewPdf from '@/components/cv-preview/cv-preview-template-one/pdf';
import { Button } from '@/components/shadcn-ui/button';
import { Card } from '@/components/shadcn-ui/card';
import { Skeleton } from '@/components/shadcn-ui/skeleton';
import LoadingOverlay from '@/components/ui/loading-overlay';
import CvPreviewModal from './cv-preview-modal';
import CvDownloadButton from './cv-download-button';

const PDFDownloadLink = dynamic(
  () => import('@react-pdf/renderer').then((mod) => mod.PDFDownloadLink),
  {
    ssr: false,
    loading: () => <Skeleton className="h-9 w-36" />,
  },
);

const Cv = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { appToast } = useAppToast();
  const { user } = useUserDetailContext();
  const isOwner = session?.user?.slug === user?.slug;
  const [isAddingCv, setIsAddingCv] = useState<boolean>(false);

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

  return (
    <div className="flex w-full flex-col items-start gap-4 p-5">
      <h1 className="heading-3">CV</h1>
      {user?.cv ? (
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
          <div className="mt-2 flex items-center gap-2">
            {isOwner && (
              <Button asChild>
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
      ) : isOwner ? (
        <Button disabled={isAddingCv} onClick={handleCreateCv}>
          <Plus size={14} />
          Create CV
        </Button>
      ) : (
        <p className="text-primary-gray text-sm">No CV.</p>
      )}

      {isAddingCv && <LoadingOverlay label="Generating your CV" />}
    </div>
  );
};

export default Cv;
