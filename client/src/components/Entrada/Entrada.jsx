import styles from "./Entrada.module.css"
import {useNavigate} from "react-router-dom"

export default function Entrada(props) {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate('/home')
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Bienvenidos</h1>
           <button onClick={handleClick} className={styles.button}>Ingresar</button>
        </div>
    )
}