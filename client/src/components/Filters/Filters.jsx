import styles from "./Filters.module.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getAllContinents, setFilters, getAllActivities } from "../../redux/Actions/Actions";
const Filters = () => {
    const dispatch = useDispatch();
    const allContinents = useSelector((state) => state.allContinents);
    const allActivities = useSelector((state) => state.allActivities);
    const filters = useSelector((state) => state.filters);
 
    const [activityFilter, setActivityFilter] = useState("");
    
    useEffect(() => {
        dispatch(getAllActivities());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getAllContinents());
    }, [dispatch]);
    const handleSort = (e) => {
        const value = e.target.value;
        if(value !== ""){
          dispatch(setFilters({...filters, sortBy: value, population: ""}));
        }else {
          dispatch(setFilters({...filters, sortBy: ""}));
        } 
        
        
    }

    const handleContinent = (e) => {
        
        dispatch(setFilters({...filters, continent: e.target.value}));
        
    }

    const handlePopulation = (e) => {
        const value = e.target.value;
        
        if(value !== ""){
          dispatch(setFilters({...filters, population: value, sortBy: ""}));
        }else {
          dispatch(setFilters({...filters, population: ""}));
        }
        
        
    }

    const handleActivity = (e) => {
        setActivityFilter(e.target.value);
        dispatch(setFilters({...filters, activity: e.target.value}));
        console.log('handleActivity', activityFilter);  
    }

    // console.log('filters', filters);

  return (
    <div className={styles.Container}>
      
      <select value={filters.sortBy} onChange={handleSort}>
      <option defaultValue selected={filters.sortBy === ""} value=""> Por Orden: </option>
        <option  value="asc" selected={filters.sortBy === "asc"}>Ascendente</option>
        <option value="desc" selected={filters.sortBy === "desc"}>Descendente</option>
      </select>

      <select value={filters.continent} onChange={handleContinent}>
      <option defaultValue selected={filters.continent === ""} value=""> Por Continente: </option>
        {allContinents.length > 0 && allContinents.map((continent) => (
          <option key={continent} value={continent}>{continent}</option>
        ))}
      </select>

      <select value={filters.population} onChange={handlePopulation}>
      <option defaultValue selected={filters.population === ""} value=""> Segun Poblacion: </option>
        <option  value="hpopulation">Mayor Poblacion</option>
        <option value="lpopulation">Menor Poblacion</option>        
      </select>

      <select value={activityFilter} onChange={handleActivity}>
      <option defaultValue selected={activityFilter === ""} value=""> Por Actividad: </option>
        {allActivities.length > 0 && allActivities.map((activity) => (
          <option key={activity.id} value={activity.id}>{activity.name}</option>
        ))}
      </select>
        

     
    </div>
  );
};

export default Filters;
