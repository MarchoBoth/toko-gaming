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
      <form
        onSubmit={handleSubmit(handleCheckout)}
        className="max-w-2xl mx-auto px-4 py-8"
      >
        <div className="space-y-6 bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Checkout Details
          </h2>

          <div className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="name" className="text-gray-700 font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                id="name"
                name="name"
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="address"
                className="text-gray-700 font-medium mb-2"
              >
                Address
              </label>
              <input
                type="text"
                value={formData.address}
                name="address"
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label
                  htmlFor="postalcode"
                  className="text-gray-700 font-medium mb-2"
                >
                  Postal Code
                </label>
                <input
                  type="text"
                  value={formData.postalcode}
                  name="postalcode"
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="city"
                  className="text-gray-700 font-medium mb-2"
                >
                  City
                </label>
                <input
                  type="text"
                  value={formData.city}
                  name="city"
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="country"
                className="text-gray-700 font-medium mb-2"
              >
                Country
              </label>
              <input
                type="text"
                value={formData.country}
                name="country"
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-6 px-6 py-3  text-white font-medium rounded-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 !bg-blue-500"
          >
            Complete Checkout
          </button>
        </div>
      </form>
      <Footer background="bg-white" />
    </AnimationRevealPage>
  );
};

export default Checkout;
