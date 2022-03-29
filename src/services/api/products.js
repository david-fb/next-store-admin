import axios from 'axios';
import endPoints from '@services/api';
import jsCookie from 'js-cookie';

const token = jsCookie.get('token');
const config = {
  headers: {
    accept: '*/*',
    'Content-Type': 'application/json',
  },
};

const addProduct = async (body) => {
  if (token) axios.defaults.headers.Authorization = `Bearer ${token}`;
  const response = await axios.post(endPoints.products.addProduct, body, config);
  return response.data;
};

const deleteProduct = async (productId) => {
  if (token) axios.defaults.headers.Authorization = `Bearer ${token}`;
  const response = await axios.delete(endPoints.products.deleteProduct(productId), config);
  return response.data;
};

const updateProduct = async (body, id) => {
  if (token) axios.defaults.headers.Authorization = `Bearer ${token}`;
  const response = await axios.patch(endPoints.products.updateProduct(id), body, config);
  return response.data;
};

export { addProduct, deleteProduct, updateProduct };
