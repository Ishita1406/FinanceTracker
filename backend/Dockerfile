FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm install --omit=dev

# Copy all backend source code
COPY . .

# Expose the port your app runs on
EXPOSE 5000

# Start the server
CMD ["node", "index.js"]
