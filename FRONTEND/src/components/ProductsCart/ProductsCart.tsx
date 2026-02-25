import { BsFillCartDashFill } from "react-icons/bs";
import { useContext } from 'react';
import AppContext from '../../context/AppContext';
import './ProductsCart.scss';

type Props = {
  onGoToCart: () => void;
}

export default function ProductsCart({ onGoToCart }: Props) {
  const { cartItems, setCartItems } = useContext(AppContext);
  const { handleIncrease } = useContext(AppContext);
  const { handleDecrease } = useContext(AppContext);
  const { handleRemove } = useContext(AppContext);
  const { totalPrice } = useContext(AppContext);

  return (
    <section className="products-cart">
      {cartItems.length === 0 ? (
        <p>O carrinho está vazio</p>
      ) : (
        <>
          <div className="cart-items-container">
            {cartItems.map((item) => {
              const { id, image, title, price, quantity = 1 } = item;

              return (
                <section className="cart-item" key={id}>
                  <img className="cart-img" src={image} alt={title} />

                  <div className="org">
                    <h2 className="cart-item-title">{title}</h2>
                    <p className="cart-item-price">
                      {quantity}x R$ {price.toFixed(2)} = {" "}
                      <strong>R$ {(price * quantity).toFixed(2)}</strong>
                    </p>

                    <div className="cart-quantity">
                      <button
                        type="button"
                        className="cart-btn"
                        onClick={() => handleDecrease(id)}
                      >
                        -
                      </button>
                      <span className="cart-quantity-value">{quantity}</span>
                      <button
                        type="button"
                        className="cart-btn"
                        onClick={() => handleIncrease(id)}
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      className="button_remove-item"
                      onClick={() => handleRemove(id)}
                    >
                      <BsFillCartDashFill />
                    </button>
                  </div>
                </section>
              );
            })}
          </div>

          <div className="cart-total-fixed">
            <h3>Total: <strong>R$ {totalPrice.toFixed(2)}</strong></h3>
          </div>

          <button className="carrinho-btn" onClick={onGoToCart}>
            Ir para o Carrinho
          </button>
        </>
      )}
    </section>
  );
}