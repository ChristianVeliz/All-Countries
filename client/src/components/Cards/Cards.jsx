import styles from "./Cards.module.css";
import Card from "../Card/Card";
import {  getAllCountries } from "../../redux/Actions/Actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Cards = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(0);
  const [currentCountries, setCurrentCountries] = useState([]);
  const [countriesFiltered, setCountriesFiltered] = useState([]);
  const itemsPerPage = 10;
  const countries = useSelector((state) => state.allCountries);
  const countrySearch = useSelector((state) => state.countrySearch);
  const filters = useSelector((state) => state.filters);
  const allActivities = useSelector((state) => state.allActivities);

 

  useEffect(() => {
    dispatch(getAllCountries());
  }, [dispatch]);

  useEffect(() => {
    let response = [];
    if (countrySearch && countrySearch.length > 0) {
      response = [...countrySearch];
      setCurrentPage(1);
    } else {
      response = [...countries];
      setCurrentPage(1);
    }

    if(filters.activity !== "" && allActivities.length > 0){
      const activity = allActivities.find(
        (activity) => activity.id === filters.activity
      );
      if(activity !== undefined){
        response = response.filter((country) => {
          return activity.countries.some((activityCountry) => activityCountry.id === country.id);
        });
      }
     

    }

    if(filters.continent !== ""){
      response = response.filter((country) => country.continent === filters.continent);
    }

    if(filters.population !== ""){
      if(filters.population === "lpopulation"){
        response = response.sort((a, b) => a.population - b.population);
      }else if(filters.population === "hpopulation"){
        response = response.sort((a, b) => b.population - a.population);
      }
    }

    if(filters.sortBy !== ""){
      if(filters.sortBy === "asc"){
        response = response.sort((a, b) => a.name.localeCompare(b.name));
      }else if(filters.sortBy === "desc"){
        response = response.sort((a, b) => b.name.localeCompare(a.name));
      }
    }
    setCountriesFiltered(response);
  }, [filters, countrySearch, countries, allActivities ]);

  useEffect(() => {
    setMaxPage(Math.ceil(countriesFiltered.length / itemsPerPage));
    const indexOfLastCountry = currentPage * itemsPerPage;
    const indexOfFirstCountry = indexOfLastCountry - itemsPerPage;
    setCurrentCountries(countriesFiltered.slice(indexOfFirstCountry, indexOfLastCountry));
  },[countriesFiltered,currentPage])
  

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, maxPage));
  };


  return (
    <div className={styles.Container}>
      <div className={styles.Cards}>
        {currentCountries.map((country) => (
          <Card
            key={country.id}
            id={country.id}
            name={country.name}
            image={country.image}
            continent={country.continent}
          />
        ))}
      </div>

      <div className={styles.Pagination}>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Anterior
        </button>

        <button onClick={handleNextPage} disabled={currentPage === maxPage}>
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Cards;

