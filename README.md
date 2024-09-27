# Task Manager Project

This project is a Task Manager application built using Next.js with the App Router and TanStack Query for state management on the frontend. The application allows users to register, log in, and manage their tasks efficiently. Its a minimalist version of Trello. 

## Features

- User Authentication (Sign Up, Log In)
- Task Management (Create, Read, Update, Delete tasks)
- You can sort your task and search your task according to columns and cards
- You can set deadlines and reminder for tasks.
- State Management using TanStack Query
- Responsive UI using Tailwind CSS
- Google OAuth Integration

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework for server-side rendering and static site generation
- [TanStack Query](https://tanstack.com/query/latest) - Powerful data-fetching and state management library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [React Icons](https://react-icons.github.io/react-icons/) - Popular icons library for React
- [js-cookie](https://github.com/js-cookie/js-cookie) - JavaScript library for handling cookies

## Getting Started

### Prerequisites

- Node.js (>= 14.x)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/task-manager.git
cd task-manager
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory and add your environment variables:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```

### Running the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building for Production

```bash
npm run build
# or
yarn build
```

### Starting the Production Server

```bash
npm start
# or
yarn start
```

## Project Structure

```plaintext
.
├── components
│   ├── ui
│   │   ├── alert.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── checkbox.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   └── loader.tsx
├── pages
│   ├── api
│   │   └── auth
│   │       ├── login.ts
│   │       ├── logout.ts
│   │       └── register.ts
│   ├── dashboard.tsx
│   ├── index.tsx
│   └── auth
│       ├── login.tsx
│       └── register.tsx
├── public
│   └── vercel.svg
├── styles
│   └── globals.css
├── .env.local
├── .gitignore
├── next.config.js
├── package.json
├── README.md
└── tsconfig.json
```

## Usage

### Authentication

- **Sign Up**: Users can register by providing their name, email, and password.
- **Log In**: Users can log in using their email and password or via Google OAuth.

### Task Management

- **Create Task**: Users can create new tasks.
- **Read Tasks**: Users can view their tasks.
- **Update Task**: Users can update existing tasks.
- **Delete Task**: Users can delete tasks.



## Acknowledgements

- [Next.js](https://nextjs.org/)
- [TanStack Query](https://tanstack.com/query/latest)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [js-cookie](https://github.com/js-cookie/js-cookie)

---
