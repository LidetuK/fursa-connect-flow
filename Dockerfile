# Use Node.js 18 with npm
FROM node:18-alpine

# Set environment variables to force npm usage
ENV NIXPACKS_NODE_PACKAGE_MANAGER=npm
ENV NPM_CONFIG_PACKAGE_MANAGER=npm

# Set working directory to backend
WORKDIR /app/backend

# Copy package files from backend
COPY backend/package*.json ./
COPY backend/.npmrc ./

# Install dependencies with npm (explicitly avoid bun)
RUN npm ci --only=production --prefer-offline --no-audit

# Copy backend source code
COPY backend/ ./

# Build the application
RUN npm run build

# Expose port
EXPOSE 3001

# Start the application
CMD ["npm", "run", "start:prod"]
