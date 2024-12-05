import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OrdersContext = React.createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState([]);
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: '',
    status: '',
    userId: null,
    items: [],
  });
  const user = JSON.parse(localStorage.getItem('user'));
  const getOrdersByUserId = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/order/`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setOrders(response.data.data);
    } catch (err) {
      toast.error('Error getting orders', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log(err);
    }
  };

  const createOrder = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3001/api/order',
        formData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      setOrder(response.data.data);

      toast.success('Order created successfully!', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      return response.data;
    } catch (err) {
      toast.error('Error creating order', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log(err);
      throw err;
    }
  };

  return (
    <OrdersContext.Provider
      value={{
        orders,
        setOrders,
        order,
        formData,
        setFormData,
        getOrdersByUserId,
        createOrder,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrderContext = () => {
  return useContext(OrdersContext);
};
