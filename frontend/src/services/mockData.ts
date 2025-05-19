
export const mockSkills = [
  // Technical Skills
  { name: 'React', category: 'Technical', confidence: 0.98 },
  { name: 'JavaScript', category: 'Technical', confidence: 0.95 },
  { name: 'TypeScript', category: 'Technical', confidence: 0.92 },
  { name: 'HTML/CSS', category: 'Technical', confidence: 0.90 },
  { name: 'Node.js', category: 'Technical', confidence: 0.85 },
  { name: 'Python', category: 'Technical', confidence: 0.82 },
  { name: 'Git', category: 'Technical', confidence: 0.80 },
  { name: 'Redux', category: 'Technical', confidence: 0.78 },
  { name: 'REST APIs', category: 'Technical', confidence: 0.75 },
  { name: 'SQL', category: 'Technical', confidence: 0.70 },
  { name: 'MongoDB', category: 'Technical', confidence: 0.68 },
  { name: 'AWS', category: 'Technical', confidence: 0.65 },
  { name: 'Docker', category: 'Technical', confidence: 0.62 },
  
  // Soft Skills
  { name: 'Communication', category: 'Soft Skills', confidence: 0.90 },
  { name: 'Problem Solving', category: 'Soft Skills', confidence: 0.88 },
  { name: 'Teamwork', category: 'Soft Skills', confidence: 0.85 },
  { name: 'Time Management', category: 'Soft Skills', confidence: 0.82 },
  { name: 'Leadership', category: 'Soft Skills', confidence: 0.78 },
  { name: 'Adaptability', category: 'Soft Skills', confidence: 0.75 },
  { name: 'Critical Thinking', category: 'Soft Skills', confidence: 0.72 },
  
  // Industry Knowledge
  { name: 'Agile Methodology', category: 'Industry Knowledge', confidence: 0.85 },
  { name: 'SDLC', category: 'Industry Knowledge', confidence: 0.80 },
  { name: 'CI/CD', category: 'Industry Knowledge', confidence: 0.75 },
  { name: 'TDD', category: 'Industry Knowledge', confidence: 0.70 },
  { name: 'UX/UI Design', category: 'Industry Knowledge', confidence: 0.68 },
  { name: 'JIRA', category: 'Industry Knowledge', confidence: 0.65 },
];

export function simulateBackendProcess() {
  return new Promise<typeof mockSkills>(resolve => {
    // Simulate backend processing time
    setTimeout(() => {
      resolve(mockSkills);
    }, 3500);
  });
}
