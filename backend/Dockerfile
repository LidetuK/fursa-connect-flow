# Use Node.js 18 with npm
FROM node:18-alpine

# Set environment variables to force npm usage
ENV NIXPACKS_NODE_PACKAGE_MANAGER=npm
ENV NPM_CONFIG_PACKAGE_MANAGER=npm

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY .npmrc ./

# Install dependencies with npm (explicitly avoid bun)
RUN npm ci --only=production --prefer-offline --no-audit

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose port
EXPOSE 3001

# Start the application
CMD ["npm", "run", "start:prod"]
