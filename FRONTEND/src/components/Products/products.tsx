import './products.scss'

import ProductsCard from '../ProductsCard/productCard'

import { creatina } from '../../utils/products/creatina.json'
import { wheyProtein } from '../../utils/products/wheyProtein.json'
import { preTreino } from '../../utils/products/preTreino.json'
import { glutamina } from '../../utils/products/glutamina.json'
import { hipercalorico } from '../../utils/products/hipercalorico.json'

function Products() {
  return (
    <section className="products-section">

      <div className="products-container">

        <div className="category">
          <div className="section-header">
            <h2 className="section-title">Whey Protein</h2>
            <p className="section-subtitle">
              Alta concentração proteica para máximo desempenho
            </p>
          </div>

          <div className="products-grid">
            {wheyProtein.map((item) => (
              <ProductsCard
                key={item.id}
                title={item.name}
                price={item.price}
                id={item.id}
                image={item.image}
              />
            ))}
          </div>
        </div>

        <div className="category">
          <div className="section-header">
            <h2 className="section-title">Creatina Pure</h2>
            <p className="section-subtitle">
              Explosão de força e recuperação muscular
            </p>
          </div>

          <div className="products-grid">
            {creatina.map((item) => (
              <ProductsCard
                key={item.id}
                title={item.name}
                price={item.price}
                id={item.id}
                image={item.image}
              />
            ))}
          </div>
        </div>

        <div className="category">
          <div className="section-header">
            <h2 className="section-title">Pré-Treino</h2>
            <p className="section-subtitle">
              Energia intensa e foco absoluto
            </p>
          </div>

          <div className="products-grid">
            {preTreino.map((item) => (
              <ProductsCard
                key={item.id}
                title={item.name}
                price={item.price}
                id={item.id}
                image={item.image}
              />
            ))}
          </div>
        </div>

        <div className="category">
          <div className="section-header">
            <h2 className="section-title">Glutamina</h2>
            <p className="section-subtitle">
              Recuperação muscular acelerada
            </p>
          </div>

          <div className="products-grid">
            {glutamina.map((item) => (
              <ProductsCard
                key={item.id}
                title={item.name}
                price={item.price}
                id={item.id}
                image={item.image}
              />
            ))}
          </div>
        </div>

        <div className="category">
          <div className="section-header">
            <h2 className="section-title">Hipercalórico</h2>
            <p className="section-subtitle">
              Ganho de massa e alto aporte calórico
            </p>
          </div>

          <div className="products-grid">
            {hipercalorico.map((item) => (
              <ProductsCard
                key={item.id}
                title={item.name}
                price={item.price}
                id={item.id}
                image={item.image}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

export default Products
