import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllActiveGroups } from '../actions/transactionActions';
import './AddTransaction.css';
import MessageBox from './MessageBox';
import LoadingBox from './LoadingBox';
import { addAccountant } from '../actions/userActions';
import { ADD_ACCOUNTANT_RESET } from '../constants/userConstants';

export default function AddAccountant(props) {

  const dispatch = useDispatch();

  const activeGroupsList = useSelector((state) => state.activeGroupList);
  const { activeGroups } = activeGroupsList;
  const addNewAccountant = useSelector((state) => state.addAccountant);
  const { loadingAdd, errorAdd, messageAdd } = addNewAccountant;

  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [groupId, setGroupId] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [callingCode, setCallingCode] = useState('+996');

  const [isPasswordShown, changePasswordShown] = useState(false);
  
  const [focused, setFocused] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(addAccountant(email, groupId, firstName, password, callingCode + ' ' + phoneNumber, surname));
  };
  const handleFocus = (inputType) => {
    setFocused(inputType);
  }
  const handleBlur = () => {
    setFocused("");
  }
  const handleClose = () => {
    dispatch({ type: ADD_ACCOUNTANT_RESET })
    props.history.push('/users');
  }

  const getFirstname = (e) => {
    setFirstName(e.target.value);
  }
  const getSurname = (e) => {
    setSurname(e.target.value);
  }
  const getGroup = (e) => {
    setGroupId(e.target.value);
  }
  const getEmail = (e) => {
    setEmail(e.target.value);
  }
  const getPassword = (e) => {
    setPassword(e.target.value);
  }
  const getCallingCode = (e) => {
    setCallingCode(e.target.value);
  }
  const getPhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  }

  const togglePasswordVisibility = () => {
    changePasswordShown(!isPasswordShown);
  };

  useEffect(() => {
    dispatch(getAllActiveGroups());
  }, []);

    return (
        <div className="modal display-block">
          <section className="modal__main">
            <img src={`${process.env.PUBLIC_URL}/icons/exit.svg`} onClick={handleClose} className="modal__exit" />
            <form onSubmit={submitHandler} className="accountant__main-form">
                <div className="accountant__form-item">
                  <label htmlFor="firstname">Имя</label>
                  <input type="text" id="firstname" required
                  onFocus={() => handleFocus("firstname")} onBlur={handleBlur}
                  style={{
                    borderColor: focused == "firstname"
                    ? '#1778E9' : '#848181'
                  }}
                  placeholder="Введите имя*"  onChange={(e) => getFirstname(e)}/>
                </div>
                <div className="accountant__form-item">
                  <label htmlFor="surname">Фамилия</label>
                  <input type="text" id="surname"
                  onFocus={() => handleFocus("surname")} onBlur={handleBlur}
                  style={{
                    borderColor: focused == "surname"
                    ? '#1778E9' : '#848181'
                  }}
                  required
                  placeholder="Введите фамилию*" onChange={(e) => getSurname(e)}/>
                </div>
                <div className="accountant__form-item">
                  <label htmlFor="callingCode">Номер телефона</label>
                  <input type="text" id="callingCode" defaultValue="+996"
                  onFocus={() => handleFocus("phoneNumber")} onBlur={handleBlur}
                  style={{
                    borderColor: focused == "phoneNumber"
                    ? '#1778E9' : '#848181'
                  }}
                  required
                  onChange={(e) => getCallingCode(e)}/>
                  <input type="tel" id="phoneNumber"
                  onFocus={() => handleFocus("phoneNumber")} onBlur={handleBlur}
                  style={{
                    borderColor: focused == "phoneNumber"
                    ? '#1778E9' : '#848181'
                  }}
                  required
                  placeholder="709 878 590" onChange={(e) => getPhoneNumber(e)}/>
                </div>
                <div className="accountant__form-item">
                  <label htmlFor="group">Группа</label>
                  <select id="group" placeholder="Выберите группу*" required
                  onFocus={() => handleFocus("group")} onBlur={handleBlur}
                  style={{
                    borderColor: focused == "group"
                    ? '#1778E9' : '#848181'
                  }}
                  onChange={(e) => getGroup(e)}>
                    <option value="">Выберите группу *</option>
                    {activeGroups ? activeGroups.map(({name, id}) => <option key={id} value={id}>{name}</option>) : null}
                  </select>
                </div>
                <div className="accountant__form-item" onChange={(e) => getEmail(e)}>
                  <label htmlFor="accountant_email">Почта</label>
                  <input type="email" id="accountant_email"
                   onFocus={() => handleFocus("accountant_email")} onBlur={handleBlur}
                   style={{
                     borderColor: focused == "accountant_email"
                     ? '#1778E9' : '#848181'
                   }}
                   required
                   placeholder="Выберите почту*" />
                </div>
                <div className="accountant__form-item">
                  <label htmlFor="accountant_password">Пароль</label>
                  <input
                  type={isPasswordShown ? "text" : "password"}
                  id="accountant_password"
                  onFocus={() => handleFocus("accountant_password")}
                  onBlur={handleBlur}
                  style={{
                    borderColor: focused == "accountant_password"
                    ? '#1778E9' : '#848181'
                  }}
                  required
                  placeholder="Введите пароль*" onChange={(e) => getPassword(e)}/>
                  <i className={`fa ${isPasswordShown ? "fa-eye-slash" : "fa-eye"} accountant__password-icon`}
                                    onClick={togglePasswordVisibility}></i>
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