"use client";

import { useEffect, useState } from 'react';
import ItemPage from '../components/ItemPage';
import { FaUser, FaEnvelope, FaGithub, FaLinkedin, FaGraduationCap, FaCode, FaHeart } from 'react-icons/fa';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import '../styles/me.css';

export default function Me() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const transition = searchParams.get('transition');
        if (transition === 'true') {
            setTimeout(() => {
                setIsVisible(true);
                router.replace('/me');
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
        overlay.style.backgroundColor = '#FF9600';
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
        <div className={`me-container ${isVisible ? 'visible' : ''}`}>
            <ItemPage Icon={FaUser} title="About Me" color="#FF9600" onBackClick={handleBackClick}>
                <div className="me-content">
                    <section className="intro">
                        <Image
                            src="/path/to/your/profile-picture.jpg"
                            alt="Your Name"
                            width={200}
                            height={200}
                            className="profile-picture"
                        />
                        <h2>Your Name</h2>
                        <p className="job-title">Your Job Title</p>
                        <p>A brief introduction about yourself and your passion for web development.</p>
                    </section>

                    <section className="education">
                        <h3><FaGraduationCap /> Education</h3>
                        <ul>
                            <li>Degree in Computer Science, University Name, Year</li>
                            <li>Relevant certifications or courses</li>
                        </ul>
                    </section>

                    <section className="skills">
                        <h3><FaCode /> Skills</h3>
                        <ul>
                            <li>JavaScript, TypeScript, React, Next.js</li>
                            <li>HTML5, CSS3, Responsive Design</li>
                            <li>Node.js, Express, MongoDB</li>
                            <li>Git, GitHub, CI/CD</li>
                        </ul>
                    </section>

                    <section className="interests">
                        <h3><FaHeart /> Interests</h3>
                        <ul>
                            <li>Open-source contributions</li>
                            <li>Staying up-to-date with web technologies</li>
                            <li>Your hobbies or other interests</li>
                        </ul>
                    </section>

                    <section className="contact">
                        <h3><FaEnvelope /> Get in Touch</h3>
                        <div className="social-links">
                            <a href="mailto:your.email@example.com"><FaEnvelope /></a>
                            <a href="https://github.com/yourusername"><FaGithub /></a>
                            <a href="https://linkedin.com/in/yourusername"><FaLinkedin /></a>
                        </div>
                    </section>
                </div>
            </ItemPage>
        </div>
    );
}
