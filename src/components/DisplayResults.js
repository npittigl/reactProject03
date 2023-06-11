// Import hooks from React library
import { useState, useEffect } from 'react';
// Import children components/data
import Form from './Form.js';
import Polaroid from './Polaroid.js';
import Button from './Button.js';
import imagesToRemove from './imagesToRemove.js';
// import styles
import '../styles/DisplayResults.css';


// function to display results
function DisplayResults() {
    // defined stateful variables
    const [quotes, setQuotes] = useState([]);
    const [images, setImages] = useState([]);
    const [mergedArray, setMergedArray] = useState([]);
    const [displayCount, setDisplayCount] = useState(0);
    const [apiError, setApiError] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);

    // number of random quotes to generate
    const numQuotesToGenerate = 30;

    // useEffect to merge quotes & images array; update mergedArray state and to rerender when quotes/images state changes
    useEffect(() => {
        // map over each image object to merge with quote object of corresponding index number from quotes array
        const quotesAndImages = images.map((item, index) => {
            return { ...item, ...quotes[index] };
        });

        // update mergedArray state
        setMergedArray(quotesAndImages);

        // dependency array so component rerenders when quotes/images state changes
    }, [quotes, images]);

    // function to make api calls
    const getApiData = async (quoteTopic) => {
        // stored url endpoint for quotes API
        const urlQuotes = new URL('https://api.quotable.io/search/quotes');

        // parameters for quotes API
        urlQuotes.search = new URLSearchParams({
            query: quoteTopic,
            limit: 100
        });

        // stored url endpoint for images API
        const urlImages = new URL('https://api.unsplash.com/photos/random');

        // parameters for images API
        urlImages.search = new URLSearchParams({
            // client_id: 'REqOx30PIWR_6rWocyz4elwZzhGfXxnuatZSAtqnhG8',
            client_id: 'nvmvnGROiYUaP-TIj0V8RUA7NjMa_Fx320ZoOD17FVY',
            collections: '2738300',
            count: 30,
        })

        // fetch api data
        try {
            const responseArray = await Promise.all([
                fetch(urlQuotes),
                fetch(urlImages)
            ])

            // variables to store response data for quotes and images
            const [quotesResponse, imagesResponse] = responseArray;

            // request for json data
            const quotesApiData = await quotesResponse.json();
            const quotesArray = quotesApiData.results;
            const imagesApiData = await imagesResponse.json();
            const imagesArray = imagesApiData;

            // MANIPULATION OF QUOTES API DATA:
            // 1. return quote objects whose length is less than 120; new array only includes author & quote info
            const filteredQuotesArray = quotesArray.filter((quoteItem) => {
                return quoteItem.length <= 120;
            }).map((quote) => {
                return (
                    {
                        author: quote.author,
                        quote: quote.content
                    }
                )
            });

            // 2. empty array to house random selection of quotes
            const randomizedQuotesArray = [];

            // 3. function to generate and push random quote into new array
            function randomQuotes(randomNumber) {
                randomizedQuotesArray.push(filteredQuotesArray[randomNumber]);
            }

            // 4. for loop to generate random index number and use as argument to call randomQuotes()
            for(let i=0; i<numQuotesToGenerate; i++) {
                let randomImageIndex = Math.floor(Math.random() * filteredQuotesArray.length);
                randomQuotes(randomImageIndex);
            }

            // 5. update quotes state with new array
            setQuotes(randomizedQuotesArray);

            // MANIPULATION OF IMAGES API DATA:
            // 1. filter out unwanted images by id value (stored in imagesToRemove array) and return only necessary data in new array
            const filteredImagesArray = imagesArray.filter((imageItem) => {
                return !imagesToRemove.some((removeItem) => removeItem.id === imageItem.id);
            }).map((image) => {
                return (
                    {
                        id: image.id,
                        alt_description: image.alt_description,
                        image: image.urls.small
                    }
                )
            });

            // 2. update images state with new array
            setImages(filteredImagesArray);

            // update displayCount state
            setDisplayCount(2);
            // update formSubmitted state to true
            setFormSubmitted(true);
        } catch (error) {
            // if error, set apiError to true
            setApiError(true);
        }
    }
    
    // array of items to be displayed
    const itemsToDisplay = mergedArray.slice(0, displayCount);

    // event handler to add more li items to page by an increment of 2
    const handleClickShowMore = () => {
        let previousCount = displayCount;
        setDisplayCount(previousCount + 2);
    }

    // event handler to clear page of results & reset formSubmitted state to false
    const handleClickNewSearch = () => {
        setDisplayCount(0);
        setFormSubmitted(false); 
    }

    // what is rendered on page
    return (
        <section className="resultsSection wrapper">
            {formSubmitted ? null : (
                <Form 
                    submitForm={getApiData} 
                    apiError={apiError}
                    setApiError={setApiError}
                />
            )}
    
            {itemsToDisplay.length ? (
                <>
                    <ul className="gallery flexContainer">
                        {itemsToDisplay.map(({ id, alt_description, image, author, quote }) => {
                            return (
                                <Polaroid
                                    key={id}
                                    altText={alt_description}
                                    imageSource={image}
                                    authorName={author}
                                    quoteContent={quote}
                                />
                            )
                        })}
                    </ul>
                    <div className="buttonsContainer flexContainer">
                        { displayCount === 24 ? null :
                            <Button 
                                className="showMore" handleClick={handleClickShowMore}
                                text="Show More"
                            /> }
                        <Button 
                            className="newSearch" 
                            handleClick={handleClickNewSearch}
                            text="New Search"
                        />
                    </div>
                </> ) : null
            }
        </section>
    );
}

export default DisplayResults;