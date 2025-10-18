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
function displayQuotes() {
  const quoteContainer = document.getElementById('quote-container');
  quoteContainer.innerHTML = '';
  quotes.forEach((quote) => {
    quoteContainer.innerHTML += generateQuoteHTML(quote);
  });
}

// Load last viewed quote from session storage
function loadLastViewedQuote() {
  const lastViewedQuoteIndex = sessionStorage.getItem('lastViewedQuoteIndex');
  if (lastViewedQuoteIndex) {
    const lastViewedQuote = quotes[lastViewedQuoteIndex];
    document.getElementById('quote-container').innerHTML = generateQuoteHTML(lastViewedQuote);
  }
}

// Save last viewed quote to session storage
function saveLastViewedQuote(index) {
  sessionStorage.setItem('lastViewedQuoteIndex', index);
}

// Create add quote form
function createAddQuoteForm() {
// Create form element
const form = document.createElement('form');
form.id = 'addQuoteForm';

// Create input element for quote text
const quoteTextInput = document.createElement('input');
quoteTextInput.id = 'newQuoteText';
quoteTextInput.type = 'text';
quoteTextInput.placeholder = 'Enter a new quote';

// Create input element for quote category
const quoteCategoryInput = document.createElement('input');
quoteCategoryInput.id = 'newQuoteCategory';
quoteCategoryInput.type = 'text';
quoteCategoryInput.placeholder = 'Enter quote category';

// Create button element
const addButton = document.createElement('button');
addButton.textContent = 'Add Quote';
addButton.id = addQuote;

// Append elements to form
form.appendChild(quoteTextInput);
form.appendChild(quoteCategoryInput);
form.appendChild(addButton);

// Append form to body or a specific element
document.getElementById('quote-container').appendChild(form);

const quoteCount = document.getElementById('quoteCount');


  
  addButton.addEventListener("click", (e) => {
    e.preventDefault();
    const quoteText = document.getElementById("newQuoteText").value;
    const quoteCategory = document.getElementById("newQuoteCategory").value;
    quotes.push({ text: quoteText, category: quoteCategory });

    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";

    const countQuotes = quotes.length;

    quoteCount.innerHTML = countQuotes;
    
  });


}

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
    displayQuotes();
    alert('Quotes imported successfully!');
  };
  fileReader.readAsText(event.target.files[0]);
}

// Initialize application
function init() {
  loadQuotes();
  displayQuotes();
  createAddQuoteForm();

  // Add event listener for export button
  document.getElementById('export-btn').addEventListener('click', exportToJsonFile);

  // Add event listener for import file input
  document.getElementById('importFile').addEventListener('change', importFromJsonFile);

  // Display last viewed quote
  loadLastViewedQuote();
}

init();
