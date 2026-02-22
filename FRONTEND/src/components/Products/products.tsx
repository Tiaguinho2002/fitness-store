import { useState } from 'react';
import './products.scss';

import ProductsCard from '../ProductsCard/productCard';
import { creatina } from '../../utils/products/creatina.json'
import { wheyProtein } from '../../utils/products/wheyProtein.json'
import { preTreino } from '../../utils/products/preTreino.json'
import { glutamina } from '../../utils/products/glutamina.json'
import { hipercalorico } from '../../utils/products/hipercalorico.json'

function Products() {
  // Estados individuais para cada carrossel
  const [activeWhey, setActiveWhey] = useState(0);
  const [activeCreatina, setActiveCreatina] = useState(0);
  const [activePre, setActivePre] = useState(0);
  const [activeGluta, setActiveGluta] = useState(0);
  const [activeHiper, setActiveHiper] = useState(0);

  const handleScroll = (e, setter) => {
    const scrollLeft = e.target.scrollLeft;
    const width = e.target.offsetWidth;
    const newIndex = Math.round(scrollLeft / (width / 2));
    setter(newIndex);
  };

  return (
    <section>
      <div className='container-product'>
        {/* Whey Protein */}
        <div>
          <h1>Whey Protein</h1>
          <p className="section-subtitle">
            Proteína de alta absorção para máxima construção e recuperação muscular.
          </p>
          <div className='product' onScroll={(e) => handleScroll(e, setActiveWhey)}>
            {wheyProtein.map((item) => (
              <ProductsCard key={item.id} title={item.name} price={item.price} id={item.id} image={item.image} />
            ))}
          </div>
          <div className="preferidos-indicators">
            {wheyProtein.map((_, index) => (
              <span key={index} className={`dot ${activeWhey === index ? 'active' : ''}`}></span>
            ))}
          </div>
        </div>

        {/* Creatina Pure */}
        <div>
          <h1>Creatina Pure</h1>
          <p className="section-subtitle">
            Aumente sua força, explosão e volume muscular com pureza garantida.
          </p>
          <div className='product' onScroll={(e) => handleScroll(e, setActiveCreatina)}>
            {creatina.map((item) => (
              <ProductsCard key={item.id} title={item.name} price={item.price} id={item.id} image={item.image} />
            ))}
          </div>
          <div className="preferidos-indicators">
            {creatina.map((_, index) => (
              <span key={index} className={`dot ${activeCreatina === index ? 'active' : ''}`}></span>
            ))}
          </div>
        </div>

        {/* Pré-Treino */}
        <div>
          <h1>Pré-Treino</h1>
          <p className="section-subtitle">
            Energia explosiva e foco total para transformar cada repetição em resultado.
          </p>
          <div className='product' onScroll={(e) => handleScroll(e, setActivePre)}>
            {preTreino.map((item) => (
              <ProductsCard key={item.id} title={item.name} price={item.price} id={item.id} image={item.image} />
            ))}
          </div>
          <div className="preferidos-indicators">
            {preTreino.map((_, index) => (
              <span key={index} className={`dot ${activePre === index ? 'active' : ''}`}></span>
            ))}
          </div>
        </div>

        {/* Glutamina */}
        <div>
          <h1>Glutamina</h1>
          <p className="section-subtitle">
            Recuperação avançada e proteção imunológica para manter o ritmo dos treinos.
          </p>
          <div className='product' onScroll={(e) => handleScroll(e, setActiveGluta)}>
            {glutamina.map((item) => (
              <ProductsCard key={item.id} title={item.name} price={item.price} id={item.id} image={item.image} />
            ))}
          </div>
          <div className="preferidos-indicators">
            {glutamina.map((_, index) => (
              <span key={index} className={`dot ${activeGluta === index ? 'active' : ''}`}></span>
            ))}
          </div>
        </div>

        {/* Hipercalorico */}
        <div>
          <h1>Hipercalorico</h1>
          <p className="section-subtitle">
            O suporte energético ideal para ganho de massa bruta e superação de limites.
          </p>
          <div className='product' onScroll={(e) => handleScroll(e, setActiveHiper)}>
            {hipercalorico.map((item) => (
              <ProductsCard key={item.id} title={item.name} price={item.price} id={item.id} image={item.image} />
            ))}
          </div>
          <div className="preferidos-indicators">
            {hipercalorico.map((_, index) => (
              <span key={index} className={`dot ${activeHiper === index ? 'active' : ''}`}></span>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
}

export default Products;