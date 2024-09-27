"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import ItemPage from '../components/ItemPage';
import { FaFilm, FaPlay } from 'react-icons/fa';
import { useRouter, useSearchParams } from 'next/navigation';
import '../styles/animation.css';

interface AnimationProject {
    title: string;
    description: string;
    thumbnail: string;
    videoUrl: string;
}

export default function Animation() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isVisible, setIsVisible] = useState(false);
    const [selectedProject, setSelectedProject] = useState<AnimationProject | null>(null);

    useEffect(() => {
        const transition = searchParams.get('transition');
        if (transition === 'true') {
            setTimeout(() => {
                setIsVisible(true);
                router.replace('/animation');
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
        overlay.style.backgroundColor = '#FF4B4B';
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

    const animationProjects: AnimationProject[] = [
        {
            title: "Character Walk Cycle",
            description: "A smooth walk cycle animation for a cartoon character.",
            thumbnail: "/images/walk-cycle-thumbnail.jpg",
            videoUrl: "https://example.com/walk-cycle-video.mp4"
        },
        {
            title: "Logo Animation",
            description: "An animated logo reveal for a tech startup.",
            thumbnail: "/images/logo-animation-thumbnail.jpg",
            videoUrl: "https://example.com/logo-animation-video.mp4"
        },
        {
            title: "Short Film: 'The Journey'",
            description: "A 2-minute animated short film about personal growth.",
            thumbnail: "/images/short-film-thumbnail.jpg",
            videoUrl: "https://example.com/short-film-video.mp4"
        },
        // Add more animation projects as needed
    ];

    return (
        <div className={`animation-container ${isVisible ? 'visible' : ''}`}>
            <ItemPage Icon={FaFilm} title="Animation" color="#FF4B4B" onBackClick={handleBackClick}>
                <div className="animation-content">
                    <section className="animation-intro">
                        <h2>My Passion for Animation</h2>
                        <p>Animation has been a significant part of my creative journey. I'm fascinated by the ability to bring static images to life and tell compelling stories through motion. My work is inspired by a blend of traditional hand-drawn techniques and modern digital tools.</p>
                    </section>

                    <section className="animation-style">
                        <h3>Favorite Animation Styles</h3>
                        <ul>
                            <li>2D character animation</li>
                            <li>Motion graphics</li>
                            <li>Stop-motion</li>
                            <li>Experimental animation</li>
                        </ul>
                    </section>

                    <section className="animation-projects">
                        <h3>Animation Projects</h3>
                        <div className="projects-grid">
                            {animationProjects.map((project, index) => (
                                <div key={index} className="project-item" onClick={() => setSelectedProject(project)}>
                                    <Image src={project.thumbnail} alt={project.title} width={300} height={200} />
                                    <h4>{project.title}</h4>
                                    <p>{project.description}</p>
                                    <button className="play-button"><FaPlay /> Play</button>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="animation-inspiration">
                        <h3>Inspiration</h3>
                        <p>My work is inspired by animators and studios such as Hayao Miyazaki, Pixar, and independent artists pushing the boundaries of the medium. I'm constantly learning and experimenting with new techniques to improve my craft.</p>
                    </section>
                </div>
            </ItemPage>

            {selectedProject && (
                <div className="video-modal" onClick={() => setSelectedProject(null)}>
                    <div className="video-content" onClick={(e) => e.stopPropagation()}>
                        <h3>{selectedProject.title}</h3>
                        <video controls src={selectedProject.videoUrl}></video>
                        <button onClick={() => setSelectedProject(null)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}
