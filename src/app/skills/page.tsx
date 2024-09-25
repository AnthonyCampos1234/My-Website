"use client";

import { useEffect, useState } from 'react';
import ItemPage from '../components/ItemPage';
import { FaCode } from 'react-icons/fa';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Skills() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const transition = searchParams.get('transition');
        if (transition === 'true') {
            // If coming from a transition, wait for the overlay to fade out
            setTimeout(() => {
                setIsVisible(true);
                // Remove the transition query parameter
                router.replace('/skills');

                // Remove the overlay
                const overlay = document.getElementById('transition-overlay');
                if (overlay) {
                    overlay.style.opacity = '0';
                    overlay.addEventListener('transitionend', () => {
                        overlay.remove();
                    }, { once: true });
                }
            }, 600);
        } else {
            // If not coming from a transition, show content immediately
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
        overlay.style.backgroundColor = '#FF9600';
        overlay.style.opacity = '0';
        overlay.style.transition = 'opacity 0.5s ease-in-out'; // Increased duration
        overlay.style.zIndex = '1000';

        document.body.appendChild(overlay);

        // Fade in the overlay
        requestAnimationFrame(() => {
            overlay.style.opacity = '1';
        });

        // Navigate after the overlay is fully visible
        setTimeout(() => {
            router.push('/?return=true');
            // Remove the overlay after navigation
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
            <ItemPage Icon={FaCode} title="Skills" color="#FF9600" onBackClick={handleBackClick}>
                <p>Here are some of my key skills:</p>
                <ul className="list-disc list-inside mt-4">
                    <li>JavaScript / TypeScript</li>
                    <li>React / Next.js</li>
                    <li>Node.js / Express</li>
                    <li>Python / Django</li>
                    <li>SQL / NoSQL Databases</li>
                    <li>RESTful API Design</li>
                    <li>Git / Version Control</li>
                    <li>Responsive Web Design</li>
                </ul>
            </ItemPage>
        </div>
    );
}