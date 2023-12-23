import Table from "../../components/table/table";
import data from "../../components/films/films";
import SearchBar from "../../components/search/search";
import { useState, useMemo, useCallback } from "react";
import Pagination from "../../components/pagination/pagination";
import style from "./home.module.scss";
import LogOut from "../../components/logout/logout";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(20);
  const [searchValue, setSearchValue] = useState("");

  const filterFilms = useCallback((searchValue: string) => {
    if (searchValue === "") {
      return data;
    }
    return data.filter((film) =>
      film.Name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
    );
  }, []);

  const currentFilms = useMemo(() => {
    const filteredFilms = filterFilms(searchValue);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

    return filteredFilms.slice(indexOfFirstRecord, indexOfLastRecord);
  }, [filterFilms, searchValue, currentPage, recordsPerPage]);

  const nPages = Math.ceil(filterFilms(searchValue).length / recordsPerPage);

  const handleSearch = (searchValue: string) => {
    setSearchValue(searchValue);
    setCurrentPage(1);
  };

  return (
    <div>
      <div className={style.top_container}>
        <div className={style.logo}>Movie_List</div>
        <LogOut />
      </div>
      <hr className={style.line} />
      <SearchBar callback={handleSearch} />

      <Table data={currentFilms} />
      <Pagination
        nPages={nPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default Home;
