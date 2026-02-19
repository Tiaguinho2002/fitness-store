
import ProductsCard from "../../components/ProductsCard/productCard";
import { hipercalorico } from "../../utils/products/hipercalorico.json"


const Hipercalorico = () => {
  return (
    <div className='container-product'>
      <div>
        <h1>Hipercalórico</h1>
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
  )
}

export default Hipercalorico;