## Prerequisites

Make sure you have the following installed:

- **Node.js** (v18 or above recommended)
- **npm** (comes with Node.js)
- **Git**

Verify installation:

```bash
node -v
npm -v
git --version
```

## Clone the Repository

```bash
git clone https://github.com/kalpita29naik/todoApp.git
cd todoApp
```

## Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

   3.Start Backend Server:

   ```bash
   npm run dev
   ```

   The backend server should now be running on `http://localhost:5000`.

## Frontend Setup

1. Open a new terminal window and navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create an environment variable file:
   Create a file named `.env` inside the frontend folder and add:

   ```typescript
   VITE_API_BASE_URL=http://localhost:5000
   ```

4. Start Frontend Server:

   ```bash
   npm run dev
   ```

   The frontend server should now be running on `http://localhost:5173`.
