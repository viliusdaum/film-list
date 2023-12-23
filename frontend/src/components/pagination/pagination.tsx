import styles from "./pagination.module.scss";

const Pagination = ({ nPages, currentPage, setCurrentPage }: any) => {
  const pageNumbers: number[] = Array.from(
    { length: nPages },
    (_, index) => index + 1
  );

  const nextPage = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };
  return (
    <nav className={styles.page_container}>
      <ul className={styles.page_list}>
        <li className={styles.prev}>
          <button onClick={prevPage}>Previous</button>
        </li>
        {pageNumbers.map((pgNumber) => (
          <li
            className={`${styles.list_item} ${
              currentPage === pgNumber ? styles.active : ""
            }`}
            key={pgNumber}
          >
            <button onClick={() => setCurrentPage(pgNumber)}>{pgNumber}</button>
          </li>
        ))}
        <li className={styles.next}>
          <button onClick={nextPage}>Next</button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
