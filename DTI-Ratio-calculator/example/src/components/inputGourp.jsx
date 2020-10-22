import React from 'react';
import NumberFormat from 'react-number-format';
import '../styles/inputGroup.css';

const InputGroup = ({id, label, name, value, errorOccur, onChange}) => {

    return (
        <div className="row form-group">
            <label htmlFor={id} className="col-sm-8 col-lg-7 col-form-label">
                {label}
            </label>

            <div className="col-sm-4 col-lg-5 ">
                <NumberFormat
                    id={id}
                    name={name}
                    prefix="$"
                    value={value}
                    className={`form-control ${errorOccur && 'dti-input-error'}`}
                    thousandSeparator={true}
                    allowNegative={false}
                    onValueChange={ (values) => {
                        const {value} = values;
                        onChange({name: name, value: value});
                    }}
                />
            </div>
        </div>
    )

};

export default InputGroup;