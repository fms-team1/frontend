import React, { useState } from 'react';
import './Dropdown.css';

const items = [
  {
    id: 0,
    name: 'Неделя',
  },
  {
    id: 1,
    name: 'Месяц',
  },
  {
    id: 2,
    name: 'Год',
  }
];

export default function DropdownByPeriodAnalytics({ setStart, setEnd, selected, selectedSet }) {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);

  const converStringDate = (date) => {
    return date.getFullYear()+'-'+(+date.getMonth()+1)+'-'+date.getDate()
  }

  function handleOnClick(item) {
    let ourDate = new Date();

    if(item.id === 0) {
      let weekDate = new Date(ourDate);
      let pastDate = weekDate.getDate() - 7;
      weekDate.setDate(pastDate);
      let startPeriod = converStringDate(weekDate);
      let endPeriod = converStringDate(ourDate);
      setStart(startPeriod);
      setEnd(endPeriod);
      selectedSet(item);
      setOpen(false);
    }
    else if (item.id === 1) {
      let date = new Date(ourDate);
      let month = date.getMonth()-1;
      let formatPrevMonth = new Date(date.setMonth(month));
      let startPeriod = converStringDate(formatPrevMonth);
      let endPeriod = converStringDate(ourDate);
      setStart(startPeriod);
      setEnd(endPeriod);
      selectedSet(item);
      setOpen(false);
    }
    else if (item.id === 2) {
      let date = new Date(ourDate);
      let year = date.getFullYear()-1;
      let formatPrevYear = new Date(date.setFullYear(year));
      let startPeriod = converStringDate(formatPrevYear);
      let endPeriod = converStringDate(ourDate);
      setStart(startPeriod);
      setEnd(endPeriod);
      selectedSet(item);
      setOpen(false);
    }
  }

  return (
    <div className="dropdown__filter-item dropdown__analytics-item">
        <div
          tabIndex={0}
          className="dropdown__filter-header dropdown__analytics-header"
          role="button"
          onKeyPress={() => toggle(!open)}
          onClick={() => toggle(!open)}
        >
          <div className="dropdown__filter-title dropdown__analytics-title">
            {selected.name}
          </div>
          <img src={`${process.env.PUBLIC_URL}/icons/dropdown.svg`} className="dropdown__header-icon" />
        </div>
        {open && items && (
          <div className="dropdown__filter-list dropdown__analytics-list">
            { items.map(item => (
            <button className="dropdown__list-item" key={item.id} type="button" onClick={() => handleOnClick(item)}>
              <div>{item.name}</div>
              {selected.id === item.id && <img src={`${process.env.PUBLIC_URL}/icons/selected.svg`} className="dropdown__list-selected"/>}
            </button>
        ))}
        </div>
      )}
    </div>
  );
}