# Use an official Node.js runtime as the base image
FROM node:23-slim

# Install curl using apt-get
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*


# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Start the app using a lightweight HTTP server
RUN npm install -g serve
CMD ["serve", "-s", "dist", "-l", "3000"]