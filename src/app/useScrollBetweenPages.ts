import { useState, useEffect, useCallback } from 'react';

export function useScrollBetweenPages(initialPage: number) {
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [isScrolling, setIsScrolling] = useState(false);

    const handleScroll = useCallback((e: WheelEvent) => {
        e.preventDefault();
        if (isScrolling) return;

        setIsScrolling(true);
        const delta = e.deltaY;

        console.log('Scroll detected:', delta); // Debug log

        if (delta > 0 && currentPage === 1) {
            console.log('Scrolling to page 2'); // Debug log
            setCurrentPage(2);
        } else if (delta < 0 && currentPage === 2) {
            console.log('Scrolling to page 1'); // Debug log
            setCurrentPage(1);
        }

        setTimeout(() => setIsScrolling(false), 800);
    }, [currentPage, isScrolling]);

    useEffect(() => {
        window.addEventListener('wheel', handleScroll, { passive: false });
        return () => {
            window.removeEventListener('wheel', handleScroll);
        };
    }, [handleScroll]);

    const goToPage = useCallback((pageNumber: number) => {
        if (pageNumber === 1 || pageNumber === 2) {
            setCurrentPage(pageNumber);
        }
    }, []);

    return { currentPage, goToPage };
}