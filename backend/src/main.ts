import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { Request, Response } from 'express';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Add body parsing middleware FIRST
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));
  
  // Enable CORS for frontend
  app.enableCors({
    origin: [
      'http://localhost:3000', 
      'http://localhost:8080', 
      'https://fursa-ai-two.vercel.app',
      'https://fursa-connect-flow.vercel.app',
      'https://fursa-connect-flow-git-main-fursa-connect.vercel.app'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-client-info', 'apikey'],
  });

  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: false, // Allow extra properties
    skipMissingProperties: false, // Don't skip missing properties
  }));

  // Global prefix
  app.setGlobalPrefix('api');

  // Health check endpoint for Railway
  const expressApp = app.getHttpAdapter().getInstance();
  expressApp.get('/api/health', (req: Request, res: Response) => {
    res.status(200).json({ 
      status: 'ok', 
      timestamp: new Date().toISOString(),
      service: 'Fursa Connect Backend'
    });
  });

  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`🚀 NestJS Backend running on port ${port}`);
  console.log(`🔗 API available at http://localhost:${port}/api`);
  console.log(`🏥 Health check available at http://localhost:${port}/api/health`);
}

bootstrap();
