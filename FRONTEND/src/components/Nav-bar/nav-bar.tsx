import { Link } from 'react-router-dom'
import './nav-bar.scss'


function NavBar() {

    return (
        <ul className='lista-nav'>
            <li>
                <Link to="/">
                    <span className='list-color'>Home</span>
                </Link>
            </li>
            <li>
                <Link to="/WheyProtein">
                    <span className='list-color'>Whey Protein</span>
                </Link>
            </li>
            <li>
                <Link to="/Creatina">
                    <span className='list-color'>Creatina</span>
                </Link>
            </li>
            <li>
                <Link to="/PreTreino">
                    <span className='list-color'>Pré-Treino</span>
                </Link>
            </li>
            <li>
                <Link to="/Glutamina">
                    <span className='list-color'>Glutamina</span>
                </Link>
            </li>
            <li>
                <Link to="/Hipercalorico">
                    <span className='list-color'>Hipercalórico</span>
                </Link>
            </li>

        </ul>
    )
}

export default NavBar