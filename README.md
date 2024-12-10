
# TodoApp

A simple and effective Todo Application that supports user authentication, CRUD operations, filtering, sorting, and responsive design. Built with Next.js, Prisma, and PostgreSQL.

---

## Features

- **Create Todos:** Add a new todo with attributes like title, description, due date, priority, and status.
- **Read Todos:** View all todos or inspect individual details.
- **Update Todos:** Edit attributes such as title, description, due date, priority, and status.
- **Delete Todos:** Remove todos from the list.
- **Search, Filter, and Sort:** Search todos, filter by status, priority, or due date, and sort by creation date, due date, or priority.
- **User Authentication:** Login/logout functionality using NextAuth.js with social login options.
- **Dark Mode:** Support for light and dark themes.

---

## Setup

### Prerequisites

Ensure the following tools are installed on your system:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Prisma CLI](https://www.prisma.io/)

### Clone the Repository

```bash
git clone <repository-url>
cd todoapp
```

### Install Dependencies

Install the required dependencies using npm:

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file in the root directory and include the following configuration:

```env
DATABASE_URL=postgres://<username>:<password>@<host>/<database>?sslmode=require
```

Replace `<username>`, `<password>`, `<host>`, and `<database>` with your PostgreSQL database details.

### Set Up the Database

1. Push the Prisma schema to the database:

   ```bash
   npx prisma db push
   ```

2. Seed the database (if required).

### Generate Prisma Client

Ensure the Prisma client is up to date by running:

```bash
npx prisma generate
```

### Run Prisma Studio

To visually interact with your Neon database, use Prisma Studio:

```bash
npx prisma studio
```

### Seed the Database

Run the Seed Script: Execute the following command to seed your database:

```bash
npx prisma db seed
```

### Run the Development Server

Start the application in development mode:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

---

## Scripts

The following npm scripts are available:

- **`npm run dev`**: Start the development server.
- **`npm run build`**: Build the project for production.
- **`npm run start`**: Start the production server.
- **`npm run lint`**: Run the linter.

---

## Using the App

1. **Access the App**: Open `http://localhost:3000` in your browser.
2. **Register or Login**: Use the authentication feature to register or log in.
3. **Manage Todos**: Create, read, update, or delete todos using the provided UI.
4. **Filter and Sort**: Organize todos by status, priority, or due date.

---

## Deployment

To deploy the project, use hosting services like [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/). Ensure the `.env` file is configured for the production database.

---

## Contributing

Contributions are welcome! Fork the repository and submit a pull request.

---

## License

This project is open-source under the MIT License.
