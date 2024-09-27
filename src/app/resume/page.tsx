"use client";

import { useEffect, useState } from 'react';
import ItemPage from '../components/ItemPage';
import { FaFileAlt, FaDownload } from 'react-icons/fa';
import { useRouter, useSearchParams } from 'next/navigation';
import '../styles/resume.css';

export default function Resume() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const transition = searchParams.get('transition');
        if (transition === 'true') {
            setTimeout(() => {
                setIsVisible(true);
                router.replace('/resume');
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
        overlay.style.backgroundColor = '#1CB0F6';
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
        <div className={`resume-container ${isVisible ? 'visible' : ''}`}>
            <ItemPage Icon={FaFileAlt} title="My Resumes" color="#1CB0F6" onBackClick={handleBackClick}>
                <div className="resume-content">
                    <div className="resume-column">
                        <h2>Computer Science Resume</h2>
                        <div className="resume-preview">
                            {/* Replace with actual preview of CS resume */}
                            <img src="/cs-resume-preview.jpg" alt="CS Resume Preview" />
                        </div>
                        <a href="/path-to-cs-resume.pdf" download className="download-button">
                            <FaDownload /> Download CS Resume
                        </a>
                    </div>
                    <div className="resume-column">
                        <h2>Work Experience Resume</h2>
                        <div className="resume-preview">
                            {/* Replace with actual preview of work resume */}
                            <img src="/work-resume-preview.jpg" alt="Work Resume Preview" />
                        </div>
                        <a href="/path-to-work-resume.pdf" download className="download-button">
                            <FaDownload /> Download Work Resume
                        </a>
                    </div>
                </div>
            </ItemPage>
        </div>
    );
}
