// Import hooks from React library
import { useState, useEffect } from 'react';
// Import axios
import axios from 'axios';
// Import children components
import Form from './Form.js';
import GetQuote from './GetQuote.js';

// Component to display results
function DisplayResults() {
    // initialized state to store topic value as selected by user
    const [quoteTopic, setQuoteTopic] =  useState(null);

    // created state to store quotes objects coming from Quotable API based on user's topic selection
    const [quotes, setQuotes] = useState([]);

    // define side effect that makes call to the Quotable API 
    useEffect(() => {
        // function to trigger axios request for api data
        const getApiData = () => {
            axios({
                url: 'https://api.quotable.io/search/quotes',
                method: 'GET',
                dataReponse: 'json',
                params: {
                    // inject topic state into API call; as state changes, the API call (as dictated by dependency array) will run when form submitted
                    query: quoteTopic,
                    limit: 2
                }
            }).then((apiData) => {
                // update state using the array returned to us from the API:
                setQuotes(apiData.data.results);
            });
        }
        // if quoteTopic is not equal to null, then call getApiData function
        if (quoteTopic !== null) {
            getApiData();
        }
        
        // use topic state inside dependency array, so every time state changes, the side effect (API call), runs and returns quotes based on user's chosen topic
    }, [quoteTopic]);

    // 4. Define an event handler; passed to Form component via props (Form will trigger this event handler function when the form is submitted)
    const handleSubmit = (event, usersChoice) => {
        // prevent page reload on submit
        event.preventDefault();

        // update topic state with the user's choice
        if (usersChoice !== "Choose One:") {
            setQuoteTopic(usersChoice);
        } else {
            alert('Please select one category in order to receive an inspirational quote.');
        }
    }

    return (
        <>
            <Form handleSubmit={handleSubmit} />
            <GetQuote quotes={quotes} />
        </>
    );

    // return (
    //     <section>
    //         {/* Pass Form submit event handler function down via props */}
    //         <Form
    //             handleSubmit={selectTopic}
    //         />
    //         {quotes &&
    //             ( <ul>
    //                 {/* map through state array & for each object in array it will return a Quote component; info passed down via props */}
    //                 {quotes.map(({ _id, content, author }) => {
    //                     return (
    //                         <GetQuote
    //                             key={_id}
    //                             quote={content}
    //                             author={author}
    //                         />
    //                     );
    //                 })}
    //             </ul>)
    //         }
    //     </section>
    // );
}

export default DisplayResults;