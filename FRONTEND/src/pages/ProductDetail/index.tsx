import { useParams, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AppContext from '../../context/AppContext';
import allProducts from '../../utils/products/allProducts';
import { Item } from '../../types';
import './index.scss';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setCartItems } = useContext(AppContext);

  const product = allProducts.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Produto não encontrado</h2>
        <button onClick={() => navigate(-1)}>← Voltar</button>
      </div>
    );
  }

  const handleAddToCart = (itemToAdd: Item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === itemToAdd.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === itemToAdd.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      }
      return [...prevItems, { ...itemToAdd, quantity: 1 }];
    });
  };

  const pixPrice = product.price * 0.95;
  const installmentPrice = product.price / 6;

  return (
    <div className="product-detail">
      <button className="btn-voltar" onClick={() => navigate(-1)}>
        ← Voltar
      </button>

      <div className="product-detail-container">
        <img
          className="product-detail-image"
          src={product.image}
          alt={product.title}
        />

        <div className="product-detail-info">
          <h1>{product.title}</h1>

          <div className="product-detail-pricing">
            <div className="product-pix">
              <span className="pix-price">
                R$ {pixPrice.toFixed(2)} no Pix
              </span>
              <span className="pix-discount">com 5% de desconto</span>
            </div>

            <div className="product-card-price">
              <span className="original-price">
                R$ {product.price.toFixed(2)}
              </span>
              <span className="card-price">
                R$ {product.price.toFixed(2)} no cartão
              </span>
            </div>

            <p className="product-installments">
              ou em até <strong>6x</strong> de{' '}
              <strong>R$ {installmentPrice.toFixed(2)}</strong> sem juros
            </p>
          </div>

          <button
            type="button"
            className="btn-comprar"
            onClick={() =>
              handleAddToCart({
                id: product.id,
                title: product.title,
                image: product.image,
                price: product.price,
              })
            }
          >
            Comprar
          </button>
        </div>
      </div>

      {product.description && (
        <div className="product-detail-about">
          <h2>Sobre o Produto</h2>
          <p>{product.description}</p>
        </div>
      )}
    </div>
  );
}