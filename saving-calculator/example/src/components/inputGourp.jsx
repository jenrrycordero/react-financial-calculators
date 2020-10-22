import React from 'react';
//import Util from "../Utils";
import Tooltip from './tooltip.jsx';
import NumberFormat from 'react-number-format';
import '../styles/inputGroup.css';

const InputGroup = ({id, label, name, value, placeholder, icon, isIntiger, iconPosition, tooltipContent, errorMsg, errorOccur, onChange}) => {

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
        <div className="row form-group">
            <label htmlFor={id} className="col-sm-5 col-xl-4 col-form-label">
                <Tooltip content={tooltipContent} /> {label}
            </label>

            <div className="col-sm-7 col-xl-8">
                { icon ? inputGroup : singleField}
                <span className={`inputErrorText ${errorOccur ? 'show' : 'hide' }`}>{errorMsg}</span>
            </div>
        </div>
    )

};

export default InputGroup;