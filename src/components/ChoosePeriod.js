import React, { useState } from 'react';
import './AddTransaction.css';

export default function ChoosePeriod({show, handleClose, setStart, setEnd, selectedSet}) {

  const [focused, setFocused] = useState("");
  const [start, setStartLocally] = useState(null);
  const [end, setEndLocally] = useState(null);

  const showHideClassName = show ? "modal display-block" : "modal display-none";

  const submitHandler = (e) => {
    e.preventDefault();
    if(start !== null && end !== null) {
        setStart(start);
        setEnd(end);
        selectedSet(start + ' ' + end);
        handleClose();
    }
  };
  const handleFocus = (inputType) => {
    setFocused(inputType);
  }
  const handleBlur = () => {
    setFocused("");
  }

  const getStartDate = (e) => {
    setStartLocally(e.target.value);
  }
  const getEndDate = (e) => {
    setEndLocally(e.target.value);
  }

    return (
        <div className={showHideClassName}>
          <section className="modal__main modal__add-main column__center">
            <img src={`${process.env.PUBLIC_URL}/icons/exit.svg`} onClick={()=> handleClose()} className="modal__exit" />
            <form onSubmit={submitHandler} className="modal__main-form modal__choose-form">
              <div className="modal__top-form">
                <div className="modal__form-item">
                  <label htmlFor="startDate">Дата начало</label>
                  <input type="date" id="startDate"
                   onFocus={() => handleFocus("startDate")} onBlur={handleBlur}
                   style={{
                     borderColor: focused == "startDate"
                     ? '#1778E9' : '#848181'
                   }} onChange={(e) => getStartDate(e)} />
                </div>
                <div className="modal__form-item">
                  <label htmlFor="endDate">Дата конец</label>
                  <input type="date" id="endDate"
                   onFocus={() => handleFocus("endDate")} onBlur={handleBlur}
                   style={{
                     borderColor: focused == "endDate"
                     ? '#1778E9' : '#848181'
                   }} onChange={(e) => getEndDate(e)} />
                </div>
                <div className="modal__form-item">
                  <input type="submit" value="Выберите" />
                </div>
              </div>
            </form>
          </section>
        </div>
    );
}