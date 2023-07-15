// Import useState/data/component
import { useState } from 'react';
import optionsArray from './optionsArray';
import ErrorMessage from './ErrorMessage';
// Import Styles
import '../styles/Form.css';
import cameraImg from '../styles/assets/polaroidCamera05.png';

// form function
function Form({ submitForm, apiError, setApiError }) {
    // initialized state to store user's topic selection
    const [userSelection, setUserSelection] = useState("Choose One:");

    // event handler for form submission
    const handleSubmit = (event) => {
        // prevent page reload on submit
        event.preventDefault();
        // update topic state with the user's choice
        if (userSelection !== "Choose One:") {
            submitForm(userSelection);
            // on submit update apiError to false
            setApiError(false);
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
            name="form" 
            className="flexContainer"
            onSubmit={
                (event) => {
                    handleSubmit(event);
                }
            }
        >
        
            <img className="camera" src={cameraImg} alt="polaroid camera" />
            
            <div className="selectionContainer flexContainer">
                <label htmlFor="topicChoices">Which do you seek enlightenment in?</label>

                {/* bind onChange event to dropdown & pass handleChange event handler */}
                <div className='selectButtonDiv flexContainer'>
                    <select 
                            value={userSelection}
                            onChange={handleChange}
                            id="topicChoices"
                            name="topicChoices"
                            aria-disabled="true"
                    >
                        <option value="Choose One:" disabled selected>Choose One:</option>
                        {optionsArray.map((option, index) => {
                            return <option value={option.query} key={index}>{option.topicSelection}</option>
                        })}
                    </select>
                    <button className="submit" type="submit">Submit</button>
                </div>
                {apiError === true ? <ErrorMessage /> : null}
            </div>
        </form>
    )
}

export default Form;