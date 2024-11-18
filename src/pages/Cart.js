import React from 'react';
import { useCart } from 'react-use-cart';
import Header from '../components/headers/light';
import Footer from '../components/footers/FiveColumnWithInputForm.js';
import AnimationRevealPage from 'helpers/AnimationRevealPage.js';
import tw from 'twin.macro';
import { formatPrice } from 'helpers/helpers';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineDelete } from 'react-icons/ai';

const Cart = () => {
  // Panggil fungsi dan state yang diperlukan dari useCart
  const { items, updateItemQuantity, removeItem, emptyCart, cartTotal } =
    useCart();

  const Container = tw.div`relative bg-gray-200 text-gray-700 -mb-8 -mx-8 px-4 py-8 lg:py-12`;
  const Content = tw.div`max-w-screen-xl mx-auto relative z-10`;

  const handleUpdateQuantity = (id, newQuantity) => {
    // Your code here
  };

  const handleRemoveItem = (id) => {
    // Your code here
  };

  const handleEmptyCart = () => {
    // Your code here
  };

  const calculateTotalPrice = () => {
    // Your code here
  };
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <AnimationRevealPage>
      <Header className="mb-8" />

      <Container>
        <Content>
          <h1 className="text-2xl font-semibold mb-6">Your Shopping Cart</h1>

          {items.length > 0 ? (
            <div>
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center bg-white p-4 shadow-md rounded-md my-4"
                >
                  {/* Product Image */}
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.imageSrc}
                      alt={item.title}
                      className="w-24 h-24 object-cover rounded"
                    />
                    <div>
                      <h4 className="text-lg font-semibold">{item.title}</h4>
                      <p className="text-gray-600">
                        Rp {formatPrice(item.price)}
                      </p>
                      <div className="flex items-center">
                        <span className="text-gray-600 mr-2">Color:</span>
                        <span
                          className="inline-block w-6 h-6 rounded-full"
                          style={{ backgroundColor: item.color }}
                        ></span>
                      </div>
                    </div>
                  </div>

                  {/* Quantity Selector */}
                  <div className="flex items-center space-x-2">
                    <button
                      className="px-3 py-1 bg-gray-200 text-gray-700 rounded"
                      onClick={() =>
                        updateItemQuantity(
                          item.id,
                          Math.max(1, item.quantity - 1)
                        )
                      }
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="px-3 py-1 bg-gray-200 text-gray-700 rounded"
                      onClick={() =>
                        updateItemQuantity(
                          item.id,
                          Math.min(item.stock, item.quantity + 1)
                        )
                      }
                    >
                      +
                    </button>
                  </div>

                  {/* Price and Remove Button */}
                  <div className="flex items-center space-x-4">
                    <p className="text-gray-900 font-semibold">
                      Rp {formatPrice(item.price * item.quantity)}
                    </p>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => removeItem(item.id)}
                    >
                      <AiOutlineDelete size={24} />
                    </button>
                  </div>
                </div>
              ))}

              {/* Cart Summary */}
              <div className="bg-white p-4 shadow-md rounded-md mt-6">
                <div className="flex justify-between items-center">
                  <h4 className="text-xl font-semibold">Total Price:</h4>
                  <p className="text-xl font-bold">
                    Rp {formatPrice(cartTotal)}
                  </p>
                </div>
                <div className="flex justify-between mt-4">
                  <Link
                    to={user ? alert('berhasil') : '/login'}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    {user ? 'Cekout' : 'Login to cekout'}
                  </Link>

                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => emptyCart()}
                  >
                    Empty Cart
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">Your cart is empty.</p>
          )}
        </Content>
      </Container>

      <Footer background="bg-white" />
    </AnimationRevealPage>
  );
};

export default Cart;
