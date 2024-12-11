# TodoApp - Next.js, Prisma, and PostgreSQL

A modern todo application with user authentication, CRUD operations, and a responsive design built using Next.js, Prisma, and PostgreSQL.

## Prerequisites

Before you begin, ensure you have installed:

- Node.js (v16 or higher)
- npm or yarn
- Git

## Quick Start

1. **Clone the repository**

```bash
git clone <your-repo-url>
cd todoapp
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up your database**

This project uses [Neon](https://neon.tech) for PostgreSQL. To set up:

a. Create a Neon account and create a new project
b. Get your database connection string from the Neon dashboard
c. Create a `.env.local` file in the root directory with the following variables:

```env
# Database Configuration
DATABASE_URL="your-neon-database-url"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
AUTH_SECRET="your-auth-secret" # Generate using: npx auth secret

# Development Settings
SEED_USER_PASSWORD="your-seed-user-password"
```

4. **Set up the database schema**

```bash
# Generate Prisma Client
npx prisma generate

# Push the schema to your database
npx prisma db push

# Seed the database with initial data
npx prisma db seed
```

5. **Start the development server**

```bash
npm run dev
```

Visit `http://localhost:3000` to see your application running.

## Test Account

After seeding the database, you can use these credentials to test the application:

- Email: <testuser@example.com>
- Password: (The value you set for SEED_USER_PASSWORD in .env.local)

## Available Scripts

- `npm run dev` - Start the development server with Turbopack
- `npm run build` - Create a production build
- `npm start` - Start the production server
- `npm run lint` - Run ESLint

## Development Tools

### Prisma Studio

To view and edit your database content:

```bash
npx prisma studio
```

### Database Management

To reset your database and apply new seeds:

```bash
# Reset the database
npx prisma db push --force-reset

# Run seeds again
npx prisma db seed
```

## Project Structure

```
todoapp/
├── app/                  # Next.js app directory
├── components/          # React components
├── lib/                 # Utility functions and configurations
├── prisma/             # Prisma schema and migrations
└── types/              # TypeScript type definitions
```

## Features

- ✅ User Authentication with NextAuth.js
- ✅ CRUD operations for todos
- ✅ Priority levels and due dates
- ✅ Responsive design with Tailwind CSS
- ✅ Real-time updates
- ✅ Form validation
- ✅ Error handling

## Troubleshooting

### Common Issues

1. **Database Connection Errors**
   - Verify your DATABASE_URL in .env.local
   - Ensure your Neon database is active
   - Check if your IP is whitelisted in Neon dashboard

2. **Authentication Issues**
   - Verify AUTH_SECRET is set correctly
   - Ensure NEXTAUTH_URL matches your development URL

3. **Prisma Issues**
   - Run `npx prisma generate` after schema changes
   - Use `npx prisma db push` to sync schema changes

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
