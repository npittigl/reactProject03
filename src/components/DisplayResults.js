// Import hooks from React library
import { useState, useEffect } from 'react';
// Import axios
import axios from 'axios';
// Import children components
import Form from './Form.js';
import Quote from './Quote.js';

// Component to display results
function DisplayResults() {
    // 1. initialize a piece of state to store topic value as selected by user from the form drop down menu
    const [topic, setTopic] =  useState(null);

    // 2. create state to store quotes objects coming from Quotable API based on user's topic selection
    const [quotes, setQuotes] = useState([]);

    // 3. define side effect that makes call to the Quotable API 
    useEffect(() => {
        // axios request api data
        axios({
            url: 'https://api.quotable.io/search/quotes',
            method: 'GET',
            dataReponse: 'json',
            params: {
                // inject topic state into API call; as state changes, the API call (as dictated by dependency array) will run when form submitted
                query: topic,
                limit: 2
            }
        }).then((apiData) => {
            // update state using the array returned to us from the API:
            setQuotes(apiData.data.results);
        });
        // use topic state inside dependency array, so that every time the state changes, the side effect (API call), runs and returns quotes based on user's chosen topic
    }, [topic]);

    // 4. Define an event handler; will be passed to Form component via props (Form will trigger this event handler function when the form is submitted)
    const selectTopic = (event, usersChoice) => {
        // prevent page reload on submit
        event.preventDefault();

        // update topic state with the user's choice
        setTopic(usersChoice);
    }

    return (
        <section>
            {/* Pass Form submit event handler function down via props */}
            <Form
                handleSubmit={selectTopic}
            />

            {quotes.length === 0 ? (
                <h2>Your Inspiration Is A Click Away</h2>
            ): (
                <>
                    <h2>Inspirational Quotes on {topic}</h2>
                    <ul>
                        {/* map through state array & for each object in array it will return a Quote component; info passed down via props */}
                        {quotes.map(({ _id, content, author }) => {
                            return (
                                <Quote
                                    key={_id}
                                    quote={content}
                                    author={author}
                                />
                            );
                        })}
                    </ul>
                </>
            )}
        </section>
    );
}

export default DisplayResults;