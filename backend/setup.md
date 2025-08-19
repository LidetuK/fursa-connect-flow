# 🚀 NestJS Backend Setup Guide

## 📋 Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database
- npm or yarn

## 🔧 Installation Steps

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Environment Configuration

Create a `.env` file in the backend directory:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=fursa_connect

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# WhatsApp Configuration
WHATSAPP_SESSION_PATH=./sessions

# External APIs
N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
DIALOG360_API_KEY=your_dialog360_key

# Server Configuration
PORT=3001
NODE_ENV=development
```

### 3. Database Setup

```bash
# Create PostgreSQL database
createdb fursa_connect

# Or using psql
psql -U postgres
CREATE DATABASE fursa_connect;
\q
```

### 4. Start Development Server

```bash
npm run start:dev
```

## 🎯 What's Included

- ✅ **Authentication System** - JWT-based auth with bcrypt
- ✅ **WhatsApp Web Integration** - Real QR codes with whatsapp-web.js
- ✅ **Database Integration** - TypeORM with PostgreSQL
- ✅ **Real-time Features** - WebSocket support
- ✅ **API Endpoints** - RESTful API for all features

## 🔍 API Endpoints

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/whatsapp/connect` - Connect WhatsApp
- `GET /api/whatsapp/status/:sessionId` - Get connection status
- `POST /api/whatsapp/send-message` - Send WhatsApp message
- `DELETE /api/whatsapp/disconnect` - Disconnect WhatsApp

## 🚀 Next Steps

1. Start the backend server
2. Update frontend API URL to point to backend
3. Test WhatsApp Web integration
4. Configure external APIs (Twilio, 360dialog)

## 🔧 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Verify PostgreSQL is running
   - Check database credentials in .env
   - Ensure database exists

2. **WhatsApp Web Issues**
   - Check Puppeteer installation
   - Verify Chrome/Chromium is available
   - Check system dependencies

3. **JWT Errors**
   - Verify JWT_SECRET is set
   - Check token expiration settings

### Debug Commands

```bash
# Check backend logs
npm run start:debug

# Test database connection
npm run db:check

# Run tests
npm run test
```

---

**Happy coding! 🚀**
