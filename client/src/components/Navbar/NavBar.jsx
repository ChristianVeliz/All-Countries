import styles from './NavBar.module.css';
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetFilters } from '../../redux/Actions/Actions';
const NavBar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleClick = () => {
        navigate('/form')
    }
    return (
        <div className={styles.ContainerNavBar}>
            <Link to='/'>Inicio</Link>
            <Link to='/home' onClick={()=>dispatch(resetFilters())}>Home</Link>
            {/* <Link to='/activities'>Actividades</Link> */}
            <SearchBar/>
            <button onClick={handleClick} className={styles.Button}>Crear Actividad</button>
        </div>
    )
}

export default NavBar