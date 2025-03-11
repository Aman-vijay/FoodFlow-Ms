FROM node:23-alpine

# Set working directory
WORKDIR /app

# Copy only package files first (leverages Docker cache)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source code including .env
COPY . .

ENV PORT=5003

# Expose port your service runs on
EXPOSE 5003

# Start the service
CMD ["npm", "start"]
