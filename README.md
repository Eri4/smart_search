# Smart Search Algorithm by Ermir Jace

This is a test project that implements a smart search algorithm that extracts entities (cities, brands, dish types, and diets) from a search term and returns combinations of those entities. The project is built using Node.js, Express, TypeScript, Prisma, and PostgreSQL for the backend, and React with TypeScript and Vite for the frontend.

## Getting Started

### Prerequisites

- Node.js
- PostgreSQL

### Installation

1. Clone the repository:
   - git clone
   - cd smart-search

2. Install dependencies:
    - cd server
    - npm install
    - cd ../client
    - npm install

3. Set up the database:
    - Create a new PostgreSQL database for the project.
    - Update the DATABASE_URL in the server/.env file with the appropriate database connection URL. Make sure to include the database name, username, and password. (postgresql://USERNAME:PASSWORD@HOST:PORT/DATABASE_NAME).
    - Run the database migration to create the necessary tables: npm run db:migrate.
    - Generate the Prisma Client: npm run postinstall.
    - You can use this command to add the data from the seed file: npx prisma db seed.
    - You can use Prisma Studio to add the required data to the tables: npm run db:studio.

4. Running the Application:

    - Start the server:
    - cd server
    - npm run dev

    Start the frontend:
    - cd client
    - npm run dev
  
# Ideas of Improvements
A way to improve this is adding a functionality that by using a csv or excel that lets us import the search terms (so like the city names and things like that), so we do not have to create tehm manualy.
