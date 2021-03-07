import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function RegisterScreen() {
    
    return (
        <section className="register">
            <div className="container">
                <div className="register__content column">
                    <div className="register__signin">
                        <div>Есть аккаунт?</div>
                        <NavLink className="register__signin-btn" to="/signin">Войти</NavLink>
                    </div>
                    <div className="register__form default-input default-label">
                        <img src={`${process.env.PUBLIC_URL}/logoFN.svg`} alt="icon" className="register__icon"/>
                        <form onSubmit={() => alert("Hi")}>
                            <div className="register__form-item">
                                <label htmlFor="surname">Фамилия</label>
                                <input type="text" name="surname" />
                            </div>
                            <div className="register__form-item">
                                <label htmlFor="name">Имя</label>
                                <input type="text" name="name" />
                            </div>
                            <div className="register__form-item">
                                <label htmlFor="email">Почта</label>
                                <input type="email" name="email" />
                            </div>
                            <div className="register__form-item">
                                <label htmlFor="phone-number">Номер телефона</label>
                                <input type="tel" name="phone-number" />
                            </div>
                            <div className="register__form-item">
                                <label htmlFor="category">Категория</label>
                                <select name="category">
                                    <option value="Neobis">Neobis</option>
                                    <option value="Neolabs">Neolabs</option>
                                    <option value="Breeze studio">Breeze studio</option>
                                </select>
                            </div>
                            <div className="register__form-item">
                                <input type="submit" value="Зарегистрироваться" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}