
import styles from './Landing.module.css';
import Entrada from '../../components/Entrada/Entrada';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { resetFilters } from '../../redux/Actions/Actions';


const Landing = (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(resetFilters());
    }, [dispatch]);
    return (
        <div className={styles.container}>
            <Entrada/>
        </div>
    )
}

export default Landing