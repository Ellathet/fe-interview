# Project: Sales Dashboard

## Overview
This project is a data sales visualization dashboard built using **Vite.js**, **ShadCN** with **Tailwind CSS** and **Recharts**. Consume a **Apache Superset** api. The goal is to provide an interactive chart interface for analyzing data and making informed decisions.

## Features
- **Fast and optimized frontend** powered by Vite.js
- **Reusable and accessible UI components** from ShadCN

## Tech Stack
- **Frontend**: Vite.js, React, TypeScript
- **Styling**: Tailwind CSS, ShadCN
- **Charts**: Recharts

## Installation
### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [Pnpm](https://pnpm.io/pt/) or npm

### Steps
1. **Set Env Variables:**
  In .env file:
   ```env
   VITE_API_URL=http://3.136.147.85:8088/api/v1
   ```
2. **Install dependencies:**
   ```sh
   pnpm install
   # or
   npm install
   ```
3. **Start the development server:**
   ```sh
   pnpm dev
   # or
   npm run dev
   ```

## Usage
- Access the application at `http://localhost:5173`
- Do the login using the provided username and password
- Interact with chart

## Project Structure
```
📂 src
 ┣ 📂 components     # Reusable UI components (ShadCN) and another usual components
 ┣ 📂 pages          # Application pages
 ┣ 📂 hooks          # Custom React hooks like auth hook
 ┣ 📂 services       # API calls to Superset and axios instance
 ┣ 📂 styles         # Tailwind CSS setup
 ┣ 📂 utils          # Utils functions
 ┣ 📂 types          # Usable types
 ┣ 📂 routes         # React router dom instance and routes instance
 ┗ 📜 main.tsx       # Entry point
```

## Deployment
1. **Build the project:**
   ```sh
   pnpm build
   # or
   npm run build
   ```
2. **Serve the built files:**
   ```sh
   pnpm preview
   # or
   npm run preview
   ```

## Disclaimer
The initial approach was to use `datasource` routes to fetch filter options but, CORS issues were encountered when attempting to bring the data from the endpoints:

- `http://3.136.147.85:8088/api/v1/datasource/table/10/column/city/value`

- `http://3.136.147.85:8088/api/v1/datasource/table/10/column/country/values/`

Some solutions were attempted, including using a CORS browser extension and setting up a proxy in the application. However, the issue likely originates from the API itself. 
As a workaround, mocked data was used for the city, country, and year filters.