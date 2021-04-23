import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { listLastTransactions, listPeriodTransactions } from '../actions/transactionActions';
import RenderTransaction from '../components/RenderTransaction';
import RenderWallet from '../components/RenderWallet';
import RenderAdaptiveTransaction from '../components/RenderAdaptiveTransaction';
import AddIncExpTransaction from '../components/AddIncExpTransaction';
import AddTransTransaction from '../components/AddTransTransaction';
import { signout } from '../actions/userActions';
import { Link } from 'react-router-dom';
import DropdownByPeriodAnalytics from '../components/DropdownByPeriodAnalytics';

export default function HomeScreen(props) {
    const dispatch = useDispatch();

    const [selectedPeriod, selectedPeriodSet] = useState({id: 0, name: 'Неделя'});
    const [showIncExp, setShowIncExp] = useState(false);
    const [showTrans, setShowTrans] = useState(false);
    const [startPeriod, setStartPeriod] = useState(getWeekDate());
    const [endPeriod, setEndPeriod] = useState(converStringDate(new Date()));


    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    const transactionLastList = useSelector((state) => state.lastTransaction);
    const { loading, error, incomesAndExpenses, walletBalance, transactions } = transactionLastList;

    const showModal = () => {
      setShowIncExp(true);
    };

    const showTransferModal = () => {
      setShowTrans(true);
    }

    const hideModal = () => {
      setShowIncExp(false);
      setShowTrans(false);
    };

    function getWeekDate() {
        let weekDate = new Date();
        let pastDate = weekDate.getDate() - 7;
        weekDate.setDate(pastDate);
        return converStringDate(weekDate);
    }

    function converStringDate(date) {
        return date.getFullYear()+'-'+(+date.getMonth()+1)+'-'+date.getDate()
    }

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
        dispatch(listPeriodTransactions(startPeriod + ' ' + endPeriod));
      }, [startPeriod, endPeriod]);

    useEffect(() => {
        if(error && error.indexOf("403") !== -1) {
            dispatch(signout());
        }
        if (!userInfo) {
            props.history.push('/signin');
        }
        else {
            dispatch(listLastTransactions(userInfo));
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
                    <div className="home__content">
                        <div className="home__content-block">
                            <h1 className="home__content-title">Баланс</h1>
                            <div className="home__filter">
                                <DropdownByPeriodAnalytics
                                    setStart={setStartPeriod}
                                    setEnd={setEndPeriod}
                                    selected={selectedPeriod}
                                    selectedSet={selectedPeriodSet} />
                            </div>
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
                        </div>
                        <div className="home__content-block">
                            <table>
                                <thead>
                                    <tr>{
                                        ['Кошелек', 'Баланс'].map((key, index) => {
                                            return <td key={index}>{key}</td>
                                        })
                                    }</tr>
                                </thead>
                                <tbody>
                                    {<RenderWallet walletBalance={walletBalance} />}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="transaction__block">
                        <div className="transaction__top-block">
                            <div className="transaction__title-block">Последние транзакции</div>
                            <div className="home__content-buttons column__space-between">
                                <Link to='/addTransaction' className="home__button-income">
                                    <img src={`${process.env.PUBLIC_URL}/icons/income_home.svg`} />
                                    <div>Доход</div>
                                </Link>
                                <Link to='/addTransaction' className="home__button-expense">
                                    <img src={`${process.env.PUBLIC_URL}/icons/expense_home.svg`} /> 
                                    <div>Расход</div>
                                </Link>
                                <Link to='/addTransferTransaction' className="home__button-transfer">
                                    <img src={`${process.env.PUBLIC_URL}/icons/transfer_home.svg`} />
                                    <div>Перевод</div>
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