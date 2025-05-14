import { Button } from '@/components/shadcn-ui/button';
import { useToast } from '@/hooks/use-toast';
import { axiosPrivate, axiosPublic } from '@/lib/axios';
import axios from 'axios';
import { Info } from 'lucide-react';
import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import { detectContentType } from 'next/dist/server/image-optimizer';
import Image from 'next/image';
import { title } from 'process';
import { useRef, useState } from 'react';

interface ProfilePhotoProps {
  photoProfile?: string;
}
const roleUrl = {
  ADMIN: 'companies',
  USER: 'users',
};
export const ProfilePhoto = ({ photoProfile }: ProfilePhotoProps) => {
  const { data: session } = useSession();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const [showTooltip, setShowTooltip] = useState(false);
  const { update } = useSession();

  const maxSize = 1 * 1024 * 1024; // 1MB
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];

    if (!allowedTypes.includes(file.type)) {
      toast({
        title: 'Format gambar tidak didukung',
        description:
          'Format gambar tidak didukung. Gunakan JPG, PNG, atau JPEG.',
        variant: 'destructive',
      });
      return;
    }
    if (file.size > maxSize) {
      toast({
        title: 'Ukuran gambar terlalu besar',
        description: 'Ukuran gambar terlalu besar. Maksimal 1MB.',
        variant: 'destructive',
      });
      return;
    }
    // Show preview
    const reader = new FileReader();
    reader.readAsDataURL(file);

    // Upload to server
    await uploadPhoto(file);
  };

  const uploadPhoto = async (file: File) => {
    if (!session?.user?.accessToken) {
      toast({
        title: 'Login Required',
        description: 'You need to be logged in to upload a photo',
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsUploading(true);

      // Create FormData to send file
      const formData = new FormData();

      formData.append('image', file);

      const axiosInstance = axiosPrivate(
        session.user.accessToken,
        'multipart/form-data',
      );

      const response = await axiosInstance.post(
        `/${roleUrl[session?.user?.role as keyof typeof roleUrl]}/image`,
        formData,
      );

      if (response.status >= 200 && response.status < 300) {
        toast({
          title: 'Success',
          description: 'Photo uploaded successfully',
          variant: 'default',
        });
        // Update session to reflect new profile photo
        await update();
      } else {
        toast({
          title: 'Error',
          description: 'Upload Failed: Please try again.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            toast({
              title: 'Error',
              description: `Upload failed. Something went wrong. Please try again`,
              variant: 'destructive',
            });
          } else if (error.request) {
            toast({
              title: 'Error',
              description: 'Server did not respond. Please try again later.',
              variant: 'destructive',
            });
          }
        } else {
          toast({
            title: 'Error',
            description: `Error, something went wrong`,
            variant: 'destructive',
          });
        }
      }
    } finally {
      setIsUploading(false);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <Image
        width={120}
        height={120}
        src={
          session?.user?.logoUrl ||
          session?.user?.profilePhoto ||
          '/default-photo-profile.png'
        }
        alt="Profile"
        className="aspect-square w-[120px] rounded-full object-cover md:w-[120px]"
      />
      <div className="flex w-full items-center justify-center">
        <div className="w-6"></div>
        <input
          type="file"
          className="focus:outline-none"
          hidden
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/png, image/jpeg, image/jpg"
          id="profilePhoto"
        />
        <Button
          className="w-[105px] cursor-pointer rounded-lg border border-blue-300 bg-blue-50 pt-[-2px] text-center text-[15px] text-blue-600 hover:text-white"
          onClick={handleButtonClick}
          disabled={isUploading}
        >
          {isUploading ? 'Uploading...' : 'Change'}
        </Button>
        <div className="flex w-6 items-center justify-center">
          <div className="relative flex items-center justify-center">
            <span
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              className="inline-flex cursor-help text-gray-500"
            >
              <Info size={18} />
            </span>
            {showTooltip && (
              <div className="absolute bottom-full left-1/2 z-10 mb-2 w-64 -translate-x-1/2 transform rounded bg-gray-800 p-3 text-xs text-white shadow-lg">
                <div className="mb-1 font-semibold">File Requirements:</div>
                <ul className="list-disc space-y-1 pl-4">
                  <li>Maximum file size: 1 MB</li>
                  <li>Allowed file types: PNG, JPEG, JPG</li>
                </ul>
                <div className="absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 translate-y-1/2 rotate-45 transform bg-gray-800"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
