"use client";

import { useEffect, useState } from 'react';
import ItemPage from '../components/ItemPage';
import { FaCode, FaJs, FaReact, FaHtml5, FaNodeJs } from 'react-icons/fa';
import { SiTypescript, SiPython } from 'react-icons/si';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import '../styles/skills.css';

export default function Skills() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isVisible, setIsVisible] = useState(false);
    const [expandedSkill, setExpandedSkill] = useState<number | null>(null);

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

    const skillCategories = [
        {
            category: "Programming Languages",
            skills: [
                { name: "JavaScript", Icon: FaJs, description: "Proficient in modern ES6+ features and async programming." },
                { name: "TypeScript", Icon: SiTypescript, description: "Strong typing for large-scale JavaScript applications." },
                { name: "Python", Icon: SiPython, description: "Data analysis, web development, and automation." },
                // Add more skills...
            ]
        },
        {
            category: "Web Technologies",
            skills: [
                { name: "React", Icon: FaReact, description: "Building complex, scalable user interfaces." },
                { name: "Node.js", Icon: FaNodeJs, description: "Server-side JavaScript for robust backend services." },
                { name: "HTML5", Icon: FaHtml5, description: "Crafting responsive and accessible web layouts." },
                // Add more skills...
            ]
        },
        // Add more categories...
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
        <div style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.5s ease-in-out' }}>
            <ItemPage Icon={FaCode} title="My Skills" color="#FF9600" onBackClick={handleBackClick}>
                <div className="skills-container">
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
        </div>
    );
}