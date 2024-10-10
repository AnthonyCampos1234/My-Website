"use client";

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaChevronLeft, FaMapMarkerAlt } from 'react-icons/fa';
import ItemPage from '../components/ItemPage';
import '../styles/timeline.css';

export default function From() {
    const router = useRouter();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleBackClick = () => {
        router.push('/anthony');
    };

    const timelineItems = [
        {
            year: '2005-2014',
            location: 'San Diego, California',
            description: 'Born and raised in sunny San Diego. Del Mar was my favorite beach, where I spent countless happy hours enjoying the perfect weather and beautiful coastline.',
            image: '/Pic1.png',
            facts: [
                'All of my family outside my immediate family is in San Diego and Mexico.',
                'I miss the weather, the family filled holidays, and the beach.',
                'I plan to have a beach house in San Diego.'
            ]
        },
        {
            year: '2014-2023',
            location: 'Peters Township, Pennsylvania',
            description: 'Moved to Peters Township, just outside Pittsburgh, at the start of 4th grade. I got to experience the four seasons, and the snow.',
            image: '/Pic2.png',
            facts: [
                'Moving across the country was a big change. Especially when it came to culture.',
                'No more beaches, but I got to experience the four seasons.',
                'Luckily, I got to attend some of the best schools in the area.'
            ]
        },
        {
            year: '2023',
            location: 'Lewisburg, Pennsylvania',
            description: 'Briefly lived in Lewisburg right before starting college.',
            image: '/Pic3.png',
            facts: [
                'The day after moving in, we were on the road to Boston.',
                'I enjoy the peace and quiet of Lewisburg.',
                'When Bucknell students move in the town lights up with life.'
            ]
        },
        {
            year: '2023-Present',
            location: 'Boston, Massachusetts',
            description: 'Moved to Boston for Northeastern University. Oh, I have yet to truly explore the city due to my ambitions taking up all my time.',
            image: '/Pic4.png',
            facts: [
                'Truly enjoy the city life.',
                'Love the Northeastern University campus.',
                'I can feel the history in the older buildings.'
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
        <div className="from-page-container" style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.5s ease-in-out' }}>
            <div className="playful-back-button" onClick={handleBackClick}>
                <FaChevronLeft />
            </div>
            <ItemPage Icon={FaMapMarkerAlt} title="My Journey" color="#58CC02">
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
            <style jsx>{`
                .from-page-container {
                    width: 100%;
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 20px;
                    overflow-x: hidden; 
                }

                .playful-back-button {
                    position: fixed;
                    top: 20px;
                    left: 20px;
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    background-color: #58CC02;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    z-index: 1000;
                }

                .playful-back-button:hover {
                    transform: scale(1.1);
                    box-shadow: 0 0 15px rgba(88, 204, 2, 0.5);
                }

                .playful-back-button :global(svg) {
                    color: white;
                    font-size: 24px;
                }

                @media (max-width: 768px) {
                    .from-page-container {
                        padding: 10px;
                    }

                    .playful-back-button {
                        width: 40px;
                        height: 40px;
                    }

                    .playful-back-button :global(svg) {
                        font-size: 20px;
                    }
                }

                @media (max-width: 480px) {
                    .from-page-container {
                        padding: 5px;
                    }

                    .playful-back-button {
                        width: 30px;
                        height: 30px;
                    }

                    .playful-back-button :global(svg) {
                        font-size: 16px;
                    }
                }
            `}</style>
        </div>
    );
}