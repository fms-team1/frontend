import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from '../actions/userActions';
import './AppBar.css';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';

export default function AppBar(props) {
    const dispatch = useDispatch();
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    const currentUser = useSelector((state) => state.currentUser);
    const { loadingProfileBar, errorProfileBar, name, surname } = currentUser;

    useEffect(() => {
        dispatch(getCurrentUser(userInfo));
    }, []);
    return (
        <div className="appBar">
            <div className="burger-menu__block">
                <div className={props.state ? 'open burger-menu' : 'burger-menu'} onClick={() => props.setState(!props.state)}>
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
                        <div className="home__search-bar">
                            <input type="search" placeholder="Поиск" className="home__search" />
                        </div>
                        <div className="profile__user">
                            <img src={`${process.env.PUBLIC_URL}/icons/user.svg`} />
                        </div>
                        <div className="profile-bar column__center">
                            <div className="profile-icon"></div>
                            <div className="profile-name">{name}</div>
                            <div className="profile-surname">{surname}</div>
                        </div>
                </>
            }
            </div>
        </div>
    )
}