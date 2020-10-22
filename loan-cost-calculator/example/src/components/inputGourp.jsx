import React from 'react';
//import Util from "../Utils";
import Tooltip from './tooltip.jsx';
import NumberFormat from 'react-number-format';
import '../styles/inputGroup.css';

const InputGroup = ({id, label, name, value, placeholder, icon, showIcon, isIntiger, iconPosition, showTooltip, tooltipContent, errorMsg, errorOccur, onChange}) => {

    let inputGroup = (
        <div className="input-group">
            { showIcon && (<div className="input-group-prepend">
                <span className={`input-group-text ${errorOccur ? 'inputIconError' : '' }`}>{icon}</span>
            </div>)}

            <NumberFormat
                id={id}
                name={name}
                value={value}
                maxLength="9"
                className={`form-control ${errorOccur ? 'inputError' : '' }`}
                placeholder={placeholder}
                thousandSeparator={true}
                allowNegative={false}
                onValueChange={ (values) => {
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
        <div className="form-group">
            <label htmlFor={id} className="col-form-label">
                {showTooltip && (<Tooltip content={tooltipContent} />) } {label}
            </label>

            <div className="">
                { icon ? inputGroup : singleField}
                <span className={`inputErrorText ${errorOccur ? 'show' : 'hide' }`}>{errorMsg}</span>
            </div>
        </div>
    )

};

export default InputGroup;