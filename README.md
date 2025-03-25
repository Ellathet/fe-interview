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

## Tests and Implementations
The testing approach will be implemented using vitest, here I list some tests to be implemented in a possible version:

### Home Page:

- **Test the `updateTemporalRange` function:**
    
    Verify that selecting a new year in the dropdown correctly updates the `temporalRange` state.
    
- **Test the `handleSelectCities` function:**
    
    Check if selecting and deselecting cities properly updates the `citiesFilter` state.
    
- **Test the `handleSelectCountries` function:**
    
    Ensure selecting and deselecting countries correctly updates the `countriesFilter` state.
    
- **Test the `handleCleanFilters` function:**
    
    Verify that clicking the "Clear" button removes all selected cities and countries from the filters.
    
- **Test the loader behavior:**
    
    Ensure that the loader is shown while data is being fetched and hidden once the data is loaded.
    
- **Test rendering of charts (`SalesBarChart` and `OrdersBarChart`):**
    
    Verify that the chart components render correctly once data is available.
    
- **Test the `Select` component behavior:**
    
    Verify that when a year is selected, the correct temporal range is updated and passed to the chart.
    
- **Test filter updates:**
    
    Verify that cities and countries selected through the popovers are displayed as tags and updated properly in the filter UI.
    
- **Test error handling in `getData`:**
    
    Ensure that the component gracefully handles errors if the API request fails and shows an appropriate error message or fallback UI.
    

### Chart Component:

- **Test rendering of the component:**
    
    Ensure that the `SalesBarChart` renders correctly with given data and cities.
    
- **Test `calculateTotals` function:**
    
    Verify that the totals for each city are correctly calculated and included in the `totalsData`.
    
- **Test `calculateGrandTotal` function:**
    
    Ensure that the grand total is calculated correctly by summing up all the sales from all cities.
    
- **Test the correct rendering of the total amount:**
    
    Verify that the grand total is formatted correctly as currency (USD).
    
- **Test the rendering of the bar chart:**
    
    Ensure that the `BarChart` from `recharts` correctly displays bars for each city based on the data passed to it.
    
- **Test that the `Bar` components are rendered:**
    
    Ensure that a `Bar` component is rendered for each city in the `cities` array.
    

### Auth Context:

- **Test the `AuthProvider` rendering:**
    
    Ensure that the `AuthProvider` component correctly renders its children and provides the necessary context (`login`, `logout`, and `token`).
    
- **Test the `login` function:**
    
    Verify that the `login` function correctly calls `security.signIn` with the provided username and password.
    
    Ensure that the token is correctly set using `security.setToken` and the state is updated via `setToken`.
    
    Check that the returned token is properly passed to the `AuthContext`.
    
- **Test the `logout` function:**
    
    Ensure that calling `logout` clears the token using `security.clearToken()` and redirects to the sign-in page via `window.location.href`.
    
    Verify that `security.clearToken()` is invoked when the `logout` function is called.
    
- **Test the `token` state:**
    
    Verify that the token is correctly initialized from `security.getToken()`.
    
    Ensure that the `token` state is updated correctly when a new token is set via the `login` function.
    
- **Test the `login` function error handling:**
    
    Simulate an error during the `signIn` API call and ensure that the hook handles the error correctly, such as by displaying an error message or returning a rejected promise.
    
- **Test the `logout` redirection:**
    
    Ensure that after logging out, the user is redirected to the `signIn` page, i.e., `window.location.href` is set to the sign-in route.