import React, { useState } from 'react';
import './Dropdown.css';

export default function Dropdown({ state, setState, title, items, dropdownType }) {
  const [open, setOpen] = useState(false);
  const [selected, selectedSet] = useState(null);
  const toggle = () => setOpen(!open);

  function handleOnClick(item) {
    setState(item.id);
    selectedSet(item.name);
    setOpen(false);
  }
  function handleOnCancel() {
    setState(null);
    selectedSet(null);
  }

  return (
    <div className="dropdown__filter-item">
      { selected && state !== null ?
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
        <div className="dropdown__filter-title">{title}</div>
        <img src={`${process.env.PUBLIC_URL}/icons/dropdown.svg`} className="dropdown__header-icon" />
      </div>
        }
        {open && items && (
          <div className="dropdown__filter-list">
            { dropdownType=="wallets" ? items.map(item => (
                <button className="dropdown__list-item" key={item.id} type="button" onClick={() => handleOnClick(item)}>
                  {
                    item.id === 1 ?
                    <>
                      <img src={`${process.env.PUBLIC_URL}/icons/cash.png`} />
                      <div>{item.name}</div>
                      {selected && <img src={`${process.env.PUBLIC_URL}/icons/selected.svg`} className="dropdown__list-selected"/>}
                    </> :
                    item.id === 3 ?
                    <>
                      <img src={`${process.env.PUBLIC_URL}/icons/demir.png`} />
                      <div>{item.name}</div>
                      {selected && <img src={`${process.env.PUBLIC_URL}/icons/selected.svg`} className="dropdown__list-selected"/>}
                    </> :
                    item.id === 2 ?
                    <>
                      <img src={`${process.env.PUBLIC_URL}/icons/okg.png`} />
                      <div>{item.name}</div>
                      {selected && <img src={`${process.env.PUBLIC_URL}/icons/selected.svg`} className="dropdown__list-selected"/>}
                    </> :
                    item.id === 4 ?
                    <>
                      <img src={`${process.env.PUBLIC_URL}/icons/elsom.png`} />
                      <div>{item.name}</div>
                      {selected && <img src={`${process.env.PUBLIC_URL}/icons/selected.svg`} className="dropdown__list-selected"/>}
                    </> : 
                    <>
                      <img src={`${process.env.PUBLIC_URL}/icons/cash.png`} />
                      <div>{item.name}</div>
                      {selected && <img src={`${process.env.PUBLIC_URL}/icons/selected.svg`} className="dropdown__list-selected"/>}
                    </>
                  }
                </button>
            )) : dropdownType=="operations" ? items.map(item => (
              <button className="dropdown__list-item" key={item.id} type="button" onClick={() => handleOnClick(item)}>
                {
                  item.id === 0 ?
                  <>
                    <img src={`${process.env.PUBLIC_URL}/icons/income.svg`} />
                    <div>Доход</div>
                    {selected && <img src={`${process.env.PUBLIC_URL}/icons/selected.svg`} className="dropdown__list-selected"/>}
                  </> :
                  item.id === 1 ?
                  <>
                    <img src={`${process.env.PUBLIC_URL}/icons/expense.svg`} />
                    <div>Расход</div>
                    {selected && <img src={`${process.env.PUBLIC_URL}/icons/selected.svg`} className="dropdown__list-selected"/>}
                  </> :
                  item.id === 2 ?
                  <>
                    <img src={`${process.env.PUBLIC_URL}/icons/transfer.svg`} />
                    <div>Перевод</div>
                    {selected && <img src={`${process.env.PUBLIC_URL}/icons/selected.svg`} className="dropdown__list-selected"/>}
                  </> : ''
                }
              </button>
          )) : items.map(item => (
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