import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import propTypes from "prop-types";
import { useCities } from "../context/CitiesContext";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

const CityItem = ({ city }) => {
  const { currentCity, deletCity } = useCities();
  const { emoji, cityName, date, id, position } = city;
  const handleClick = (e) => {
    e.preventDefault();
    deletCity(id);
  };
  return (
    <li>
      <Link
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
        className={`${styles.cityItem} ${
          id === currentCity.id ? styles["cityItem--active"] : ""
        }`}
      >
        <span className={emoji}>{city.emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn} onClick={handleClick}>
          &times;
        </button>
      </Link>
    </li>
  );
};
CityItem.propTypes = {
  city: propTypes.any,
};

export default CityItem;
