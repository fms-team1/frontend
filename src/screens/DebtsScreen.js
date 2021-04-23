import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { listDebts } from '../actions/transactionActions';
import RenderTransaction from '../components/RenderTransaction';
import RenderAdaptiveTransaction from '../components/RenderAdaptiveTransaction';
import { signout } from '../actions/userActions';
import { Link } from 'react-router-dom';

export default function DebtsScreen(props) {
    const dispatch = useDispatch();

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    const transactionDebtsList = useSelector((state) => state.debtsList);
    const { loading, error, transactions } = transactionDebtsList;

    const [media, setMedia] = useState(false);

    useEffect(() => {
        if(window.matchMedia("(max-width: 620px)").matches) {
            setMedia(true);
        }
        else {
            setMedia(false);
        }

        window.matchMedia("(max-width: 620px)").addEventListener("change", () => {
            if(window.matchMedia("(max-width: 620px)").matches) {
                setMedia(true);
            }
            else setMedia(false);
        });

    }, [window.matchMedia("(max-width: 620px)").matches]);

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
    }, [error]);

    return (
        <section className="home">
                {loading ? (
                    <LoadingBox></LoadingBox>
                ) : error ? (
                    <MessageBox varinat="danger">{error}</MessageBox>
                ) : (
                    <>
                    <div className="transaction__block">
                        <div className="transaction__top-block">
                            <div className="transaction__title-block">Последние долги</div>
                            <div className="debt__content-buttons column__space-between">
                                <Link to='/addDebt'>
                                    <img src={`${process.env.PUBLIC_URL}/icons/add__debt.svg`} />
                                    <div>Добавить долг</div>
                                </Link>
                                <Link to='/addDebt'>
                                    <img src={`${process.env.PUBLIC_URL}/icons/add__left_debt.svg`} /> 
                                    <div>Погасить долг</div>
                                </Link>
                            </div>
                        </div>
                        {media ? 
                        (<>
                            <RenderAdaptiveTransaction  transactions={transactions} />
                        </>) : <RenderTransaction transactions={transactions} />}
                    </div>    
                </>
                )}
        </section>
    )
}