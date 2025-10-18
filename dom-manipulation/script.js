// Array of quote objects
let quotes = [
  { text: "Believe you can and you're halfway there.", category: "Inspiration" },
  { text: "The only way to do great work is to love what you do.", category: "Motivation" },
  { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", category: "Inspiration" },
  { text: "Don't watch the clock; do what it does. Keep going.", category: "Motivation" },
  { text: "You miss 100% of the shots you don't take.", category: "Inspiration" }
];

// Function to display a random quote
function showRandomQuote() {
  const quoteDisplay = document.getElementById("quoteDisplay");
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  quoteDisplay.innerHTML = `
    <p>${randomQuote.text}</p>
    <p>Category: ${randomQuote.category}</p>
  `;
}

const newQuoteForm = document.getElementById('newQuote');

newQuoteForm.addEventListener('click', createAddQuoteForm)

// Function to create a form to add new quotes
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
document.getElementById('formField').appendChild(form);

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



// Event listener for the new quote button
function addQuote() {
  const random = Math.random();
  if (random < 0.5) {
    showRandomQuote();
  } else {
    createAddQuoteForm();
  }
};

// Display a random quote on page load
setInterval(showRandomQuote, 2000)
