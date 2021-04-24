import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { deleteDebt, listDebts } from '../actions/transactionActions';
import { signout } from '../actions/userActions';
import { Link } from 'react-router-dom';
import RenderDebtTransaction from '../components/RenderDebtTransaction';

export default function DebtsScreen(props) {
    const dispatch = useDispatch();

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    const transactionDebtsList = useSelector((state) => state.debtsList);
    const { loading, error, transactions } = transactionDebtsList;

    const deletedDebt = useSelector((state) => state.deleteDebt);
    const { loadingDelete, errorDelete, messageDelete } = deletedDebt;

    const onHandleDelete = (id) => {
        let answer = window.confirm("Вы уверены, что удалите?");
        if(answer) {
            dispatch(deleteDebt(id));
        }
    }
    useEffect(() => {
        if(messageDelete === "") {
            dispatch(listDebts());
        }
    }, [messageDelete]);


    useEffect(() => {
        if(error && error.indexOf("403") !== -1) {
            dispatch(signout());
        }
        if (!userInfo) {
            props.history.push('/signin');
        }
        else {
            dispatch(listDebts());
        }
    }, []);

    return (
        <section className="home">
            <div className="transaction__block">
                <div className="transaction__top-block">
                    <div className="transaction__title-block debt__title-block">Последние долги</div>
                    <div className="debt__content-buttons column__flex-end">
                        <Link to='/addDebt'>
                            <img src={`${process.env.PUBLIC_URL}/icons/add__debt.svg`} />
                            <div>Добавить долг</div>
                        </Link>
                    </div>
                </div>
                {loading ? (
                    <LoadingBox></LoadingBox>
                        ) : error ? (
                    <MessageBox varinat="danger">{error}</MessageBox>
                        ) : (
                            <RenderDebtTransaction transactions={transactions} onHandleDelete={onHandleDelete} />
                            )}
            </div>
        </section>
    )
}