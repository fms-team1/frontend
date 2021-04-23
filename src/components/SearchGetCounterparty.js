import React, { useEffect, useRef, useState } from 'react';
import './Dropdown.css';

export default function SearchGetCounterparty({ state, setState, label, title, items }) {
  const [open, setOpen] = useState(false);
  const [selected, selectedSet] = useState(null);
  const [search, setSearch] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const wrapperRef = useRef(null);

  function handleOnClick(item) {
    setState(item.name);
    selectedSet(item.name);
    setSearch('');
    setOpen(false);
  }
  function handleOnCancel() {
    setState(null);
    selectedSet(null);
  }
  function onHandleChangeInput(e) {
    setState(e.target.value);
    setSearch(e.target.value);
  }

  useEffect(() => {
    setFilteredItems(
      items && items.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      )
    );

    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
          setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [search, wrapperRef]);

  return (
    <div ref={wrapperRef} className="dropdown__filter-item">
      { selected && state !== null ?
        <>
          <label>{label}</label>
          <div className="dropdown__selected-header dropdown__add-header">
            <span className="dropdown__selected-title">{selected}</span>
            <img
            src={`${process.env.PUBLIC_URL}/icons/dropdown-cancel.svg`}
            onKeyPress={() => handleOnCancel()}
            onClick={() => handleOnCancel()}
            className="dropdown__cancel-icon" />
          </div>
        </> :
        <>
          <label>{label}</label>
          <input
            type="text"
            placeholder={title}
            onFocus={() => setOpen(true)}
            onChange={onHandleChangeInput} />
        </>
        }
        {open && (
          <div className="dropdown__filter-list dropdown__add-list">
            { filteredItems && filteredItems.map(item => (
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