import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editDebt, getDebt } from '../actions/transactionActions';
import './AddTransaction.css';
import MessageBox from './MessageBox';
import LoadingBox from './LoadingBox';
import { EDIT_DEBT_RESET } from '../constants/transactionConstants';

export default function EditDebt(props) {

  const debtId = props.match.params.id;

  const debtForEdit = useSelector((state) => state.getDebt);
  const { loading, error, message } = debtForEdit;

  const editedDebt = useSelector((state) => state.editDebt);
  const { loadingEdit, errorEdit, messageEdit } = editedDebt;

  const [summa, setSumma] = useState(message && message.toBePaid);
  const [debt, setDebt] = useState(message && message.owe);
  const [paid, setPaid] = useState(message && message.paid);
  
  const [focused, setFocused] = useState("");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
      dispatch(editDebt(+summa, +debt, +paid, debtId, message.transactionModel.id));
  };
  const handleFocus = (inputType) => {
    setFocused(inputType);
  }
  const handleBlur = () => {
    setFocused("");
  }
  const handleClose = () => {
    dispatch({ type: EDIT_DEBT_RESET });
    props.history.push('/debts');
  }

  useEffect(() => {
    setSumma(message && message.toBePaid);
    setDebt(message && message.owe);
    setPaid(message && message.paid);
  }, [message]);

  useEffect(() => {
    dispatch(getDebt(debtId));
  }, []);

    return (
        <div className="modal display-block">
          <section className="modal__main modal__change-main">
            <img src={`${process.env.PUBLIC_URL}/icons/exit.svg`} onClick={handleClose} className="modal__exit" />
            <form onSubmit={submitHandler} className="accountant__main-form">
              {loading || loadingEdit ? <LoadingBox></LoadingBox> : ''}
                <div className="accountant__form-item" onChange={(e) => setSumma(e.target.value)}>
                  <label htmlFor="summa">Сумма к оплате</label>
                  <input type="number" id="summa"
                    value={summa}
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
                    value={paid}
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
                    value={debt}
                    onFocus={() => handleFocus("debt")} onBlur={handleBlur}
                    style={{
                      borderColor: focused == "debt"
                      ? '#1778E9' : '#848181'
                    }}
                    placeholder="0" />
                </div>
                <div className="accountant__form-item">
                  <input type="submit" value="Изменить" />
                </div>
                {loadingEdit ? (<LoadingBox></LoadingBox>) : errorEdit ?
                <MessageBox variant="danger">{errorEdit}</MessageBox> : messageEdit ?
                <MessageBox variant="success">Успешно изменено</MessageBox> : ''}
            </form>
          </section>
        </div>
    );
}