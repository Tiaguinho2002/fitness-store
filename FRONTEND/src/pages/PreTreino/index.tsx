
import ProductsCard from "../../components/ProductsCard/productCard";
import { preTreino } from "../../utils/products/preTreino.json"


const PreTreino = () => {
  return (
    <div className='container-product'>
      <div>
        <h1>PreTreino</h1>
        <p className="section-subtitle">
          Energia explosiva e foco total para transformar cada repetição em resultado.
        </p>
        <div className='product'>
          {preTreino.map((item) => (
            <ProductsCard key={item.id} title={item.name} price={item.price} id={item.id} image={item.image} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default PreTreino;