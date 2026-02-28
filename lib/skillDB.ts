interface JobRole {
    title: string;
    requiredSkills: string[];
}

const skillDB: JobRole[] = [
    {
        title: "Frontend Developer",
        requiredSkills: [
            "HTML",
            "CSS",
            "JavaScript",
            "React",
            "TypeScript",
            "Git",
            "REST APIs",
            "Responsive Design"
        ]
    },
    {
        title: "Backend Developer",
        requiredSkills: [
            "Node.js",
            "Python",
            "SQL",
            "Database Design",
            "REST APIs",
            "Git",
            "Authentication",
            "System Design"
        ]
    },
    {
        title: "Data Analyst",
        requiredSkills: [
            "SQL",
            "Python",
            "Data Visualization",
            "Excel",
            "Statistics",
            "Power BI",
            "Tableau",
            "Data Cleaning"
        ]
    }
];

export default skillDB;