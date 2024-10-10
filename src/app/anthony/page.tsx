"use client";

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { FaBullseye, FaCode, FaEnvelope, FaGithub, FaLaptopCode, FaLinkedin, FaMapMarkerAlt } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";
import { GrDocumentUser } from "react-icons/gr";

const anthonyData = [
    { Icon: FaMapMarkerAlt, label: 'From', color: '#58CC02', path: '/from' },
    { Icon: FaCode, label: 'Skills', color: '#FF9600', path: '/skills' },
    { Icon: FaXTwitter, label: 'X', color: '#1CB0F6', externalLink: 'https://x.com/heyanthonny' },
    { Icon: FaGithub, label: 'Github', color: '#CE82FF', externalLink: 'https://github.com/AnthonyCampos1234' },
    { Icon: FaLinkedin, label: 'LinkedIn', color: '#FF4B4B', externalLink: 'https://www.linkedin.com/in/anthony-campos-8416b6253/' },
    { Icon: GrDocumentUser, label: 'Resume', color: '#1CB0F6', action: 'openResume' },
    { Icon: FaBullseye, label: 'My Goals', color: '#CE82FF', path: '/goals' },
    { Icon: FaLaptopCode, label: 'Projects', color: '#2B70C9', path: '/projects' },
    { Icon: FaEnvelope, label: 'Email', color: '#58CC02', action: 'copyEmail' },
];

export default function Anthony() {
    const [rotation, setRotation] = useState(0);
    const [isMoving, setIsMoving] = useState(true);
    const [isVisible, setIsVisible] = useState(false);
    const [showCopiedMessage, setShowCopiedMessage] = useState(false);
    const router = useRouter();
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIsVisible(true);

        let animationId: number;
        const animate = () => {
            if (isMoving) {
                setRotation(prev => (prev + 0.1) % 360);
            }
            animationId = requestAnimationFrame(animate);
        };
        animationId = requestAnimationFrame(animate);

        let touchStartY = 0;
        let touchEndY = 0;

        const handleTouchStart = (e: TouchEvent) => {
            touchStartY = e.touches[0].clientY;
        };

        const handleTouchMove = (e: TouchEvent) => {
            touchEndY = e.touches[0].clientY;
        };

        const handleTouchEnd = () => {
            const swipeDistance = touchStartY - touchEndY;
            if (swipeDistance > 100) {
                router.push('/');
            }
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener('touchstart', handleTouchStart);
            container.addEventListener('touchmove', handleTouchMove);
            container.addEventListener('touchend', handleTouchEnd);
        }

        return () => {
            cancelAnimationFrame(animationId);
            if (container) {
                container.removeEventListener('touchstart', handleTouchStart);
                container.removeEventListener('touchmove', handleTouchMove);
                container.removeEventListener('touchend', handleTouchEnd);
            }
        };
    }, [isMoving, router]);

    const handleItemClick = (path: string | undefined, externalLink: string | undefined, action: string | undefined) => {
        if (action === 'copyEmail') {
            navigator.clipboard.writeText('anthonyrubencampos@gmail.com').then(() => {
                setShowCopiedMessage(true);
                setTimeout(() => setShowCopiedMessage(false), 2000);
            });
            return;
        }

        if (action === 'openResume') {
            window.open('/AnthonyResume copy.pdf', '_blank');
            return;
        }

        if (externalLink) {
            window.open(externalLink, '_blank');
            return;
        }

        if (path) {
            router.push(path);
        }
    };

    return (
        <div
            ref={containerRef}
            className="min-h-screen flex flex-col items-center justify-center p-4 relative bg-[#1E1E1E] overflow-hidden"
            style={{
                opacity: isVisible ? 1 : 0,
                transition: 'opacity 0.5s ease-in-out'
            }}
        >
            <div className="about-me-container">
                <div className="profile-picture">
                    <Image
                        src="/myface2.png"
                        alt="Anthony's profile picture"
                        width={200}
                        height={200}
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
                                ['--glow-color' as string]: item.color,
                            } as React.CSSProperties}
                            onMouseEnter={() => setIsMoving(false)}
                            onMouseLeave={() => setIsMoving(true)}
                            onClick={() => handleItemClick(item.path, item.externalLink, item.action)}
                        >
                            <div className="icon-wrapper" style={{ color: item.color }}>
                                <item.Icon />
                            </div>
                            <span className="item-label">{item.label}</span>
                        </div>
                    );
                })}
            </div>
            {showCopiedMessage && (
                <div className="copied-message">
                    Email copied to clipboard!
                </div>
            )}
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
                  transform-origin: center center;
                  transform: scale(1);
                  transition: transform 0.3s ease;
                }

                @media (max-width: 768px) {
                  .about-me-container {
                    transform: scale(0.6);
                  }

                  .profile-picture {
                    transform: translate(-50%, -50%) scale(0.9);
                  }

                  .about-me-item {
                    transform: scale(1.0);
                  }

                  .about-me-item:hover {
                    transform: scale(1.25);
                  }
                }

                @media (max-width: 480px) {
                  .about-me-container {
                    transform: scale(0.45);
                  }

                  .profile-picture {
                    transform: translate(-50%, -50%) scale(0.8);
                  }

                  .about-me-item {
                    transform: scale(1.2);
                  }

                  .about-me-item:hover {
                    transform: scale(1.55);
                  }
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
                  animation: glow 1.5s ease-in-out infinite alternate;
                }

                @keyframes glow {
                  from {
                    box-shadow: 0 0 5px var(--glow-color), 0 0 10px var(--glow-color), 0 0 15px var(--glow-color), 0 0 20px var(--glow-color);
                  }
                  to {
                    box-shadow: 0 0 10px var(--glow-color), 0 0 20px var(--glow-color), 0 0 30px var(--glow-color), 0 0 40px var(--glow-color);
                  }

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

                @keyframes toss {
                  0% {
                    transform: translateX(-50%) translateY(120%) rotate(-15deg);
                  }

                  50% {
                    transform: translateX(-25%) translateY(-20vh) rotate(0deg); // Further reduced height from -30vh to -20vh
                  }

                  100% {
                    transform: translateX(0%) translateY(120%) rotate(15deg);
                  }
                }

                #tossed-image {
                  pointer-events: none;
                }

                /* Add this new style */
                .min-h-screen {
                  min-height: 100vh;
                  height: 100vh;
                  overflow-y: auto;
                }

                .copied-message {
                  position: fixed;
                  bottom: 20px;
                  left: 50%;
                  transform: translateX(-50%);
                  background-color: #4CAF50;
                  color: white;
                  padding: 10px 20px;
                  border-radius: 5px;
                  z-index: 1000;
                }
            `}</style>
        </div>
    );
}