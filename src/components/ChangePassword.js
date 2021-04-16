import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from '../actions/transactionActions';
import './AddTransaction.css';
import MessageBox from './MessageBox';
import LoadingBox from './LoadingBox';
import { ADD_ACCOUNTANT_RESET } from '../constants/transactionConstants';

export default function ChangePassword(props) {

    const addNewAccountant = useSelector((state) => state.changePasswordResult);
    const { loadingChangePassword, errorChangePassword, messageChangePassword } = addNewAccountant;

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const [isOldPasswordShown, changeOldPasswordShown] = useState(false);
    const [isNewPasswordShown, changeNewPasswordShown] = useState(false);
    
    const [focused, setFocused] = useState("");

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(changePassword(newPassword, oldPassword));
    };
    const handleFocus = (inputType) => {
        setFocused(inputType);
    }
    const handleBlur = () => {
        setFocused("");
    }
    const handleClose = () => {
        dispatch({ type: ADD_ACCOUNTANT_RESET })
        props.history.push('/users');
    }

    const getOldPassword = (e) => {
        setOldPassword(e.target.value);
    }
    const getNewPassword = (e) => {
        setNewPassword(e.target.value);
    }

    const toggleOldPasswordVisibility = () => {
        changeOldPasswordShown(!isOldPasswordShown);
    };
    const toggleNewPasswordVisibility = () => {
        changeNewPasswordShown(!isNewPasswordShown);
    };

    return (
        <div className="modal display-block">
          <section className="modal__main modal__change-main">
            <img src={`${process.env.PUBLIC_URL}/icons/exit.svg`} onClick={handleClose} className="modal__exit" />
            <form onSubmit={submitHandler} className="accountant__main-form">
                <div className="accountant__form-item">
                    <label htmlFor="oldPassword">Старый пароль</label>
                    <input
                    type={isOldPasswordShown ? "text" : "password"}
                    id="oldPassword"
                    onFocus={() => handleFocus("oldPassword")}
                    onBlur={handleBlur}
                    style={{
                        borderColor: focused == "oldPassword"
                        ? '#1778E9' : '#848181'
                    }}
                    required
                    placeholder="Введите старый пароль*" onChange={(e) => getOldPassword(e)}/>
                    <i className={`fa ${isOldPasswordShown ? "fa-eye-slash" : "fa-eye"} accountant__password-icon`}
                                    onClick={toggleOldPasswordVisibility}></i>
                </div>
                <div className="accountant__form-item">
                    <label htmlFor="newPassword">Новый пароль</label>
                    <input
                    type={isNewPasswordShown ? "text" : "password"}
                    id="newPassword"
                    onFocus={() => handleFocus("newPassword")}
                    onBlur={handleBlur}
                    style={{
                        borderColor: focused == "newPassword"
                        ? '#1778E9' : '#848181'
                    }}
                    required
                    placeholder="Введите новый пароль*" onChange={(e) => getNewPassword(e)}/>
                    <i className={`fa ${isNewPasswordShown ? "fa-eye-slash" : "fa-eye"} accountant__password-icon`}
                                        onClick={toggleNewPasswordVisibility}></i>
                </div>
                <div className="accountant__form-item">
                    <input type="submit" value="Cменить пароль" />
                </div>
                    {loadingChangePassword ? (<LoadingBox></LoadingBox>) : errorChangePassword ?
                    <MessageBox variant="danger">{errorChangePassword}</MessageBox> : messageChangePassword ?
                    <MessageBox variant="success">{messageChangePassword}</MessageBox> : ''}
            </form>
          </section>
        </div>
    );
}