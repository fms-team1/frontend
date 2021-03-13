import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './AddTransaction.css';
import CustomTextInput from './CustomTextInput';

export default function AddTransaction(props) {

  const [organization, setOrganization] = useState('_____');
  const [date, setDate] = useState('_____');
  const [wallet, setWallet] = useState('_____');
  const [summa, setSumma] = useState(0);
  const [category, setCategory] = useState('_____');
  const [contragent, setContragent] = useState('_____');
  const [comment, setComment] = useState('_____');

  const dispatch = useDispatch();
  const [submitted, setSubmitted] = useState(false);

  const showHideClassName = props.show ? "modal display-block" : "modal display-none";

    const submitHandler = (e) => {
      e.preventDefault();
      setSubmitted(true);
      if(summa && contragent) {
          props.handleClose()
          dispatch();
      }
  };

    return (
        <div className={showHideClassName}>
          <section className="modal__main column__center">
            {/* {props.typeTransaction} */}
            <form onSubmit={submitHandler} className="modal__main-from">
              <div className="modal__top-form">
                <div className="modal__form-item">
                  <label htmlFor="organization">Организация</label>
                  <select name="organization">
                    <option value="default">Выберите организацию</option>
                    <option value="Neolabs">Neolabs</option>
                    <option value="Breeze studio">Breeze studio</option>
                  </select>
                </div>
                <div className="modal__form-item">
                  <label htmlFor="date">Дата</label>
                  <input type="date" id="date" />
                </div>
                <div className="modal__form-item">
                  <label htmlFor="organization">Кошелек</label>
                  <select name="organization">
                    <option value="default">Выберите кошелек</option>
                    <option value="Neolabs">Neolabs</option>
                    <option value="Breeze studio">Breeze studio</option>
                  </select>
                </div>
              </div>
              <div className="modal__middle-form">
                <div className="modal__form-item">
                  <label htmlFor="summa">Сумма</label>
                  <input type="number" id="summa" placeholder="0" />
                </div>
                <div className="modal__form-item">
                  <label htmlFor="category">Категория расхода</label>
                  <select name="category">
                    <option value="default">Выберите категорию</option>
                    <option value="Neolabs">Neolabs</option>
                    <option value="Breeze studio">Breeze studio</option>
                  </select>
                </div>
                <div className="modal__form-item">
                  <label htmlFor="contragent">Контрагент</label>
                  <input type="text" id="contragent" placeholder="Введите контрагент" />
                </div>
              </div>
              <div className="modal__bottom-form">
                <div className="modal__form-item">
                  <label htmlFor="note">Примечание</label>
                  <textarea id="note" name="w3review" rows="4"></textarea>
                </div>
                <div className="modal__form-item">
                  <input type="submit" value="Добавить" />
                </div>
                <button onClick={props.handleClose}>Close</button>
              </div>
            </form>
          </section>
        </div>
    );
}