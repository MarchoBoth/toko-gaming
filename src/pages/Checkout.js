import React, { useEffect, useState } from 'react';
import { useCart } from 'react-use-cart';
import Header from '../components/headers/light';
import Footer from '../components/footers/FiveColumnWithInputForm.js';
import AnimationRevealPage from 'helpers/AnimationRevealPage.js';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaUser } from 'react-icons/fa';
import { TbTruckDelivery } from 'react-icons/tb';
import { FaLocationDot } from 'react-icons/fa6';
import { formatPrice } from 'helpers/helpers';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { useOrderContext } from '../context/order_context';

const Checkout = () => {
  const { handleSubmit } = useForm();
  const { items, emptyCart } = useCart();
  const { createOrder, formData, setFormData } = useOrderContext();

  // Todo
  // Panggil state dan juga fungsi createOrder dari ordercontext

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCheckout = async () => {
    const response = await createOrder();

    emptyCart();
  };
  const calculateProductsTotal = () => {
    return items.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  useEffect(() => {
    const updateOrderItems = items.map((item) => ({
      productId: item.trueId,
      quantity: parseFloat(item.quantity),
      colorId: item.colorId,
    }));
    setFormData((prevState) => ({
      ...prevState,
      items: updateOrderItems,
    }));
  }, []);
  return (
    <AnimationRevealPage>
      <Header className="mb-8" />
      <form onSubmit={handleSubmit(handleCheckout)}>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" value={formData.name} id="name" name="name" />
          <div>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              value={formData.address}
              name="address"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="address">postalcode</label>
            <input
              type="text"
              value={formData.postalcode}
              name="postalcode"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="address">country</label>
            <input
              type="text"
              value={formData.country}
              name="country"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="address">city</label>
            <input
              type="text"
              value={formData.city}
              name="city"
              onChange={handleInputChange}
            />
          </div>
        </div>
        <button type="submit">Checkout</button>
      </form>
      <Footer background="bg-white" />
    </AnimationRevealPage>
  );
};

export default Checkout;
