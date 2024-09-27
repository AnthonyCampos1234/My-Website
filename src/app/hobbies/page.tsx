"use client";

import { useEffect, useState } from 'react';
import ItemPage from '../components/ItemPage';
import { FaGamepad, FaCode, FaBook, FaMusic, FaCamera } from 'react-icons/fa';
import { useRouter, useSearchParams } from 'next/navigation';
import '../styles/hobbies.css';

interface Hobby {
    name: string;
    icon: React.ElementType;
    description: string;
}

export default function Hobbies() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isVisible, setIsVisible] = useState(false);
    const [selectedHobby, setSelectedHobby] = useState<Hobby | null>(null);

    useEffect(() => {
        const transition = searchParams.get('transition');
        if (transition === 'true') {
            setTimeout(() => {
                setIsVisible(true);
                router.replace('/hobbies');
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
        overlay.style.backgroundColor = '#58CC02';
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

    const hobbies: Hobby[] = [
        {
            name: "Gaming",
            icon: FaGamepad,
            description: "I enjoy playing various video games, especially strategy and RPG genres. Some of my favorites include The Witcher 3, Civilization VI, and Stardew Valley."
        },
        {
            name: "Coding Projects",
            icon: FaCode,
            description: "Outside of work, I love working on personal coding projects. This helps me explore new technologies and keep my skills sharp. I'm currently building a mobile app using React Native."
        },
        {
            name: "Reading",
            icon: FaBook,
            description: "I'm an avid reader, particularly of science fiction and non-fiction books about technology and science. Some of my favorite authors include Isaac Asimov and Neal Stephenson."
        },
        {
            name: "Music Production",
            icon: FaMusic,
            description: "I enjoy creating electronic music in my free time. I use Ableton Live and various VST instruments to produce ambient and downtempo tracks."
        },
        {
            name: "Photography",
            icon: FaCamera,
            description: "I love capturing moments through photography. I particularly enjoy landscape and street photography. I use a Sony mirrorless camera for most of my shots."
        }
    ];

    return (
        <div className={`hobbies-container ${isVisible ? 'visible' : ''}`}>
            <ItemPage Icon={FaGamepad} title="My Hobbies" color="#58CC02" onBackClick={handleBackClick}>
                <div className="hobbies-grid">
                    {hobbies.map((hobby, index) => (
                        <div
                            key={index}
                            className={`hobby-item ${selectedHobby === hobby ? 'selected' : ''}`}
                            onClick={() => setSelectedHobby(hobby === selectedHobby ? null : hobby)}
                        >
                            <hobby.icon className="hobby-icon" />
                            <h3>{hobby.name}</h3>
                            <p className="hobby-description">{hobby.description}</p>
                        </div>
                    ))}
                </div>
            </ItemPage>
        </div>
    );
}