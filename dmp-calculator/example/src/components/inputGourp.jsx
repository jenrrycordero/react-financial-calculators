import React from 'react';
import '../styles/inputGroup.css';

const InputGroup = ({id, label, value, placeholder, errorMsg, errorOccur, onChange}) => {

    return (
        <div id={`div4${id}`} className="bp-input-group">
            <div className="mb-3 mt-3">
                <label htmlFor={id} className="sr-only">{label}</label>

                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroupPrepend">
                            <i className="fal fa-dollar-sign"></i>
                        </span>
                    </div>

                    <input
                        id={id}
                        name={id}
                        className="form-control"
                        placeholder={placeholder}
                        value={value}
                        onChange={onChange}
                    />
                    <span className="error" style={{display: errorOccur ? 'block' : 'none' }}>{errorMsg}</span>
                </div>
            </div>
        </div>
    )

};

export default InputGroup;
