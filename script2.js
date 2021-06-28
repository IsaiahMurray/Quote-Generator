const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');


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

//Get quote from API
const getQuote = async() => {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try{
        const res = await fetch(proxyUrl + apiUrl);
        const data = await res.json();

        if(data.quoteAuthor === ''){
            authorText.innerText = 'Unknown';
        } else {
            authorText.innerText = data.quoteAuthor;
        }

        if(quote.text.length > 120){
            quoteText.classList.add('long-quote');
        } else{
            quoteText.classList.remove('long-quote')
        }

        quoteText.innerText = data.quoteText;

    } catch(error){
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