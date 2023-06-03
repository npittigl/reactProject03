// Import hooks from React library
import { useState, useEffect } from 'react';
// Import children components
import Form from './Form.js';
import Polaroid from './Polaroid.js';


function DisplayResults() {
    const [quotes, setQuotes] = useState([]);
    const [images, setImages] = useState([]);
    const [mergedArray, setMergedArray] = useState([])

    const numQuotesToGenerate = 30;

    const imagesToRemove = [
        { id: '5c5VcFshOds' },
        { id: '8lnbXtxFGZw' },
        { id: 'W8Qqn1PmQH0' },
        { id: 'G6G93jtU1vE' },
        { id: 'fgmf2Eyrwm4' },
        { id: 'nDeo4F3Zq28' },
        { id: 'c333d6YEhi0' },
        { id: 'gGbuETcoKjw' },
        { id: 'bV_mp5XqWc4' },
        { id: 'zunGugEsJCE' },
        { id: 'l1AdCsEnjh0' },
        { id: 'vKBdY7e7KFk' },
        { id: 'MYu49bghVAM' },
        { id: 'Ncn1jiEe-Wc' },
        { id: '09AhDCedXF8' },
        { id: 'UyNrNfdKjwg' }
    ];

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
        const urlImages = URL('https://api.unsplash.com/photos/random');

        // parameters for images API
        urlImages.search = new URLSearchParams({
            client_id: 'REqOx30PIWR_6rWocyz4elwZzhGfXxnuatZSAtqnhG8',
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

            // 2. update imagess state with new array
            setImages(filteredImagesArray);
        } catch (error) {
            console.log(error);
        }
    }
                    
    return (
        <section className="gallery wrapper">
            <Form handleSubmit={handleSubmit} />
            <Polaroid quotes={quotes} />
        </section>
    );
}

export default DisplayResults;