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
  const quoteContainer = document.getElementById('quote-container');
  quoteContainer.innerHTML = '';
  quotesToDisplay.forEach((quote) => {
    quoteContainer.appendChild(generateQuoteHTML(quote));
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
  const filteredQuotes = quotes.filter((quote) => selectedCategory === 'all' || quote.category === selectedCategory);
  displayQuotes(filteredQuotes);
}

// Create add quote form event listener
document.addEventListener('DOMContentLoaded', () => {
  const addQuoteForm = document.getElementById('add-quote-form');
  addQuoteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newQuote = document.getElementById('new-quote').value;
    const newCategory = document.getElementById('new-category').value;
    addQuote(newQuote, newCategory);
    displayQuotes();
    document.getElementById('new-quote').value = '';
    document.getElementById('new-category').value = '';
  });

  // Add event listener for export button
  const exportBtn = document.getElementById('export-btn');
  exportBtn.addEventListener('click', () => {
    const json = JSON.stringify(quotes);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    a.click();
    URL.revokeObjectURL(url);
  });

  // Add event listener for import file input
  const importFileInput = document.getElementById('importFile');
  importFileInput.addEventListener('change', (e) => {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
      const importedQuotes = JSON.parse(event.target.result);
      quotes.push(...importedQuotes);
      saveQuotes();
      populateCategories();
      displayQuotes();
      alert('Quotes imported successfully!');
    };
    fileReader.readAsText(e.target.files[0]);
  });

  // Initialize application
  loadQuotes();
  displayQuotes();
  populateCategories();
});