import React from 'react';
import { Lightbulb, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react';

interface Suggestion {
    id: string;
    title: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
}

interface SuggestionsProps {
    suggestions?: Suggestion[];
}

const Suggestions: React.FC<SuggestionsProps> = ({
    suggestions = [
        {
            id: '1',
            title: 'Add quantifiable achievements',
            description: 'Include metrics and numbers to demonstrate impact',
            priority: 'high',
        },
        {
            id: '2',
            title: 'Use action verbs',
            description: 'Start bullet points with strong action words like "Led", "Designed", "Implemented"',
            priority: 'high',
        },
        {
            id: '3',
            title: 'Tailor keywords',
            description: 'Include industry-specific keywords relevant to the job description',
            priority: 'medium',
        },
        {
            id: '4',
            title: 'Improve formatting',
            description: 'Ensure consistent spacing and font sizes for better readability',
            priority: 'low',
        },
    ],
}) => {
    const getPriorityIcon = (priority: string) => {
        switch (priority) {
            case 'high':
                return <AlertCircle className="w-5 h-5 text-red-500" />;
            case 'medium':
                return <TrendingUp className="w-5 h-5 text-yellow-500" />;
            case 'low':
                return <CheckCircle className="w-5 h-5 text-green-500" />;
            default:
                return <Lightbulb className="w-5 h-5 text-blue-500" />;
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-800">Improvement Tips</h2>
            </div>

            <ul className="space-y-4">
                {suggestions.map((suggestion) => (
                    <li key={suggestion.id} className="flex gap-3 items-start">
                        <div className="mt-1 flex-shrink-0">
                            {getPriorityIcon(suggestion.priority)}
                        </div>
                        <div className="flex-1">
                            <p className="font-medium text-gray-800">{suggestion.title}</p>
                            <p className="text-sm text-gray-600 mt-1">{suggestion.description}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Suggestions;