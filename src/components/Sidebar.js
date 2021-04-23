import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css'

export default function Sidebar({state, setState}) {

    const [media, setMedia] = useState(false);

    useEffect(() => {
        if(window.matchMedia("(max-width: 768px)").matches) {
            setMedia(true);
        }
        else {
            setMedia(false);
        }

        window.matchMedia("(max-width: 768px)").addEventListener("change", () => {
            if(window.matchMedia("(max-width: 768px)").matches) {
                setMedia(true);
            }
            else setMedia(false);
        });

    }, [window.matchMedia("(max-width: 768px)").matches]);

    return (
        <div className={state ? 'open sidebar' : 'sidebar'} onClick={() => media ? setState(!state) : ''}>
            <div className={state ? 'open sidebar__whole' : 'sidebar__whole'}>
                <div className="sidebar__icon">
                    <img src={`${process.env.PUBLIC_URL}/logo.svg`} alt="icon"/>
                    <div className="sidebar__icon-title">NeoFin</div>
                </div>
                <nav className='navbar'>
                    <NavLink
                        exact
                        activeClassName="navbar__link--active"
                        className="navbar__link"
                        to="/"
                    >
                        <div className="navbar__link-icon">
                            <svg fill="currentColor" baseProfile="tiny" width="28" height="28" version="1.2" viewBox="0 0 24 24" xmlns="http://www.w3.org/1999/xlink">
                                <path d="M12,3c0,0-6.186,5.34-9.643,8.232C2.154,11.416,2,11.684,2,12c0,0.553,0.447,1,1,1h2v7c0,0.553,0.447,1,1,1h3  c0.553,0,1-0.448,1-1v-4h4v4c0,0.552,0.447,1,1,1h3c0.553,0,1-0.447,1-1v-7h2c0.553,0,1-0.447,1-1c0-0.316-0.154-0.584-0.383-0.768  C18.184,8.34,12,3,12,3z"/>
                            </svg>
                        </div>
                        <div className="navbar__link-text" onClick={() => media ? setState(!state) : ''}>Главная</div>
                    </NavLink>
                    <NavLink
                        activeClassName="navbar__link--active"
                        className="navbar__link"
                        to="/journal"
                    >
                        <div className="navbar__link-icon">
                            <svg width="24" height="24" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="clock" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path fill="currentColor" d="M256,8C119,8,8,119,8,256S119,504,256,504,504,393,504,256,393,8,256,8Zm92.49,313h0l-20,25a16,16,0,0,1-22.49,2.5h0l-67-49.72a40,40,0,0,1-15-31.23V112a16,16,0,0,1,16-16h32a16,16,0,0,1,16,16V256l58,42.5A16,16,0,0,1,348.49,321Z"></path>
                            </svg>
                        </div>
                        <div className="navbar__link-text" onClick={() => media ? setState(!state) : ''}>Журнал</div>
                    </NavLink>
                    <NavLink
                        activeClassName="navbar__link--active"
                        className="navbar__link"
                        to="/analytics"
                        >
                        <div className="navbar__link-icon">
                            <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                                <rect fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" width="4" x="10" y="3"/>
                                <rect fill="none" height="13" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" width="4" x="18" y="8"/>
                                <rect fill="none" height="8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" width="4" x="2" y="13"/>
                            </svg>
                        </div>
                        <div className="navbar__link-text" onClick={() => media ? setState(!state) : ''}>Аналитика</div>
                    </NavLink>
                    <NavLink
                        activeClassName="navbar__link--active"
                        className="navbar__link"
                        to="/users"
                        >
                        <div className="navbar__link-icon">
                            <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                                <circle cx="9" cy="7" r="4"/>
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                            </svg>
                        </div>
                        <div className="navbar__link-text" onClick={() => media ? setState(!state) : ''}>Пользователи</div>
                    </NavLink>
                    <NavLink
                        activeClassName="navbar__link--active"
                        className="navbar__link"
                        to="/users"
                        >
                        <div className="navbar__link-icon">
                            <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="16" cy="16" r="16" fill="currentColor"/>
                                <path d="M15.7999 14.9C13.5299 14.31 12.7999 13.7 12.7999 12.75C12.7999 11.66 13.8099 10.9 15.4999 10.9C17.2799 10.9 17.9399 11.75 17.9999 13H20.2099C20.1399 11.28 19.0899 9.7 16.9999 9.19V7H13.9999V9.16C12.0599 9.58 10.4999 10.84 10.4999 12.77C10.4999 15.08 12.4099 16.23 15.1999 16.9C17.6999 17.5 18.1999 18.38 18.1999 19.31C18.1999 20 17.7099 21.1 15.4999 21.1C13.4399 21.1 12.6299 20.18 12.5199 19H10.3199C10.4399 21.19 12.0799 22.42 13.9999 22.83V25H16.9999V22.85C18.9499 22.48 20.4999 21.35 20.4999 19.3C20.4999 16.46 18.0699 15.49 15.7999 14.9Z" fill="#F7F7F7"/>
                            </svg>
                        </div>
                        <div className="navbar__link-text" onClick={() => media ? setState(!state) : ''}>Пользователи</div>
                    </NavLink>
                </nav>
            </div>
        </div>
    )
};