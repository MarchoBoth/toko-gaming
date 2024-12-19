import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider, useAuth } from './AuthProvider';

const OrdersContext = React.createContext();

export const OrderProvider = ({ children }) => {
  const { user } = useAuth(AuthProvider);
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
  const localUser = JSON.parse(localStorage.getItem('user'));
  console.log(user);
  console.log(localUser);
  const getOrdersByUserId = async () => {
    try {
      const url = process.env.REACT_APP_API_URL;
      const response = await axios.get(
        // const url = 'https://api-shop-ku.herokuapp.com';
        // const url = 'http://localhost:5000';

        `${url}/api/order`,
        {
          headers: {
            Authorization: `Bearer ${user?.token || localUser?.token}`,
          },
        }
      );
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
    const url = process.env.REACT_APP_API_URL+`/api/order`;
    const config = {
      headers: {
        Authorization: `Bearer ${user?.token || localUser?.token}`,
        'Content-Type': 'application/json', // Header tambahan untuk format JSON
      },
    };
    const body = {
      ...formData, // Mengirim data form yang telah diisi
    };
    console.log('body', body);
    console.log('formdata', formData);
    console.log('Creating order...');

    try {
      const response = await axios.post(url, body, config);
      console.log('Order created successfully:', response.data.data);

      // Notifikasi sukses
      toast.success(response.data.message);

      // Update state untuk daftar pesanan
      setOrders((prevOrders) => [...prevOrders, response.data.data]);

      // Reset form data setelah berhasil
      setFormData({
        address: '',
        city: '',
        postalCode: '',
        country: '',
        status: '',
        items: [],
      });
    } catch (error) {
      // Menangkap error dan memberikan informasi
      console.error('Error:', error);
    }
  };
  console.log(localUser);
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
