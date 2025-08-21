# TikTok Video Downloader

## Overview

This is a full-stack web application for downloading TikTok videos without watermarks. The application provides a clean, user-friendly interface where users can paste TikTok URLs and download videos in different quality options (HD, SD, or audio only). The system processes download requests asynchronously and provides progress feedback to users.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management and caching
- **UI Framework**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom dark theme and gradient styling
- **Forms**: React Hook Form with Zod validation for type-safe form handling
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Pattern**: RESTful API design with structured error handling
- **Request Processing**: Asynchronous download request handling with status tracking
- **Development Setup**: Hot reload with Vite integration for full-stack development

### Data Storage Solutions
- **ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (configured) with Neon Database serverless driver
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Development Storage**: In-memory storage implementation for development/testing
- **Session Storage**: PostgreSQL-based session storage with connect-pg-simple

### Authentication and Authorization
- **Session Management**: Express sessions with PostgreSQL store
- **User Schema**: Basic username/password authentication ready
- **Security**: Prepared for authentication implementation with user table schema

### Code Organization
- **Monorepo Structure**: Client and server code in separate directories
- **Shared Code**: Common types and schemas in `/shared` directory
- **Type Safety**: End-to-end TypeScript with shared validation schemas
- **Path Aliases**: Clean imports with TypeScript path mapping
- **Development Workflow**: Concurrent client/server development with integrated tooling

## External Dependencies

### Database and Storage
- **Neon Database**: Serverless PostgreSQL database hosting
- **Drizzle ORM**: Type-safe database queries and migrations
- **connect-pg-simple**: PostgreSQL session store

### UI and Styling
- **Radix UI**: Headless UI component primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library
- **Embla Carousel**: Carousel/slider components

### Development and Build Tools
- **Vite**: Fast build tool and dev server
- **esbuild**: Fast JavaScript bundler for production
- **PostCSS**: CSS processing with Autoprefixer
- **TypeScript**: Type safety across the entire stack

### Form and Validation
- **React Hook Form**: Performant form library
- **Zod**: Schema validation and type inference
- **@hookform/resolvers**: Integration between React Hook Form and Zod

### External Services Integration
- **TikTok API Integration**: Prepared for video metadata extraction and download processing
- **File Processing**: Ready for video processing and watermark removal capabilities
- **Cloud Storage**: Architecture supports external file storage integration

## Recent SEO Enhancements

- **Professional SEO Implementation**: Added comprehensive meta tags, Open Graph tags, Twitter Cards, and structured data (JSON-LD) for better search engine visibility and social media sharing
- **SEO-Optimized Content Section**: Implemented keyword-rich content between mobile app and FAQ sections with professional layout including "Why Choose Us", "How It Works", and "Advanced Features" sections
- **Multi-language SEO Support**: All SEO content is fully translatable across 9 supported languages with fallback system to English
- **Technical SEO Features**: Added canonical URLs, proper heading structure, semantic HTML, and mobile-optimized responsive design
- **Search Engine Targeting**: Focused on high-value keywords like "tiktok downloader", "no watermark", "free tiktok video downloader", "tiktok to mp4" for better ranking potential

The application is designed with scalability in mind, using modern development practices and a clean separation of concerns between frontend, backend, and data layers. The SEO implementation showcases professional web development capabilities and demonstrates Replit's power for creating search engine optimized applications.