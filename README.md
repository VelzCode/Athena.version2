[Repository](https://github.com/VelzCode/Athena.version2)<br>
[Live Page](https://athena-version2.onrender.com/)

# Week.8-SQL — Athena Chronicles

A full-stack blogging application created for week eight of my coding bootcamp. It combines an HTML, CSS and JavaScript frontend with a Node.js and Express API, using Sequelize to work with a MySQL database.

## Disclaimer

Athena Systems and the Athena Chronicles project branding are fictional and used for this educational project. Business descriptions and claims are illustrative and do not represent a real company.

## About the project

This project introduces relational database storage for users, posts and categories. Visitors can browse posts, while registered users can publish and manage their own content. A separate note list provides a simple way to save notes in the browser.

The application is hosted on Render and builds on the earlier Athena Systems design with account forms, category browsing and a live clock.

## Features

- **Account registration and login** — Register with an email address and a password of at least eight characters.
- **Token-based authentication** — Login and registration return a JSON Web Token used for authenticated requests.
- **Create posts** — Publish a title and content under a selected category.
- **Manage your posts** — Edit or delete your own posts, with ownership checks on the server and a confirmation prompt before deletion.
- **Public browsing** — Browse all posts or filter them by category without logging in.
- **Live clock** — Display the current time in the navigation area.
- **Custom interface** — HTML and CSS panels with JavaScript updates driven by API responses.

**Create a Post, and My Posts are only shown after logging in.**

## Built with

- **HTML5, CSS3 and JavaScript** — Frontend structure, styling and interactions.
- **Node.js and Express 4** — Server and API routes.
- **MySQL and Sequelize 6** — Relational data storage, models and queries.
- **mysql2** — MySQL database driver.
- **JSON Web Tokens** — Token signing and authentication middleware.
- **bcrypt** — Password hashing during account creation and password comparison at login.
- **dotenv** — Loading database settings from environment variables.
- **nodemon** — Restarting the server during development.

## How to use

1. Open the Live Page link at the top of this README.
2. Browse public posts and use the category dropdown to filter them.
3. Register using your email address and matching passwords, or log in to an existing account.
4. Enter your **email address** in the login field labelled **Username**; registration uses the email as the username.
5. Choose a category, enter a title and content, then select **Publish Post**.
6. Use **My Posts** to edit or delete your posts. Editing loads the post into the form and changes its button to **Update Post**.
8. Select **Logout** when finished.

## Data storage

| Data | Storage |
| --- | --- |
| Users, posts and categories | MySQL database, accessed through Sequelize. |
| Login token and cached user details | Browser localStorage. |

Each post belongs to a category and can belong to a user. Users and categories can each have multiple posts.

## Local setup

You will need Node.js with npm and access to a MySQL database.

1. Clone or download the repository.
2. Install dependencies from the project folder:

   ```bash
   npm install
   ```

3. Copy `.env.example` to `.env` and replace the example values with your own database settings:

   ```dotenv
   DB_DATABASE=posts_db
   DB_USERNAME=your_database_user
   DB_PASSWORD=your_database_password
   DB_HOST=localhost
   DB_DIALECT=mysql
   DB_PORT=3306
   ```

4. Create an empty database matching `DB_DATABASE`. For the example name, run this in your MySQL client:

   ```sql
   CREATE DATABASE IF NOT EXISTS posts_db;
   ```

5. For a fresh development database, load the supplied categories and example posts:

   ```bash
   npm run seed
   ```

   **Seeding drops and recreates the model tables, deleting existing users, posts and categories. Run it only against a database you intend to reset.** The supplied `db/schema.sql` also drops the existing `posts_db` database before recreating it.

6. Start the server:

   ```bash
   npm start
   ```

7. Open **http://localhost:3001**, unless you have set a different `PORT` environment variable.

The connection configuration requests SSL. A local MySQL server without SSL support may require an adjustment to the SSL options in `config/connection.js`. The connection also supports `JAWSDB_URL` as an alternative to the individual database connection settings.

Categories must exist before a post can be created through the form. The seed script supplies categories and example posts; it does not create login accounts.

## Available commands

| Command | Purpose |
| --- | --- |
| `npm start` | Start the Express server. |
| `npm run dev` | Start the server with nodemon. |
| `npm run seed` | Reset model tables and insert sample categories and posts. |
| `npm run rebuild` | Start with nodemon and force a table rebuild, deleting existing table data. |

The `npm test` script is a placeholder; an automated test suite is not included.

## API overview

| Route | Supported actions |
| --- | --- |
| `/api` | API welcome response. |
| `/api/users` | Register an account; list users with authentication. |
| `/api/users/login` | Log in and receive a token. |
| `/api/users/me` | Retrieve the authenticated user. |
| `/api/users/:id` | Retrieve a user; update your own account with authentication. |
| `/api/users/logout` | Logout response; the browser clears its saved login details. |
| `/api/posts` | Read posts publicly; create a post with authentication. |
| `/api/posts/:id` | Read a post; edit or delete your own post with authentication. |
| `/api/posts/category/:categoryId` | Retrieve posts in a category. |
| `/api/categories` | List or create categories. |
| `/api/categories/:id` | Retrieve, update or delete a category. |

## Current scope

- The links are now completed and have been tested.
- The forgot password integration as been dropped, and will be added in future projects.
- Tokens expire after two hours. Cached user details can keep the logged-in interface visible after expiry; logging in again obtains a new token.
- My Posts loads on page load and after saving or deleting a post. Returning users may need to refresh after login to display their existing posts.
- Category-changing API routes do not currently require authentication, and there is no category-management form in the frontend.

## Hosting

The live application is hosted on Render. The server serves both the frontend and API and reads its listening port from `PORT`, falling back to `3001`. The project uses `npm install` for dependency installation and `npm start` to launch, with database connection settings supplied through the environment.

## Learning focus

- Modelling related users, posts and categories in a SQL database.
- Using Sequelize models, associations and queries.
- Building Express routes for create, read, update and delete operations.
- Connecting browser forms to an API with asynchronous JavaScript.
- Working with password hashing, authentication tokens and ownership checks.
- Separating database-backed content from browser-local state.

## Author

**Jason Dewhurst** — [VelzCode on GitHub](https://github.com/VelzCode)
