import './Header.scss'
import { useContext, useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { BsSearch } from 'react-icons/bs'
import { AiOutlineUser } from 'react-icons/ai'
import { BsFillTelephoneFill } from 'react-icons/bs'
import { BsFillCartFill } from 'react-icons/bs'
import ProductsCart from '../ProductsCart/ProductsCart'
import AppContext from '../../context/AppContext'
import { useAuth } from '../../context/AuthContext'
import { Link } from 'react-router-dom'

function Header() {
    const { totalQuantity } = useContext(AppContext);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const navRef = useRef<HTMLElement>(null);
    const cartNavRef = useRef<HTMLElement>(null);

    const getFormattedName = (email: string) => {
        if (!email) return '';
        const localPart = email.split('@')[0];
        const name = localPart.replace(/[\.-]/g, ' ');
        return name.charAt(0).toUpperCase() + name.slice(1);
    };

    // Menu hambúrguer
    const [menuVisible, setMenuVisible] = useState(false);
    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };
    const navClass = menuVisible ? 'nav active' : 'nav';

    const [cartMenuVisible, setCartMenuVisible] = useState(false);
    const cartToggleMenu = () => {
        setCartMenuVisible(!cartMenuVisible);
    };
    const cartNavClass = cartMenuVisible ? 'cart-nav active' : 'cart-nav';

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent | TouchEvent) => {
            const target = event.target as Node;

            if (navRef.current && !navRef.current.contains(target)) {

                const hamburguerButton = document.querySelector('.hamburguer');
                if (hamburguerButton && !hamburguerButton.contains(target)) {
                    if (menuVisible) {
                        setMenuVisible(false);
                    }
                }
            }

            if (cartNavRef.current && !cartNavRef.current.contains(target)) {
                const cartButton = document.querySelector('.cart');
                if (cartButton && !cartButton.contains(target)) {
                    if (cartMenuVisible) {
                        setCartMenuVisible(false);
                    }
                }
            }
        };

        if (menuVisible || cartMenuVisible) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('touchstart', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [menuVisible, cartMenuVisible]);

    useEffect(() => {
        const handleEscKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setMenuVisible(false);
                setCartMenuVisible(false);
            }
        };

        if (menuVisible || cartMenuVisible) {
            document.addEventListener('keydown', handleEscKey);
        }

        return () => {
            document.removeEventListener('keydown', handleEscKey);
        };
    }, [menuVisible, cartMenuVisible]);

    const [searchValue, setSearchValue] = useState('');
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const searchLower = searchValue.toLowerCase();

        if (searchLower.includes('whey')) {
            navigate('/WheyProtein');
        } else if (searchLower.includes('creatina')) {
            navigate('/Creatina');
        } else if (searchLower.includes('pré-treino') || searchLower.includes('pre treino') || searchLower.includes('pre-treino')) {
            navigate('/preTreino');
        } else if (searchLower.includes('glutamina')) {
            navigate('/Glutamina');
        } else {
            alert('Produto não encontrado. Por favor, tente novamente.');
        }
    }

    const handleLinkClick = () => {
        setMenuVisible(false);
        setCartMenuVisible(false);
    };

    const handleGoToCart = () => {
        setCartMenuVisible(false);
        navigate('/carrinho');
    };

    return (
        <header className='header'>
            <div className='Top-Header'>
                <svg className='pix' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px" baseProfile="basic">
                    <path fill="#37c6d0" d="M19.262,44.037l-8.04-8.04L11,35l-1.777-1.003l-5.26-5.26c-2.617-2.617-2.617-6.859,0-9.475 l5.26-5.26L11,13l0.223-0.997l8.04-8.04c2.617-2.617,6.859-2.617,9.475,0l8.04,8.04L37,13l1.777,1.003l5.26,5.26 	c2.617,2.617,2.617,6.859,0,9.475l-5.26,5.26L37,35l-0.223,0.997l-8.04,8.04C26.121,46.653,21.879,46.653,19.262,44.037z" />
                    <path d="M35.79,11.01c-1.76,0.07-3.4,0.79-4.63,2.04l-6.81,6.77c-0.09,0.1-0.22,0.15-0.35,0.15 s-0.25-0.05-0.35-0.15l-6.8-6.76c-1.24-1.26-2.88-1.98-4.64-2.05L8.22,15h3.68c0.8,0,1.55,0.31,2.12,0.88l6.8,6.78 c0.85,0.84,1.98,1.31,3.18,1.31s2.33-0.47,3.18-1.31l6.79-6.78C34.55,15.31,35.3,15,36.1,15h3.68L35.79,11.01z M36.1,33 c-0.8,0-1.55-0.31-2.12-0.88l-6.8-6.78c-0.85-0.84-1.98-1.31-3.18-1.31s-2.33,0.47-3.18,1.31l-6.79,6.78 C13.45,32.69,12.7,33,11.9,33H8.22l3.99,3.99c1.76-0.07,3.4-0.79,4.63-2.04l6.81-6.77c0.09-0.1,0.22-0.15,0.35-0.15 s0.25,0.05,0.35,0.15l6.8,6.76c1.24,1.26,2.88,1.98,4.64,2.05L39.78,33H36.1z" opacity=".05" />
                    <path d="M36.28,11.5H36.1c-1.74,0-3.38,0.68-4.59,1.91l-6.8,6.77c-0.19,0.19-0.45,0.29-0.71,0.29 s-0.52-0.1-0.71-0.29l-6.79-6.77c-1.22-1.23-2.86-1.91-4.6-1.91h-0.18l-3,3h3.18c0.93,0,1.81,0.36,2.48,1.02l6.8,6.78 c0.75,0.76,1.75,1.17,2.82,1.17s2.07-0.41,2.82-1.17l6.8-6.77c0.67-0.67,1.55-1.03,2.48-1.03h3.18L36.28,11.5z M36.1,33.5 c-0.93,0-1.81-0.36-2.48-1.02l-6.8-6.78c-0.75-0.76-1.75-1.17-2.82-1.17s-2.07,0.41-2.82,1.17l-6.8,6.77 c-0.67,0.67-1.55,1.03-2.48,1.03H8.72l3,3h0.18c1.74,0,3.38-0.68,4.59-1.91l6.8-6.77c0.19-0.19,0.45-0.29,0.71-0.29 s0.52,0.1,0.71,0.29l6.79,6.77c1.22,1.23,2.86,1.91,4.6,1.91h0.18l3-3H36.1z" opacity=".07" />
                    <path fill="#fff" d="M38.78,14H36.1c-1.07,0-2.07,0.42-2.83,1.17l-6.8,6.78c-0.68,0.68-1.58,1.02-2.47,1.02 s-1.79-0.34-2.47-1.02l-6.8-6.78C13.97,14.42,12.97,14,11.9,14H9.22l2-2h0.68c1.6,0,3.11,0.62,4.24,1.76l6.8,6.77 c0.59,0.59,1.53,0.59,2.12,0l6.8-6.77C32.99,12.62,34.5,12,36.1,12h0.68L38.78,14z M36.1,34c-1.07,0-2.07-0.42-2.83-1.17l-6.8-6.78 c-1.36-1.36-3.58-1.36-4.94,0l-6.8,6.78C13.97,33.58,12.97,34,11.9,34H9.22l2,2h0.68c1.6,0,3.11-0.62,4.24-1.76l6.8-6.77 c0.59-0.59,1.53-0.59,2.12,0l6.8,6.77C32.99,35.38,34.5,36,36.1,36h0.68l2-2H36.1z" />
                </svg>
                <h1>Pague no pix e ganhe 10% de Desconto!</h1>
            </div>

            <div className='organization'>
                <form onSubmit={handleSearch}>
                    <div className='organizar'>
                        <div className='logo'>ST Nutrition Supplements</div>
                        <input
                            type="search"
                            placeholder='Encontre Suplementos'
                            className='busca'
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                        <button type="submit" className='button_search'>
                            <BsSearch />
                        </button>
                    </div>
                </form>

                <button className='hamburguer' onClick={toggleMenu}></button>

                <div className='cliente'>
                    <div className='Fale-conosco-two'>
                        <a className='Cell-phone' href="https://wa.me/5511962895094" target="_blank" rel="noopener noreferrer">
                            <BsFillTelephoneFill />
                        </a>

                        <div className='Fale-conosco'>
                            <span className='span-title'>Fale conosco</span>
                            <div>
                                <a href="https://wa.me/5511962895094" target="_blank" rel="noopener noreferrer">Clique aqui</a>
                            </div>
                        </div>
                    </div>

                    <div className='Login'>
                        <a className='user' href="#">
                            <AiOutlineUser />
                        </a>
                        <div>
                            <span className='span-title'>Olá, Bem-vindo(a)</span>
                            {user ? (
                                <>
                                    <div>
                                        <span>{getFormattedName(user.email)}</span>
                                    </div>
                                    <div>
                                        <a className='Login-color' href="#" onClick={logout}>Sair</a>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div>
                                        <Link to="/Login">
                                            <a className='Login-color' href="#">Entrar</a>
                                        </Link>
                                    </div>
                                    <div>
                                        <Link to="/Login">
                                            <a className='Login-color' href="#">Cadastrar</a>
                                        </Link>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <nav className={navClass} ref={navRef}>
                    <ul className='nav-list'>
                        <div className='cliente-hamburguer'>
                            <Link to="/Login" onClick={handleLinkClick}>
                                <a href="#">
                                    <AiOutlineUser />
                                    Login
                                </a>
                            </Link>

                            <div className='Fale-conosco-hamburger' onClick={handleLinkClick}>
                                <a href="https://wa.me/5511962895094" target="_blank" rel="noopener noreferrer" className='Fale conosco-hamburguer-two'>
                                    Fale Conosco
                                </a>
                            </div>
                        </div>

                        <Link to='/' onClick={handleLinkClick}>
                            <li><a href="#">Home</a></li>
                        </Link>
                        <Link to='/WheyProtein' onClick={handleLinkClick}>
                            <li><a href="#">Whey Protein</a></li>
                        </Link>
                        <Link to='/Creatina' onClick={handleLinkClick}>
                            <li><a href="#">Creatina</a></li>
                        </Link>
                        <Link to='/preTreino' onClick={handleLinkClick}>
                            <li><a href="#">Pré-Treino</a></li>
                        </Link>
                        <Link to='/Glutamina' onClick={handleLinkClick}>
                            <li><a href="#">Glutamina</a></li>
                        </Link>
                    </ul>
                </nav>

                <nav className={cartNavClass} ref={cartNavRef}>
                    {cartMenuVisible && (
                        <div
                            className="cart-overlay"
                            onClick={() => setCartMenuVisible(false)}
                        ></div>
                    )}
                    <ul className='cart-nav-list'>
                        <h1 className='cart-compras'>Compras</h1>
                        <ProductsCart />
                    </ul>
                </nav>

                <div>
                    <a className='cart' onClick={cartToggleMenu}>
                        <span className='cart-status'>{totalQuantity}</span>
                        <BsFillCartFill />
                    </a>
                </div>
            </div>
        </header>
    );
}

export default Header;