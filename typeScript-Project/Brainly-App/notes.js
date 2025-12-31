/*
project-root/
│
├── client/                 # React (Frontend - TypeScript)
│   ├── public/
│   ├── src/
│   │   ├── assets/         # Images, icons
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page-level components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── context/        # Context API
│   │   ├── services/       # API calls (axios/fetch)
│   │   ├── utils/          # Helper functions
│   │   ├── types/          # TypeScript types/interfaces
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── vite-env.d.ts
│   ├── tsconfig.json
│   └── package.json
│
├── server/                 # Node.js / Express (Backend - TypeScript)
│   ├── src/
│   │   ├── app.ts          # Express app setup
│   │   ├── server.ts       # Server entry point
│   │   ├── config/         # DB, env config
│   │   │   ├── db.ts
│   │   │   └── env.ts
│   │   ├── controllers/   # Request logic
│   │   ├── routes/         # Express routes
│   │   ├── models/         # Mongoose models
│   │   ├── middlewares/    # Auth, error handling
|   |   |   └──error.middleware.ts
│   │   ├── services/       # Business logic
│   │   ├── validators/    # Zod schemas      ***
│   │   ├── utils/          # Helpers
|   |   |   └── ApiError.ts
|   |   |   └── ApiResponse.ts
│   │   ├── types/          # Custom TS types
│   │   └── index.ts        # Optional single entry
│   │
│   ├── dist/               # Compiled JS output
│   ├── tsconfig.json
│   ├── package.json
│   └── nodemon.json
│
├── .env
├── .gitignore
└── README.md
*/


/*
even though it is a ts file import will be with .js ->works fine
you could change it in ts.config and for ts u dont have to add .ts in the end
*/