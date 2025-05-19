
import React from 'react';
import { Card } from '@/components/ui/card';

interface Skill {
  name: string;
  category: string;
  confidence: number;
}

interface SkillsListProps {
  skills: Skill[];
}

const SkillsList = ({ skills }: SkillsListProps) => {
  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const categories = Object.keys(groupedSkills).sort();

  // Function to get background color based on confidence
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'bg-green-100 text-green-800';
    if (confidence >= 0.5) return 'bg-blue-100 text-blue-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-gray-800">Extracted Skills</h3>
        <span className="text-sm text-gray-500">{skills.length} skills found</span>
      </div>
      
      {categories.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
  <p className="text-sm">🧐 No skills found yet. Upload a resume to get started!</p>
</div>
      ) : (
        <div className="space-y-6">
          {categories.map((category) => (
            <div key={category}>
              <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">
                {category}
              </h4>
              <div className="flex flex-wrap gap-2">
                {groupedSkills[category].map((skill, index) => (
                  <span 
                    key={index}
                   className={`inline-flex items-center px-3 py-1 rounded-full text-sm shadow-sm font-medium ${getConfidenceColor(skill.confidence)}`}

                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default SkillsList;
