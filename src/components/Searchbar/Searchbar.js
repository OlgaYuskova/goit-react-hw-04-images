import React from 'react';
import { useState } from 'react';
import { SearchbarCounteiner } from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleChangeText = evt => {
    setQuery(evt.currentTarget.value.toLowerCase());
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    if (query.trim() === '') {
      return;
    }
    onSubmit(query);
    setQuery('');
  };

  return (
    <SearchbarCounteiner>
      <form onSubmit={handleSubmit}>
        <button type="submit">
          <span>Search</span>
        </button>
        <input
          type="text"
          autoComplete="off"
          name="text"
          placeholder="Search images and photos"
          value={query}
          onChange={handleChangeText}
        />
      </form>
    </SearchbarCounteiner>
  );
};
