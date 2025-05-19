
// API service for backend communication

// Backend URL - change this if your backend runs on a different port
const API_BASE_URL = 'https://resume-skill-extractor1.onrender.com/api';

// Check if backend is running
export const checkBackendStatus = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/status`);
    if (!response.ok) {
      throw new Error('Backend server is not responding properly');
    }
    return await response.json();
  } catch (error) {
    console.error('Error checking backend status:', error);
    throw error;
  }
};

// Extract skills from a resume PDF
export const extractSkillsFromResume = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch(`${API_BASE_URL}/extract-skills`, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to extract skills');
    }
    
    const data = await response.json();
    return data.skills;
  } catch (error) {
    console.error('Error extracting skills:', error);
    throw error;
  }
};
