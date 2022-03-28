import axios from 'axios';
import endPoints from '@services/api';
import jsCookie from 'js-cookie';

const addProduct = async (body) => {
  const token = jsCookie.get('token');
  const config = {
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
    },
  };
  //console.log(`token ${token}`);
  if (token) axios.defaults.headers.Authorization = `Bearer ${token}`;
  const response = await axios.post(endPoints.products.addProduct, body, config);
  return response.data;
};

const deleteProduct = async (productId) => {
  const response = await axios.delete(endPoints.products.deleteProduct(productId));
  return response.data;
};

export { addProduct, deleteProduct };
