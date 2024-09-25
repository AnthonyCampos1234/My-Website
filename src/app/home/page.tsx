import { Nunito } from 'next/font/google'
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { FaChevronDown } from 'react-icons/fa';

const nunito = Nunito({ subsets: ['latin'] })

const slogans = [
    "I'm not antisocial, I'm selectively social. Very f*cking selective.",
    "I put the 'pro' in procrastination. And the 'crap' in crapstination.",
    "I'm not lazy, I'm on energy-saving mode. Saving it for what? Hell if I know.",
    "I'm a morning person. If morning starts after my third damn coffee.",
    "I'm great at multitasking. I can waste time, be unproductive, and scroll TikTok all at once!",
    "I don't need Google, my wife knows everything. Sh*t, did I say that out loud?",
    "I'm not short, I'm just concentrated awesome. With a dash of 'can't reach the top shelf'.",
    "I'm fluent in sarcasm and profanity. It's a real f*cking gift.",
    "I'm not arguing, I'm just explaining why I'm right. Again. For the billionth goddamn time.",
];

export default function Home({ onScrollDown }: { onScrollDown: () => void }) {
    const [isVisible, setIsVisible] = useState(false);
    const [sloganIndex, setSloganIndex] = useState(0);
    const [currentSloganIndex, setCurrentSloganIndex] = useState(0);

    const fullSlogan = slogans[currentSloganIndex];

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (isVisible && sloganIndex < fullSlogan.length) {
            const typingInterval = setInterval(() => {
                setSloganIndex(prevIndex => {
                    if (prevIndex < fullSlogan.length) {
                        return prevIndex + 1;
                    }
                    clearInterval(typingInterval);
                    return prevIndex;
                });
            }, 50);

            return () => clearInterval(typingInterval);
        } else if (sloganIndex === fullSlogan.length) {
            const nextSloganTimer = setTimeout(() => {
                setCurrentSloganIndex((prevIndex) => (prevIndex + 1) % slogans.length);
                setSloganIndex(0);
            }, 3000);

            return () => clearTimeout(nextSloganTimer);
        }
    }, [isVisible, sloganIndex, fullSlogan]);

    const sloganText = fullSlogan.slice(0, sloganIndex);
    const isTyping = sloganIndex < fullSlogan.length;
    const showCursor = isVisible && (isTyping || sloganIndex === fullSlogan.length);
    const showGradient = isVisible && isTyping;

    return (
        <div className={`${nunito.className} min-h-screen flex flex-col items-center justify-center p-8 relative bg-[#1E1E1E]`}>
            <div className="flex items-center space-x-24 md:space-x-32 lg:space-x-40">
                <div className="flex flex-col items-start text-container">
                    <h1 className="name-title">
                        Anthony Campos
                    </h1>
                    <p className="slogan-text">
                        {sloganText}
                        {showCursor && (
                            <span className="cursor-container">
                                {showGradient && <span className="gradient-effect"></span>}<span className={`cursor ${!isTyping ? 'blink' : ''}`}>|</span>
                            </span>
                        )}
                    </p>
                </div>
                <Image
                    src="/CartoonBoyGlassesHoodie.jpg"
                    alt="Cartoon boy with glasses and hoodie"
                    width={250}
                    height={250}
                    className="rounded-full profile-image"
                />
            </div>

            <div className="scroll-indicator-container" onClick={onScrollDown}>
                <span className="scroll-text">Scroll to explore</span>
                <FaChevronDown className="chevron-icon" />
            </div>

            <style jsx>{`
                .name-title {
                    font-size: 3rem;
                    font-weight: bold;
                    color: #FFFFFF;
                    text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
                }

                .slogan-text {
                    font-size: 1.25rem;
                    color: #AFAFAF;
                    word-wrap: break-word;
                    overflow-wrap: break-word;
                }

                .profile-image {
                    border: 4px solid #1CB0F6;
                    box-shadow: 0 8px 16px rgba(0,0,0,0.3);
                }

                .scroll-indicator-container {
                    position: absolute;
                    bottom: 40px;
                    left: 50%;
                    transform: translateX(-50%);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    color: #1CB0F6;
                    cursor: pointer;
                }

                .scroll-text {
                    font-size: 1rem;
                    margin-bottom: 8px;
                }

                .chevron-icon {
                    font-size: 2rem;
                    animation: bounce 2s infinite;
                }

                @keyframes bounce {
                    0%, 20%, 50%, 80%, 100% {
                        transform: translateY(0);
                    }
                    40% {
                        transform: translateY(-10px);
                    }
                    60% {
                        transform: translateY(-5px);
                    }
                }

                @keyframes blink {
                    0% { opacity: 1; }
                    50% { opacity: 0; }
                    100% { opacity: 1; }
                }

                .blink {
                    animation: blink 1s infinite;
                }

                .cursor-container {
                    position: relative;
                    display: inline-block;
                }

                .gradient-effect {
                    position: absolute;
                    top: -2px;
                    left: -4px;
                    bottom: -2px;
                    width: 8px;
                    background: linear-gradient(to right, transparent, #1CB0F6, #CE82FF, #FF4B4B);
                    filter: blur(3px);
                    opacity: 0.7;
                    animation: flicker 2s infinite alternate;
                    border-radius: 50%;
                    transform: skew(-5deg);
                    transition: opacity 0.3s ease-out;
                }

                @keyframes flicker {
                    0%, 100% { opacity: 0.7; width: 8px; }
                    25% { opacity: 0.8; width: 10px; }
                    50% { opacity: 0.6; width: 6px; }
                    75% { opacity: 0.9; width: 12px; }
                }

                .cursor {
                    position: relative;
                    z-index: 1;
                }

                .text-container {
                    width: 600px;
                    max-width: 100%;
                }
            `}</style>
        </div>
    );
}