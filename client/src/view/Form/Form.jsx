import { useEffect, useState } from "react";
import styles from "./Form.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createActivity, getAllCountries } from "../../redux/Actions/Actions";
const Form = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.allCountries);
  const [countriesSorted, setCountriesSorted] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    difficulty: 1,
    duration: null,
    season: "",
    countries: [],
  });
  const [validationError, setValidationError] = useState({
    name: "",
    duration: "",
    season: "",
    countries: "",
  });
  const [touched, setTouched] = useState({
    name: false,
    duration: false,
    season: false,
    countries: false,
  });
  const [validForm, setValidForm] = useState(false);
 

  const handleCheckboxChange = (optionId) => {
    setTouched((prevData) => ({
      ...prevData,
      countries: true,
    }));
    if (formData.countries.includes(optionId)) {
      setFormData((prevData) => ({
        ...prevData,
        countries: prevData.countries.filter((id) => id !== optionId),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        countries: [...prevData.countries, optionId],
      }));
    }
  };

  useEffect(() => {
    if (countries.length === 0) {
      dispatch(getAllCountries());
    } else {
      const sortedCountries = [...countries].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setCountriesSorted(sortedCountries);
    }
  }, [countries, dispatch]);

  const handleDifficultyChange = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      difficulty: parseInt(event.target.value),
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTouched((prevData) => ({
      ...prevData,
      [name]: true,
    }));
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (formData.name === "") {
      setValidationError((prevData) => ({
        ...prevData,
        name: "La actividad debe tener un nombre",
      }));
    } else if (formData.name.length < 3) {
      setValidationError((prevData) => ({
        ...prevData,
        name: "El nombre debe tener al menos 3 caracteres",
      }));
    } else {
      setValidationError((prevData) => ({
        ...prevData,
        name: "",
      }));
    }

    if (formData.duration <= 0) {
      setValidationError((prevData) => ({
        ...prevData,
        duration: "La duración debe ser mayor a 0",
      }));
    } else {
      setValidationError((prevData) => ({
        ...prevData,
        duration: "",
      }));
    }

    if (formData.season === "") {
      setValidationError((prevData) => ({
        ...prevData,
        season: "Debe elegir una temporada",
      }));
    } else {
      setValidationError((prevData) => ({
        ...prevData,
        season: "",
      }));
    }
    if(formData.countries.length === 0){
      setValidationError((prevData) => ({
        ...prevData,
        countries: "Debe elegir al menos un país",
      }));
    }else{
      setValidationError((prevData) => ({
        ...prevData,
        countries: "",
      }));

    }
  }, [formData]);

  useEffect(() => {
    if (
      validationError.name === "" &&
      validationError.duration === "" &&
      validationError.season === "" &&
      validationError.countries === ""
    ) {
      setValidForm(true);
    } else {
      setValidForm(false);
    }
  }, [validationError]);

  const handleOnSubmit = async(event) => {
    event.preventDefault();
    try {
      await createActivity(formData)
      navigate("/home");
    } catch (error) {
      console.error("Error al crear la actividad", error);
    }
  };

  return (
    <div className={styles.ContainerAll}>
      <div className={styles.ContainerBack}>
        <span className={styles.Back} onClick={() => navigate(-1)}>
          Regresar
        </span>
      </div>
      <div className={styles.ContainerInformacion}>
        <h1>Registra Tu Actividad</h1>
        <form className={styles.FormContainer} onSubmit={handleOnSubmit}>
          <div className={styles.Datos}>
            <label>Nombre: </label>
            <input
              name="name"
              value={formData.name}
              className={styles.Name}
              type="text"
              onChange={handleChange}
            />
            {validationError.name !== "" && touched.name && (
              <label className={styles.Error}>{validationError.name}</label>
            )}
          </div>
          <div className={styles.Datos}>
            <label>Dificultad: </label>
            <div className={styles.Difficulty}>
              {[1, 2, 3, 4, 5].map((level) => (
                <label key={level}>
                  <input
                    type="radio"
                    value={level}
                    name="difficulty"
                    checked={formData.difficulty === level}
                    onChange={handleDifficultyChange}
                  />
                  {level}
                </label>
              ))}
            </div>
          </div>
          <div className={styles.Datos}>
            <label>Duracion: </label>
            <input
              name="duration"
              step="0.5"
              value={formData.duration}
              className={styles.Name}
              placeholder="tiempo en horas..."
              type="number"
              onChange={handleChange}
            />
            {validationError.duration !== "" && touched.duration && (
              <label className={styles.Error}>{validationError.duration}</label>
            )}
          </div>
          <div className={styles.Datos}>
            <label>Temporada: </label>
            <select
              name="season"
              value={formData.season}
              className={styles.Temporada}
              onChange={handleChange}
            >
              <option defaultValue value="">
                {" "}
                Elija la estacion:{" "}
              </option>
              <option value="Verano">Verano</option>
              <option value="Otoño">Otoño</option>
              <option value="Invierno">Invierno</option>
              <option value="Primavera">Primavera</option>
            </select>
            {validationError.season !== "" && touched.season && (
              <label className={styles.Error}>{validationError.season}</label>
            )}
          </div>
          <div className={styles.Datos}>
            <label>Países: </label>
            
            <div className={styles.CountriesMultiSelect}>
              {countriesSorted.map((option) => (
                <label key={option.id}>
                  <input
                    type="checkbox"
                    value={option.id}
                    checked={formData.countries.includes(option.id)}
                    onChange={() => handleCheckboxChange(option.id)}
                  />
                  {option.name}
                </label>
              ))}
            </div>

            <div className={styles.SelectedCountries}>
              {
                formData.countries.map((id) => {
                  const option = countriesSorted.find((country) => country.id === id);
                  return (
                    <div key={id}>
                      {option.name}
                      <button
                        type="button"
                        onClick={() => handleCheckboxChange(option.id)}
                      >
                        X
                      </button>
                    </div>
                  );
                })
              }
            </div>
            {validationError.countries !== "" && touched.countries && (
              <label className={styles.Error}>{validationError.countries}</label>
            )}
          </div>

          <button className={styles.Button} type="submit" disabled={!validForm}>
            Crear
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
