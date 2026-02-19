
import ProductsCard from "../../components/ProductsCard/productCard";
import { glutamina } from "../../utils/products/glutamina.json"


const Glutamina = () => {
  return (
    <div className='container-product'>
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
    </div>
  )
}

export default Glutamina;