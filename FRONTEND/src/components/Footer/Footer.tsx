import './Footer.scss';
import direitoImg from '../../assets/direitos.jpg'; 
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className='footer'>
            <div className='container-footer'>
                <div className='informations'>
                    <div className='footer-section Categorias'>
                        <span className='section-title'>Categorias</span>
                        <ul className='category-list'>
                        <Link to='/'><a href="#">Home</a></Link>
                        <Link to='/WheyProtein'><a href="#">Whey Protein</a></Link>
                        <Link to='/Creatina'><a href="#">Creatina</a></Link>
                        <Link to='/preTreino'><a href="#">Pré-Treino</a></Link>
                        <Link to='/Glutamina'><a href="#">Glutamina</a></Link>
                        </ul>
                    </div>

                    <div className='footer-section Parceiros'>
                        <span className='section-title'>Parceiros</span>
                        <ul>
                            <li>Academia YellowFIT</li>
                            <li>Academia BigSmart</li>
                            <li>Nutri-Inteligence</li>
                            <li>Fox-Nutrition</li>
                            <li>SmartPower</li>
                            <li>Produtos Fitness</li>
                            <li>Produtos Naturais SA</li>
                        </ul>
                    </div>

                    <div className='footer-section Quem-Somos'>
                        <span className='section-title'>Quem Somos</span>
                        <p>Na ST Nutrition, estamos comprometidos com a nutrição e bem-estar. Desde o início, nossa missão é oferecer produtos de qualidade para impulsionar um estilo de vida saudável e ativo. Com foco na excelência e transparência, criamos suplementos cuidadosamente formulados para diversos objetivos. Nossa história é marcada pela busca incessante pela qualidade e apoio aos nossos clientes, enquanto os inspiramos a alcançar seu potencial máximo. Seja parte da ST Nutrition e embarque em uma jornada de saúde e crescimento.</p>
                    </div>

                    <div className='footer-section Fale-Conosco'>
                        <span className='section-title'>Fale Conosco</span>
                        <ul className='contact-list'>
                            <li> Telefone: (11) 96289-5094</li>
                            <li> Whatsapp: (11) 96289-5094</li>
                            <li> Email: sac@stnutrition.com.br</li>
                        </ul>
                        <span className='schedule-title'>Horário de atendimento:</span>
                        <p className='schedule-text'>
                            Segunda a sexta-feira: 9:00 às 18:00hrs <br /> 
                        </p>
                    </div>
                </div>

                <div className='main-logo-footer'>
                    <h1>ST Nutrition</h1>
                </div>
            </div>

            {direitoImg && <img src={direitoImg} alt="Banner de Direitos" className="full-width-banner" />}

            <div className='footer-bottom'>
                <p>Direitos Reservados MIT | ST Nutrition ® - Suplementos Fitness</p>
            </div>
        </footer>
    );
}

export default Footer;