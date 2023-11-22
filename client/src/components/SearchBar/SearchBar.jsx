import styles from "./SearchBar.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getCountryByName,
  resetCountryByName,
  setSearchTerm,
} from "../../redux/Actions/Actions";

const SearchBar = () => {
  const searchTerm = useSelector((state) => state.searchTerm);
  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    if (e.target.value === "") {
      dispatch(setSearchTerm(""));
      dispatch(resetCountryByName());
    } else {
      dispatch(setSearchTerm(e.target.value));
      setSearchTerm(e.target.value);
    }
  };
  const handlerSearch = () => {
    if (searchTerm !== "") {
      dispatch(getCountryByName(searchTerm));
    }
  };
  return (
    <div className={styles.SearchBarContainer}>
      <div>
        <input
          placeholder="Encuentra tu destino favorito..."
          type="text"
          className={styles.input}
          value={searchTerm}
          onChange={handleOnChange}
        />
      </div>
      <div>
        <button className={styles.buttom} onClick={handlerSearch}>
          Buscar
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
