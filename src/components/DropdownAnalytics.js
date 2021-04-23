import React, { useState } from 'react';
import './Dropdown.css';

export default function DropdownAnalytics({ setState, items, selected, selectedSet }) {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);

  function handleOnClick(item) {
    setState(item);
    selectedSet(item);
    setOpen(false);
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
            <div className="dropdown__filter-title dropdown__analytics-title">{selected.name}</div>
            <img src={`${process.env.PUBLIC_URL}/icons/dropdown.svg`} className="dropdown__header-icon" />
        </div>
        {open && items && (
          <div className="dropdown__filter-list dropdown__analytics-list">
            { items.map(item => (
            item.id !== 2 && <button className="dropdown__list-item" key={item.id} type="button" onClick={() => handleOnClick(item)}>
              <div>{item.name}</div>
              {selected.id === item.id && <img src={`${process.env.PUBLIC_URL}/icons/selected.svg`} className="dropdown__list-selected"/>}
            </button>
            ))}
        </div>
      )}
    </div>
  );
}