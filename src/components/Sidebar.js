import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Sidebar() {

    const [sidebar, setSidebar] = useState(true);

    const showSidebar = () => setSidebar(!sidebar);

    return (
        <div className="sidebar">

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
                <div className="navbar__link-text">Главная</div>
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
                <div className="navbar__link-text">Журнал</div>
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
                    <div className="navbar__link-text">Аналитика</div>
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
                    <div className="navbar__link-text">Пользователи</div>
                </NavLink>
            </nav>
        </div>
    )
}