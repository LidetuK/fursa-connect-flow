# 🚀 Supabase to NestJS Migration Guide

## 📋 Overview

This guide will help you migrate from Supabase to a NestJS backend with real WhatsApp Web integration using `whatsapp-web.js`.

## 🎯 Why Migrate?

- ✅ **Real WhatsApp Web QR codes** - No more "Invalid QR code" errors
- ✅ **Full Node.js support** - Use `whatsapp-web.js` without limitations
- ✅ **Better performance** - Direct database connections
- ✅ **More control** - Custom authentication and business logic
- ✅ **Scalability** - Microservices architecture ready

## 🏗️ Architecture Changes

### Before (Supabase):
```
Frontend → Supabase Edge Functions → Supabase Database
```

### After (NestJS):
```
Frontend → NestJS Backend → PostgreSQL Database
                ↓
         WhatsApp Web (whatsapp-web.js)
```

## 📁 New Project Structure

```
fursa-connect-flow/
├── frontend/                 # React frontend (existing)
│   ├── src/
│   │   ├── lib/
│   │   │   └── api-client.ts # New API client
│   │   └── ...
├── backend/                  # New NestJS backend
│   ├── src/
│   │   ├── auth/            # Authentication
│   │   ├── users/           # User management
│   │   ├── whatsapp/        # WhatsApp integration
│   │   ├── conversations/   # Chat management
│   │   ├── messages/        # Message handling
│   │   └── integrations/    # Business integrations
│   ├── package.json
│   └── .env
└── database/                # Database migrations
```

## 🔧 Setup Instructions

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start development server
npm run start:dev
```

### 2. Database Setup

```bash
# Install PostgreSQL (if not already installed)
# Create database
createdb fursa_connect

# Update .env with database credentials
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=fursa_connect
```

### 3. Frontend Updates

```bash
# Navigate to frontend directory
cd frontend

# Update API URL in .env
NEXT_PUBLIC_API_URL=http://localhost:3001/api

# Start frontend
npm run dev
```

## 🔄 Migration Steps

### Step 1: Database Migration

1. **Export Supabase data** (if needed):
```sql
-- Export users
SELECT * FROM auth.users;

-- Export conversations
SELECT * FROM conversations;

-- Export messages
SELECT * FROM whatsapp_messages;

-- Export integrations
SELECT * FROM whatsapp_integrations;
```

2. **Import to PostgreSQL**:
```bash
# Use pg_dump/pg_restore or manual SQL
psql -d fursa_connect -f migration.sql
```

### Step 2: Authentication Migration

**Old (Supabase Auth):**
```typescript
import { supabase } from '@/integrations/supabase/client';

const { data, error } = await supabase.auth.signInWithPassword({
  email,
  password,
});
```

**New (NestJS Auth):**
```typescript
import { apiClient } from '@/lib/api-client';

const { access_token, user } = await apiClient.login(email, password);
```

### Step 3: WhatsApp Integration Migration

**Old (Supabase Edge Functions):**
```typescript
const { data, error } = await supabase.functions.invoke('whatsapp-web-api', {
  body: { action: 'connect' }
});
```

**New (NestJS Backend):**
```typescript
const { data, error } = await apiClient.connectWhatsApp();
```

### Step 4: Database Operations Migration

**Old (Supabase Client):**
```typescript
const { data, error } = await supabase
  .from('conversations')
  .select('*')
  .order('last_message_at', { ascending: false });
```

**New (NestJS API):**
```typescript
const conversations = await apiClient.getConversations();
```

## 🔐 Environment Variables

### Backend (.env)
```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=fursa_connect

# JWT
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d

# WhatsApp
WHATSAPP_SESSION_PATH=./sessions

# External APIs
N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
DIALOG360_API_KEY=your_dialog360_key
```

### Frontend (.env)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

## 🚀 Key Features

### 1. Real WhatsApp Web Integration
- ✅ Generate real, scannable QR codes
- ✅ Send/receive messages
- ✅ Handle multiple sessions
- ✅ Real-time status updates

### 2. Authentication System
- ✅ JWT-based authentication
- ✅ User registration/login
- ✅ Password hashing with bcrypt
- ✅ Session management

### 3. Database Management
- ✅ TypeORM for database operations
- ✅ PostgreSQL for data storage
- ✅ Automatic migrations
- ✅ Relationship management

### 4. Real-time Features
- ✅ WebSocket connections
- ✅ Live message updates
- ✅ Connection status monitoring

## 🧪 Testing

### Backend Testing
```bash
# Run unit tests
npm run test

# Run e2e tests
npm run test:e2e

# Test WhatsApp integration
npm run test:whatsapp
```

### Frontend Testing
```bash
# Test API integration
npm run test:api

# Test WhatsApp Web UI
npm run test:whatsapp-ui
```

## 📊 Performance Benefits

- **Faster API calls** - Direct database connections
- **Real-time messaging** - WebSocket support
- **Better error handling** - Custom error responses
- **Scalable architecture** - Microservices ready

## 🔧 Troubleshooting

### Common Issues

1. **QR Code not showing**
   - Check Puppeteer installation
   - Verify WhatsApp Web service is running
   - Check browser compatibility

2. **Database connection errors**
   - Verify PostgreSQL is running
   - Check database credentials
   - Ensure database exists

3. **Authentication issues**
   - Verify JWT secret is set
   - Check token expiration
   - Validate user credentials

### Debug Commands

```bash
# Check backend logs
npm run start:debug

# Check database connection
npm run db:check

# Test WhatsApp connection
npm run test:whatsapp
```

## 🎉 Migration Complete!

After following this guide, you'll have:

- ✅ Real WhatsApp Web integration with scannable QR codes
- ✅ Custom authentication system
- ✅ Scalable NestJS backend
- ✅ Better performance and control
- ✅ Full Node.js ecosystem support

## 📞 Support

If you encounter issues during migration:

1. Check the troubleshooting section
2. Review the NestJS documentation
3. Check WhatsApp Web.js documentation
4. Create an issue in the project repository

---

**Happy coding! 🚀**
