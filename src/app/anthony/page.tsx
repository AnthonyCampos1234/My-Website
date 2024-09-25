"use client";

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaMapMarkerAlt, FaCode, FaTwitter, FaGithub, FaLinkedin, FaFileAlt, FaUser, FaBullseye, FaLaptopCode, FaGamepad, FaFilm } from 'react-icons/fa';

const anthonyData = [
    { Icon: FaMapMarkerAlt, label: 'From', color: '#58CC02', path: '/from' },
    { Icon: FaCode, label: 'Skills', color: '#FF9600', path: '/skills' },
    { Icon: FaTwitter, label: 'X', color: '#1CB0F6', externalLink: 'https://x.com/heyanthonny' },
    { Icon: FaGithub, label: 'Github', color: '#CE82FF', externalLink: 'https://github.com/AnthonyCampos1234' },
    { Icon: FaLinkedin, label: 'LinkedIn', color: '#FF4B4B', externalLink: 'https://www.linkedin.com/in/anthony-campos-8416b6253/' },
    { Icon: FaFileAlt, label: 'Resume', color: '#1CB0F6', externalLink: '/path/to/your/resume.pdf' },
    { Icon: FaUser, label: 'About Me', color: '#FF9600', path: '/aboutMe' },
    { Icon: FaBullseye, label: 'My Goals', color: '#CE82FF', path: '/goals' },
    { Icon: FaLaptopCode, label: 'Projects', color: '#2B70C9', path: '/projects' },
    { Icon: FaGamepad, label: 'Hobbies', color: '#58CC02', path: '/hobbies' },
    { Icon: FaFilm, label: 'Animation', color: '#FF4B4B', path: '/animation' },
];

export default function Anthony() {
    const [rotation, setRotation] = useState(0);
    const [isMoving, setIsMoving] = useState(true);
    const router = useRouter();

    useEffect(() => {
        let animationId: number;
        const animate = () => {
            if (isMoving) {
                setRotation(prev => (prev + 0.1) % 360);
            }
            animationId = requestAnimationFrame(animate);
        };
        animationId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationId);
    }, [isMoving]);

    const handleItemClick = (path: string | undefined, color: string, externalLink: string | undefined) => {
        if (externalLink) {
            window.open(externalLink, '_blank');
            return;
        }

        const overlay = document.createElement('div');
        overlay.id = 'transition-overlay';
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = color;
        overlay.style.opacity = '0';
        overlay.style.transition = 'opacity 0.5s ease-in-out';
        overlay.style.zIndex = '1000';

        document.body.appendChild(overlay);

        // Fade in the overlay
        requestAnimationFrame(() => {
            overlay.style.opacity = '1';
        });

        // Navigate after the overlay is fully visible
        setTimeout(() => {
            if (path) {
                router.push(path + '?transition=true');
            }
        }, 500);

        setIsMoving(false);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8 relative bg-[#1E1E1E]">
            <div className="about-me-container">
                <div className="profile-picture">
                    <Image
                        src="/CartoonBoyGlassesHoodie.jpg"
                        alt="Anthony's profile picture"
                        width={200}
                        height={200}
                        className="rounded-full border-4 border-blue-400"
                    />
                </div>
                {anthonyData.map((item, index) => {
                    const itemAngle = (index / anthonyData.length) * 360 + rotation;
                    const radius = 300;
                    const left = 350 + radius * Math.cos(itemAngle * Math.PI / 180) - 60;
                    const top = 350 + radius * Math.sin(itemAngle * Math.PI / 180) - 60;
                    return (
                        <div
                            key={index}
                            className="about-me-item"
                            style={{
                                borderBottom: `6px solid ${item.color}`,
                                left: `${left}px`,
                                top: `${top}px`,
                            }}
                            onMouseEnter={() => setIsMoving(false)}
                            onMouseLeave={() => setIsMoving(true)}
                            onClick={() => handleItemClick(item.path, item.color, item.externalLink)}
                        >
                            <div className="icon-wrapper" style={{ color: item.color }}>
                                <item.Icon />
                            </div>
                            <span className="item-label">{item.label}</span>
                        </div>
                    );
                })}
            </div>
            <style jsx>{`
        .about-me-title {
          position: absolute;
          top: 40px;
          left: 40px;
          font-size: 2.5rem;
          font-weight: bold;
          color: #CE82FF;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
        }

        .about-me-container {
          position: relative;
          width: 700px;
          height: 700px;
        }

        .profile-picture {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 2;
        }

        .about-me-item {
          position: absolute;
          width: 120px;
          height: 120px;
          background: #2B2B2B;
          border-radius: 20px;
          padding: 0.8rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          cursor: pointer;
          box-shadow: 0 8px 16px rgba(0,0,0,0.2);
        }

        .about-me-item:hover {
          transform: scale(1.05);
          box-shadow: 0 12px 24px rgba(0,0,0,0.3);
        }

        .icon-wrapper {
          font-size: 2rem;
          margin-bottom: 0.4rem;
          transition: all 0.3s ease;
        }

        .item-label {
          font-size: 0.9rem;
          font-weight: 700;
          margin-bottom: 0.2rem;
          color: #FFFFFF;
        }
      `}</style>
        </div>
    );
}