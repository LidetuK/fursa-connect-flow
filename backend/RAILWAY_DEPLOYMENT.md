# Railway Deployment Guide

## Environment Variables Required

Set these environment variables in your Railway project:

### Database Configuration
```
DB_HOST=your-postgres-host
DB_PORT=5432
DB_USERNAME=your-postgres-username
DB_PASSWORD=your-postgres-password
DB_NAME=your-database-name
```

### JWT Configuration
```
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d
```

### Server Configuration
```
PORT=3001
NODE_ENV=production
```

### CORS Origins
```
CORS_ORIGINS=https://your-frontend-domain.com
```

## Deployment Steps

1. **Connect your GitHub repository to Railway**
2. **Add a PostgreSQL database** in Railway
3. **Set the environment variables** listed above
4. **Deploy the backend** - Railway will automatically build and deploy

## Health Check

The backend includes a health check endpoint at `/api/health` that Railway will use to verify the service is running.

## Database Setup

Railway will automatically provide PostgreSQL connection details. Make sure to:
1. Add the PostgreSQL service to your Railway project
2. Set the database environment variables to match Railway's PostgreSQL service
3. The database will be automatically created on first run

## Build Process

Railway will:
1. Install dependencies with `npm install`
2. Build the application with `npm run build`
3. Start the application with `npm run start:prod`
