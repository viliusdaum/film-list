import { useState } from "react";
import { FaTimes } from "react-icons/fa"; // Import the "x" icon from a suitable icon library
import styles from "./search.module.scss";

function SearchBar({ callback }) {
  const [searchValue, setSearchValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    callback(searchValue);
  };

  const clearSearch = () => {
    setSearchValue("");
    callback(""); // Submit the form with empty string
  };

  return (
    <form className={styles.searchbar} onSubmit={handleSubmit}>
      <div className={styles.searchContainer}>
        <input
          className="search_bar"
          type="text"
          placeholder="Search..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />

        {searchValue && ( // Display the "x" icon only when there's searchValue
          <button
            type="button"
            className={styles.clearButton}
            onClick={clearSearch}
          >
            <FaTimes />
          </button>
        )}
      </div>
    </form>
  );
}

export default SearchBar;
