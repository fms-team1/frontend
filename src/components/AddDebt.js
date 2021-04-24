import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewDebt } from '../actions/transactionActions';
import './AddTransaction.css';
import MessageBox from './MessageBox';
import LoadingBox from './LoadingBox';
import { ADD_DEBT_RESET } from '../constants/transactionConstants';

export default function AddDebt(props) {

  const addTransaction = useSelector((state) => state.addNewDebt);
  const { loadingAdd, errorAdd, messageAdd } = addTransaction;

  const [summa, setSumma] = useState(0);
  const [debt, setDebt] = useState(0);
  const [paid, setPaid] = useState(0);
  
  const [focused, setFocused] = useState("");
  const [transactionDebt, setTransactionDebt] = useState(null);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    if(transactionDebt) {
      dispatch(addNewDebt(+summa, +debt, +paid, transactionDebt.transactionId));
    }
  };
  const handleFocus = (inputType) => {
    setFocused(inputType);
  }
  const handleBlur = () => {
    setFocused("");
  }
  const handleClose = () => {
    dispatch({ type: ADD_DEBT_RESET });
    props.history.push('/debts');
  }

  useEffect(() => {
    if(localStorage.getItem('transactionDebts')) {
      setTransactionDebt(JSON.parse(localStorage.getItem('transactionDebts')));
      setSumma(JSON.parse(localStorage.getItem('transactionDebts')).amount)
    }
  }, []);

    return (
        <div className="modal display-block">
          <section className="modal__main modal__change-main">
            <img src={`${process.env.PUBLIC_URL}/icons/exit.svg`} onClick={handleClose} className="modal__exit" />
            <form onSubmit={submitHandler} className="accountant__main-form">
                <div className="accountant__form-item" onChange={(e) => setSumma(e.target.value)}>
                  <label htmlFor="summa">Сумма к оплате</label>
                  <input type="number" id="summa"
                    defaultValue={transactionDebt && transactionDebt.amount}
                    onFocus={() => handleFocus("summa")} onBlur={handleBlur}
                    style={{
                      borderColor: focused == "summa"
                      ? '#1778E9' : '#848181'
                    }}
                   placeholder="Введите сумму к оплате" />
                </div>
                <div className="accountant__form-item debts__form-item" onChange={(e) => setPaid(e.target.value)}>
                  <label htmlFor="paid">Оплачено</label>
                  <input type="number" id="paid"
                   onFocus={() => handleFocus("paid")} onBlur={handleBlur}
                   style={{
                     borderColor: focused == "paid"
                     ? '#1778E9' : '#848181'
                   }}
                   placeholder="Введите сумму к оплате" />
                </div>
                <div className="accountant__form-item debts__form-item" onChange={(e) => setDebt(e.target.value)}>
                  <label htmlFor="debt">Долг</label>
                  <input type="number" id="debt"
                   onFocus={() => handleFocus("debt")} onBlur={handleBlur}
                   style={{
                     borderColor: focused == "debt"
                     ? '#1778E9' : '#848181'
                   }}
                   placeholder="0" />
                </div>
                <div className="accountant__form-item">
                  <input type="submit" value="Добавить" />
                </div>
                {loadingAdd ? (<LoadingBox></LoadingBox>) : errorAdd ?
                <MessageBox variant="danger">{errorAdd}</MessageBox> : messageAdd ?
                <MessageBox variant="success">Успешно добавлен</MessageBox> : ''}
            </form>
          </section>
        </div>
    );
}