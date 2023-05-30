// Import useState
import { useState } from 'react';

// form function; event handler from DisplayResults is passed down to Form component via (destructured) props
function Form({ handleSubmit }) {

    // initialized state to store user's selected value from drop down menu
    const [userSelection, setUserSelection] = useState("Choose One:");

    // event handler to update state to reflect user's topic selection
    const handleChange = (event) => {
        setUserSelection(event.target.value);
    }

    return (
        // when form submitted, handleSubmit function passed via props from DisplayResults component will be called
        <form
            htmlFor="topicChoices"  
            name="form" 
            onSubmit={
                (event) => {
                    handleSubmit(event, userSelection)
                }
            }
        >
            <label htmlFor="topicChoices">Select a topic for instant inspiration.</label>
            {/* bind onChange event to dropdown & pass handleChange event handler; react dictates value into select element */}
            <select 
                    value={userSelection}
                    onChange={handleChange}
                    id="topicChoices"
                    name="topicChoices"
            >
                <option value="Choose One:" disabled>Choose One:</option>
                <option value="life, change">Change</option>
                <option value="life, happiness">Happiness</option>
                <option value="life">Life</option>
                <option value="love">Love</option>
                <option value="life, success">Success</option>
                <option value="wisdom">Wisdom</option>
                <option value="work, motivation, inspiration">Work</option>
            </select>
            <button type="submit">Enlighten Me</button>
        </form>
    )
}

export default Form;