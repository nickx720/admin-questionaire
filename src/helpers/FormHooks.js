import { useState } from 'react';
import { partialRight } from 'ramda';


const useSignUpForm = (callback, state) => {
    const [inputs, setInputs] = useState(state);
    const setTypeInput = (event, inputs, type) => ({ ...inputs, [event.target.name]: type(event.target.value) });
    const stringSetInput = partialRight(setTypeInput, [String]);
    const numberSetInput = partialRight(setTypeInput, [Number]);

    const handleSubmit = event => {
        if (event) {
            event.preventDefault();
        }
        callback();
    }
    const handleInputChange = (event) => {
        event.persist();
        setInputs(inputs => stringSetInput(event, inputs))
    }
    const handleNumericInputChange = event => {
        event.persist();
        setInputs(inputs => numberSetInput(event, inputs))
    }
    return {
        handleSubmit,
        handleInputChange,
        handleNumericInputChange,
        inputs
    };
}

export default useSignUpForm;
