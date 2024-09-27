"use client";

import { useEffect, useState } from 'react';
import ItemPage from '../components/ItemPage';
import { FaLaptopCode, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { useRouter, useSearchParams } from 'next/navigation';
import '../styles/projects.css';

interface Project {
    title: string;
    description: string;
    technologies: string[];
    githubLink: string;
    liveLink?: string;
}

export default function Projects() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isVisible, setIsVisible] = useState(false);
    const [selectedProject, setSelectedProject] = useState<number | null>(null);

    useEffect(() => {
        const transition = searchParams.get('transition');
        if (transition === 'true') {
            setTimeout(() => {
                setIsVisible(true);
                router.replace('/projects');
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
        overlay.style.backgroundColor = '#2B70C9';
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

    const projects: Project[] = [
        {
            title: "Personal Portfolio",
            description: "A responsive portfolio website showcasing my skills and projects.",
            technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
            githubLink: "https://github.com/yourusername/portfolio",
            liveLink: "https://yourportfolio.com"
        },
        {
            title: "Task Manager App",
            description: "A full-stack task management application with user authentication.",
            technologies: ["Node.js", "Express", "MongoDB", "React"],
            githubLink: "https://github.com/yourusername/task-manager"
        },
        {
            title: "Weather Dashboard",
            description: "A weather application that displays current and forecasted weather data.",
            technologies: ["JavaScript", "HTML", "CSS", "OpenWeather API"],
            githubLink: "https://github.com/yourusername/weather-dashboard",
            liveLink: "https://yourweatherapp.com"
        },
        // Add more projects as needed
    ];

    return (
        <div className={`projects-container ${isVisible ? 'visible' : ''}`}>
            <ItemPage Icon={FaLaptopCode} title="My Projects" color="#2B70C9" onBackClick={handleBackClick}>
                <div className="projects-grid">
                    {projects.map((project, index) => (
                        <div
                            key={index}
                            className={`project-item ${selectedProject === index ? 'expanded' : ''}`}
                            onClick={() => setSelectedProject(selectedProject === index ? null : index)}
                        >
                            <h3>{project.title}</h3>
                            <p className="project-description">{project.description}</p>
                            <div className="project-technologies">
                                {project.technologies.map((tech, techIndex) => (
                                    <span key={techIndex} className="tech-tag">{tech}</span>
                                ))}
                            </div>
                            <div className="project-links">
                                <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                                    <FaGithub /> GitHub
                                </a>
                                {project.liveLink && (
                                    <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                                        <FaExternalLinkAlt /> Live Demo
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </ItemPage>
        </div>
    );
}
