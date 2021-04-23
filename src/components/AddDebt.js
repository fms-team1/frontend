import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoriesByNeoSection, getNeoSections, getAllWallet, getAllCategory, addNewDebt } from '../actions/transactionActions';
import './AddTransaction.css';
import MessageBox from './MessageBox';
import LoadingBox from './LoadingBox';
import { ADD_TRANSACTION_RESET } from '../constants/transactionConstants';
import { getAllCounterparties } from '../actions/userActions';
import SearchGetCounterparty from './SearchGetCounterparty';

export default function AddDebt(props) {

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;
  const sectionList = useSelector((state) => state.sectionList);
  const { sections } = sectionList;
  const walletList = useSelector((state) => state.walletList);
  const { wallets } = walletList;
  const allCounterparties = useSelector((state) => state.allCounterparties);
  const { allCounterpartiesList } = allCounterparties;

  const addTransaction = useSelector((state) => state.addTransaction);
  const { loadingAdd, errorAdd, messageAdd } = addTransaction;

  const [date, setDate] = useState('_____');
  const [wallet, setWallet] = useState(0);
  const [summa, setSumma] = useState(0);
  const [debt, setDebt] = useState(0);
  const [paid, setPaid] = useState(0);
  const [category, setCategory] = useState(0);
  const [counterparty, setCounterparty] = useState('_____');
  const [comment, setComment] = useState('_____');
  
  const [focused, setFocused] = useState("");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(addNewDebt(+summa, +debt, +paid, +wallet, +category, comment, counterparty, date));
  };
  const handleFocus = (inputType) => {
    setFocused(inputType);
  }
  const handleBlur = () => {
    setFocused("");
  }
  const handleClose = () => {
    dispatch({ type: ADD_TRANSACTION_RESET });
    props.history.push('/debts');
  }

  useEffect(() => {
    dispatch(getNeoSections(userInfo));
    dispatch(getAllWallet(userInfo));
    dispatch(getAllCategory(userInfo));
    dispatch(getAllCounterparties());
  }, []);

    return (
        <div className="modal display-block">
          <section className="modal__main column__center">
            <img src={`${process.env.PUBLIC_URL}/icons/exit.svg`} onClick={handleClose} className="modal__exit" />
            <form onSubmit={submitHandler} className="accountant__main-form">
                <div className="accountant__form-item">
                  <label htmlFor="organization">Организация</label>
                  <select id="organization"
                  onFocus={() => handleFocus("organization")} onBlur={handleBlur}
                  style={{
                    borderColor: focused == "organization"
                    ? '#1778E9' : '#848181'
                  }}
                  required
                  onChange={(e) => dispatch(getCategoriesByNeoSection(userInfo, e.target.value))}>
                    <option value="">Выберите организацию</option>
                    {sections ? sections.map(({id, name}) => id !== 2 && <option key={id} value={id}>{name}</option>) : null}
                  </select>
                </div>
                <div className="accountant__form-item" onChange={(e) => setSumma(e.target.value)}>
                  <label htmlFor="summa">Сумма к оплате</label>
                  <input type="number" id="summa"
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
                  <label htmlFor="wallet">Кошелек</label>
                  <select id="wallet" placeholder="Выберите кошелек" required
                  onFocus={() => handleFocus("wallet")} onBlur={handleBlur}
                  style={{
                    borderColor: focused == "wallet"
                    ? '#1778E9' : '#848181'
                  }}
                  onChange={(e) => setWallet(e.target.value)}>
                    <option value="">Выберите кошелек</option>
                    {wallets ? wallets.map(({name, id}) => <option key={id} value={id}>{name}</option>) : null}
                  </select>
                </div>
                <div className="accountant__form-item">
                  <label htmlFor="category">Категория расхода</label>
                  <select name="category"
                  onFocus={() => handleFocus("category")} onBlur={handleBlur}
                  style={{
                    borderColor: focused == "category"
                    ? '#1778E9' : '#848181'
                  }}
                  required
                  onChange={(e) => setCategory(e.target.value)}>
                    <option value="">Выберите категорию</option>
                    {categories ? categories.map(({name, id}) => <option key={id} value={id}>{name}</option>) : null}
                  </select>
                </div>
                <div className="accountant__form-item">
                  <SearchGetCounterparty
                    state={counterparty}
                    setState={setCounterparty}
                    title="Введите контрагент"
                    label="Контрагент"
                    items={allCounterpartiesList} />
                </div>
                <div className="accountant__form-item">
                    <label htmlFor="date">Дата</label>
                    <input type="date" id="date"
                    onFocus={() => handleFocus("date")} onBlur={handleBlur}
                    style={{
                      borderColor: focused == "date"
                      ? '#1778E9' : '#848181'
                    }} onChange={(e) => setDate(e.target.value)} />
                </div>
                <div className="accountant__form-item debts__form-item">
                  <label htmlFor="note">Примечание</label>
                  <textarea id="note" name="w3review"
                  onFocus={() => handleFocus("note")} onBlur={handleBlur}
                  style={{
                    borderColor: focused == "note"
                    ? '#1778E9' : '#848181'
                  }}
                  rows="4" onChange={(e) => setComment(e.target.value)}></textarea>
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