"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaChevronLeft, FaDownload, FaFileAlt } from 'react-icons/fa';
import ItemPage from '../components/ItemPage';
import '../styles/resume.css';

export default function Resume() {
    const router = useRouter();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleBackClick = () => {
        router.push('/anthony');
    };

    return (
        <div className={`resume-container ${isVisible ? 'visible' : ''}`}>
            <div className="playful-back-button" onClick={handleBackClick}>
                <FaChevronLeft />
            </div>
            <ItemPage Icon={FaFileAlt} title="My Resumes" color="#1CB0F6">
                <div className="resume-content">
                    <div className="resume-column">
                        <h2>Computer Science Resume</h2>
                        <div className="resume-preview">
                            <img src="/cs-resume-preview.jpg" alt="CS Resume Preview" />
                        </div>
                        <a href="/path-to-cs-resume.pdf" download className="download-button">
                            <FaDownload /> Download CS Resume
                        </a>
                    </div>
                    <div className="resume-column">
                        <h2>Work Experience Resume</h2>
                        <div className="resume-preview">
                            <img src="/work-resume-preview.jpg" alt="Work Resume Preview" />
                        </div>
                        <a href="/path-to-work-resume.pdf" download className="download-button">
                            <FaDownload /> Download Work Resume
                        </a>
                    </div>
                </div>
            </ItemPage>
            <style jsx>{`
                .playful-back-button {
                    position: fixed;
                    top: 20px;
                    left: 20px;
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    background-color: #1CB0F6;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    z-index: 1000;
                }

                .playful-back-button:hover {
                    transform: scale(1.1);
                    box-shadow: 0 0 15px rgba(28, 176, 246, 0.5);
                }

                .playful-back-button :global(svg) {
                    color: white;
                    font-size: 24px;
                }
            `}</style>
        </div>
    );
}
