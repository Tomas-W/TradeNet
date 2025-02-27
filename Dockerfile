# Use Python 3.11 slim image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    python3-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements file first for better caching
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Set environment variables
ENV PYTHONUNBUFFERED=1
ENV FLASK_ENV=production
ENV PORT=8080

# Expose the port
EXPOSE 8080

# Command to run the application - using array format for CMD
CMD ["gunicorn", "run:app", \
     "--bind=0.0.0.0:8080", \
     "--workers=2", \
     "--timeout=120", \
     "--worker-tmp-dir=/dev/shm", \
     "--worker-class=gthread", \
     "--threads=2", \
     "--worker-connections=1000", \
     "--keep-alive=5", \
     "--access-logfile=-", \
     "--error-logfile=-"] 