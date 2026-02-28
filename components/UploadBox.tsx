import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface UploadedFile {
    name: string;
    size: number;
    type: string;
}

export const UploadBox: React.FC = () => {
    const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
    const [progress, setProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);

    const onDrop = (acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            setIsUploading(true);
            setProgress(0);

            // Simulate upload progress
            const interval = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        setIsUploading(false);
                        return 100;
                    }
                    return prev + 10;
                });
            }, 200);

            // Set uploaded file info
            setUploadedFile({
                name: file.name,
                size: file.size,
                type: file.type,
            });
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/pdf': ['.pdf'],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [
                '.docx',
            ],
        },
    });

    return (
        <div className="w-full max-w-md mx-auto p-6">
            <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 cursor-pointer ${
                    isDragActive
                        ? 'border-blue-500 bg-blue-50 scale-105'
                        : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                }`}
            >
                <input {...getInputProps()} />
                <div className="space-y-2">
                    <svg
                        className="w-12 h-12 mx-auto text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3v-6"
                        />
                    </svg>
                    <p className="text-gray-700 font-medium">
                        {isDragActive ? 'Drop files here' : 'Drag and drop your resume'}
                    </p>
                    <p className="text-sm text-gray-500">PDF or DOCX files only</p>
                </div>
            </div>

            {isUploading && (
                <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{progress}% uploaded</p>
                </div>
            )}

            {uploadedFile && !isUploading && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm font-medium text-green-800">✓ File uploaded</p>
                    <p className="text-xs text-green-700 mt-1">{uploadedFile.name}</p>
                    <p className="text-xs text-gray-600 mt-1">
                        {(uploadedFile.size / 1024).toFixed(2)} KB
                    </p>
                </div>
            )}
        </div>
    );
};