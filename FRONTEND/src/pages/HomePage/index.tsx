import './index.scss'

import Products from '../../components/Products/products'

import creatinaImg from '../../assets/Creatina.jpg'
import wheyImg from '../../assets/Whey.jpg'
import preWorkoutImg from '../../assets/pre-workout.jpg'
import Banner from '../../assets/banner/banner'

function HomePage() {
  return (
    <>
      <Banner />

      <section className="preferidos">
        <div className="section-header">
          <h2 className="section-title">Preferidos</h2>
          <p className="section-subtitle">
            Produtos selecionados com alta performance
          </p>
        </div>

        <div className="preferidos-grid">
          <div className="preferido-card">
            <img src={creatinaImg} alt="Creatina" />
            <div className="overlay">
              <span>Creatina</span>
            </div>
          </div>

          <div className="preferido-card">
            <img src={wheyImg} alt="Whey Protein" />
            <div className="overlay">
              <span>Whey Protein</span>
            </div>
          </div>

          <div className="preferido-card">
            <img src={preWorkoutImg} alt="Pré-Treino" />
            <div className="overlay">
              <span>Pré-Treino</span>
            </div>
          </div>
        </div>
      </section>

      <Products />
    </>
  )
}

export default HomePage
