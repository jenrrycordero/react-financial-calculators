import React from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';
import '../styles/BPInputGroup.css';

const InputG = ({ id, lan, label, value, ariaLabel, placeholder, iconClass, errorMsg, errorOccur, onChange  }) => {
    const translations = {
        en: "Use positive numbers less than 1 million",
        es: "Use números mayores que 0 y menores que 1 millón",
        ca: "Use positive numbers less than 1 million",
        fr: "Use positive numbers less than 1 million"
    };

    const error = translations[lan];

    return (
        <div id={`div4${id}`} className="bp-input-group">
            <label className="material-label" htmlFor={id} aria-label={ariaLabel} aria-describedby={`div4${id}`}>
                {label}
            </label>
            <InputGroup className={errorOccur && 'InputGroupError'} tabIndex="0">
                <InputGroup.Prepend>
                    <InputGroup.Text id="annual_income_icon"><i className={iconClass}></i></InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                    id={id}
                    value = {value}
                    tabIndex="1"
                    placeholder={placeholder}
                    aria-describedby={`div4${id}`}
                    onChange = {onChange.bind(this)}
                />
            </InputGroup>
            <small className="small-help" style={{display: errorOccur ? 'none' : 'block' }}>{error}.</small>
            <small className="text-danger" style={{display: errorOccur ? 'block' : 'none' }}>{errorMsg}</small>
        </div>
    )

}

export default InputG;
