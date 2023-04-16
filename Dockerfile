# Base image
FROM python:3.9-slim-buster

# Set the working directory
WORKDIR /app

# Copy the requirements file
COPY requirements.txt .

# Install dependencies
RUN pip install -r requirements.txt

# Install brown dataset so no internet connection is needed when running container
RUN python -m nltk.downloader brown

# Copy the app files
COPY src/ .

# Set environment variables
ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0

# Expose the port
EXPOSE 5000

# Start the app
CMD ["flask", "run"]
