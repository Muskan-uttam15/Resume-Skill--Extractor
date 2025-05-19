
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import json
import time
from pdf_processor import extract_skills_from_pdf
import tempfile

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/api/status', methods=['GET'])
def check_status():
    """Check if the backend is running."""
    return jsonify({"status": "connected", "message": "Python backend is running"})

@app.route('/api/extract-skills', methods=['POST'])
def extract_skills():
    """Extract skills from uploaded PDF."""
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    
    if file and file.filename.endswith('.pdf'):
        # Save the file temporarily
        temp_path = os.path.join(tempfile.gettempdir(), file.filename)
        file.save(temp_path)
        
        try:
            # Extract skills from the PDF
            skills = extract_skills_from_pdf(temp_path)
            
            # Clean up
            if os.path.exists(temp_path):
                os.remove(temp_path)
            
            return jsonify({"skills": skills})
        except Exception as e:
            if os.path.exists(temp_path):
                os.remove(temp_path)
            return jsonify({"error": str(e)}), 500
    else:
        return jsonify({"error": "Invalid file format. Please upload a PDF."}), 400

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
