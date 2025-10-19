// Initialize quotes array
let quotes = [];
let lastSyncTime = null;

// Load quotes from local storage
function loadQuotes() {
  const storedQuotes = localStorage.getItem('quotes');
  if (storedQuotes) {
    quotes = JSON.parse(storedQuotes);
  }
}

// Save quotes to local storage
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Simulate server URL
const serverUrl = 'https://jsonplaceholder.typicode.com/posts';

// Fetch quotes from server
async function fetchQuotesFromServer() {
  try {
    const response = await fetch(serverUrl);
    const serverQuotes = await response.json();
    return serverQuotes.map((quote) => ({
      quote: quote.title,
      category: 'Server Quote',
    }));
  } catch (error) {
    console.error('Error fetching quotes from server:', error);
    return [];
  }
}

// Sync local quotes with server quotes
async function syncQuotes() {
  const serverQuotes = await fetchQuotesFromServer();
  const mergedQuotes = mergeQuotes(quotes, serverQuotes);
  quotes = mergedQuotes;
  saveQuotes();
  displayQuotes();
  notifyUser('Quotes synced with server');
}

// Merge local and server quotes
function mergeQuotes(localQuotes, serverQuotes) {
  const mergedQuotes = [...localQuotes];
  serverQuotes.forEach((serverQuote) => {
    const existingQuoteIndex = mergedQuotes.findIndex((quote) => quote.quote === serverQuote.quote);
    if (existingQuoteIndex !== -1) {
      mergedQuotes[existingQuoteIndex] = serverQuote;
    } else {
      mergedQuotes.push(serverQuote);
    }
  });
  return mergedQuotes;
}

// Notify user of updates
function notifyUser(message) {
  const notificationElement = document.getElementById('notification');
  notificationElement.textContent = message;
  notificationElement.style.display = 'block';
  setTimeout(() => {
    notificationElement.style.display = 'none';
  }, 3000);
}

// Periodic sync
setInterval(syncQuotes, 60000); // Sync every 1 minute

// Add quote to quotes array and save to local storage
function addQuote(quote, category) {
  quotes.push({ quote, category });
  saveQuotes();
  displayQuotes();
}

// Generate quote HTML
function generateQuoteHTML(quote) {
  const blockquote = document.createElement('blockquote');
  const p = document.createElement('p');
  p.textContent = quote.quote;
  const footer = document.createElement('footer');
  footer.textContent = quote.category;
  blockquote.appendChild(p);
  blockquote.appendChild(footer);
  return blockquote;
}

// Display quotes
function displayQuotes(quotesToDisplay = quotes) {
  const quoteDisplay = document.getElementById('quote-display');
  quoteDisplay.innerHTML = '';
  quotesToDisplay.forEach((quote) => {
    quoteDisplay.appendChild(generateQuoteHTML(quote));
  });
}

// Populate categories dynamically
function populateCategories() {
  const categories = [...new Set(quotes.map((quote) => quote.category))];
  const categoryFilter = document.getElementById('categoryFilter');
  categoryFilter.innerHTML = '';
  const allOption = document.createElement('option');
  allOption.value = 'all';
  allOption.textContent = 'All Categories';
  categoryFilter.appendChild(allOption);
  categories.forEach((category) => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
}

// Filter quotes based on selected category
function filterQuotes() {
  const selectedCategory = document.getElementById('categoryFilter').value;
  const filteredQuotes = quotes.filter((quote) => selectedCategory === 'all' || quote.category === selectedCategory);
  displayQuotes(filteredQuotes);
}

// Create add quote form event listener
document.addEventListener('DOMContentLoaded', () => {
  loadQuotes();
  displayQuotes();
  populateCategories();
  syncQuotes();

  const addQuoteForm = document.getElementById('add-quote-form');
  addQuoteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newQuote = document.getElementById('new-quote').value;
    const newCategory = document.getElementById('new-category').value;
    addQuote(newQuote, newCategory);
    document.getElementById('new-quote').value = '';
    document.getElementById('new-category').value = '';
  });

  const categoryFilter = document.getElementById('categoryFilter');
  categoryFilter.addEventListener('change', filterQuotes);
});