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

- **Platform:** Vercel (serverless functions)
- **Database:** PostgreSQL (Neon)
- **Frontend:** Vanilla HTML/CSS/JavaScript (no framework required)
- **Styling:** Modern CSS with gradients and smooth animations

## Deploy on Vercel 🚀

### Prerequisites

- A [Neon](https://neon.tech) PostgreSQL database
- A [Vercel](https://vercel.com) account

### Step 1: Clone the Repository

```bash
git clone https://github.com/Shehan-Fdo/income-expenses-tracker.git
cd income-expenses-tracker
```

### Step 2: Initialize Database

1. Copy your Neon database connection string
2. Create a `.env` file:
```env
DATABASE_URL=your_neon_database_url
```

3. Run the database initialization script:
```bash
node scripts/init-db.js
```

This will create the necessary tables in your Neon database.

### Step 3: Deploy to Vercel

**Option A: Using Vercel CLI**

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel login
vercel
```

3. Follow the prompts:
   - Link to your existing project or create new
   - Set `DATABASE_URL` environment variable in Vercel dashboard
   - Confirm deployment

**Option B: Using Vercel Dashboard**

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Configure project settings:
   - Add `DATABASE_URL` environment variable with your Neon connection string
   - Framework preset: "Other"
4. Click "Deploy"

### Step 4: Access Your App

After deployment, Vercel will give you a URL like:
```
https://income-expenses-tracker.vercel.app
```

## Local Development

To run locally (for testing):

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file with your database URL:
```env
DATABASE_URL=your_neon_database_url
```

3. Run Vercel dev server:
```bash
npm run dev
```

4. Open http://localhost:3000

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

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | Neon PostgreSQL connection string | Yes |

## License

MIT

## Author

Built with ❤️ by Aris
