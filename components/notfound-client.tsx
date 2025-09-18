'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShieldAlert } from 'lucide-react';

export default function NotFoundClient() {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="relative z-10 flex flex-col items-center justify-center px-24 text-center text-white">
      <ShieldAlert className="mb-4 h-12 w-12 text-red-500" />
      <h1 className="mb-2 text-4xl font-bold">404 - Page Not Found</h1>
      <p className="mb-6 text-lg">Sorry, the page you are looking for does not exist.</p>
      <Link href="/" passHref>
        <Button className="bg-lime-400 text-black font-medium rounded-lg px-6 py-2.5 hover:bg-lime-300 hover:shadow-md hover:scale-[1.02] transition-all">
          Go Back Home
        </Button>
      </Link>
    </div>
  );
}