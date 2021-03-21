import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listLastTransactions, getAllWallet, addTransferTransaction } from '../actions/transactionActions';
import './AddTransaction.css';
import MessageBox from './MessageBox';
import LoadingBox from './LoadingBox';

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

  const showHideClassName = props.show ? "modal display-block" : "modal display-none";

    const submitHandler = () => {
      dispatch(addTransferTransaction(userInfo, +amount, +walletTo, +walletFrom, comment));
    };

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
        <div className={showHideClassName}>
          <section className="modal__main column__center">
            <img src={`${process.env.PUBLIC_URL}/icons/exit.svg`} onClick={()=> props.handleClose()} className="modal__exit" />
            <form onSubmit={submitHandler} className="modal__main-form">
              <div className="modal__middle-form">
                <div className="modal__form-item" onChange={(e) => getAmount(e)}>
                  <label htmlFor="amount">Сумма</label>
                  <input type="number" id="amount" placeholder="0" />
                </div>
                <div className="modal__form-item">
                  <label htmlFor="wallet">WalletFromId</label>
                  <select name="wallet" onChange={(e) => getWalletFrom(e)}>
                    <option value="default">select wallet from id</option>
                    {wallets ? wallets.map(({name, id}) => <option key={id} value={id}>{name}</option>) : null}
                  </select>
                </div>
                <div className="modal__form-item">
                  <label htmlFor="wallet">WalletToId</label>
                  <select name="wallet" onChange={(e) => getWalletTo(e)}>
                    <option value="default">select wallet to id</option>
                    {wallets ? wallets.map(({name, id}) => <option key={id} value={id}>{name}</option>) : null}
                  </select>
                </div>
              </div>
              <div className="modal__bottom-form">
                <div className="modal__form-item">
                  <label htmlFor="comment">Примечание</label>
                  <textarea id="comment" name="w3review" rows="4" onChange={(e) => getComment(e)}></textarea>
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