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
  const formHtml = `
    <form id="addQuoteForm">
            <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
            <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
            <button onclick="addQuote()">Add Quote</button>
    </form>
  `;
  const quoteDisplay = document.getElementById("formField");
  quoteDisplay.innerHTML = formHtml;

  const addQuoteForm = document.getElementById("addQuoteForm");
  addQuoteForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const quoteText = document.getElementById("newQuoteText").value;
    const quoteCategory = document.getElementById("newQuoteCategory").value;
    quotes.push({ text: quoteText, category: quoteCategory });
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
setInterval(showRandomQuote, 3000)
