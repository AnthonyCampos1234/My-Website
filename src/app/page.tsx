"use client";

import dynamic from 'next/dynamic';
import { Nunito } from 'next/font/google';
import { useEffect, useState } from 'react';

const Anthony = dynamic(() => import('./anthony/page'), { ssr: false });

const nunito = Nunito({ subsets: ['latin'] })

export default function RootPage() {
  const [showIntro, setShowIntro] = useState(true);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showSkipButton, setShowSkipButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showIntro || !isLoaded) return;

    const timer = setTimeout(() => {
      if (currentTextIndex < texts.length - 1) {
        setCurrentTextIndex(currentTextIndex + 1);
      } else {
        setFadeOut(true);
        setTimeout(() => setShowIntro(false), 1000);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [showIntro, currentTextIndex, isLoaded]);

  useEffect(() => {
    if (showIntro && isLoaded) {
      const timer = setTimeout(() => {
        setShowSkipButton(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [showIntro, isLoaded]);

  const handleSkip = () => {
    setFadeOut(true);
    setCurrentTextIndex(texts.length - 1);
    setTimeout(() => {
      setShowIntro(false);
      setShowSkipButton(false);
    }, 1000);
  };

  const texts = [
    "Failed Startups",
    "Market Insights Gained",
    "Failed Code",
    "Bugs Fixed & Skills Sharpened",
    "Failed Tests",
    "Study Strategies Refined",
    "Failures Transformed into\nStepping Stones"
  ];

  return (
    <div className={`${nunito.className} page-container`}>
      {isLoaded && (
        <>
          <div className={`intro-animation ${fadeOut ? 'fade-out' : ''} ${!showIntro ? 'hidden' : ''}`}>
            <div className="content">
              <h1 className="name">
                {"Anthony Campos".split('').map((char, index) => (
                  <span key={index} style={{ animationDelay: `${index * 0.1}s` }}>{char === ' ' ? '\u00A0' : char}</span>
                ))}
              </h1>
              <div className="skill-container">
                {texts.map((text, index) => (
                  <p
                    key={text}
                    className={`skill ${index === currentTextIndex ? 'active' : ''}`}
                  >
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
          {showSkipButton && showIntro && (
            <button className="skip-button" onClick={handleSkip}>
              Skip
            </button>
          )}
          <div className={`main-content ${!showIntro ? 'fade-in' : ''}`}>
            <Anthony />
          </div>
        </>
      )}
      <style jsx>{`
        .page-container {
          min-height: 100vh;
          height: 100vh;
          overflow-y: auto;
          position: relative;
          background-color: #1E1E1E;
        }
        .intro-animation {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          opacity: 1;
          transition: opacity 1s ease-out;
          z-index: 5;
        }
        .intro-animation.fade-out {
          opacity: 0;
        }
        .intro-animation.hidden {
          display: none;
        }
        .main-content {
          opacity: 0;
          transition: opacity 1s ease-in;
        }
        .main-content.fade-in {
          opacity: 1;
        }
        .content {
          text-align: center;
          color: #FFFFFF;
          padding: 1rem;
          width: 90%;
          max-width: 600px;
        }
        .name {
          font-size: 2rem;
          margin-bottom: 1rem;
          font-weight: 300;
        }
        @media (min-width: 768px) {
          .name {
            font-size: 4rem;
          }
        }
        .name span {
          display: inline-block;
          opacity: 0;
          transform: translateY(1em);
          animation: revealChar 0.5s forwards;
        }
        .skill-container {
          height: 4rem;
          position: relative;
          overflow: hidden;
        }
        @media (min-width: 768px) {
          .skill-container {
            height: 5rem;
          }
        }
        .skill {
          font-size: 1rem;
          line-height: 1.2;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.5s ease;
          color: #CE82FF;
          white-space: pre-line;
          display: flex;
          flex-direction: column;
          justify-content: center;
          height: 100%;
        }
        @media (min-width: 768px) {
          .skill {
            font-size: 1.6rem;
          }
        }
        .skill.active {
          opacity: 1;
          transform: translateY(0);
        }
        .skip-button {
          position: absolute;
          bottom: 20px;
          right: 20px;
          background-color: rgba(255, 255, 255, 0.2);
          color: #FFFFFF;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          transition: background-color 0.3s ease;
          z-index: 10;
        }
        .skip-button:hover {
          background-color: rgba(255, 255, 255, 0.3);
        }
        @keyframes revealChar {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}