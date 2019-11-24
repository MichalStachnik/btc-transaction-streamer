import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import './SearchInput.css';

const SearchInput = () => {
  const [value, setValue] = useState('');
  const history = useHistory();

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
  };

  const handleSearchChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setValue(evt.target.value);
  };

  // Fires everytime value is changed
  useEffect(() => {
    if (value.length === 64) {
      history.push(`/transaction/${value}`);
    }
  }, [value]);

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Search Transaction:
        <input onChange={handleSearchChange} value={value} type="text" />
      </label>
    </form>
  );
};

export default SearchInput;
