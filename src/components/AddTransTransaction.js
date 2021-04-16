import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllWallet, addTransferTransaction } from '../actions/transactionActions';
import './AddTransaction.css';
import MessageBox from './MessageBox';
import LoadingBox from './LoadingBox';
import { ADD_TRANSACTION_RESET } from '../constants/transactionConstants';

export default function AddTransTransaction(props) {

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const walletList = useSelector((state) => state.walletList);
  const { wallets } = walletList;
  const addTransaction = useSelector((state) => state.addTransaction);
  const { loadingAdd, errorAdd, messageAdd } = addTransaction;

  const [amount, setAmount] = useState(0);
  const [walletFrom, setWalletFrom] = useState(0);
  const [walletTo, setWalletTo] = useState(0);
  const [comment, setComment] = useState('_____');

  const dispatch = useDispatch();

    const submitHandler = (e) => {
      e.preventDefault();
      dispatch(addTransferTransaction(userInfo, +amount, +walletTo, +walletFrom, comment));
    };

    const [focused, setFocused] = useState("");
    const handleFocus = (inputType) => {
      setFocused(inputType);
    }
    const handleBlur = () => {
        setFocused("");
    }
    const handleClose = () => {
      dispatch({ type: ADD_TRANSACTION_RESET });
      props.history.push('/');
    }

    const getWalletFrom = (e) => {
      setWalletFrom(e.target.value);
    }
    const getWalletTo = (e) => {
      setWalletTo(e.target.value);
    }
    const getAmount = (e) => {
      setAmount(e.target.value);
    }
    const getComment = (e) => {
      setComment(e.target.value);
    }

    useEffect(() => {
      dispatch(getAllWallet(userInfo));
  }, []);

    return (
        <div className="modal display-block">
          <section className="modal__main column__center">
            <img src={`${process.env.PUBLIC_URL}/icons/exit.svg`} onClick={handleClose} className="modal__exit" />
            <form onSubmit={submitHandler} className="modal__main-form">
              <div className="modal__middle-form">
                <div className="modal__form-item" onChange={(e) => getAmount(e)}>
                  <label htmlFor="amount">Сумма</label>
                  <input type="number" id="amount"
                  onFocus={() => handleFocus("amount")} onBlur={handleBlur}
                  style={{
                    borderColor: focused == "amount"
                    ? '#1778E9' : '#848181'
                  }}
                  placeholder="0" />
                </div>
                <div className="modal__form-item">
                  <label htmlFor="walletFrom">Со счета</label>
                  <select name="walletFrom"
                  onFocus={() => handleFocus("walletFrom")} onBlur={handleBlur}
                  style={{
                    borderColor: focused == "walletFrom"
                    ? '#1778E9' : '#848181'
                  }}
                  required
                  onChange={(e) => getWalletFrom(e)}>
                    <option value="">Выберите кошелек</option>
                    {wallets ? wallets.map(({name, id}) => <option key={id} value={id}>{name}</option>) : null}
                  </select>
                </div>
                <div className="modal__form-item">
                  <label htmlFor="walletTo">На счет</label>
                  <select name="walletTo"
                  onFocus={() => handleFocus("walletTo")} onBlur={handleBlur}
                  style={{
                    borderColor: focused == "walletTo"
                    ? '#1778E9' : '#848181'
                  }}
                  required
                  onChange={(e) => getWalletTo(e)}>
                    <option value="">Выберите кошелек</option>
                    {wallets ? wallets.map(({name, id}) => <option key={id} value={id}>{name}</option>) : null}
                  </select>
                </div>
              </div>
              <div className="modal__bottom-transfer">
                <div className="modal__form-item">
                  <label htmlFor="comment">Примечание</label>
                  <textarea id="comment" name="w3review"
                  onFocus={() => handleFocus("comment")} onBlur={handleBlur}
                  style={{
                    borderColor: focused == "comment"
                    ? '#1778E9' : '#848181'
                  }}
                  rows="4" onChange={(e) => getComment(e)}></textarea>
                </div>
                <div className="modal__form-item">
                  <input type="submit" value="Добавить" />
                </div>
                {loadingAdd ? (<LoadingBox></LoadingBox>) : errorAdd ?
                <MessageBox variant="danger">{errorAdd}</MessageBox> : messageAdd ?
                <MessageBox variant="success">{messageAdd}</MessageBox> : ''}
              </div>
            </form>
          </section>
        </div>
    );
}