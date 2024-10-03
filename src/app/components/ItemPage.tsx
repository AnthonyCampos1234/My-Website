import { Nunito } from 'next/font/google';
import { IconType } from 'react-icons';
import { FaArrowLeft } from 'react-icons/fa';

const nunito = Nunito({ subsets: ['latin'] })

interface ItemPageProps {
    Icon: IconType;
    title: string;
    color: string;
    children: React.ReactNode;
    onBackClick?: () => void;
}

export default function ItemPage({ Icon, title, color, children, onBackClick }: ItemPageProps) {
    return (
        <div className={`${nunito.className} min-h-screen bg-[#1E1E1E] text-[#E5E5E5] p-8`}>
            {onBackClick && (
                <button
                    onClick={onBackClick}
                    className="text-[#1CB0F6] hover:underline flex items-center mb-8"
                >
                    <FaArrowLeft className="mr-2" /> Back
                </button>
            )}
            <div
                className="max-w-4xl mx-auto bg-[#2B2B2B] rounded-3xl p-8 shadow-lg"
                style={{ borderBottom: `12px solid ${color}` }}
            >
                <div className="flex items-center mb-6">
                    <div className="text-5xl mr-4" style={{ color }}>
                        <Icon />
                    </div>
                    <h1 className="text-4xl font-bold" style={{ color }}>{title}</h1>
                </div>
                <div className="text-lg">
                    {children}
                </div>
            </div>
        </div>
    );
}