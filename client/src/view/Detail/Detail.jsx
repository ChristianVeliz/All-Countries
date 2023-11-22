import styles from "./Detail.module.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCountryById } from "../../redux/Actions/Actions";

const Detail = () => {
  const [infoCountry, setInfoCountry] = useState({});
  const [activitiesCountry, setActivitiesCountry] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const countryDet = useSelector((state) => state.countryDetail);

  useEffect(() => {
    console.log("idName", id);
    dispatch(getCountryById(id));
  }, [dispatch, id]);

  useEffect(() => {
    console.log("countryDet", countryDet);
    if (Object.keys(countryDet).length > 0) {
      setInfoCountry(countryDet.dataCountry);
      setActivitiesCountry(countryDet.activities);
    }
  }, [countryDet]);

  return (
    <div className={styles.AllContainer}>
      <div className={styles.ContainerBack}>
        <span className={styles.Back} onClick={() => navigate(-1)}>
          Regresar
        </span>
      </div>
      <div className={styles.ContainerDetail}>
        <div className={styles.ImgContainer}>
          <img
            className={styles.Img}
            src={infoCountry.image}
            alt={infoCountry.name}
          />
        </div>
        <div className={styles.InfoContainer}>
          <div>
            <h2>Datos sobre {infoCountry.name}</h2>
            <ul>
              <li>
                <b>Capital:</b> {infoCountry.capital}
              </li>
              <li>
                <b>Población:</b> {infoCountry.population} hab.
              </li>
              <li>
                <b>Area:</b> {infoCountry.area} km2
              </li>
              <li>
                <b>Subregion:</b> {infoCountry.subregion}
              </li>
              <li>
                <b>Continente:</b> {infoCountry.continent}
              </li>
            </ul>
          </div>

          <div>
            <h2>Actividades</h2>
            <table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Dificultad</th>
                  <th>Duración</th>
                  <th>Temporada</th>
                </tr>
              </thead>
              <tbody>
                {activitiesCountry.length > 0 ? (
                  activitiesCountry.map((act) => (
                    <tr key={act.id}>
                      <td>{act.name}</td>
                      <td>{act.difficulty}</td>
                      <td>{act.duration}</td>
                      <td>{act.season}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4}>No hay actividades</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
