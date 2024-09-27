"use client";

import { useEffect, useState } from 'react';
import ItemPage from '../components/ItemPage';
import { FaBullseye, FaCheckCircle, FaHourglassHalf, FaRocket, FaReact, FaGithub, FaPen } from 'react-icons/fa';
import { useRouter, useSearchParams } from 'next/navigation';
import '../styles/goals.css';

interface Goal {
    title: string;
    description: string;
    status: 'completed' | 'in-progress' | 'future';
    icon: React.ElementType;
}

export default function Goals() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isVisible, setIsVisible] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

    useEffect(() => {
        const transition = searchParams.get('transition');
        if (transition === 'true') {
            setTimeout(() => {
                setIsVisible(true);
                router.replace('/goals');
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
        overlay.style.backgroundColor = '#CE82FF';
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

    const goals: Goal[] = [
        {
            title: "Master React and Next.js",
            description: "Deepen understanding of React hooks, server-side rendering, and Next.js 13 features.",
            status: "in-progress",
            icon: FaReact
        },
        {
            title: "Contribute to Open Source",
            description: "Make meaningful contributions to at least 3 open-source projects in the next 6 months.",
            status: "future",
            icon: FaGithub
        },
        {
            title: "Launch Personal Blog",
            description: "Create and launch a tech blog to share knowledge and experiences in web development.",
            status: "completed",
            icon: FaPen
        },
        // Add more goals as needed
    ];

    const filteredGoals = selectedStatus
        ? goals.filter(goal => goal.status === selectedStatus)
        : goals;

    return (
        <div className={`goals-container ${isVisible ? 'visible' : ''}`}>
            <ItemPage Icon={FaBullseye} title="My Goals" color="#CE82FF" onBackClick={handleBackClick}>
                <div className="goals-filter">
                    <button
                        className={`filter-button ${selectedStatus === null ? 'active' : ''}`}
                        onClick={() => setSelectedStatus(null)}
                    >
                        All
                    </button>
                    <button
                        className={`filter-button ${selectedStatus === 'completed' ? 'active' : ''}`}
                        onClick={() => setSelectedStatus('completed')}
                    >
                        Completed
                    </button>
                    <button
                        className={`filter-button ${selectedStatus === 'in-progress' ? 'active' : ''}`}
                        onClick={() => setSelectedStatus('in-progress')}
                    >
                        In Progress
                    </button>
                    <button
                        className={`filter-button ${selectedStatus === 'future' ? 'active' : ''}`}
                        onClick={() => setSelectedStatus('future')}
                    >
                        Future
                    </button>
                </div>
                <div className="goals-list">
                    {filteredGoals.map((goal, index) => (
                        <div key={index} className={`goal-item ${goal.status}`}>
                            <div className="goal-icon">
                                <goal.icon />
                            </div>
                            <div className="goal-content">
                                <h3>{goal.title}</h3>
                                <p>{goal.description}</p>
                            </div>
                            <div className="goal-status">
                                {goal.status === 'completed' && <FaCheckCircle />}
                                {goal.status === 'in-progress' && <FaHourglassHalf />}
                                {goal.status === 'future' && <FaRocket />}
                            </div>
                        </div>
                    ))}
                </div>
            </ItemPage>
        </div>
    );
}
