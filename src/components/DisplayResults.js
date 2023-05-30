// Import hooks from React library
import { useState, useEffect } from 'react';
// Import axios
import axios from 'axios';
// Import children components
import Form from './Form.js';
import Polaroid from './Polaroid.js';

// Component to display results
function DisplayResults() {
    // initialized state to store topic value as selected by user
    const [quoteTopic, setQuoteTopic] =  useState(null);

    // created state to store objects coming from Quotable API based on user's topic selection
    const [quotes, setQuotes] = useState([]);

    const numQuotesToGenerate = 4;

    // define side effect that updates quotes state
    useEffect(() => {
        // function to trigger axios request for api data from Quotable API
        const getApiData = () => {
            axios({
                url: 'https://api.quotable.io/search/quotes',
                method: 'GET',
                dataReponse: 'json',
                params: {
                    // inject topic state into API call; as state changes, the API call (as dictated by dependency array) will run when form submitted
                    query: quoteTopic,
                    limit: 100
                }
            }).then((apiData) => {
                // store api data in variable
                const quotesArray = apiData.data.results;

                // filter out quotes that exceed 120 characters
                const filteredQuotesArray = quotesArray.filter((quoteItem) => {
                    return quoteItem.length <= 120;
                });

                // variable to store random quote(s)
                const randomizedQuotesArray = [];

                // function to push random quote from filtered array into new array
                function randomQuotes(randomNumber) {
                    randomizedQuotesArray.push(filteredQuotesArray[randomNumber]);
                }

                // for loop to generate random index number and call randomQuote() function
                for(let i=0; i<numQuotesToGenerate; i++) {
                    let randomImageIndex = Math.floor(Math.random() * filteredQuotesArray.length);
                    randomQuotes(randomImageIndex);
                }

                // update state with array of randomized quotes
                setQuotes(randomizedQuotesArray);
            });
        }
        // if quoteTopic is not equal to null, then call getApiData function
        if (quoteTopic !== null) {
            getApiData();
        }
        
        // use topic state inside dependency array, so every time state changes, the side effect (API call), runs and returns quotes based on user's chosen topic
    }, [quoteTopic]);

    // event handler to set user's topic choice & trigger useEffect upon form submission (passed to Form component via props)
    const handleSubmit = (event, usersChoice) => {
        // prevent page reload on submit
        event.preventDefault();

        // update topic state with the user's choice; if user submits before topic is chosen, user gets alert 
        if (usersChoice !== "Choose One:") {
            setQuoteTopic(usersChoice);
        } else {
            alert('Please select one category in order to receive an inspirational quote.');
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