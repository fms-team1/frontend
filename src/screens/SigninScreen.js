import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { signin } from '../actions/userActions';
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { USER_SIGN_REMEMBER } from '../constants/userConstants';

export default function SigninScreen(props) {
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const [focused, setFocused] = useState("");
    const [isPasswordShown, changePasswordShown] = useState(false);

    const handleFocus = (inputType) => {
        setFocused(inputType);
    }

    const handleBlur = () => {
        setFocused("");
    }

    const togglePasswordVisibility = () => {
        changePasswordShown(!isPasswordShown);
    };

    const redirect = props.location.search
        ? props.location.search.split('=')[1]
        : '/';
    
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo, userRememberMe, loading, error } = userSignin;

    const submitHandler = (e) => {
        e.preventDefault();
        setSubmitted(true);
        dispatch(signin(email, password, rememberMe));
    };

    const toggleRememberMe = () => {
        if(userRememberMe && userRememberMe.rememberMeStorage) {
            setRememberMe(false);
        } else {
            setRememberMe(true);
        }
    };

    useEffect(() => {
        if (userInfo && userInfo.jwt) {
            props.history.push(redirect)
        }
        if(userRememberMe && userRememberMe.rememberMeStorage) {
            setRememberMe(userRememberMe.rememberMeStorage);
        }
    }, [props.history, redirect, userInfo]);

    return (
        <section className="signin">
            <div className="signin__content column">
                <div className="signin__block">
                    <img src={`${process.env.PUBLIC_URL}/web-analytics 1.svg`} alt="web-analytics"/>
                </div>
                <div className="signin__form">
                    <div className="signin__icon">
                        <img src={`${process.env.PUBLIC_URL}/logo.svg`} alt="icon"/>
                        <div className="signin__icon-title">NeoFin</div>
                    </div>
                    {loading ? (<LoadingBox></LoadingBox>) : ''}
                    <form onSubmit={submitHandler}>
                        <div className="custom-form__item">
                            <label htmlFor="email">Почта</label>
                            <input
                                // type="email"
                                type="text"
                                id="email"
                                required
                                onFocus={() => handleFocus("email")}
                                onBlur={handleBlur}
                                placeholder="example@gmail.com"
                                onChange={(e) => setEmail(e.target.value)}
                                style={{
                                    borderColor: focused == "email"
                                    ? '#1778E9'
                                    : (submitted && !email) ? 'red' : '#848181'
                                }} />
                        </div>
                        <div className="custom-form__item">
                            <label htmlFor="password">Пароль</label>
                            <input
                                type={isPasswordShown ? "text" : "password"}
                                id="password"
                                required
                                onFocus={() => handleFocus("password")}
                                onBlur={handleBlur}
                                placeholder="Введите пароль"
                                onChange={(e) => setPassword(e.target.value)}
                                style={{
                                    borderColor: focused == "password"
                                    ? '#1778E9'
                                    : (submitted && !password) ? 'red' : '#848181'
                                }} />
                                {<i className={`fa ${isPasswordShown ? "fa-eye-slash" : "fa-eye"} password-icon`}
                                                    onClick={togglePasswordVisibility}></i>}
                        </div>
                        { error && error.indexOf("403") !== -1
                            && <div className="help-block"><span>X</span> Неверный пароль или логин</div> }
                       <label className="remember-me__label noselect">Запомнить
                          <input type="checkbox" defaultChecked={userRememberMe && userRememberMe.rememberMeStorage} onChange={toggleRememberMe} />
                          <span className="checkmark"></span>
                       </label>
                        <div className="signin__form-item">
                            <input type="submit" value="Войти" />
                        </div>
                        <div className="signin__forgot-pwd">
                            <NavLink to='/register'>Заполнение форм</NavLink>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}