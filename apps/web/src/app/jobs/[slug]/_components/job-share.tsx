import * as React from 'react';

import { useState, useEffect } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/shadcn-ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/shadcn-ui/dialog';
import { Textarea } from '@/components/shadcn-ui/textarea';
import { Share, Linkedin, Facebook, Twitter, Send } from 'lucide-react';
import { Button } from '@/components/shadcn-ui/button';

import { CiShare1 } from 'react-icons/ci';
import { JobDetail } from '@/lib/interfaces/job-detail';
import { useToast } from '@/hooks/use-toast';

export function JobShareComponent({ job }: { job: JobDetail }) {
  const [isCustomMessageOpen, setIsCustomMessageOpen] = useState(false);
  const [customMessage, setCustomMessage] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<
    null | 'linkedin' | 'facebook' | 'twitter' | 'whatsapp'
  >(null);
  const [jobUrl, setJobUrl] = useState<string>('');
  const { toast } = useToast();
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setJobUrl(window.location.href);
    }
  }, []);

  const shareData = {
    title: `${job.title} at ${job.company.name}`,
    text:
      customMessage ||
      `Check out this job opportunity:${job.title} at ${job.company.name}`,
    url: jobUrl,
  };

  const hanldeShareDirect = (platform: 'linkedin' | 'facebook') => {
    switch (platform) {
      case 'linkedin':
        window.open(
          `https://www.linkedin.com/feed/?linkOrigin=LI_BADGE&shareActive=true&shareUrl=https://workase.vercel.app/jobs/${job.slug}`,
          '_blank',
        );
        break;
      case 'facebook':
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=https://workase.vercel.app/jobs/${job.slug}`,
          '_blank',
        );
        break;
    }
  };

  const handleShareClick = (platform: 'twitter' | 'whatsapp') => {
    setSelectedPlatform(platform);
    setIsCustomMessageOpen(true);
  };

  const handleShare = async () => {
    const messageWithUrl = `${customMessage || shareData.text} ${jobUrl}`;
    switch (selectedPlatform) {
      case 'twitter':
        window.open(
          `https://twitter.com/intent/tweet?text=https://workase.vercel.app/jobs/${job.slug}`,
          '_blank',
        );
        break;
      case 'whatsapp':
        window.open(
          `https://wa.me/?text=https://workase.vercel.app/jobs/${job.slug}`,
          '_blank',
        );
        break;
      default:
        if (navigator.share) {
          try {
            await navigator.share(shareData);
          } catch (e) {
            toast({
              title: 'Error',
              description: `Error sharing, something went wrong`,
              variant: 'destructive',
            });
          }
        }
    }
    setIsCustomMessageOpen(false);
    setCustomMessage('');
  };
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="hover:bg-primary-gray-background flex h-[38px] w-[50px] items-center justify-center rounded-md border border-[#495057]">
            <CiShare1 className="h-6 w-6 text-[#6C757D]" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => hanldeShareDirect('linkedin')}>
            <Linkedin className="w-4 h-4 mr-2" />
            <span>Linkedin</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => hanldeShareDirect('facebook')}>
            <Facebook className="w-4 h-4 mr-2" />
            <span>Facebook</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleShareClick('twitter')}>
            <Twitter className="w-4 h-4 mr-2" />
            <span>Twitter</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleShareClick('whatsapp')}>
            <Send className="w-4 h-4 mr-2" />
            <span>Whatsapp</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={isCustomMessageOpen} onOpenChange={setIsCustomMessageOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share This Job</DialogTitle>
            <DialogDescription>
              Add a custom message to share with your network
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Textarea
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              placeholder={`Check out this job opportunity:${job.title} at ${job.company.name}`}
              className="text-sm min-h-24"
            />
          </div>
          <DialogFooter className="sm:justify-end">
            <Button
              type="button"
              onClick={() => setIsCustomMessageOpen(false)}
              variant="secondary"
            >
              Cancel
            </Button>
            <Button type="button" onClick={handleShare}>
              Share
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default JobShareComponent;
