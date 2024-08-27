# Digiwuh App

Digiwuh is a web application designed with a focus on scalability, maintainability, and performance. It is built using Supabase for backend services, TypeScript for type-safe coding, Node.js as the runtime environment, and follows the principles of Clean Architecture.

## Features

- **User Authentication**: Powered by Supabase's Authentication module.
- **Data Management**: CRUD operations using Supabase's Postgres database.
- **Search and Filtering**: Implemented with efficient querying and filtering mechanisms.
- **Statistics**: Real-time stats generation based on filters.
- **Scalable Architecture**: Built following the Clean Architecture principles for easy maintainability and scalability.

## Technologies Used

- **Supabase**: Open source Firebase alternative, for authentication, database, and storage.
- **TypeScript**: Superset of JavaScript that compiles to plain JavaScript.
- **Node.js**: JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Clean Architecture**: A set of practices and patterns to keep code modular, reusable, and testable.
- **Environment Variables**: Managed via `.env` files for configuration.

## Project Structure

```
├── src
│   ├── service        # Use cases, business rules
│   ├── entity         # Entities, domain models
│   ├── controller     # API routes, controllers
│   └── util           # Common utilities, constants
├── .env.example       # Example environment configuration
├── README.md          # Project documentation
├── tsconfig.json      # TypeScript configuration
└── package.json       # NPM dependencies and scripts
```

## Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v14 or higher)
- **NPM** (v6 or higher)
- **Supabase** account

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ahsanf/digiwuh.git
   cd digiwuh
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the root directory by copying `.env.example`:

   ```bash
   cp .env.example .env
   ```

   Fill in the necessary environment variables in the `.env` file:

   ```bash
   SUPABASE_URL=your-supabase-url
   SUPABASE_KEY=your-supabase-key
   ```

### Running the Application

To start the application in development mode:

```bash
npm run dev
```

This will compile the TypeScript files and start the Node.js server with hot-reloading.

### Building for Production

To build the application for production:

```bash
npm run build
```

### Running Tests

To run the unit tests:

```bash
npm test
```

## Environment Variables

The following environment variables need to be set in your `.env` file:

- `SUPABASE_URL`: Your Supabase instance URL.
- `SUPABASE_KEY`: Your Supabase API key.
- Other configurations depending on your setup.

Example `.env.example`:

```bash
SUPABASE_URL=https://your-supabase-url.supabase.co
SUPABASE_KEY=your-secret-api-key
```

## Contributing

Contributions are welcome! Please submit a pull request or open an issue to discuss any changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries, please contact [social.ahsanf@gmail.com].
