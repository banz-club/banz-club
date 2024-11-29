import { ArrowLeft } from 'lucide-react';
import { Link } from 'next-view-transitions';

import { Button } from '@/components/ui/button';

interface BackButtonProps {
  href: string;
}

export function BackButton({ href }: BackButtonProps) {
  return (
    <Link href={href}>
      <Button variant='linkHover2'>
        <ArrowLeft className='h-4 w-4' />
        Back
      </Button>
    </Link>
  );
}
