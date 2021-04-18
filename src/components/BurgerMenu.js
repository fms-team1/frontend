import React from 'react';
import './BurgerMenu.css';

export default function BurgerMenu({state, setState}) {
    return (
        <div className="burger-menu__block">
            <div className={state ? 'open burger-menu' : 'burger-menu'} onClick={() => setState(!state)}>
                <span />
                <span />
                <span />
                <span />
            </div>
        </div>
    )
}