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

export default function HomeScreen(props) {
    const dispatch = useDispatch();
    const [showIncExp, setShowIncExp] = useState(false);
    const [showTrans, setShowTrans] = useState(false);
    const [customActive, setCustomActive] = useState(null);
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

    const converStringDate = (date) => {
        return date.getFullYear()+'-'+(+date.getMonth()+1)+'-'+date.getDate()
    }

    const filterByTime = (e) => {
        let ourDate = new Date();

        if(e.target.value === 'week' || e.target.innerText === 'Неделя') {
            let weekDate = new Date(ourDate);
            let pastDate = weekDate.getDate() - 7;
            weekDate.setDate(pastDate);
            dispatch(listPeriodTransactions(userInfo, converStringDate(weekDate) + ' ' + converStringDate(ourDate)));
        } else if (e.target.value === 'month' || e.target.innerText === 'Месяц') {
            let date = new Date(ourDate);
            let month = date.getMonth()-1;
            let formatPrevMonth = new Date(date.setMonth(month));
            dispatch(listPeriodTransactions(userInfo, converStringDate(formatPrevMonth) + ' ' + converStringDate(ourDate)));
        } else if (e.target.value === 'year' || e.target.innerText === 'Год') {
            let date = new Date(ourDate);
            let year = date.getFullYear()-1;
            let formatPrevYear = new Date(date.setFullYear(year));
            dispatch(listPeriodTransactions(userInfo, converStringDate(formatPrevYear) + ' ' + converStringDate(ourDate)));
        }
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
                        <div className="home__content-top column__space-between">
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
                                <div className="home__filter-self">
                                    <div className="home__filter-icon"></div>
                                    <select className="home__filter-select" onChange={(e) => filterByTime(e)}>
                                        <option value="choose">Выберите</option>
                                        <option value="year">год</option>
                                        <option value="month">месяц</option>
                                        <option value="week">неделя</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="home__filter-adaptive">
                            <div onClick={(e) => {
                              setCustomActive(3)
                              filterByTime(e)}}
                              className={`customNavLink ${customActive === 3 ? 'customNavLink--active' : ''}` }>
                              Год
                            </div>
                            <div onClick={(e) => {
                              setCustomActive(2)
                              filterByTime(e)}} 
                              className={`customNavLink ${customActive === 2 ? 'customNavLink--active' : ''}` }>
                              Месяц
                            </div>
                            <div onClick={(e) => {
                              setCustomActive(1)
                              filterByTime(e)}} 
                              className={`customNavLink ${customActive === 1 ? 'customNavLink--active' : ''}` }>
                              Неделя
                             </div>
                           </div>
                        <div className="home__content-body">
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
                        <AddIncExpTransaction show={showIncExp} handleClose={hideModal} />
                        <AddTransTransaction show={showTrans} handleClose={hideModal} />
                        <div className="home__content-buttons column__space-between">
                            <button onClick={showModal} className="home__button-income">
                                <img src={`${process.env.PUBLIC_URL}/icons/income_24.svg`} />
                                <div>Доход</div>
                            </button>
                            <button onClick={showModal} className="home__button-expense">
                                <img src={`${process.env.PUBLIC_URL}/icons/expense_24.svg`} /> 
                                <div>Расход</div>
                            </button>
                            <button onClick={showTransferModal} className="home__button-transfer">
                                <img src={`${process.env.PUBLIC_URL}/icons/transfer_24.svg`} />
                                <div>Перевод</div>
                            </button>
                        </div>
                    </div>
                    <div className="transaction__block">
                        {media ? 
                        (<>
                            <div className="transaction__title-block">Последние транзакции</div>
                            <RenderAdaptiveTransaction  transactions={transactions} />
                        </>) : <RenderTransaction transactions={transactions} />}
                    </div>    
                </>
                )}
        </section>
    )
}