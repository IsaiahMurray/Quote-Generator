const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

//Show Loading
const loading = () => {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//Hide Loading
const complete = () =>{
    quoteContainer.hidden = false;
    loader.hidden = true;
}

//New Quote
const newQuote = () => {
    loading();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    //Check if author field is blank
    if(!quote.author){
        authorText.textContent = 'Unknown';
    } else{
        authorText.textContent = quote.author;
    }

    //Check quote length to determine styling
    if(quote.text.length > 120){
        quoteText.classList.add('long-quote');
    } else{
        quoteText.classList.remove('long-quote')
    }

    //Set Quote, hide Loader
    quoteText.textContent = quote.text;
    complete();
}


// Get Quotes from API
const getQuotes = async () => {
    loading();
    const url = `https://type.fit/api/quotes`;

    try{
        const res = await fetch(url);
        apiQuotes = await res.json();
        newQuote();
    } catch (error){
        getQuote();
        console.log('Error: ', error)
    }
}

//Tweet Quote
const tweetQuote = () =>{
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

//Event  Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

getQuotes();