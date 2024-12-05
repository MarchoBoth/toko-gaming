import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCart } from 'react-use-cart';

const OrdersContext = React.createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState([]);
  const { items, emptyCart } = useCart();
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: '',
    status: 'PENDING',
    items: [],
  });

  const user = JSON.parse(localStorage.getItem('user'));
  // TODO
  // 1. Lengkapi fungsi getOrdersById
  // 2. Buatkan fungsi createOrder
  const getOrdersByUserId = async () => {
    try {
      // Your code here

      const response = await axios.get(`http://localhost:3001/api/orders`, {
        headers: {
          Authorization: `${user.token}`,
        },
      });
      console.log('response', response.data.data);
      setOrders(response.data.data);
    } catch (err) {
      // Your code here
      console.log(err);
    }
  };

  // Buat fungsi create order disni
  const createOrder = async () => {
    const url = `http://localhost:3001/api/orders`;
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`, // Pastikan menggunakan "Bearer" jika diperlukan
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
      if (error.response) {
        console.error('Error Response:', error.response.data);
        toast.error(error.response.data.message || 'Failed to create order.');
      } else {
        console.error('Error:', error.message);
        toast.error('An error occurred. Please try again.');
      }
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
        // panggil fungsinya disini
        createOrder,
        getOrdersByUserId,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};
// make sure use
export const useOrderContext = () => {
  return useContext(OrdersContext);
};
