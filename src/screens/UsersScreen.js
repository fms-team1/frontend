import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCurrentUser, signout } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function UsersScreen() {
  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const currentUser = useSelector((state) => state.currentUser);
  const { loadingProfileBar, errorProfileBar, currentUserData } = currentUser;

  const signoutHandler = () => {  
      dispatch(signout());
  };
  useEffect(() => {
    dispatch(getCurrentUser(userInfo));
  }, []);
  return (
    <div className='users'>
      <div className="users__content">
        <div className="users__block">
          <div className="users__block-header">Пользователи</div>
          <div className="users__block-body">
            <div className="users__block-item"></div>
          </div>
        </div>
        <div className="users__block">
          <div className="users__block-header">Владелец</div>
          <div className="users__profile users__block-body">
            {loadingProfileBar ? (<LoadingBox></LoadingBox>) :
            errorProfileBar ? (
                <MessageBox varinat="danger">{errorProfileBar}</MessageBox>
            ) : <>
              <div className="users__profile-title">
                {console.log(currentUserData)}
                <img src={`${process.env.PUBLIC_URL}/icons/avatar.svg`} className="users__profile-icon" />
                <div className="users__profile-info">
                  <span>{
                  `${currentUserData.name} ${currentUserData.surname} 
                  ( ${currentUserData.role.role === 'ROLE_ADMIN' ? 'суперадмин' : ''} )`
                  }</span>
                </div>
              </div>
              <div className="user__profile-data">
                <div className="user__personal-data">Персональные данные</div>
                <div className="user__personal-info">
                  <span>Почта</span>
                  <a href={`mailto:${currentUserData.email}`}>{currentUserData.email}</a>
                </div>
                <div className="user__personal-info">
                  <span>Группа</span>
                  <a href="#">{currentUserData.role.role}</a>
                </div>
                <div className="user__personal-info">
                  <span>Телефон</span>
                  <a href={`tel:${currentUserData.phoneNumber}`}>{currentUserData.phoneNumber}</a>
                </div>
                <div className="user__personal-info">
                  <a href="#" className="">
                    <img src={`${process.env.PUBLIC_URL}/icons/password-icon.svg`} />Изменить пароль</a>
                </div>
              </div>
            </>
            }
          </div>
        </div>
      </div>
      <Link className="signout" to="#" onClick={signoutHandler}>Sign Out</Link>
    </div>
  );
}