
import PyPDF2
import re
import time

# Mock categories and skills for demonstration purposes
TECHNICAL_SKILLS = [
    "JavaScript", "TypeScript", "React", "Angular", "Vue", "Node.js", "Python", "Java", "C#", "C++",
    "PHP", "Ruby", "Swift", "Kotlin", "Go", "Rust", "HTML", "CSS", "SASS", "LESS",
    "SQL", "NoSQL", "MongoDB", "PostgreSQL", "MySQL", "Redis", "GraphQL", "REST", "SOAP", "API",
    "AWS", "Azure", "GCP", "Docker", "Kubernetes", "CI/CD", "Git", "GitHub", "GitLab", "Bitbucket",
    "Jenkins", "Travis CI", "CircleCI", "Terraform", "Ansible", "Puppet", "Chef", "Selenium", "Jest", "Mocha"
]

SOFT_SKILLS = [
    "Communication", "Teamwork", "Problem Solving", "Critical Thinking", "Leadership", 
    "Adaptability", "Time Management", "Organization", "Creativity", "Emotional Intelligence",
    "Conflict Resolution", "Decision Making", "Negotiation", "Persuasion", "Presentation"
]

INDUSTRY_KNOWLEDGE = [
    "Agile", "Scrum", "Kanban", "Waterfall", "SDLC", "UX/UI Design", "Product Management",
    "Project Management", "Business Analysis", "Data Analysis", "Machine Learning", "AI",
    "Blockchain", "IoT", "Cybersecurity", "SEO", "Digital Marketing", "E-commerce", "Fintech", "Healthtech"
]

def extract_skills_from_pdf(pdf_path):
    """Extract skills from a PDF file."""
    # In a real implementation, this would use NLP or ML techniques to extract skills
    # For this demo, we'll extract text and match against our skill lists
    
    # Extract text from PDF
    text = extract_text_from_pdf(pdf_path)
    
    # Find skills in the text
    skills = find_skills_in_text(text)
    
    # Simulate processing time
    time.sleep(2)
    
    return skills

def extract_text_from_pdf(pdf_path):
    """Extract text content from a PDF file."""
    text = ""
    try:
        with open(pdf_path, 'rb') as file:
            reader = PyPDF2.PdfReader(file)
            for page in reader.pages:
                text += page.extract_text()
    except Exception as e:
        print(f"Error extracting text from PDF: {str(e)}")
    return text

def find_skills_in_text(text):
    """Find skills in the extracted text by matching against known skill lists."""
    skills = []
    text = text.lower()
    
    # Check for technical skills
    for skill in TECHNICAL_SKILLS:
        if re.search(r'\b' + re.escape(skill.lower()) + r'\b', text):
            confidence = calculate_confidence(text, skill.lower())
            skills.append({
                "name": skill,
                "category": "Technical",
                "confidence": confidence
            })
    
    # Check for soft skills
    for skill in SOFT_SKILLS:
        if re.search(r'\b' + re.escape(skill.lower()) + r'\b', text):
            confidence = calculate_confidence(text, skill.lower())
            skills.append({
                "name": skill,
                "category": "Soft Skills",
                "confidence": confidence
            })
    
    # Check for industry knowledge
    for skill in INDUSTRY_KNOWLEDGE:
        if re.search(r'\b' + re.escape(skill.lower()) + r'\b', text):
            confidence = calculate_confidence(text, skill.lower())
            skills.append({
                "name": skill,
                "category": "Industry Knowledge",
                "confidence": confidence
            })
    
    return skills

def calculate_confidence(text, skill):
    """Calculate confidence score based on frequency and context."""
    # This is a simplified calculation for demo purposes
    # In a real implementation, this would use NLP techniques
    
    occurrences = len(re.findall(r'\b' + re.escape(skill) + r'\b', text))
    
    # Base confidence
    base_confidence = 0.7
    
    # Adjust confidence based on occurrences
    occurrence_boost = min(occurrences * 0.05, 0.2)
    
    # Random factor for demo variety (0.0 to 0.1)
    import random
    random_factor = random.uniform(0.0, 0.1)
    
    confidence = base_confidence + occurrence_boost + random_factor
    
    # Ensure confidence is between 0 and 1
    return min(round(confidence, 2), 0.98)
