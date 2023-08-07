'use client';

import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Link, ThumbsUp } from 'lucide-react';

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
