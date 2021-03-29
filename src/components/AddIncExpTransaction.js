import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addIncExpTransaction, listLastTransactions, getAllCategory, getCategoriesByNeoSection, getNeoSections, getAllWallet } from '../actions/transactionActions';
import './AddTransaction.css';
import MessageBox from './MessageBox';
import LoadingBox from './LoadingBox';

export default function AddIncExpTransaction(props) {

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;
  const sectionList = useSelector((state) => state.sectionList);
  const { sections } = sectionList;
  const walletList = useSelector((state) => state.walletList);
  const { wallets } = walletList;
  const addTransaction = useSelector((state) => state.addTransaction);
  const { loadingAdd, errorAdd, messageAdd } = addTransaction;

  const [date, setDate] = useState('_____');
  const [wallet, setWallet] = useState(0);
  const [summa, setSumma] = useState(0);
  const [category, setCategory] = useState(0);
  const [counterparty, setCounterparty] = useState('_____');
  const [comment, setComment] = useState('_____');
  const [focused, setFocused] = useState("");

  const dispatch = useDispatch();

  const showHideClassName = props.show ? "modal display-block" : "modal display-none";

  const submitHandler = () => {
    dispatch(addIncExpTransaction(userInfo, +summa, +wallet, +category, comment, counterparty, date));
  };
  const handleFocus = (inputType) => {
    setFocused(inputType);
  }
  const handleBlur = () => {
    setFocused("");
  }

  const getCategoryId = (e) => {
    setCategory(e.target.value);
  }
  const getCounterparty = (e) => {
    setCounterparty(e.target.value);
  }
  const getSumma = (e) => {
    setSumma(e.target.value);
  }
  const getComment = (e) => {
    setComment(e.target.value);
  }
  const getOrganization = (e) => {
    dispatch(getCategoriesByNeoSection(userInfo, e.target.value));
  }
  const getDate = (e) => {
    setDate(e.target.value);
  }
  const getWallet = (e) => {
    setWallet(e.target.value);
  }

  useEffect(() => {
    dispatch(getNeoSections(userInfo));
    dispatch(getAllWallet(userInfo));
    if(messageAdd) {
      dispatch(listLastTransactions(userInfo));
      props.handleClose();
    }
  }, [messageAdd]);

    return (
        <div className={showHideClassName}>
          <section className="modal__main column__center">
            <img src={`${process.env.PUBLIC_URL}/icons/exit.svg`} onClick={()=> props.handleClose()} className="modal__exit" />
            <form onSubmit={submitHandler} className="modal__main-form">
              <div className="modal__top-form">
                <div className="modal__form-item">
                  <label htmlFor="organization">Организация</label>
                  <select id="organization"
                  onFocus={() => handleFocus("organization")} onBlur={handleBlur}
                  style={{
                    borderColor: focused == "organization"
                    ? '#1778E9' : '#848181'
                  }}
                  onChange={(e) => getOrganization(e)}>
                    <option value="default">Выберите организацию</option>
                    {sections ? sections.map(({id, name}) => <option key={id} value={id}>{name}</option>) : null}
                  </select>
                </div>
                <div className="modal__form-item">
                  <label htmlFor="date">Дата</label>
                  <input type="date" id="date"
                   onFocus={() => handleFocus("date")} onBlur={handleBlur}
                   style={{
                     borderColor: focused == "date"
                     ? '#1778E9' : '#848181'
                   }} onChange={(e) => getDate(e)} />
                </div>
                <div className="modal__form-item">
                  <label htmlFor="wallet">Кошелек</label>
                  <select id="wallet" placeholder="Выберите кошелек"
                  onFocus={() => handleFocus("wallet")} onBlur={handleBlur}
                  style={{
                    borderColor: focused == "wallet"
                    ? '#1778E9' : '#848181'
                  }}
                  onChange={(e) => getWallet(e)}>
                    <option value="default">Выберите кошелек</option>
                    {wallets ? wallets.map(({name, id}) => <option key={id} value={id}>{name}</option>) : null}
                  </select>
                </div>
              </div>
              <div className="modal__middle-form">
                <div className="modal__form-item" onChange={(e) => getSumma(e)}>
                  <label htmlFor="summa">Сумма</label>
                  <input type="number" id="summa"
                   onFocus={() => handleFocus("summa")} onBlur={handleBlur}
                   style={{
                     borderColor: focused == "summa"
                     ? '#1778E9' : '#848181'
                   }}placeholder="0" />
                </div>
                <div className="modal__form-item">
                  <label htmlFor="category">Категория расхода</label>
                  <select name="category"
                  onFocus={() => handleFocus("category")} onBlur={handleBlur}
                  style={{
                    borderColor: focused == "category"
                    ? '#1778E9' : '#848181'
                  }}
                  onChange={(e) => getCategoryId(e)}>
                    <option value="default">Выберите категорию</option>
                    {categories ? categories.map(({category, id}) => <option key={id} value={id}>{category}</option>) : null}
                  </select>
                </div>
                <div className="modal__form-item">
                  <label htmlFor="contragent">Контрагент</label>
                  <input type="text" id="contragent"
                  onFocus={() => handleFocus("counterPart")} onBlur={handleBlur}
                  style={{
                    borderColor: focused == "counterPart"
                    ? '#1778E9' : '#848181'
                  }}
                  placeholder="Введите контрагент"  onChange={(e) => getCounterparty(e)}/>
                </div>
              </div>
              <div className="modal__bottom-form">
                <div className="modal__form-item">
                  <label htmlFor="note">Примечание</label>
                  <textarea id="note" name="w3review"
                  onFocus={() => handleFocus("note")} onBlur={handleBlur}
                  style={{
                    borderColor: focused == "note"
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