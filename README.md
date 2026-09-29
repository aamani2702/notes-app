# Notes App

A full-stack notes application with user authentication. Users can register, log in, and create, edit, and delete their own personal notes.

## Live Demo

- **App:** https://notes-app-blush-theta-98.vercel.app
- **API:** https://notes-app-backend-e0tg.onrender.com

> Note: the backend is hosted on a free tier that spins down after inactivity, so the first request after a period of idle time may take 30-60 seconds to respond.

## Features

- User registration and login with hashed passwords
- JWT-based authentication
- Create, read, update, and delete notes
- Notes are private to each logged-in user
- Protected routes on both frontend and backend
- Clean, responsive interface

## Tech Stack

**Frontend:** React, Vite, React Router, Axios
**Backend:** Node.js, Express
**Database:** PostgreSQL (hosted on Neon)
**Authentication:** JWT, bcrypt
**Deployment:** Vercel (frontend), Render (backend)

## Project Structure
