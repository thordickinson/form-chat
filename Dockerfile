# Stage 1: Build the React Vite app
FROM node:20-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy the React Vite app files
COPY client-app /app

# Install dependencies and build the app
RUN yarn install
RUN yarn build

# Stage 2: Serve the app with Flask
FROM python:3.9-slim

# Set the working directory for the backend
WORKDIR /app

# Copy the Flask backend files
COPY *.py /app
COPY requirements.txt /app
RUN pip install -r requirements.txt

# Copy the built React files from the first stage
COPY --from=builder /app/dist /app/client-app/dist

# Expose the port the app runs on
EXPOSE 5000

# Set the environment variable to run Flask
ENV FLASK_APP=app.py
ENV OPENAI_API_KEY=unset

# Run the Flask server
CMD ["flask", "run", "--host=0.0.0.0"]


