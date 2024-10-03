"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaBullseye, FaCheckCircle, FaChevronLeft, FaGithub, FaHourglassHalf, FaPen, FaReact, FaRocket } from 'react-icons/fa';
import ItemPage from '../components/ItemPage';
import '../styles/goals.css';

interface Goal {
    title: string;
    description: string;
    status: 'completed' | 'in-progress' | 'future';
    icon: React.ElementType;
}

export default function Goals() {
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
    const router = useRouter();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleBackClick = () => {
        router.push('/anthony');
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
    ];

    const filteredGoals = selectedStatus
        ? goals.filter(goal => goal.status === selectedStatus)
        : goals;

    return (
        <div className={`goals-container ${isVisible ? 'visible' : ''}`}>
            <div className="playful-back-button" onClick={handleBackClick}>
                <FaChevronLeft />
            </div>
            <ItemPage Icon={FaBullseye} title="My Goals" color="#CE82FF">
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
            <style jsx>{`
                .playful-back-button {
                    position: fixed;
                    top: 20px;
                    left: 20px;
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    background-color: #CE82FF;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    z-index: 1000;
                }

                .playful-back-button:hover {
                    transform: scale(1.1);
                    box-shadow: 0 0 15px rgba(206, 130, 255, 0.5);
                }

                .playful-back-button :global(svg) {
                    color: white;
                    font-size: 24px;
                }
            `}</style>
        </div>
    );
}
