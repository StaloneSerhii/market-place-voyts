import axios from 'axios';
import Notiflix from 'notiflix';

const API = 'https://voyts.onrender.com/api';
// const API = 'http://localhost:3333/api';

// Поверненя всіх товарів на головну
async function getAllProduct(page) {
  const { data } = await axios.get(`${API}/product?limit=${page}`);
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

async function getAnaloguesProduct(_id) {
  const { data } = await axios.get(
    `${API}/product/getall/analogues?_id=${_id}`
  );
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

async function postBuyProductBY(body, findWord) {
  const { data } = await axios.get(
    `${API}/product/getAll/by?sort=${body}&find=${findWord}`
  );
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

async function postBuyProductNew(body, findWord) {
  const { data } = await axios.get(
    `${API}/product/getAll/new?sort=${body}&find=${findWord}`
  );
  if (data) {
    return data;
  }
  console.log('error');
}

async function resendEmailVerf(body) {
  const { data } = await axios.post(`${API}/register/verify`, body);
  if (data) {
    return data;
  }
  console.log('error');
}

async function resendPass(body) {
  const { data } = await axios.post(`${API}/register/resendPass`, body);
  if (data) {
    Notiflix.Notify.success('Лист на зміну паролю успішно відправлений');
  }
  console.log('error');
}



export {

  getAnaloguesProduct,
  getAllProduct,
  getIdProduct,
  postBuyProduct,
  postBuyProductBY,
  postBuyProductNew,
  postHelpProduct,
  getTopBuyProduct,
  resendEmailVerf,
  resendPass,
};
