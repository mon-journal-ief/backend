# IEF Backend - Instruction en Famille API

🏠 Backend API for the IEF (Instruction en Famille) homeschooling journal application.

## 📖 About

This backend is a REST API, not deviating much from a basic CRUD.

- Add and manage their children
- Link children to pre-made educational programs (based on official French curriculum)
- Customize programs as needed
- Create daily journal entries linked to program elements
- Add photos and descriptions to entries
- Export journals to PDF or Word format for inspections

## 📊 Database Schema

The application uses the following main entities:

- **User**: Parent accounts with authentication
- **Child**: Children profiles with program assignments
- **Program**: Educational programs (custom or from templates)
- **ProgramTemplate**: Pre-made curriculum templates
- **ProgramElement**: Individual learning objectives
- **JournalEntry**: Daily activity logs with validated elements


## 🛠️ Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with refresh tokens
- **File Storage**: Scaleway Object Storage (S3-compatible)
- **Document Generation**: DOCX library + external PDF service (pdf-scrapper)
- **Email**: Resend
- **Rate Limiting**: Express Rate Limit
- **Logging**: Morgan

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and pnpm
- PostgreSQL database
- Scaleway Object Storage bucket (or S3-compatible storage)
- Resend account for emails

### Installation

1. **Clone and install dependencies**
```bash
git clone
pnpm install
```

2. **Environment Setup**
```bash
cp .env.example .env
```

3. **Database Setup**
```bash
# Generate Prisma client
pnpm prisma:generate
# Run migrations
pnpm prisma:migrate
# Seed database with program templates
pnpm prisma:seed
```

4. **Start Development Server**
```bash
pnpm dev
```

The API will be available at `http://localhost:4000`

