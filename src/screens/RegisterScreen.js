import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllActiveGroups } from '../actions/transactionActions';

export default function RegisterScreen() {

    const dispatch = useDispatch();

    const activeGroupsList = useSelector((state) => state.activeGroupList);
    const { activeGroups } = activeGroupsList;

    const [focused, setFocused] = useState("");

    const [firstName, setFirstName] = useState('');
    const [surname, setSurname] = useState('');
    const [groupId, setGroupId] = useState(0);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [callingCode, setCallingCode] = useState('+996');

    const handleFocus = (inputType) => {
        setFocused(inputType);
    }
    const handleBlur = () => {
        setFocused("");
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
    const getCallingCode = (e) => {
        setCallingCode(e.target.value);
    }
    const getPhoneNumber = (e) => {
        setPhoneNumber(e.target.value);
    }

    useEffect(() => {
        dispatch(getAllActiveGroups());
    }, []);
    
    return (
        <section className="register">
            <div className="container">
                <div className="register__content column">
                    <div className="signin__block">
                        <img src={`${process.env.PUBLIC_URL}/web-analytics 1.svg`} alt="web-analytics"/>
                    </div>
                    <div className="register__form">
                        <div className="signin__icon">
                            <img src={`${process.env.PUBLIC_URL}/logo.svg`} alt="icon"/>
                            <div className="signin__icon-title">NeoFin</div>
                        </div>
                        <form onSubmit={() => alert("Hi")}>
                            <div className="register__form-item">
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
                            <div className="register__form-item">
                                <label htmlFor="firstname">Имя</label>
                                <input type="text" id="firstname" required
                                onFocus={() => handleFocus("firstname")} onBlur={handleBlur}
                                style={{
                                    borderColor: focused == "firstname"
                                    ? '#1778E9' : '#848181'
                                }}
                                placeholder="Введите имя*"  onChange={(e) => getFirstname(e)}/>
                            </div>
                            <div className="register__form-item">
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
                            <div className="register__form-item">
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
                            <div className="register__form-item">
                                <input type="submit" value="Зарегистрироваться" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}