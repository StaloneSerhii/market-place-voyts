import axios from 'axios';

const API = 'https://voyts.onrender.com/api';
// const API = 'http://localhost:3333/api';

// Поверненя всіх товарів на головну
async function getAllProduct() {
  const { data } = await axios.get(`${API}/product/`);
  if (data) {
    return data;
  }
  console.log('error');
}

// Поверненя топових товарів
async function getTopBuyProduct() {
  const { data } = await axios.get(`${API}/product/get/topbuy`);
  if (data) {
    return data;
  }
  console.log('error');
}

// поверненя товару по ід
async function getIdProduct(id) {
  const { data } = await axios.get(`${API}/product/${id}`);
  if (data) {
    return data;
  }
  console.log('error');
}

// Покупка товару не для авторизованих користуваччів
async function postBuyProduct(body) {
  const data = await axios.post(`${API}/buy/buyProductFromBusketNotAuch`, body);
  if ({ data }) {
    return data;
  }
  console.log('error');
}

async function postBuyProductBY(body) {
  const { data } = await axios.get(`${API}/product/getAll/by`, body);
  if (data) {
    return data;
  }
  console.log('error');
}

async function postHelpProduct(requestData) {
  const { data } = await axios.post(
    `${API}/product/product/helpers`,
    requestData
  );
  if (data) {
    return data;
  }
  console.log('error');
}

async function postBuyProductNew(body) {
  const { data } = await axios.get(`${API}/product/getAll/new`, body);
  if (data) {
    return data;
  }
  console.log('error');
}

export {
  getAllProduct,
  getIdProduct,
  postBuyProduct,
  postBuyProductBY,
  postBuyProductNew,
  postHelpProduct,
  getTopBuyProduct,
};
