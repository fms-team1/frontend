import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { listLastTransactions } from '../actions/transactionActions';
import { signout } from '../actions/userActions';
import RenderHeader from '../components/RenderHeader';
import RenderTransaction from '../components/RenderTransaction';
import RenderWallet from '../components/RenderWallet';
import AddTransaction from '../components/AddTransaction';

export default function HomeScreen(props) {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [typeTransaction, setTypeTransaction] = useState("addIncomeOrExpense");
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    const transactionLastList = useSelector((state) => state.lastTransaction);
    const { loading, error, incomesAndExpenses, walletBalance, transactions } = transactionLastList;

    const showModal = () => {
        setTypeTransaction("addIncomeOrExpense");
        setShow(true);
    };

    const showTransferModal = () => {
        setTypeTransaction("addTransfer");
        setShow(true);
    }

    const hideModal = () => {
        setShow(false);
    };

    const filterByTime = (e) => {
        console.log("gi");
    }

    useEffect(() => {
        if (!userInfo) {
            props.history.push('/signin');
        }
        else {
            dispatch(listLastTransactions(userInfo));
        }
    }, [props.history, userInfo]);
    return (
        <section className="home">
            <div className="home__top-block">
                {/* <div className="home__search-bar column__center">
                    <input type="search" placeholder="Поиск" className="home__search" />
                </div> */}
                <div className="home__profile-bar column__center">
                    <div className="home__profile-icon"></div>
                    <div className="home__profile-name">Аян Кыялбекова</div>
                </div>
            </div>
            <div className="home__content">
                <div className="home__content-top column__space-around">
                    <div className="home__cash-block">
                        <div className="home__cash-type">Доходы</div>
                        <div className="home__cash-amount">
                            {incomesAndExpenses ? ('+ ' + incomesAndExpenses.income + ' с') : ''}
                        </div>
                    </div>
                    <div className="home__cash-block">
                        <div className="home__cash-type">Расходы</div>
                        <div className="home__cash-amount">
                            {incomesAndExpenses ? ('- ' + incomesAndExpenses.expense + ' с') : ''}
                        </div>
                    </div>
                    <div className="home__filter">
                        <div className="home__filter-icon"></div>
                        <select className="home__filter-select" onChange={(e) => filterByTime(e)}>
                            <option value="week">неделя</option>
                            <option value="month">месяц</option>
                            <option value="year">год</option>
                        </select>
                    </div>
                </div>
                <div className="home__content-body">
                    <table>
                        <thead>
                            <tr>{<RenderHeader headers={
                                ['Кошелек', 'Баланс']
                            } />}</tr>
                        </thead>
                        <tbody>
                            {<RenderWallet walletBalance={walletBalance} />}
                        </tbody>
                    </table>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                <div className="home__content-buttons">
                    <AddTransaction show={show} handleClose={hideModal} typeTransaction={typeTransaction} />
                    <button onClick={showModal} className="home__button-income">
                        <img src={`${process.env.PUBLIC_URL}/icons/income.svg`} />
                        <div>Доход</div>
                    </button>
                    <button onClick={showModal} className="home__button-expense">
                        <img src={`${process.env.PUBLIC_URL}/icons/expense.svg`} /> 
                        <div>Расход</div>
                    </button>
                    <button onClick={showTransferModal} className="home__button-transfer">
                        <img src={`${process.env.PUBLIC_URL}/icons/transfer.svg`} />
                        <div>Перевод</div>
                    </button>
                </div>
            </div>
            <div className="transaction__block">
                <table>
                    <thead>
                        <tr>{<RenderHeader headers={
                            ['Тип', 'Сумма', 'Организация',
                            'Категория', 'Контрагент', 'Пользователь',
                            'Кошелек', 'Дата']
                        } />}</tr>
                    </thead>
                    <tbody>
                        {<RenderTransaction transactions={transactions} />}
                    </tbody>
                </table>
            </div>
            {
                loading ? (
                    <LoadingBox></LoadingBox>
                ) : error ? (
                    <MessageBox varinat="danger">{error}</MessageBox>
                ) : (
                    <>
                        
                    </>
                )
            }
        </section>
    )
}