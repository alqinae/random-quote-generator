/******************************************
 Treehouse FSJS Techdegree:
 project 1 - A Random Quote Generator
 ******************************************/

// For assistance: 
// Check the "Project Resources" section of the project instructions
// Reach out in your Slack community - https://treehouse-fsjs-102.slack.com/app_redirect?channel=chit-chat

/***
 * `quotes` array
 ***/

/***
 * `quotes` array is an array of objects. Each object has two mandatory properties which are `quote` and `source`
 * Also, it has three optional properties which are `citation`, `year` and `tags`
 ***/

const quotes = [
    {
        quote: 'I am the one who knocks.',
        source: 'Walter White',
        citation: 'Breaking Bad: Season 6 Episode 4',
        year: 2011,
        tags: ['TV Shows']
    },
    {
        quote: 'To be, or not to be, that is the question.',
        source: 'Prince Hamlet',
        citation: 'The Tragedy of Hamlet, Prince of Denmark by William Shakespeare',
        tags: ['Plays']
    },
    {
        quote: 'Two things are infinite: the universe and human stupidity; and I\'m not sure about the universe.',
        source: 'Albert Einstein',
        tags: ['Einstein\'s Quotes']
    },
    {
        quote: 'I\'ve missed more than 9,000 shots in my career. I\'ve lost almost 300 games.' +
            '26 times I\'ve been trusted to take the game winning shot and missed.' +
            'I\'ve failed over and over and over again in my life and that is why I succeed.',
        source: 'Michael Jordan',
        tags: ['NBA', 'Sports', 'Success', 'Motivational', 'Inspirational']
    },
    {
        quote: 'The best time to plant a tree was 20 years ago. The second best time is now.',
        source: 'Chinese Proverb',
        tags: ['Proverbs', 'Chinese Quotes', 'Translated Quotes']
    },
    {
        quote: 'That\'s one small step for man, one giant leap for mankind.',
        source: 'Neil Armstrong',
        year: 1969,
    },
    {
        quote: 'War does not determine who is right - only who is left.',
        source: 'Bertrand Russell',
        tags: ['Double Meanings']
    },
    {
        quote: 'I am thinking, therefore I exist.',
        source: 'René Descartes',
        tags: ['Philosophy']
    }
];

/***
 * `getRandomNumber` function
 ***/
// This function generates a random number between two bounds. It is lower bound inclusive and higher bound exclusive
function getRandomNumber(lowestBound, highestBound) {
    return Math.floor(Math.random() * (highestBound - lowestBound) + lowestBound);
}


/***
 * `getRandomQuote` function
 ***/
// This function generates a random index and return its corresponding quote from the `quotes` array by using `getRandomNumber`
function getRandomQuote() {
    const randomIndex = getRandomNumber(0, quotes.length);
    return quotes[randomIndex];
}


/***
 * `getRandomRGB` function
 ***/
// This function generates a random color by specifying red, green and blue (RGB) values
function getRandomRGB() {
    const red = getRandomNumber(0, 256);
    const green = getRandomNumber(0, 256);
    const blue = getRandomNumber(0, 256);
    return `rgb(${red}, ${green}, ${blue})`;
}


/***
 * `printQuote` function
 ***/
/***
 * This function is the function responsible of changing the quote.
 */
function printQuote() {
    // Getting a random quote
    const quote = getRandomQuote();
    // Getting a random background color
    let randomBackgroundColorRGB = getRandomRGB();
    // Start building the html variable. As you can notice, I didn't close the second </p> tag because maybe we will add more data
    let html = `
        <p class="quote">${quote.quote}</p>
        <p class="source">${quote.source}
    `
    // If a citation exists, display it
    if (Object.keys(quote).includes('citation')) {
        html += `<span class="citation">${quote.citation}</span>`;
    }
    // If a year exists, display it
    if (Object.keys(quote).includes('year')) {
        html += `<span class="year">${quote.year}</span>`;
    }
    // For the previous two if-statements, we didn't write it as if..else if because maybe one of them exists only
    // closing the </p> which we opened previously
    html += `</p>`;
    // We will check if there are tags included into the quote
    if (Object.keys(quote).includes('tags')) {
        // Starting an unordered list which will be displayed as inline-block
        html += `Tags: <ul>`
        for (let i = 0; i < quote.tags.length; i++) {
            // Generating a random text color
            const randomTextColorRGB = getRandomRGB();
            // The following loop will break if we generated a background color different than the text color.
            // I did this because I want to ensure that the tag will be visible.
            // I used do..while because I want to loop to be run at least once.
            do {
                randomBackgroundColorRGB = getRandomRGB();
            } while (randomTextColorRGB === randomBackgroundColorRGB);
            // Configuring the style for the current tag
            const style = `
            border: 5px solid ${randomBackgroundColorRGB};
            border-radius: 10px;
            margin: 5px 10px 5px 10px;
            padding: 15px;
            display: inline-block;
            background-color: ${randomBackgroundColorRGB};
            color: ${randomTextColorRGB};
            `;
            // Adding the list item to our html variable
            html += `<li style="${style}">${quote.tags[i]}</li>`;
        }
        // Closing the unordered list tag
        html += `</ul>`;
    }
    // Getting the quoteBox object
    const quoteBox = document.querySelector('#quote-box');
    // Updating the quote by replacing the innerHTML
    quoteBox.innerHTML = html;
    // Changing the whole page background
    document.querySelector('body').style.backgroundColor = randomBackgroundColorRGB;
}

// This built-in JavaScript function acts as a timer. Every 5000 milliseconds, which is 5 seconds, a new quote will be displayed
setInterval(() => printQuote(), 5000);

/***
 * click event listener for the print quote button
 * DO NOT CHANGE THE CODE BELOW!!
 ***/

document.getElementById('load-quote').addEventListener("click", printQuote, false);