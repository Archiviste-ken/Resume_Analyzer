interface ATSResult {
    score: number;
    matchedSkills: string[];
    missingSkills: string[];
    matchPercentage: number;
}

export function calculateATSScore(
    resumeSkills: string[],
    jobRole: string,
    requiredSkills: string[]
): ATSResult {
    const normalizedResumeSkills = resumeSkills.map((skill) =>
        skill.toLowerCase().trim()
    );
    const normalizedRequiredSkills = requiredSkills.map((skill) =>
        skill.toLowerCase().trim()
    );

    const matchedSkills = normalizedRequiredSkills.filter((skill) =>
        normalizedResumeSkills.includes(skill)
    );

    const missingSkills = normalizedRequiredSkills.filter(
        (skill) => !normalizedResumeSkills.includes(skill)
    );

    const matchPercentage =
        normalizedRequiredSkills.length > 0
            ? Math.round((matchedSkills.length / normalizedRequiredSkills.length) * 100)
            : 0;

    const score = Math.round(matchPercentage);

    return {
        score,
        matchedSkills,
        missingSkills,
        matchPercentage,
    };
}