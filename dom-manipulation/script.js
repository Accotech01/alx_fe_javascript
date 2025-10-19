
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

// Add quote to quotes array and save to local storage
function addQuote(quote, category) {
  quotes.push({ quote, category });
  saveQuotes();
  populateCategories();
}

// Generate quote HTML
function generateQuoteHTML(quote) {
  return `
    <blockquote>
      <p>${quote.quote}</p>
      <footer>${quote.category}</footer>
    </blockquote>
  `;
}

// Display quotes
function displayQuotes(quotesToDisplay = quotes) {
  const quoteContainer = document.getElementById('quote-container');
  quoteContainer.innerHTML = '';
  quotesToDisplay.forEach((quote) => {
    quoteContainer.innerHTML += generateQuoteHTML(quote);
  });
}

// Populate categories dynamically
function populateCategories() {
  const categories = [...new Set(quotes.map((quote) => quote.category))];
  const categoryFilter = document.getElementById('categoryFilter');
  categoryFilter.innerHTML = '<option value="all">All Categories</option>';
  categories.forEach((category) => {
    const option = document.createElement('option');
    option.value = category;
    option.text = category;
    categoryFilter.appendChild(option);
  });
  const lastSelectedCategory = localStorage.getItem('lastSelectedCategory');
  if (lastSelectedCategory) {
    categoryFilter.value = lastSelectedCategory;
    filterQuotes();
  }
}

// Filter quotes based on selected category
function filterQuotes() {
  const selectedCategory = document.getElementById('categoryFilter').value;
  localStorage.setItem('lastSelectedCategory', selectedCategory);
  if (selectedCategory === 'all') {
    displayQuotes();
  } else {
    const filteredQuotes = quotes.filter((quote) => quote.category === selectedCategory);
    displayQuotes(filteredQuotes);
  }
}

// Create add quote form event listener
document.getElementById('add-quote-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const newQuote = document.getElementById('new-quote').value;
  const newCategory = document.getElementById('new-category').value;
  addQuote(newQuote, newCategory);
  displayQuotes();
  document.getElementById('new-quote').value = '';
  document.getElementById('new-category').value = '';
});

// Export quotes to JSON file
function exportToJsonFile() {
  const json = JSON.stringify(quotes);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'quotes.json';
  a.click();
  URL.revokeObjectURL(url);
}

// Import quotes from JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(event) {
    const importedQuotes = JSON.parse(event.target.result);
    quotes.push(...importedQuotes);
    saveQuotes();
    populateCategories();
    displayQuotes();
    alert('Quotes imported successfully!');
  };
  fileReader.readAsText(event.target.files[0]);
}

// Initialize application
function init() {
  loadQuotes();
  displayQuotes();
  populateCategories();

  // Add event listener for export button
  document.getElementById('export-btn').addEventListener('click', exportToJsonFile);

  // Add event listener for import file input
  document.getElementById('importFile').addEventListener('change', importFromJsonFile);
}

init();