import React, { useEffect, useRef, useState } from 'react';
import './Dropdown.css';

export default function Dropdown({ state, setState, title, items }) {
  const [open, setOpen] = useState(false);
  const [selected, selectedSet] = useState(null);
  const [search, setSearch] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const wrapperRef = useRef(null);

  function handleOnClick(item) {
    setState(item.id);
    selectedSet(item.name);
    setSearch('');
    setOpen(false);
  }
  function handleOnCancel() {
    setState(null);
    selectedSet(null);
  }
  function onHandleChangeInput(e) {
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
  }, [search, items, wrapperRef]);

  return (
    <div ref={wrapperRef} className="dropdown__filter-item">
      { selected && state !== null ?
        <div
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
          className="home__search-bar"
        >
          <input
            type="text"
            placeholder={title}
            className="home__search"
            onFocus={() => setOpen(true)}
            onChange={onHandleChangeInput} />
        </div>
        }
        {open && (
          <div className="dropdown__filter-list dropdown__search-list">
            { filteredItems.map(item => (
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