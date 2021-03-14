import React, { useState } from 'react';

export default function CustomTextInput(props) {

    const [focused, setFocused] = useState(false);
    const [isPasswordShown, changePasswordShown] = useState(false);

    const handleFocus = () => {
        setFocused(true);
    }

    const handleBlur = () => {
        setFocused(false);
    }

    const togglePasswordVisibility = () => {
        changePasswordShown(!isPasswordShown);
    };

    return (
        <div className="custom-form__item">
            <label htmlFor={props.type}>{props.labelText}</label>
            <input
                type={props.type !== "password"
                ? props.type
                : isPasswordShown ? "text" : "password"}
                id={props.type}
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder={props.placeholder}
                onChange={(e) => props.setState(e.target.value)}
                style={{
                    borderColor: focused
                    ? '#1778E9'
                    : (props.isSubmitted && !props.selfState) ? 'red' : '#848181'
                }} />
                {props.type === 'password'
                && <i className={`fa ${isPasswordShown ? "fa-eye-slash" : "fa-eye"} password-icon`}
                                    onClick={togglePasswordVisibility}></i>}
                {props.isSubmitted && !props.selfState &&
                    <div className="help-block"><span>X</span> {props.warningMessage}</div>
                }
        </div>
    )
}