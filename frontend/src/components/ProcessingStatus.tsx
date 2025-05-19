
import React from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface ProcessingStatusProps {
  currentStep: number;
}

const ProcessingStatus = ({ currentStep }: ProcessingStatusProps) => {
  const steps = [
    { id: 1, name: 'Uploading File', description: 'Sending your resume to our server' },
    { id: 2, name: 'Extracting Text', description: 'Reading and parsing your PDF content' },
    { id: 3, name: 'Analyzing Skills', description: 'Identifying key skills in your resume' },
    { id: 4, name: 'Finalizing Results', description: 'Organizing and preparing your results' },
  ];

  const progress = (currentStep / steps.length) * 100;

  return (
    <Card className="p-6">
      <h3 className="text-lg font-medium text-gray-800 mb-4">Processing Your Resume</h3>
      <Progress value={progress} className="h-2 mb-6" />

      <div className="space-y-4">
        {steps.map((step) => (
          <div key={step.id} className="flex items-start">
            <div 
              className={`flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center ${
                step.id < currentStep 
                  ? 'bg-green-500' 
                  : step.id === currentStep 
                    ? 'bg-resume-primary animate-pulse-slow' 
                    : 'bg-gray-200'
              }`}
            >
              {step.id < currentStep ? (
                <svg className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <span className="text-xs text-white">{step.id}</span>
              )}
            </div>
            <div className="ml-3">
              <p className={`text-sm font-medium ${step.id <= currentStep ? 'text-gray-900' : 'text-gray-400'}`}>
                {step.name}
              </p>
              <p className={`text-xs ${step.id <= currentStep ? 'text-gray-500' : 'text-gray-300'}`}>
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ProcessingStatus;
