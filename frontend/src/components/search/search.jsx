import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import styles from "./search.module.scss";

function SearchBar({ callback }) {
  const [searchValue, setSearchValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    callback(searchValue);
  };

  const clearSearch = () => {
    setSearchValue("");
    callback("");
  };

  return (
    <form className={styles.searchbar} onSubmit={handleSubmit}>
      <input
        className="search_bar"
        type="text"
        placeholder="Search..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />

      {searchValue && ( // Display the "x" icon only when there's searchValue
        <button onClick={clearSearch}>
          <FaTimes />
        </button>
      )}
    </form>
  );
}

export default SearchBar;
