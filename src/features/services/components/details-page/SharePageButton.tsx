'use client';

import { Link, ThumbsUp } from 'lucide-react';

import { Button } from '@/features/app/components/ui/button';
import { useToast } from '@/features/app/components/ui/use-toast';

const SharePageButton = () => {
  const { toast } = useToast();

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: 'Link Copied!',
      action: <ThumbsUp size={36} />,
    });
  };

  return (
    <Button onClick={handleShare}>
      <span className='hidden lg:inline'>Share</span>
      <Link className='ml-0 h-4 w-4 lg:ml-2' />
    </Button>
  );
};

export default SharePageButton;
