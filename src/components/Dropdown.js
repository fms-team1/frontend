import React, { useState } from 'react';
import './Dropdown.css'

export default function Dropdown({ title, items, multiSelect = false, calendarIcon, operation }) {
  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState([]);
  const toggle = () => setOpen(!open);

  // console.log(items);

  function handleOnClick(item) {
    if (!selection.some(current => current.id === item.id)) {
      if (!multiSelect) {
        setSelection([item]);
      } else if (multiSelect) {
        setSelection([...selection, item]);
      }
    } else {
      let selectionAfterRemoval = selection;
      selectionAfterRemoval = selectionAfterRemoval.filter(
        current => current.id !== item.id
      );
      setSelection([...selectionAfterRemoval]);
    }
  }

  function isItemInSelection(item) {
    if (selection.some(current => current.id === item.id)) {
      return true;
    }
    return false;
  }

  return (
    <div className="dropdown__filter-item">
      <div
        tabIndex={0}
        className="dropdown__filter-header"
        role="button"
        onKeyPress={() => toggle(!open)}
        onClick={() => toggle(!open)}
      >
        {calendarIcon && <img src={`${process.env.PUBLIC_URL}/icons/calendar.svg`} className="dropdown__list-calendar"/>}
        <div className="dropdown__filter-title">{title}</div>
        <img src={`${process.env.PUBLIC_URL}/icons/dropdown.svg`} className="dropdown__header-icon" />
      </div>
        {open && (
          <div className="dropdown__filter-list">
            { operation ? items.map(item => (
                <button className="dropdown__list-item" key={item} type="button" onClick={() => handleOnClick(item)}>
                  {
                    item === 'INCOME' ?
                    <img src={`${process.env.PUBLIC_URL}/icons/income.svg`} /> :
                    item === 'EXPENSE' ?
                    <img src={`${process.env.PUBLIC_URL}/icons/expense.svg`} /> :
                    items === 'MONEY_TRANSFER' ?
                    <img src={`${process.env.PUBLIC_URL}/icons/transfer.svg`} /> : ''
                  }
                  <div>{item}</div>
                  {isItemInSelection(item) && <img src={`${process.env.PUBLIC_URL}/icons/selected.svg`} className="dropdown__list-selected"/>}
                </button>
            )) : items.map(item => (
              <button className="dropdown__list-item" key={item.id} type="button" onClick={() => handleOnClick(item)}>
                <div>{item.value}</div>
                {isItemInSelection(item) && <img src={`${process.env.PUBLIC_URL}/icons/selected.svg`} className="dropdown__list-selected"/>}
              </button>
          ))}
        </div>
      )}
    </div>
  );
}