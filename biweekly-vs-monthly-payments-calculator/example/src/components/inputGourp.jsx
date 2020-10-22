import React from 'react';
//import Util from "../Utils";
import NumberFormat from 'react-number-format';
import '../styles/inputGroup.css';

const InputGroup = ({id, label, name, value, placeholder, icon, isIntiger, iconPosition, errorMsg, errorOccur, onChange}) => {

    let inputGroup = (
        <div className="input-group">
            <div className="input-group-prepend">
                <span className={`input-group-text ${errorOccur ? 'inputIconError' : '' }`}>{icon}</span>
            </div>

            <NumberFormat
                id={id}
                name={name}
                value={value}
                className={`form-control ${errorOccur ? 'inputError' : '' }`}
                placeholder={placeholder}
                thousandSeparator={true}
                allowNegative={false}
                onValueChange={ (values) => {
                    //values is an object that contains:
                    // formattedValue = $2,223
                    // value ie, 2223
                    const {value} = values;

                    onChange({name: name, value: value});
                }}
            />
        </div>
    );

    if(iconPosition === 'right'){
        inputGroup = (
            <div className="input-group">
                <NumberFormat
                    id={id}
                    name={name}
                    value={value}
                    className={`form-control ${errorOccur ? 'inputError' : '' }`}
                    placeholder={placeholder}
                    thousandSeparator={true}
                    allowNegative={false}
                    onValueChange={ (values) => {
                        const {value} = values;
                        onChange({name: name, value: value});
                    }}
                />
                <div className="input-group-append">
                    <span className={`input-group-text ${errorOccur ? 'inputIconError' : '' }`}>{icon}</span>
                </div>
            </div>
        );
    }

    let singleField = (
        <NumberFormat
            id={id}
            name={name}
            value={value}
            className={`form-control ${errorOccur ? 'inputError' : '' }`}
            placeholder={placeholder}
            thousandSeparator={false}
            allowNegative={false}
            onValueChange={ (values) => {
                const {value} = values;
                onChange({name: name, value: value});
            }}
        />
    );

    return (
        <div className="row form-group mt-3">
            <label htmlFor={id} className="col-12 biweekly-label">
                {label}
            </label>

            <div className="col-12">
                { icon ? inputGroup : singleField}
                <small className={`inputErrorText ${errorOccur ? 'show' : 'hide' }`}>{errorMsg}</small>
            </div>
        </div>
    )

};

export default InputGroup;