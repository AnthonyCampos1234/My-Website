"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaBriefcase, FaBullseye, FaCheckCircle, FaChevronLeft, FaGithub, FaGraduationCap, FaHourglassHalf, FaLanguage, FaRobot, FaRocket, FaShoppingCart, FaStickyNote, FaTrophy } from 'react-icons/fa';
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
            title: "Integrate LLMs with Police Body Cams",
            description: "Develop an AI system using Large Language Models to analyze body cam footage in real-time, alerting backup when needed without officer intervention.",
            status: "in-progress",
            icon: FaRobot
        },
        {
            title: "Revolutionize E-commerce with Bulk Selling",
            description: "Create a universal bulk selling solution for all e-commerce platforms, enhancing efficiency for both sellers and buyers.",
            status: "future",
            icon: FaShoppingCart
        },
        {
            title: "Expand Avisari Adoption in Schools",
            description: "Continue promoting and improving Avisari to facilitate better connections between advisors and students in educational institutions.",
            status: "in-progress",
            icon: FaGraduationCap
        },
        {
            title: "EduConnect Hackathon Success",
            description: "Achieved finalist status in the hackathon with the EduConnect project, aiming to improve educational connectivity.",
            status: "completed",
            icon: FaTrophy
        },
        {
            title: "Enhance GitHub Portfolio",
            description: "Continuously improve and add new projects to my GitHub portfolio at github.com/AnthonyCampos1234.",
            status: "in-progress",
            icon: FaGithub
        },
        {
            title: "Secure Duolingo SWE Internship",
            description: "Successfully obtain a Software Engineering Internship at Duolingo through their Thrive program.",
            status: "in-progress",
            icon: FaLanguage
        },
        {
            title: "Full-time Position at Duolingo",
            description: "Work towards securing a full-time Software Engineering position at Duolingo after completing the internship.",
            status: "future",
            icon: FaBriefcase
        },
        {
            title: "Develop Nota Project",
            description: "Successfully created Nota, a note-taking application with advanced features, showcasing full-stack development skills.",
            status: "completed",
            icon: FaStickyNote
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
                .goals-container {
                    width: 100%;
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 20px;
                    opacity: 0;
                    transition: opacity 0.5s ease-in-out;
                }

                .goals-container.visible {
                    opacity: 1;
                }

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

                @media (max-width: 768px) {
                    .goals-container {
                        padding: 10px;
                    }

                    .playful-back-button {
                        width: 40px;
                        height: 40px;
                    }

                    .playful-back-button :global(svg) {
                        font-size: 20px;
                    }
                }

                @media (max-width: 480px) {
                    .goals-container {
                        padding: 5px;
                    }

                    .playful-back-button {
                        width: 30px;
                        height: 30px;
                    }

                    .playful-back-button :global(svg) {
                        font-size: 16px;
                    }
                }
            `}</style>
        </div>
    );
}
