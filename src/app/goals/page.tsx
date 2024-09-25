"use client";

import { useEffect, useState } from 'react';
import ItemPage from '../components/ItemPage';
import { FaBullseye } from 'react-icons/fa';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Goals() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const transition = searchParams.get('transition');
        if (transition === 'true') {
            setTimeout(() => {
                setIsVisible(true);
                router.replace('/goals');
                const overlay = document.getElementById('transition-overlay');
                if (overlay) {
                    overlay.style.opacity = '0';
                    overlay.addEventListener('transitionend', () => {
                        overlay.remove();
                    }, { once: true });
                }
            }, 600);
        } else {
            setIsVisible(true);
        }
    }, [searchParams, router]);

    const handleBackClick = () => {
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = '#CE82FF';
        overlay.style.opacity = '0';
        overlay.style.transition = 'opacity 0.5s ease-in-out';
        overlay.style.zIndex = '1000';

        document.body.appendChild(overlay);

        requestAnimationFrame(() => {
            overlay.style.opacity = '1';
        });

        setTimeout(() => {
            router.push('/?return=true');
            setTimeout(() => {
                overlay.style.opacity = '0';
                overlay.addEventListener('transitionend', () => {
                    document.body.removeChild(overlay);
                }, { once: true });
            }, 500);
        }, 1000);
    };

    return (
        <div
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'scale(1)' : 'scale(0.98)',
                transition: 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out'
            }}
        >
            <ItemPage Icon={FaBullseye} title="My Goals" color="#CE82FF" onBackClick={handleBackClick}>
                <p>Here are some of my current goals:</p>
                <ul>
                    <li>Goal 1</li>
                    <li>Goal 2</li>
                    <li>Goal 3</li>
                </ul>
            </ItemPage>
        </div>
    );
}
