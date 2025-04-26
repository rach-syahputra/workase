import { clsx, type ClassValue } from 'clsx';
import { format, formatDistanceToNow } from 'date-fns';
import { twMerge } from 'tailwind-merge';
import QRCode from 'qrcode';
import { pdf } from '@react-pdf/renderer';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const formatRelativeTime = (dateString: string) => {
  return formatDistanceToNow(new Date(dateString), { addSuffix: true });
};

export const formatTableDate = (date: Date) => {
  return format(date, 'yyyy-MM-dd HH:mm:ss');
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(amount);
};

export const formatAssessmentDate = (date: Date) => {
  return format(date, 'dd/MM/yyyy');
};

export const generateQrCodeUrl = async (qrCode: string) => {
  const url = `https://workase.vercel.app/certificates/${qrCode}`;
  return await QRCode.toDataURL(url);
};

export const convertPdfToBlob = async (doc: JSX.Element) => {
  return await pdf(doc).toBlob();
};

export const convertBlobToFile = (blob: Blob) => {
  return new File([blob], 'certificate.pdf', {
    type: 'application/pdf',
    lastModified: Date.now(),
  });
};

export const formatCertificateDate = (date: Date) => {
  return format(date, 'dd MMM, yyyy');
};

export const scrollToTop = (
  top: number = 0,
  behavior: 'smooth' | 'instant' = 'instant',
) => {
  window.scrollTo({ top, behavior });
};

export const formatSubscriptionStat = (n: number) => {
  if (n >= 1000) {
    return (n / 1000).toFixed(n % 1000 === 0 ? 0 : 1) + 'K';
  }

  if (n > 50) {
    const roundedDown = Math.floor(n / 50) * 50;
    return `${roundedDown}+`;
  }

  return n.toString();
};
