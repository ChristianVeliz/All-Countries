import styles from './Home.module.css';
import NavBar from '../../components/Navbar/NavBar';
import Cards from '../../components/Cards/Cards';
import Filters from '../../components/Filters/Filters';


const Home = () => {
    return (
        <div className={styles.ContainerHome}>
            <NavBar />
            <Filters />
            <Cards />
            
        </div>
    )
}

export default Home