interface ParsedResume {
    name: string;
    email: string;
    skills: string[];
    education: string[];
    experience: string[];
}

export function parseResume(resumeText: string): ParsedResume {
    // Mock implementation - returns sample parsed data
    return {
        name: "John Doe",
        email: "john.doe@example.com",
        skills: ["TypeScript", "React", "Node.js", "SQL"],
        education: [
            "Bachelor of Science in Computer Science - University of Example (2020)"
        ],
        experience: [
            "Senior Developer at Tech Corp (2021-Present)",
            "Junior Developer at StartUp Inc (2020-2021)"
        ]
    };
}