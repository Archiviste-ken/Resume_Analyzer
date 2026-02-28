import React from 'react';

interface SkillsListProps {
    detectedSkills?: string[];
    missingSkills?: string[];
}

export const SkillsList: React.FC<SkillsListProps> = ({
    detectedSkills = [],
    missingSkills = [],
}) => {
    return (
        <div className="space-y-6">
            {detectedSkills.length > 0 && (
                <div>
                    <h3 className="text-lg font-semibold mb-3">Detected Skills</h3>
                    <div className="flex flex-wrap gap-2">
                        {detectedSkills.map((skill) => (
                            <span
                                key={skill}
                                className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {missingSkills.length > 0 && (
                <div>
                    <h3 className="text-lg font-semibold mb-3">Missing Skills</h3>
                    <div className="flex flex-wrap gap-2">
                        {missingSkills.map((skill) => (
                            <span
                                key={skill}
                                className="px-3 py-1 border-2 border-red-500 text-red-600 rounded-full text-sm font-medium"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};