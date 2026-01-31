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
- **Database:** PostgreSQL (Neon)
- **Frontend:** Vanilla HTML/CSS/JavaScript (no framework required)
- **Styling:** Modern CSS with gradients and smooth animations

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd income-expenses-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
DATABASE_URL=your_neon_database_url
PORT=3000
```

4. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

5. Open your browser and navigate to:
```
http://localhost:3000
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

## License

MIT

## Author

Built with ❤️ by Aris
