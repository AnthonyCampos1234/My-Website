"use client";

import { Nunito } from 'next/font/google'
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Home from './home/page';
import Anthony from './anthony/page';
import { useScrollBetweenPages } from './useScrollBetweenPages';

const nunito = Nunito({ subsets: ['latin'] })

export default function RootPage() {
  const { currentPage, goToPage } = useScrollBetweenPages(1);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const returnParam = searchParams.get('return');
    if (returnParam === 'true') {
      goToPage(2);
      router.replace('/');
    }
  }, [searchParams, router, goToPage]);

  console.log('Current page:', currentPage); // Debug log

  return (
    <div className={`${nunito.className} page-container`}>
      <div className={`home-page ${currentPage === 1 ? 'active' : ''}`}>
        <Home onScrollDown={() => goToPage(2)} />
      </div>
      <div className={`about-page ${currentPage === 2 ? 'active' : ''}`}>
        <Anthony />
      </div>
      <style jsx>{`
        .page-container {
          height: 100vh;
          overflow: hidden;
          position: relative;
        }
        .home-page, .about-page {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          transition: all 0.8s cubic-bezier(0.645, 0.045, 0.355, 1);
        }
        .home-page {
          transform: ${currentPage === 1 ? 'translateY(0) scale(1)' : 'translateY(-100%) scale(0.9)'};
          opacity: ${currentPage === 1 ? 1 : 0};
        }
        .about-page {
          transform: ${currentPage === 2 ? 'translateY(0) scale(1)' : 'translateY(100%) scale(0.9)'};
          opacity: ${currentPage === 2 ? 1 : 0};
        }
      `}</style>
    </div>
  );
}