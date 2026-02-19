import './products.scss';

import ProductsCard from '../ProductsCard/productCard';
import { creatina } from '../../utils/products/creatina.json'
import { wheyProtein } from '../../utils/products/wheyProtein.json'
import { preTreino } from '../../utils/products/preTreino.json'
import { glutamina } from '../../utils/products/glutamina.json'
import { hipercalorico } from '../../utils/products/hipercalorico.json'

function Products() {
  return (
    <section>
      <div className='container-product'>
        <div>
          <h1>Whey Protein</h1>
          <p className="section-subtitle">
            Proteína de alta absorção para máxima construção e recuperação muscular.
          </p>
          <div className='product'>
            {wheyProtein.map((item) => (
              <ProductsCard key={item.id} title={item.name} price={item.price} id={item.id} image={item.image} />
            ))}
          </div>
        </div>
        <div>
          <h1>Creatina Pure</h1>
          <p className="section-subtitle">
            Aumente sua força, explosão e volume muscular com pureza garantida.
          </p>
          <div className='product'>
            {creatina.map((item) => (
              <ProductsCard key={item.id} title={item.name} price={item.price} id={item.id} image={item.image} />
            ))}
          </div>
        </div>
        <div>
          <h1>Pré-Treino</h1>
          <p className="section-subtitle">
            Energia explosiva e foco total para transformar cada repetição em resultado.
          </p>
          <div className='product'>
            {preTreino.map((item) => (
              <ProductsCard key={item.id} title={item.name} price={item.price} id={item.id} image={item.image} />
            ))}
          </div>
        </div>

        <div>
          <h1>Glutamina</h1>
          <p className="section-subtitle">
            Recuperação avançada e proteção imunológica para manter o ritmo dos treinos.
          </p>
          <div className='product'>
            {glutamina.map((item) => (
              <ProductsCard key={item.id} title={item.name} price={item.price} id={item.id} image={item.image} />
            ))}
          </div>
        </div>

        <div>
          <h1>Hipercalorico</h1>
          <p className="section-subtitle">
            O suporte energético ideal para ganho de massa bruta e superação de limites.
          </p>
          <div className='product'>
            {hipercalorico.map((item) => (
              <ProductsCard key={item.id} title={item.name} price={item.price} id={item.id} image={item.image} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Products;