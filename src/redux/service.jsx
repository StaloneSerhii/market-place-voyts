import axios from 'axios';

const API = 'http://localhost:3333/api/product/';

async function getAllProduct() {
  const { data } = await axios.get(`${API}`);
  if (data) {
    return data;
  }
  console.log('error');
}

async function getIdProduct(id) {
  const { data } = await axios.get(`${API}/${id}`);
  if (data) {
    return data;
  }
  console.log('error');
}

export { getAllProduct, getIdProduct };
