# Customer Onboarding Web Application

This project is a Customer Onboarding web application built with **Next.js 14 (App Router)**, **TypeScript**, and **Material UI (MUI)**.  
It demonstrates the complete flow of onboarding new customers, saving drafts, managing customer records, and handling protected routes with session-based authentication.

## Features

- **Authentication**

  - Simple sign-in page (mocked with cookie-based session).
  - Middleware protection for all routes.
  - Sign-out button to clear session.

- **Onboarding Wizard**

  - Three-step process:
    1. Account Details
    2. Customer Profile
    3. Review & Submit
  - Form validation using React Hook Form + Zod.
  - Save as draft at any step.
  - Submit to create a new customer record.

- **Customer Management**

  - Customer list with search, filter, and pagination.
  - View individual customer details.
  - Edit draft records via the wizard.
  - Delete customer records.

- **API Routes**

  - REST-style endpoints for customers and drafts.
  - Data stored locally in `data/db.json`.
  - CRUD operations supported.

- **Theming**

  - Light and dark mode toggle using MUI + next-themes.

- **Testing**
  - Unit tests with Vitest and React Testing Library.

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript, Material UI
- **State Management**: Zustand
- **Validation**: React Hook Form + Zod
- **Backend**: Next.js API Routes (Node runtime)
- **Persistence**: JSON file (`data/db.json`)
- **Testing**: Vitest + React Testing Library

## Project Structure

```
src/
  app/
    signin/              # Sign-in page
    dashboard/           # Post-login landing page
    customers/           # Customer management
      [id]/              # View customer
      [id]/edit/         # Edit draft
      new/               # Start new onboarding
    api/                 # API routes
      customers/         # Customers CRUD
      drafts/            # Drafts CRUD
  components/            # Shared components (Theme, Wizard, etc.)
  store/                 # Zustand state stores
  lib/                   # Validation schemas, db helpers
data/
  db.json                # Local data persistence
tests/
  ...                    # Unit tests
```

## Setup Instructions

1. **Clone the repository**

   ```bash
   git clone <repo-url>
   cd <repo-folder>
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

   or with pnpm:

   ```bash
   pnpm install
   ```

3. **Run development server**

   ```bash
   npm run dev
   ```

   The app will start at `http://localhost:3000`.

4. **Run tests**
   ```bash
   npm run test
   ```

## Usage

1. Open `http://localhost:3000` in your browser.  
   If not logged in, you will be redirected to `/signin`.

2. **Sign in** with any email (no password required).  
   This sets a `session=1` cookie.

3. After sign-in, you land on the **Dashboard**.

   - Start a new onboarding → `/customers/new`
   - View customer list → `/customers`

4. **Onboarding Wizard**:  
   Fill out Account Details → Customer Profile → Review & Submit.

   - Use "Save Draft" to store progress without submitting.
   - "Submit" will validate and create a new customer record.

5. **Customers Page**:  
   Search, filter, and paginate through customer records.

   - View details → `/customers/[id]`
   - Edit draft → `/customers/[id]/edit`

6. **Sign out** at any time using the header button.

## Deployment

The project is ready for deployment on **Vercel** or any Node.js hosting platform.

- Push the repo to GitHub.
- Import the repo into Vercel.
- Build and deploy with default Next.js settings.

**Note:** Data persistence uses a JSON file (`data/db.json`).  
On platforms like Vercel (serverless), this file is not persistent across deploys.  
For production, replace with a database (e.g., PostgreSQL, MongoDB).

## Assumptions

- Document ID must be 6–14 alphanumeric characters.
- Phone number must be digits only, length 10–15.
- DOB must result in age ≥ 18.
- Drafts may be incomplete, but submitted customers require all mandatory fields.

## License

This project is for assignment/demo purposes.
