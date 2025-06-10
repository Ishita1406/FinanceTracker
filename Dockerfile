FROM node:18-alpine

# Create app directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (production only)
RUN npm install --omit=dev

# Copy app source code
COPY index.js ./

EXPOSE 5000

CMD ["node", "index.js"]