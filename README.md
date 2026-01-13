# GigFlow

GigFlow is a simple full-stack freelance marketplace where users can post gigs, bid on gigs, hire freelancers, and track applications.The project focuses on clean architecture, clear separation of concerns, and safe backend logic.

## **Links**

Github :- `https://github.com/Rudra-Dey-Sarkar/GigFlow`

Video :- `https://www.loom.com/share/43d45dadd57a43c1a509bdc39e8a1d28`

Live Project :- `https://gig-flow-azure.vercel.app/`

My Portfolio :- `https://rudra-dey-sarkar-official.vercel.app/`

## Features

### Authentication

* Register, login, logout
* Cookie-based authentication (JWT, HttpOnly)
* Session persistence with `/me`

### Gigs

* Public list of all gigs
* Create gigs (owner only)
* View own gigs
* Mark gigs as completed

### Bids

* Apply to gigs (one bid per user per gig)
* View applied gigs with bid status
* Gig owners can view all bids on their gigs
* Hire exactly one freelancer per gig

### Data Integrity

* MongoDB unique indexes to prevent duplicate bids
* MongoDB transactions to safely handle concurrent “hire” actions

---

## Tech Stack

### Backend

* Node.js
* Express
* MongoDB + Mongoose
* JWT authentication
* MongoDB transactions

### Frontend

* React (Vite)
* Tailwind CSS
* React Router
* Context API
* Cookie-based auth with `credentials: include`

---

## Project Structure

```

└── 📁GigFlow

    └── 📁backend

        └── 📁src

            └── 📁config

                ├── db.js

            └── 📁controllers

                ├── authentication.js

                ├── bid.js

                ├── gig.js

            └── 📁middleware

                ├── authentication.js

            └── 📁model

                ├── bid.js

                ├── gig.js

                ├── user.js

            └── 📁routes

                ├── authentication.js

                ├── bid.js

                ├── gig.js

            └── 📁scripts

                ├── clear-db.js

                ├── race-condition-test.js

            └── 📁services

                ├── hire.js

            └── 📁utils

                ├── generate-token.js

            ├── app.js

        ├── .env

        ├── .env.example

        ├── package-lock.json

        ├── package.json

    └── 📁frontend

        └── 📁public

            ├── vite.svg

        └── 📁src

            └── 📁api

                ├── client.js

            └── 📁assets

                ├── react.svg

            └── 📁components

                └── 📁auth

                    ├── auth-modal.jsx

                    ├── login.jsx

                    ├── register.jsx

                └── 📁bid

                    ├── bid-form.jsx

                    ├── bid-list.jsx

                └── 📁gig

                    ├── create-gig.jsx

                ├── modal.jsx

                ├── navbar.jsx

            └── 📁context

                ├── auth-context.jsx

            └── 📁pages

                ├── my-bids.jsx

                ├── my-gigs.jsx

                ├── public-gigs.jsx

            ├── App.css

            ├── App.jsx

            ├── index.css

            ├── main.jsx

        ├── .env

        ├── .gitignore

        ├── eslint.config.js

        ├── index.html

        ├── package-lock.json

        ├── package.json

        ├── postcss.config.js

        ├── README.md

        ├── tailwind.config.js

        ├── vite.config.js

    ├── .gitignore

    └── README.md

```

## Environment Variables

### Backend (`backend/.env`)

`PORT=5000 `

`MONGODB_URI=your_mongodb_uri `

`JWT_SECRET=your_jwt_secret `

### Frontend (`frontend/.env`)

`VITE_API_BASE=https://your-backend-url`

## Running Locally

### Backend

`cd frontend`

` npm install npm run dev`

### Frontend

`cd frontend`

`npm install`

`npm run dev`

## Scripts

### `npm run race-condition-test.js`

This script demonstrates how the system prevents race conditions during the hiring process.

When multiple users attempt to hire freelancers for the same gig at the exact same time, the backend uses MongoDB transactions to ensure that:

* only one freelancer can be hired
* the gig status changes atomically
* all other hire attempts are safely rejected

The script creates test users, a gig, a bid, and then fires parallel hire requests to validate transactional integrity.

### `npm run clear-db.js`

Utility script used during development to clean the database and remove test data.
