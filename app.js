// API endpoints
const API_URL = '/api/transactions';

// Format currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

// Format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Fetch and display summary
async function fetchSummary() {
  try {
    const response = await fetch(`${API_URL}/summary`);
    const data = await response.json();

    document.getElementById('totalIncome').textContent = formatCurrency(data.income);
    document.getElementById('totalExpense').textContent = formatCurrency(data.expense);
    document.getElementById('balance').textContent = formatCurrency(data.balance);

    // Color code balance
    const balanceEl = document.getElementById('balance');
    balanceEl.style.color = data.balance >= 0 ? 'var(--primary)' : 'var(--danger)';
  } catch (err) {
    console.error('Error fetching summary:', err);
  }
}

// Fetch and display transactions
async function fetchTransactions() {
  try {
    const response = await fetch(API_URL);
    const transactions = await response.json();

    const listEl = document.getElementById('transactionsList');

    if (transactions.length === 0) {
      listEl.innerHTML = '<p class="empty">No transactions yet. Add your first one above!</p>';
      return;
    }

    listEl.innerHTML = transactions.map(t => `
      <div class="transaction ${t.type}">
        <div class="transaction-info">
          <h4>${t.description || 'No description'}</h4>
          <div class="transaction-meta">
            ${t.category ? `<span class="category">${t.category}</span> • ` : ''}
            <span class="date">${formatDate(t.created_at)}</span>
          </div>
        </div>
        <div class="transaction-amount">
          <span class="amount ${t.type}">
            ${t.type === 'income' ? '+' : '-'}${formatCurrency(t.amount)}
          </span>
          <button class="delete-btn" onclick="deleteTransaction(${t.id})">Delete</button>
        </div>
      </div>
    `).join('');
  } catch (err) {
    console.error('Error fetching transactions:', err);
  }
}

// Add transaction
async function addTransaction(e) {
  e.preventDefault();

  const type = document.getElementById('type').value;
  const amount = parseFloat(document.getElementById('amount').value);
  const description = document.getElementById('description').value;
  const category = document.getElementById('category').value;

  if (!type || !amount) {
    alert('Please fill in type and amount');
    return;
  }

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, amount, description, category })
    });

    if (response.ok) {
      // Reset form
      document.getElementById('transactionForm').reset();
      // Refresh data
      fetchSummary();
      fetchTransactions();
    } else {
      const error = await response.json();
      alert(error.error || 'Failed to add transaction');
    }
  } catch (err) {
    console.error('Error adding transaction:', err);
    alert('Failed to add transaction. Please try again.');
  }
}

// Delete transaction
async function deleteTransaction(id) {
  if (!confirm('Are you sure you want to delete this transaction?')) {
    return;
  }

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      fetchSummary();
      fetchTransactions();
    } else {
      alert('Failed to delete transaction');
    }
  } catch (err) {
    console.error('Error deleting transaction:', err);
    alert('Failed to delete transaction. Please try again.');
  }
}

// Initialize
document.getElementById('transactionForm').addEventListener('submit', addTransaction);
fetchSummary();
fetchTransactions();
