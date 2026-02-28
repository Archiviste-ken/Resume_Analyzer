import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json(
                { error: 'No file provided' },
                { status: 400 }
            );
        }

        // Mock parsed resume data
        const mockData = {
            name: 'John Doe',
            email: 'john.doe@example.com',
            phone: '(555) 123-4567',
            summary: 'Experienced software engineer with 5+ years in full-stack development.',
            experience: [
                {
                    position: 'Senior Developer',
                    company: 'Tech Corp',
                    duration: '2021 - Present',
                    description: 'Led development of cloud-based solutions'
                }
            ],
            skills: ['TypeScript', 'React', 'Node.js', 'AWS'],
            education: [
                {
                    degree: 'B.S. Computer Science',
                    school: 'State University',
                    year: '2018'
                }
            ]
        };

        return NextResponse.json(mockData, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to parse resume' },
            { status: 500 }
        );
    }
}