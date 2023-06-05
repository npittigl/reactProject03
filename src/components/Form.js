// Import useState
import { useState } from 'react';
// import styles
import '../styles/Form.css';
import pic from '../styles/assets/polaroidCamera05.png';

// form function
function Form({ submitForm }) {
    // initialized state to store user's topic selection
    const [userSelection, setUserSelection] = useState("Choose One:");

    // event handler for form submission
    const handleSubmit = (event) => {
        // prevent page reload on submit
        event.preventDefault();

        // update topic state with the user's choice
        if (userSelection !== "Choose One:") {
            submitForm(userSelection);
        } else {
            alert('Please select one category in order to receive an inspirational quote.');
        }
    }

    // event handler to update state to reflect user's topic selection
    const handleChange = (event) => {
        setUserSelection(event.target.value);
    }

    return (
        // when form submitted, handleSubmit function will be called
        <form
            className="flexContainer"
            htmlFor="topicChoices"  
            name="form" 
            onSubmit={
                (event) => {
                    handleSubmit(event)
                }
            }
        >
            <div>
                <img src={pic} alt="polaroid camera" className="camera" />
            </div>

            <div>
                <label htmlFor="topicChoices">Which do you seek enlightenment in?</label>
                {/* bind onChange event to dropdown & pass handleChange event handler */}
                <select 
                        value={userSelection}
                        onChange={handleChange}
                        id="topicChoices"
                        name="topicChoices"
                >
                    <option value="Choose One:" disabled>Choose One:</option>
                    <option value="life, change">Change</option>
                    <option value="life, happiness">Happiness</option>
                    <option value="life, work">Life</option>
                    <option value="love">Love</option>
                    <option value="success, motivation, inspiration">Success</option>
                    <option value="wisdom">Wisdom</option>
                </select>
                <button type="submit">Enlighten Me</button>
            </div>
        </form>
    )
}

export default Form;