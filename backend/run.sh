
#!/bin/bash
echo "Installing Python dependencies..."
pip install -r requirements.txt

echo "Starting Flask backend..."
python app.py
