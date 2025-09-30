import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { startCacheUpdates } from './services/cache-manager.js';
import { initializeDatabase } from './services/database.js';
import threatRoutes from './routes/threat.js';
import analyticsRoutes from './routes/analytics.js';
import alertsRoutes from './routes/alerts.js';
import ticketsRoutes from './routes/tickets.js';

dotenv.config();

const app = express();

// Endpoint raíz para verificación rápida
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Backend is running' });
});
const PORT = process.env.PORT || 3000;


// Security middleware
app.use(helmet({
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'", "https://static.cloudflareinsights.com"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "https:", "https://cloudflareinsights.com", "https://sesec-backend.fly.dev"],
    },
  },
}));

// CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://sesecpro.es', 'https://www.sesecpro.es', 'https://sesec-2025.vercel.app', 'http://localhost:4321', 'http://127.0.0.1:4321']
    : ['http://localhost:4321', 'http://127.0.0.1:4321', 'http://localhost:4322', 'http://localhost:4323', 'http://localhost:4324', 'http://127.0.0.1:4322', 'http://127.0.0.1:4323', 'http://127.0.0.1:4324'],
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Cache-Control', 'X-Emergency-Token', 'x-emergency-token'],
  optionsSuccessStatus: 200
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.',
    retryAfter: '15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

// Compression middleware
app.use(compression());

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// API Routes
app.use('/api/threat', threatRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/alerts', alertsRoutes);
app.use('/api/tickets', ticketsRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage()
  });
});

// API status endpoint
app.get('/api/status', (req, res) => {
  res.json({
    service: 'SESEC Cybersecurity API',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      threats: '/api/threat',
      analytics: '/api/analytics', 
      alerts: '/api/alerts',
      tickets: '/api/tickets',
      health: '/health'
    },
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    message: `The requested endpoint ${req.originalUrl} does not exist`,
    availableEndpoints: {
      threats: '/api/threat',
      analytics: '/api/analytics',
      alerts: '/api/alerts',
      tickets: '/api/tickets',
      health: '/health',
      status: '/api/status'
    }
  });
});




  // Global error handler
app.use((error, req, res, next) => {
  console.error('❌ Global error handler:', error);

  res.status(error.status || 500).json({
    success: false,
    error: process.env.NODE_ENV === 'production'
      ? 'Internal server error'
      : error.message,
    timestamp: new Date().toISOString(),
    ...(process.env.NODE_ENV !== 'production' && { stack: error.stack })
  });
});

// Start server
app.listen(PORT, '0.0.0.0', async () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
  console.log(`📈 API Status: http://localhost:${PORT}/api/status`);
  console.log(`🛡️ Security headers enabled`);
  console.log(`⚡ Compression enabled`);
  console.log(`🚦 Rate limiting: 100 requests per 15 minutes`);
  
  // Initialize database
  try {
    await initializeDatabase();
    console.log('✅ Database initialized successfully');
  } catch (error) {
    console.error('❌ Failed to initialize database:', error);
  }
  
  // Initialize automatic cache updates
  try {
    await startCacheUpdates();
  } catch (error) {
    console.error('❌ Failed to initialize cache updates:', error);
  }
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('🛑 SIGINT received, shutting down gracefully');
  process.exit(0);
});

export default app;