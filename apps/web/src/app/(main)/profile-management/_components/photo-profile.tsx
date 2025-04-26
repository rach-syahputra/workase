/* eslint-disable @next/next/no-img-element */
import { Button } from '@/components/shadcn-ui/button';
import { axiosPrivate, axiosPublic } from '@/lib/axios';
import axios from 'axios';
import { Info } from 'lucide-react';
import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import { detectContentType } from 'next/dist/server/image-optimizer';
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

  const [showTooltip, setShowTooltip] = useState(false);
  const { update } = useSession();

  const maxSize = 1 * 1024 * 1024; // 1MB
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    console.log('File selected:', file.name, file.type, file.size);
    if (!allowedTypes.includes(file.type)) {
      alert('Format gambar tidak didukung. Gunakan JPG, PNG, atau JPEG.');
      return;
    }
    if (file.size > maxSize) {
      alert('Ukuran gambar terlalu besar. Maksimal 1MB.');
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
      alert('You need to be logged in to upload a photo');
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
        alert('Photo uploaded successfully');
        // Update session to reflect new profile photo
        await update();
      } else {
        console.error('Upload Failed:', response.statusText);
        alert('Upload Failed: Please try again.');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
            alert(
              `Upload failed: ${error.response.data.message || 'Please try again'}`,
            );
          } else if (error.request) {
            console.error('No response received:', error.request);
            alert('Server did not respond. Please try again later.');
          }
        } else {
          console.error('Error message:', (error as Error).message);
          alert(`Error: ${(error as Error).message}`);
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
      <img
        src={
          session?.user?.logoUrl ||
          session?.user?.profilePhoto ||
          'https://teknogram.id/gallery/foto-profil-wa/keren/pp-wa-kosong-keren-5.jpg'
        }
        alt="Profile"
        className="aspect-square w-[120px] rounded-full object-cover md:w-[120px]"
      />
      <div className="flex items-center justify-center w-full">
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
        <div className="flex items-center justify-center w-6">
          <div className="relative flex items-center justify-center">
            <span
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              className="inline-flex text-gray-500 cursor-help"
            >
              <Info size={18} />
            </span>
            {showTooltip && (
              <div className="absolute z-10 w-64 p-3 mb-2 text-xs text-white transform -translate-x-1/2 bg-gray-800 rounded shadow-lg bottom-full left-1/2">
                <div className="mb-1 font-semibold">File Requirements:</div>
                <ul className="pl-4 space-y-1 list-disc">
                  <li>Maximum file size: 1 MB</li>
                  <li>Allowed file types: PNG, JPEG, JPG</li>
                </ul>
                <div className="absolute bottom-0 w-2 h-2 transform rotate-45 -translate-x-1/2 translate-y-1/2 bg-gray-800 left-1/2"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
