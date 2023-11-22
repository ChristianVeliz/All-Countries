import styles from "./Card.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Card = ({ id, name, image, continent }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/detail/${id}`);
  }
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <div
      className={`${styles.CardContainer} ${isHovered ? styles.hovered : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div className={styles.ImgContainer}>
        <img className={styles.Img} src={image} alt={name} />
      </div>

      <div className={styles.Info}>
        <p className={styles.Name}>{name}</p>
        <p className={styles.Continent}>{continent}</p>
      </div>
    </div>
  );
};

export default Card;
