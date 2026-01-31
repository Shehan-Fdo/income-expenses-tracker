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
  const now = new Date();
  const diffMs = now - date;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  let dateStr = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  // Add "X days ago" for recent transactions
  if (diffDays < 1) {
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    if (hours < 1) {
      const minutes = Math.floor(diffMs / (1000 * 60));
      return minutes === 0 ? 'Just now' : `${minutes}m ago`;
    }
    return `${hours}h ago`;
  } else if (diffDays === 1) {
    return 'Yesterday';
  } else if (diffDays < 7) {
    return `${dateStr} (${diffDays}d ago)`;
  }

  return dateStr;
};

// Fetch and display summary
async function fetchSummary() {
  try {
    const response = await fetch(`${API_URL}/summary`);
    if (!response.ok) throw new Error('Failed to fetch summary');
    const data = await response.json();

    document.getElementById('totalIncome').textContent = formatCurrency(data.income);
    document.getElementById('totalExpense').textContent = formatCurrency(data.expense);
    document.getElementById('balance').textContent = formatCurrency(data.balance);

    // Color code balance
    const balanceEl = document.getElementById('balance');
    if (data.balance >= 0) {
      balanceEl.style.color = 'var(--primary)';
      balanceEl.closest('.card').querySelector('.icon').className = 'icon balance-icon';
    } else {
      balanceEl.style.color = 'var(--danger)';
      balanceEl.closest('.card').querySelector('.icon').className = 'icon balance-icon';
    }
  } catch (err) {
    console.error('Error fetching summary:', err);
  }
}

// Fetch and display transactions
async function fetchTransactions() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Failed to fetch transactions');
    const transactions = await response.json();

    const listEl = document.getElementById('transactionsList');

    if (transactions.length === 0) {
      listEl.innerHTML = `
        <div class="empty-state">
          <p>No transactions yet</p>
          <small>Add your first transaction to get started</small>
        </div>
      `;
      return;
    }

    listEl.innerHTML = transactions.map((t, index) => `
      <div class="transaction" style="background: ${index % 2 === 0 ? 'var(--gray-50)' : 'transparent'}">
        <div class="transaction-info">
          <h4>${t.description || 'No description'}</h4>
          <div class="transaction-meta">
            ${t.category ? `<span class="category-badge">${t.category}</span>` : ''}
            <span>${formatDate(t.created_at)}</span>
          </div>
        </div>
        <div class="transaction-actions">
          <span class="amount-display ${t.type}">
            ${t.type === 'income' ? '+' : '-'}${formatCurrency(t.amount)}
          </span>
          <button class="delete-btn" aria-label="Delete transaction: ${t.description || 'No description'}" onclick="deleteTransaction(${t.id}, '${t.description || 'No description'}')">
            Delete
          </button>
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

  const form = document.getElementById('transactionForm');
  const submitBtn = form.querySelector('.btn-primary');

  // Validate
  const type = document.getElementById('type').value;
  const amount = parseFloat(document.getElementById('amount').value);
  const description = document.getElementById('description').value;
  const category = document.getElementById('category').value;

  if (!type || !amount) {
    alert('Please fill in type and amount');
    return;
  }

  // Loading state
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Adding...';
  submitBtn.disabled = true;
  submitBtn.style.opacity = '0.7';

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, amount, description, category })
    });

    if (response.ok) {
      // Reset form
      form.reset();
      // Restore button
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      submitBtn.style.opacity = '1';
      // Refresh data
      fetchSummary();
      fetchTransactions();
    } else {
      const error = await response.json();
      alert(error.error || 'Failed to add transaction. Please try again.');
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      submitBtn.style.opacity = '1';
    }
  } catch (err) {
    console.error('Error adding transaction:', err);
    alert('Failed to add transaction. Please try again.');
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
    submitBtn.style.opacity = '1';
  }
}

// Delete transaction
async function deleteTransaction(id, description) {
  if (!confirm(`Are you sure you want to delete: ${description}?`)) {
    return;
  }

  const btn = event.target;
  const originalText = btn.textContent;
  btn.textContent = 'Deleting...';
  btn.disabled = true;
  btn.style.opacity = '0.7';

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      fetchSummary();
      fetchTransactions();
    } else {
      alert('Failed to delete transaction. Please try again.');
      btn.textContent = originalText;
      btn.disabled = false;
      btn.style.opacity = '1';
    }
  } catch (err) {
    console.error('Error deleting transaction:', err);
    alert('Failed to delete transaction. Please try again.');
    btn.textContent = originalText;
    btn.disabled = false;
    btn.style.opacity = '1';
  }
}

// Initialize
document.getElementById('transactionForm').addEventListener('submit', addTransaction);
fetchSummary();
fetchTransactions();
