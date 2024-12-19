import React, { createContext, useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigation = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.path || '/';
  
  const [form, setForm] = useState({
    email: '',
    password: '',
    permissions: [],
    role: '',
  });

  const dataUser = {
    email: form.email,
    password: form.password,
  };
  
  const url = process.env.REACT_APP_API_URL;
  // const url = 'https://ka-bootcamp-backend-green.vercel.app';

  const login = async () => {
    setLoading(true);

    try {
      const response = await axios.post(
        // `${process.env.REACT_APP_API_URL}/auth/customer`,
        `${url}/api/auth/customer`,
        dataUser
      );

      const user = response.data;

      navigation(redirectPath, { replace: true });
      localStorage.setItem('user', JSON.stringify(user));
      toast.success('Login Berhasil');
      navigation('/');
      setUser(user);
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.error ||
          'Login Gagal, Terjadi Kesalahan Pada Server'
      );
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigation('/');
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, error, login, logout, form, setForm }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
