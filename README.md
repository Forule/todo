# 📝 simpleTodo — Frontend

[![Live](https://img.shields.io/badge/status-online-green.svg?style=for-the-badge)](https://todo.janmuljowin.de)
[![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

The browser-based client of **simpleTodo** — a lightweight, type-safe task management app with user authentication, personal task lists, and a clean responsive UI.

> 🔗 **Live:** [todo.janmuljowin.de](https://todo.janmuljowin.de) — Backend repo: [todo-backend](https://github.com/Forule/todo-backend)

---

## Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Deployment](#deployment)
- [License](#license)

---

## Features

- **User Authentication** — Register and log in with a personal account; protected routes ensure unauthenticated users are redirected to login
- **Personal Task Management** — Each user sees only their own tasks, persisted in a PostgreSQL database via the backend API
- **Responsive UI** — Built with Tailwind CSS for a consistent, mobile-friendly design across all screen sizes
- **Type-Safe** — Fully written in TypeScript for reliable, maintainable code
- **Containerized** — Docker-ready for straightforward deployment

---

## Architecture

1. **React (Component-Based UI)** — The interface is built as a React application using functional components and hooks for state and side-effect management.
2. **TypeScript** — Strict typing across all components and API calls reduces runtime errors and improves developer tooling.
3. **Protected Routing** — Authenticated routes redirect unauthenticated users automatically; auth state is managed globally.
4. **API Integration** — Communicates with the REST backend via the Fetch API for all CRUD operations on tasks and user sessions.
5. **Tailwind CSS** — Utility-first styling for a responsive, maintainable UI without custom CSS bloat.
6. **Vite** — Fast build tooling and hot module replacement during development.

---

## Deployment

- **Containerization** — The included `Dockerfile` builds and serves the application as an OCI-compliant container.
- **CI/CD** — Automated build and push to GHCR via GitHub Actions on every merge to `main`.
- **API Configuration** — The backend endpoint is configured via environment variables before building.

---

## License

Copyright (c) 2026 Jan Muljowin — MIT License.
