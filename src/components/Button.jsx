import styles from "./Button.module.css";
import propTypes from "prop-types";

const Button = ({ children, onClick, type }) => {
  return (
    <button onClick={onClick} className={`${styles.btn} ${styles[type]}`}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: propTypes.any,
  onClick: propTypes.any,
  type: propTypes.string,
};

export default Button;
