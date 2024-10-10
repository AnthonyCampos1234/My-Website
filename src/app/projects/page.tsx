"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaChevronLeft, FaExternalLinkAlt, FaGithub, FaLaptopCode } from 'react-icons/fa';
import ItemPage from '../components/ItemPage';
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
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleBackClick = () => {
        router.push('/anthony');
    };

    const projects: Project[] = [
        {
            title: "Avisari",
            description: "University Advising and Student Success Platform",
            technologies: ["TypeScript"],
            githubLink: "https://github.com/AnthonyCampos1234/Avisari",
            liveLink: "https://avisari.com"
        },
        {
            title: "My-Website",
            description: "Anthony Campos Portfolio Website",
            technologies: ["TypeScript", "Next.js", "React"],
            githubLink: "https://github.com/AnthonyCampos1234/My-Website",
            liveLink: "https://anthony.campos"
        },
        {
            title: "Nota",
            description: "Everything App for Students",
            technologies: ["JavaScript"],
            githubLink: "https://github.com/AnthonyCampos1234/Nota",
        },
        {
            title: "EduConnect",
            description: "Educational platform",
            technologies: ["HTML"],
            githubLink: "https://github.com/AnthonyCampos1234/educonnect",
        },
        {
            title: "Dormeal",
            description: "The dormeal web app MVP",
            technologies: ["HTML"],
            githubLink: "https://github.com/AnthonyCampos1234/dormeal",
            liveLink: "https://dormeal.com"
        },
        {
            title: "BillsForKids",
            description: "A Fun Financial Education Game",
            technologies: ["Java"],
            githubLink: "https://github.com/AnthonyCampos1234/BillsForKids",
        },
    ];

    return (
        <div className={`projects-container ${isVisible ? 'visible' : ''}`}>
            <div className="playful-back-button" onClick={handleBackClick}>
                <FaChevronLeft />
            </div>
            <ItemPage Icon={FaLaptopCode} title="My Projects" color="#2B70C9">
                <div className="projects-grid">
                    {projects.map((project, index) => (
                        <div key={index} className="project-item">
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
                                        <FaExternalLinkAlt /> Live Link
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </ItemPage>
            <style jsx>{`
                .projects-container {
                    width: 100%;
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 20px;
                    opacity: 0;
                    transition: opacity 0.5s ease-in-out;
                }

                .projects-container.visible {
                    opacity: 1;
                }

                .playful-back-button {
                    position: fixed;
                    top: 20px;
                    left: 20px;
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    background-color: #2B70C9;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    z-index: 1000;
                }

                .playful-back-button:hover {
                    transform: scale(1.1);
                    box-shadow: 0 0 15px rgba(43, 112, 201, 0.5);
                }

                .playful-back-button :global(svg) {
                    color: white;
                    font-size: 24px;
                }

                @media (max-width: 768px) {
                    .projects-container {
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
                    .projects-container {
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
