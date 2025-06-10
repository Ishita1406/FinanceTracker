FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies
RUN npm install --omit=dev

# Copy ALL backend files
COPY backend/ ./backend/
COPY index.js ./
COPY .env ./

EXPOSE 5000

CMD ["npm", "start"]