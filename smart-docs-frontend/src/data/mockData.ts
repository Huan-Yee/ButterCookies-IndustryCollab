export interface Doc {
  id: number;
  title: string;
  updated: string;
  status: string;
  content?: string;
  summary?: string;
}

export interface QAItem {
  id: number;
  question: string;
  answer: string;
  timestamp: string;
}

export const docs: Doc[] = [
  {
    id: 1,
    title: "API Authentication",
    updated: "2025-09-01",
    status: "✅ Up-to-date",
    content: `# API Authentication

## Overview
Our API uses JWT (JSON Web Tokens) for authentication. This guide covers how to authenticate requests to our API.

## Getting Started
1. Register your application
2. Obtain API credentials
3. Request an access token
4. Use the token in API calls

## Authentication Flow
\`\`\`javascript
const response = await fetch('/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    username: 'your-username',
    password: 'your-password'
  })
});

const { token } = await response.json();
\`\`\`

## Using the Token
Include the JWT token in the Authorization header:

\`\`\`javascript
const apiResponse = await fetch('/api/data', {
  headers: {
    'Authorization': \`Bearer \${token}\`
  }
});
\`\`\``,
    summary: "Learn how to authenticate API requests using JWT tokens. Covers registration, token acquisition, and usage in API calls."
  },
  {
    id: 2,
    title: "User Onboarding Flow",
    updated: "2025-07-15",
    status: "⚠️ Needs Update",
    content: `# User Onboarding Flow

## Welcome Process
Guide new users through their first experience with our platform.

## Steps
1. **Account Creation**: Email verification and basic profile setup
2. **Tutorial**: Interactive walkthrough of key features
3. **First Project**: Guided creation of initial project
4. **Team Invitation**: Option to invite team members

## Implementation
\`\`\`typescript
interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

const onboardingSteps: OnboardingStep[] = [
  // ... step definitions
];
\`\`\``,
    summary: "Complete guide for user onboarding including account setup, tutorials, and team invitations."
  },
  {
    id: 3,
    title: "Database Schema",
    updated: "2025-08-20",
    status: "✅ Up-to-date",
    content: `# Database Schema

## Tables Overview
Our application uses PostgreSQL with the following main tables:

### Users Table
- id (UUID, Primary Key)
- email (VARCHAR, Unique)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)

### Projects Table
- id (UUID, Primary Key)
- name (VARCHAR)
- owner_id (UUID, Foreign Key)
- created_at (TIMESTAMP)

## Relationships
- Users can have multiple Projects (One-to-Many)
- Projects can have multiple Contributors (Many-to-Many)`,
    summary: "Database schema documentation covering tables, relationships, and data types for the application."
  },
  {
    id: 4,
    title: "Deployment Guide",
    updated: "2025-06-10",
    status: "❌ Outdated",
    content: `# Deployment Guide

## Prerequisites
- Node.js 16+
- Docker
- AWS CLI configured

## Steps
1. Build the application
2. Create Docker image
3. Deploy to AWS ECS
4. Configure load balancer

## Environment Variables
\`\`\`
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret-key
AWS_REGION=us-east-1
\`\`\``,
    summary: "Step-by-step deployment guide for AWS ECS with Docker containerization."
  }
];

export const recentQAs: QAItem[] = [
  {
    id: 1,
    question: "How do I reset my API key?",
    answer: "You can reset your API key by going to Settings > API Keys and clicking 'Generate New Key'. Your old key will be immediately invalidated.",
    timestamp: "2025-09-07 10:30"
  },
  {
    id: 2,
    question: "What's the rate limit for API calls?",
    answer: "Our API has a rate limit of 1000 requests per hour for free tier users and 10,000 requests per hour for premium users.",
    timestamp: "2025-09-07 09:15"
  },
  {
    id: 3,
    question: "How do I invite team members?",
    answer: "Navigate to your project settings and click 'Team' > 'Invite Members'. Enter their email addresses and select their role level.",
    timestamp: "2025-09-06 16:45"
  }
];

export const mockAnswers = [
  "Based on our documentation, here's what I found...",
  "According to the API documentation, you should...",
  "I found this information in the user guide...",
  "The latest documentation suggests...",
  "Here's the recommended approach from our docs..."
];
