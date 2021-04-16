import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCurrentUser, signout } from '../actions/userActions';
import './AppBar.css';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';

export default function AppBar({logOutButton, setLogOutButton, state, setState}) {
    const dispatch = useDispatch();
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    const currentUser = useSelector((state) => state.currentUser);
    const { loadingProfileBar, errorProfileBar, name, surname } = currentUser;

    const signoutHandler = () => {  
        dispatch(signout());
        setLogOutButton(false);
    };

    useEffect(() => {
        if(window.location.pathname === "/users") {
            setLogOutButton(true);
        }
        dispatch(getCurrentUser(userInfo));
    }, [window.location.pathname]);
    return (
        <div className="appBar">
            <div className="burger-menu__block">
                <div className={state ? 'open burger-menu' : 'burger-menu'} onClick={() => setState(!state)}>
                    <span />
                    <span />
                    <span />
                    <span />
                </div>
            </div>
            <div className="search-bar__block">
            {loadingProfileBar ? (<LoadingBox></LoadingBox>) :
            errorProfileBar ? (
                <MessageBox varinat="danger">{errorProfileBar}</MessageBox>
            ) :
                <>
                    {logOutButton ? 
                        <>
                            <Link to='/signin' className="users__profile-exit" onClick={signoutHandler}>
                                <img src={`${process.env.PUBLIC_URL}/icons/logOut.svg`} className="users__exit-icon" />
                                <div>Выйти</div>
                            </Link>
                        </> :
                        <>
                            <Link to='/users' className="profile-bar column__center">
                                <div className="profile-icon">
                                    <img src={`${process.env.PUBLIC_URL}/icons/avatar.svg`} className="users__profile-icon" />
                                </div>
                                <div className="profile-name">{name}</div>
                                <div className="profile-surname">{surname}</div>
                            </Link>
                        </>
                        }
                </>
            }
            </div>
        </div>
    )
}