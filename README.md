# 💰 Income & Expenses Tracker

A simple, clean web app to track your income and expenses with real-time summaries.

## Features

- ✅ Add income and expense transactions
- ✅ View real-time financial summary (total income, expenses, balance)
- ✅ Transaction history with timestamps
- ✅ Delete transactions
- ✅ Category tagging
- ✅ Responsive design (works on mobile and desktop)
- ✅ Beautiful, modern UI

## Tech Stack

- **Backend:** Node.js + Express
- **Database:** PostgreSQL (Neon cloud database)
- **Frontend:** Vanilla HTML/CSS/JavaScript (no framework required)
- **Styling:** Modern CSS with gradients and smooth animations
- **Deployment:** Docker, Vercel, or traditional hosting

## Quick Deploy with Docker 🐳

### Prerequisites

- Docker installed on your machine
- A [Neon](https://neon.tech) PostgreSQL database

### Step 1: Clone the Repository

```bash
git clone https://github.com/Shehan-Fdo/income-expenses-tracker.git
cd income-expenses-tracker
```

### Step 2: Set Environment Variables

Create a `.env` file:
```env
DATABASE_URL=your_neon_database_url
PORT=3000
```

### Step 3: Run with Docker Compose

```bash
docker compose up -d
```

The app will be available at http://localhost:3000

### Docker Commands

```bash
# Start container
docker compose up -d

# Stop container
docker compose down

# View logs
docker compose logs

# Restart container
docker compose restart

# Rebuild container
docker compose up -d --build
```

### Container Details

- **Base Image:** node:18-alpine
- **User:** Non-root user (uid: 1001)
- **Port:** 3000
- **Restart Policy:** unless-stopped
- **Security:** Minimal Alpine Linux base, non-root execution

## Deploy on Vercel ☁️

See [DEPLOY.md](DEPLOY.md) for detailed Vercel deployment instructions.

### Quick Vercel Deploy

1. Go to https://vercel.com/new
2. Import the GitHub repository
3. Add `DATABASE_URL` environment variable
4. Click **Deploy**

## Traditional Hosting 🏠

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Shehan-Fdo/income-expenses-tracker.git
cd income-expenses-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```env
DATABASE_URL=your_neon_database_url
PORT=3000
```

4. Initialize database:
```bash
node scripts/init-db.js
```

5. Start the server:
```bash
npm start
```

### Using PM2 for Production

```bash
# Install PM2 globally
npm install -g pm2

# Start the app
pm2 start server.js --name income-tracker

# Save PM2 configuration
pm2 save

# Set PM2 to start on system boot
pm2 startup
```

## API Endpoints

### Get All Transactions
```
GET /api/transactions
```

### Get Summary
```
GET /api/transactions/summary
```
Returns: `{ income, expense, balance }`

### Add Transaction
```
POST /api/transactions
Body: {
  "type": "income" | "expense",
  "amount": 100.50,
  "description": "Salary",
  "category": "Work"
}
```

### Delete Transaction
```
DELETE /api/transactions/:id
```

## Database Schema

```sql
CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  type VARCHAR(10) NOT NULL CHECK (type IN ('income', 'expense')),
  amount DECIMAL(10, 2) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `DATABASE_URL` | Neon PostgreSQL connection string | Yes | - |
| `PORT` | Port for the server | No | 3000 |

## Project Structure

```
income-expenses-tracker/
├── api/              # Vercel serverless functions
│   └── transactions/
├── db/               # Database configuration
│   ├── db.js
│   └── init.sql
├── public/            # Static files (frontend)
│   ├── index.html
│   ├── app.js
│   └── style.css
├── routes/           # Express routes
│   └── transactions.js
├── scripts/          # Utility scripts
│   └── init-db.js
├── Dockerfile        # Docker image configuration
├── docker-compose.yml # Docker Compose configuration
├── server.js        # Express server entry point
└── package.json
```

## Development

### Local Development

```bash
npm install
npm run dev  # Uses nodemon for auto-reload
```

### Docker Development

```bash
docker compose up
# View logs and hot-reload on file changes
```

## License

MIT

## Author

Built with ❤️ by Aris
