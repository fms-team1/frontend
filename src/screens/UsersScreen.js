import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { signout } from '../actions/userActions';

export default function UsersScreen() {
  const dispatch = useDispatch();

  const signoutHandler = () => {
      dispatch(signout());
  };
  return (
    <div className='users'>
      <h1>UsersScreen</h1>
      <Link className="signout" to="#" onClick={signoutHandler}>Sign Out</Link>
    </div>
  );
}