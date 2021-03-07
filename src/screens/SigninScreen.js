import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { signin } from '../actions/userActions';
import CustomTextInput from '../components/CustomTextInput';
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function SigninScreen(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const redirect = props.location.search
        ? props.location.search.split('=')[1]
        : '/';
    
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo, loading, error } = userSignin

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        setSubmitted(true);
        if(email && password) {
            dispatch(signin(email, password));
        }
    };

    useEffect(() => {
        if (userInfo) {
            props.history.push(redirect)
        }
    }, [props.history, redirect, userInfo]);

    return (
        <section className="signin">
            <div className="container">
                <div className="signin__content column">
                    <div className="signin__block">
                        <img src={`${process.env.PUBLIC_URL}/web-analytics 1.svg`} alt="web-analytics"/>
                    </div>
                    <div className="signin__form">
                        <div className="signin__form-icon">
                            <img src={`${process.env.PUBLIC_URL}/logo.svg`} alt="icon"/>
                            <div className="signin__form-title">NeoFin</div>
                        </div>
                        {loading && <LoadingBox></LoadingBox>}
                        <form onSubmit={submitHandler}>
                            <CustomTextInput
                                type="email"
                                placeholder="example@gmail.com"
                                setState={setEmail}
                                selfState={email}
                                labelText="Почта"
                                isSubmitted={submitted}
                                warningMessage="Email is required" />
                            <CustomTextInput
                                type="password"
                                placeholder="Введите пароль"
                                setState={setPassword}
                                selfState={password}
                                labelText="Пароль"
                                isSubmitted={submitted}
                                warningMessage="Password is required" />
                            { error && error.indexOf("403") !== -1
                                && <div className="help-block"><span>X</span> Неверный пароль или логин</div> }
                            <div className="remember-me">
                                <input type="checkbox"/>
                                <div>Запомнить</div>
                            </div>
                            <div className="signin__form-item">
                                <input type="submit" value="Войти" />
                            </div>
                            <div className="signin__forgot-pwd">
                                <NavLink to="/">Забыли пароль?</NavLink>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}