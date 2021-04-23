import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllUsers, getCurrentUser, signout } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function UsersScreen() {
  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const currentUser = useSelector((state) => state.currentUser);
  const { loadingProfileBar, errorProfileBar, currentUserData } = currentUser;
  const allUsers = useSelector((state) => state.allUsers);
  const { loadingAllUsers, errorAllUsers, allUsersData } = allUsers;

  const signoutHandler = () => {  
    dispatch(signout());
};

  useEffect(() => {
    dispatch(getCurrentUser());
    dispatch(getAllUsers(userInfo));
  }, []);

  return (
    <div className='users'>
      <Link to='/signin' className="users__profile-exit" onClick={signoutHandler}>
        <img src={`${process.env.PUBLIC_URL}/icons/logOut.svg`} className="users__exit-icon" />
        <div>Выйти</div>
      </Link>
      <div className="users__content">
        <div className="users__block">
          <div className="users__block-header">Пользователи</div>
          <div className="users__block-body">
            {loadingAllUsers ? (<LoadingBox></LoadingBox>) :
              errorAllUsers ? (
                  <MessageBox varinat="danger">{errorAllUsers}</MessageBox>
              ) : allUsersData ?
              <>
                <div className="users__list">
                  {allUsersData.map(user => (
                    <div key={user.id} className="users__list-item">
                      {user.name} {user.surname} ({user.groups[0].name})
                    </div>
                  ))}
                </div>
                <Link to='/addAccountant' href="#" className="users__add-user">
                  <img src={`${process.env.PUBLIC_URL}/icons/add-icon.svg`} className="users__add-icon" />
                  <span>Добавить бухгалтера</span>
                </Link>
              </> : null}
          </div>
        </div>
        <div className="users__block">
          <div className="users__block-header">Владелец</div>
          <div className="users__profile users__block-body">
            {loadingProfileBar ? (<LoadingBox></LoadingBox>) :
            errorProfileBar ? (
                <MessageBox varinat="danger">{errorProfileBar}</MessageBox>
            ) : currentUserData ?
            <>
              <div className="users__profile-title">
                <img src={`${process.env.PUBLIC_URL}/icons/avatar.svg`} className="users__profile-icon" />
                <div className="users__profile-info">
                  <span>{
                  `${currentUserData.name} ${currentUserData.surname}`
                  }</span>
                </div>
              </div>
              <div className="user__profile-data">
                <div className="user__personal-data">Персональные данные</div>
                <div className="user__personal-info">
                  <span>Почта: </span>
                  <a href={`mailto:${currentUserData.email}`}>{currentUserData.email}</a>
                </div>
                <div className="user__personal-info">
                  <span>Группа: </span>
                  <a href="#">{currentUserData.groups[0].name}</a>
                </div>
                <div className="user__personal-info">
                  <span>Телефон: </span>
                  <a href={`tel:${currentUserData.phoneNumber}`}>{currentUserData.phoneNumber}</a>
                </div>
                <div className="user__personal-info">
                  <Link to='/changePassword' href="#" className="user__personal-link">
                    <img src={`${process.env.PUBLIC_URL}/icons/password-icon.svg`} />
                    <span>Изменить пароль</span>
                    <img src={`${process.env.PUBLIC_URL}/icons/arrow-link.svg`} />
                  </Link>
                </div>
              </div>
            </> : null}
          </div>
        </div>
      </div>
    </div>
  );
}