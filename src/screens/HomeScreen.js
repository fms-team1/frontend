import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from "axios";
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { listLastTransactions } from '../actions/transactionActions';

export default function HomeScreen(props) {
    const dispatch = useDispatch();
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    const transactionLastList = useSelector((state) => state.lastTransaction);
    const { loading, error, transactions } = transactionLastList;

    useEffect(() => {
        if (!userInfo) {
            props.history.push('/signin');
        }
        else {
            dispatch(listLastTransactions(userInfo));
        }
    }, [props.history, userInfo]);
    return (
        <div>
            <h1>Home Screen</h1>
            {
                loading ? (
                    <LoadingBox></LoadingBox>
                ) : error ? (
                    <MessageBox varinat="danger">{error}</MessageBox>
                ) : (
                    <>
                        <Link to={'/signin'}>Войти</Link><br/>
                        <Link to={'/register'}>Зарегистрироваться</Link>
                    </>
                )
            }
        </div>
    )
}