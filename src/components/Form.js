// Import useState
import { useState } from 'react';

// form function; event handler from DisplayResults is passed down to Form component via (destructured) props
function Form({ handleSubmit }) {
    // 1. initialize state to store changing selected value w/in the drop down
    const [selection, setSelection] = useState("");

    // 2. declare change event handler that updates state to reflect user's topic choice
    const handleChange = (event) => {
        setSelection(event.target.value);
    }

    return (
        // when form submitted, handleSubmit function passed via props from DisplayResults component will be called
        <form action="" onSubmit={ (event) => {handleSubmit(event, selection)} }>
            <label>Which do you seek enlightenment in?</label>
            {/* bind onChange event to dropdown & pass handleChange event handler; react dictates value into select element */}
            <select name="" 
                    id=""
                    onChange={handleChange}
                    value={selection}
            >
                <option value="" defaultValue={'Choose one:'}>Choose one:</option>
                <option value="life, change">Change</option>
                <option value="life, happiness">Happiness</option>
                <option value="life">Life</option>
                <option value="love">Love</option>
                <option value="life, success">Success</option>
                <option value="wisdom">Wisdom</option>
                <option value="work, motivation, inspiration">Work</option>
            </select>
            <button type="submit">Enligten Me</button>
        </form>
    )
}

export default Form;