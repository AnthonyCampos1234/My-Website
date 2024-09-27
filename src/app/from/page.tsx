"use client";

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import ItemPage from '../components/ItemPage';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { useRouter, useSearchParams } from 'next/navigation';
import '../styles/timeline.css';

export default function From() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const transition = searchParams.get('transition');
        console.log('From page loaded, transition:', transition);

        const handleTransition = () => {
            const tossedImage = document.getElementById('tossed-image');
            const overlay = document.getElementById('transition-overlay');

            console.log('Tossed image:', tossedImage);
            console.log('Overlay:', overlay);

            const completeTrasition = () => {
                console.log('Completing transition');
                setIsVisible(true);

                if (overlay) {
                    console.log('Fading out overlay');
                    overlay.style.opacity = '0';
                    overlay.addEventListener('transitionend', () => {
                        console.log('Overlay transition ended, removing overlay');
                        overlay.remove();
                    }, { once: true });
                } else {
                    console.log('No overlay found to remove');
                }

                if (tossedImage) {
                    console.log('Removing tossed image');
                    tossedImage.remove();
                }

                // Remove the transition parameter from the URL
                window.history.replaceState({}, '', '/from');
            };

            if (tossedImage) {
                console.log('Waiting for toss animation to end');
                tossedImage.addEventListener('animationend', completeTrasition, { once: true });
            } else {
                console.log('No tossed image found, completing transition immediately');
                completeTrasition();
            }
        };

        if (transition === 'true') {
            // Wait a bit to ensure the overlay and tossed image are in the DOM
            setTimeout(handleTransition, 100);
        } else {
            console.log('No transition, showing content immediately');
            setIsVisible(true);
        }

        // Fallback to ensure the content becomes visible
        const fallbackTimer = setTimeout(() => {
            console.log('Fallback timer triggered');
            setIsVisible(true);
            const overlay = document.getElementById('transition-overlay');
            if (overlay) {
                overlay.style.opacity = '0';
                overlay.addEventListener('transitionend', () => {
                    overlay.remove();
                }, { once: true });
            }
        }, 2000);

        return () => clearTimeout(fallbackTimer);
    }, [searchParams, router]);

    const handleBackClick = () => {
        console.log('Back transition started');

        const overlay = document.createElement('div');
        overlay.id = 'back-transition-overlay';
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = '#58CC02';
        overlay.style.opacity = '0';
        overlay.style.transition = 'opacity 0.5s ease-in-out';
        overlay.style.zIndex = '1000';

        document.body.appendChild(overlay);

        // Fade in the overlay
        requestAnimationFrame(() => {
            overlay.style.opacity = '1';
        });

        // Create and animate the tossed image
        const tossedImage = document.createElement('div');
        tossedImage.id = 'tossed-image';
        tossedImage.style.position = 'fixed';
        tossedImage.style.zIndex = '1001';
        tossedImage.style.left = '50%';
        tossedImage.style.bottom = '0'; // Changed from '0' to '-10%'
        tossedImage.style.transform = 'translateX(-50%) translateY(100%)';
        tossedImage.innerHTML = `<img src="/myface2.png" alt="Anthony's profile picture" width="200" height="200" />`; // Increased size slightly
        document.body.appendChild(tossedImage);

        // Start the tossing animation
        requestAnimationFrame(() => {
            tossedImage.style.animation = 'toss 1.5s ease-in-out forwards';
        });

        // Navigate after the overlay is fully visible and animation is complete
        setTimeout(() => {
            console.log('Navigation back triggered');
            router.replace('/anthony?return=true');
        }, 1700);
    };

    const timelineItems = [
        {
            year: '1990-2000',
            location: 'San Diego, California',
            description: 'Born and raised in sunny San Diego. Del Mar was my favorite beach, where I spent countless happy hours enjoying the perfect weather and beautiful coastline.',
            image: '/san-diego.jpg',
            facts: [
                'Del Mar beach is known for its pristine sand and excellent surfing conditions.',
                'The San Diego Zoo, one of the largest in the world, was a frequent family destination.',
                'Enjoyed the year-round Mediterranean climate perfect for outdoor activities.'
            ]
        },
        {
            year: '2000-2012',
            location: 'Peters Township, Pennsylvania',
            description: 'Moved to Peters Township, just outside Pittsburgh, at the start of 4th grade. Fell in love with the area and experienced the vibrant suburban life and passionate sports culture.',
            image: '/pittsburgh.jpg',
            facts: [
                'Peters Township is known for its excellent schools and community-oriented lifestyle.',
                'Experienced all four seasons, a big change from San Diego\'s constant sunshine.',
                'Grew up cheering for the Steelers, Pirates, and Penguins.'
            ]
        },
        {
            year: '2012',
            location: 'Lewisburg, Pennsylvania',
            description: 'Briefly lived in Lewisburg right before starting college. Though the stay was short, it was a significant transition point in my life.',
            image: '/lewisburg.jpg',
            facts: [
                'Home to Bucknell University, founded in 1846.',
                'Known for its charming downtown and historic architecture.',
                'Situated along the beautiful Susquehanna River.'
            ]
        },
        {
            year: '2012-Present',
            location: 'Boston, Massachusetts',
            description: 'Moved to Boston for college at Northeastern University. Embracing the rich academic environment, historic charm, and vibrant city life.',
            image: '/boston.jpg',
            facts: [
                'Home to numerous world-renowned universities and colleges.',
                'Rich in American history, with landmarks like the Freedom Trail.',
                'Experiencing the distinct New England seasons, including the beautiful fall foliage.'
            ]
        },
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.1 }
        );

        document.querySelectorAll('.timeline-item').forEach((item) => {
            observer.observe(item);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.5s ease-in-out' }}>
            <ItemPage Icon={FaMapMarkerAlt} title="My Journey" color="#58CC02" onBackClick={handleBackClick}>
                <div className="timeline-container">
                    {timelineItems.map((item, index) => (
                        <div key={index} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
                            <div className="timeline-content">
                                <div className="timeline-year">{item.year}</div>
                                <h2>{item.location}</h2>
                                <div className="timeline-image">
                                    <Image src={item.image} alt={item.location} layout="fill" objectFit="cover" />
                                </div>
                                <p>{item.description}</p>
                                <ul className="timeline-facts">
                                    {item.facts.map((fact, factIndex) => (
                                        <li key={factIndex}>{fact}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </ItemPage>
        </div>
    );
}