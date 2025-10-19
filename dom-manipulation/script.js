// Initialize quotes array
let quotes = [];

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
      category: quote.body,
    }));
  } catch (error) {
    console.error('Error fetching quotes from server:', error);
    return [];
  }
}

// Post quote to server
async function postQuoteToServer(quote) {
  try {
    const response = await fetch(serverUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: quote.quote,
        body: quote.category,
      }),
    });
    const serverResponse = await response.json();
    console.log('Quote posted to server:', serverResponse);
  } catch (error) {
    console.error('Error posting quote to server:', error);
  }
}

// Sync quotes with server
async function syncQuotes() {
  const serverQuotes = await fetchQuotesFromServer();
  if (JSON.stringify(serverQuotes) !== JSON.stringify(quotes)) {
    quotes = serverQuotes;
    saveQuotes();
    displayQuotes();
    alertQuotesSynced();
  }
}

// Alert quotes synced
function alertQuotesSynced() {
  alert('Quotes synced with server');
}

// Add quote to quotes array and save to local storage
function addQuote(quote, category) {
  quotes.push({ quote, category });
  saveQuotes();
  postQuoteToServer({ quote, category });
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

// Create add quote form event listener
document.addEventListener('DOMContentLoaded', () => {
  loadQuotes();
  displayQuotes();
  syncQuotes();

  setInterval(syncQuotes, 30000); // Sync quotes every 30 seconds

  const addQuoteForm = document.getElementById('add-quote-form');
  addQuoteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newQuote = document.getElementById('new-quote').value;
    const newCategory = document.getElementById('new-category').value;
    addQuote(newQuote, newCategory);
    document.getElementById('new-quote').value = '';
    document.getElementById('new-category').value = '';
  });
});