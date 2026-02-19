
import './index.scss';

import Products from '../../components/Products/products'

import minhasImagems from '../../assets/Creatina.jpg'
import imgs from '../../assets/Whey.jpg'
import imagens from '../../assets/pre-workout.jpg'
import Banner from '../../assets/banner/banner';


function HomePage() {
  return (
    <>
      <Banner />
      <h1 className='Preferidos-name'>Preferidos</h1>
      <div className='corpo'>
        <div className='preferido-card'>
          <img src={minhasImagems} alt="Creatina" />
          <div className='overlay'>
            <span>Creatina</span>
          </div>
        </div>

        <div className='preferido-card'>
          <img src={imgs} alt="Whey-protein" />
          <div className='overlay'>
            <span>Whey Protein</span>
          </div>
        </div>

        <div className='preferido-card'>
          <img src={imagens} alt="Pré-treino" />
          <div className='overlay'>
            <span>Pré-Treino</span>
          </div>
        </div>
      </div>
      <Products />
    </>
  );
}

export default HomePage;