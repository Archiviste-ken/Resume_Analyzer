import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface ATSScoreCardProps {
    score: number; // 0-100
    maxScore?: number;
}

const ATSScoreCard: React.FC<ATSScoreCardProps> = ({ score, maxScore = 100 }) => {
    const percentage = Math.min((score / maxScore) * 100, 100);
    
    const getColor = (value: number): string => {
        if (value >= 80) return '#10b981'; // Green
        if (value >= 60) return '#f59e0b'; // Amber
        if (value >= 40) return '#f97316'; // Orange
        return '#ef4444'; // Red
    };

    const getLabel = (value: number): string => {
        if (value >= 80) return 'Excellent';
        if (value >= 60) return 'Good';
        if (value >= 40) return 'Fair';
        return 'Poor';
    };

    const color = getColor(percentage);
    const label = getLabel(percentage);

    return (
        <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">ATS Score</h2>
            
            <div className="w-48 h-48">
                <CircularProgressbar
                    value={percentage}
                    text={`${Math.round(percentage)}`}
                    styles={buildStyles({
                        rotation: 0.25,
                        strokeLinecap: 'round',
                        textSize: '32px',
                        pathTransitionDuration: 0.5,
                        pathColor: color,
                        textColor: color,
                        trailColor: '#e5e7eb',
                    })}
                />
            </div>

            <p className="mt-6 text-lg font-semibold" style={{ color }}>
                {label}
            </p>
            
            <p className="mt-2 text-sm text-gray-600">
                {score} out of {maxScore} points
            </p>
        </div>
    );
};

export default ATSScoreCard;