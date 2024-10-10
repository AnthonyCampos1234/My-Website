"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { DiPhotoshop } from 'react-icons/di';
import { FaAws, FaChevronLeft, FaCode, FaCss3, FaFigma, FaGitAlt, FaHtml5, FaJava, FaJs, FaReact } from 'react-icons/fa';
import { SiAppwrite, SiExpo, SiNextdotjs, SiPython, SiSupabase, SiTypescript } from 'react-icons/si';
import ItemPage from '../components/ItemPage';
import '../styles/skills.css';

export default function Skills() {
    const [expandedSkill, setExpandedSkill] = useState<number | null>(null);
    const router = useRouter();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleBackClick = () => {
        router.push('/anthony');
    };

    const skillCategories = [
        {
            category: "Languages",
            skills: [
                { name: "Java", Icon: FaJava, description: "Object-oriented programming for enterprise applications." },
                { name: "HTML5", Icon: FaHtml5, description: "Crafting responsive and accessible web layouts." },
                { name: "CSS3", Icon: FaCss3, description: "Styling and layout for modern web design." },
                { name: "Python", Icon: SiPython, description: "Data analysis, web development, and automation." },
                { name: "JavaScript", Icon: FaJs, description: "Proficient in modern ES6+ features and async programming." },
                { name: "TypeScript", Icon: SiTypescript, description: "Strong typing for large-scale JavaScript applications." },
            ]
        },
        {
            category: "Technologies & Frameworks",
            skills: [
                { name: "Git", Icon: FaGitAlt, description: "Version control and collaborative development." },
                { name: "Figma", Icon: FaFigma, description: "UI/UX design and prototyping." },
                { name: "Adobe Photoshop", Icon: DiPhotoshop, description: "Image editing and graphic design." },
                { name: "React Native", Icon: FaReact, description: "Cross-platform mobile app development." },
                { name: "Cursor AI", Icon: FaCode, description: "AI-powered code editor for enhanced productivity." },
                { name: "Supabase", Icon: SiSupabase, description: "Open-source Firebase alternative for backend development." },
                { name: "React", Icon: FaReact, description: "Building complex, scalable user interfaces." },
                { name: "Next.js", Icon: SiNextdotjs, description: "React framework for production-grade applications." },
                { name: "Expo", Icon: SiExpo, description: "Framework and platform for universal React applications." },
                { name: "AWS Lambda", Icon: FaAws, description: "Serverless compute service for event-driven applications." },
                { name: "Appwrite", Icon: SiAppwrite, description: "Open-source backend server for web and mobile developers." },
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

        document.querySelectorAll('.skill-category').forEach((item) => {
            observer.observe(item);
        });

        return () => observer.disconnect();
    }, []);

    const handleSkillClick = (index: number) => {
        setExpandedSkill(expandedSkill === index ? null : index);
    };

    return (
        <div className={`skills-container ${isVisible ? 'visible' : ''}`}>
            <div className="playful-back-button" onClick={handleBackClick}>
                <FaChevronLeft />
            </div>
            <ItemPage Icon={FaCode} title="My Skills" color="#FF9600">
                <div className="skills-grid">
                    {skillCategories.map((category, categoryIndex) => (
                        <div key={categoryIndex} className="skill-category">
                            <h2>{category.category}</h2>
                            <div className="skill-items-container">
                                {category.skills.map((skill, skillIndex) => (
                                    <div
                                        key={skillIndex}
                                        className={`skill-item ${expandedSkill === skillIndex ? 'expanded' : ''}`}
                                        onClick={() => handleSkillClick(skillIndex)}
                                    >
                                        <div className="skill-logo">
                                            <skill.Icon size={80} />
                                        </div>
                                        <h3>{skill.name}</h3>
                                        <div className="skill-description">
                                            <p>{skill.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </ItemPage>
            <style jsx>{`
                .skills-container {
                    width: 100%;
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 20px;
                    opacity: 0;
                    transition: opacity 0.5s ease-in-out;
                }

                .skills-container.visible {
                    opacity: 1;
                }

                .playful-back-button {
                    position: fixed;
                    top: 20px;
                    left: 20px;
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    background-color: #FF9600;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    z-index: 1000;
                }

                .playful-back-button:hover {
                    transform: scale(1.1);
                    box-shadow: 0 0 15px rgba(255, 150, 0, 0.5);
                }

                .playful-back-button :global(svg) {
                    color: white;
                    font-size: 24px;
                }

                @media (max-width: 768px) {
                    .skills-container {
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
                    .skills-container {
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