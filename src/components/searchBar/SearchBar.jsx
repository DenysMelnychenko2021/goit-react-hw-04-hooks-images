import { useState } from 'react';
import PropTypes from 'prop-types';
import { BsSearch } from 'react-icons/bs';
import { toast } from 'react-toastify';

export const SearchBar = ({ submitFormFinder }) => {
  const [search, setSearch] = useState('');

  const handleSearshChange = ({ currentTarget }) => {
    setSearch(currentTarget.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (search.trim() === '') {
      toast.info("You haven't entered anything", { autoClose: 7000 });
      return;
    }

    submitFormFinder(search);

    setSearch('');
  };

  return (
    <header className="searchbar">
      <form className="form" onSubmit={handleSubmit}>
        <button type="submit" className="button">
          <span className="button-label">
            <BsSearch /> Search
          </span>
        </button>

        <input
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="search"
          value={search}
          onChange={handleSearshChange}
        />
      </form>
    </header>
  );
};

SearchBar.propTypes = { submitFormFinder: PropTypes.func.isRequired };
