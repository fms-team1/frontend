import React, { useState } from 'react';
import ChoosePeriod from './ChoosePeriod';
import './Dropdown.css';

const items = [
  {
    id: 1,
    name: 'Неделя',
  },
  {
    id: 2,
    name: 'Месяц',
  },
  {
    id: 3,
    name: 'Год',
  },
  {
    id: 4,
    name: 'За период',
  }
];

export default function DropdownByPeriod({ start, end, setStart, setEnd, title }) {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [selected, selectedSet] = useState(null);
  const toggle = () => setOpen(!open);

  const showModal = () => {
    setShow(true);
  };

  const hideModal = () => {
    setShow(false);
    setOpen(false);
  };

  const converStringDate = (date) => {
    return date.getFullYear()+'-'+(+date.getMonth()+1)+'-'+date.getDate()
  }

  function handleOnClick(item) {
    let ourDate = new Date();

    if(item.id === 1) {
      let weekDate = new Date(ourDate);
      let pastDate = weekDate.getDate() - 7;
      weekDate.setDate(pastDate);
      let startPeriod = converStringDate(weekDate);
      let endPeriod = converStringDate(ourDate);
      setStart(startPeriod);
      setEnd(endPeriod);
      selectedSet(startPeriod + ' ' + endPeriod);
      setOpen(false);
    }
    else if (item.id === 2) {
      let date = new Date(ourDate);
      let month = date.getMonth()-1;
      let formatPrevMonth = new Date(date.setMonth(month));
      let startPeriod = converStringDate(formatPrevMonth);
      let endPeriod = converStringDate(ourDate);
      setStart(startPeriod);
      setEnd(endPeriod);
      selectedSet(startPeriod + ' ' + endPeriod);
      setOpen(false);
    }
    else if (item.id === 3) {
      let date = new Date(ourDate);
      let year = date.getFullYear()-1;
      let formatPrevYear = new Date(date.setFullYear(year));
      let startPeriod = converStringDate(formatPrevYear);
      let endPeriod = converStringDate(ourDate);
      setStart(startPeriod);
      setEnd(endPeriod);
      selectedSet(startPeriod + ' ' + endPeriod);
      setOpen(false);
    }
    else if(item.id === 4) {
      setShow(true);
    }
  }

  function handleOnCancel() {
    setStart(null);
    setEnd(null);
    selectedSet(null);
  }

  return (
    <div className="dropdown__filter-item">
      { selected && start && end !== null ?
        <div
          tabIndex={0}
          className="dropdown__selected-header"
        >
          <div className="dropdown__selected-title">{selected}</div>
          <img
            src={`${process.env.PUBLIC_URL}/icons/dropdown-cancel.svg`}
            onKeyPress={() => handleOnCancel()}
            onClick={() => handleOnCancel()}
            className="dropdown__cancel-icon" />
        </div> :
        <div
          tabIndex={0}
          className="dropdown__filter-header"
          role="button"
          onKeyPress={() => toggle(!open)}
          onClick={() => toggle(!open)}
        >
          <div className="dropdown__filter-title">
          <img src={`${process.env.PUBLIC_URL}/icons/calendar.svg`} onClick={() => showModal()} className="dropdown__list-calendar"/>
            {title}
          </div>
          <img src={`${process.env.PUBLIC_URL}/icons/dropdown.svg`} className="dropdown__header-icon" />
      </div>
        }
        {open && items && (
          <div className="dropdown__filter-list">
            <ChoosePeriod show={show} handleClose={hideModal} setStart={setStart} setEnd={setEnd} selectedSet={selectedSet} />
            { items.map(item => (
            <button className="dropdown__list-item" key={item.id} type="button" onClick={() => handleOnClick(item)}>
              <div>{item.name}</div>
              {selected && <img src={`${process.env.PUBLIC_URL}/icons/selected.svg`} className="dropdown__list-selected"/>}
            </button>
        ))}
        </div>
      )}
    </div>
  );
}