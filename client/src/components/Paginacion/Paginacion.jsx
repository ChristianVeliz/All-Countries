import styles from "./Paginacion.module.css";
import { useState } from "react";

const Paginacion = () => {
    const maxPage = Math.ceil(countries.length / itemsPerPage);
    const [currentPage, setCurrentPage] = useState(1);
    const handlePreviousPage = () => {
      setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };
  
    const handleNextPage = () => {
      setCurrentPage((prevPage) => Math.min(prevPage + 1, maxPage));
    };
  
    const indexOfLastCountry = currentPage * itemsPerPage;
    const indexOfFirstCountry = indexOfLastCountry - itemsPerPage;
    const currentCountries = countries.slice(
      indexOfFirstCountry,
      indexOfLastCountry
    );


    return (
        <div className={styles.Pagination}>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Anterior
        </button>
        <button onClick={handleNextPage} disabled={currentPage === maxPage}>
          Siguiente
        </button>
      </div>
    )
}