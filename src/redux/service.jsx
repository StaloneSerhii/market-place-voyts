import axios from 'axios';

const API = 'http://localhost:3333/api/product';

async function getAllProduct() {
  const { data } = await axios.get(`${API}`);
  if (data) {
    return data;
  }
  console.log('error');
}

async function getTopBuyProduct() {
  const { data } = await axios.get(`${API}/product/topbuy`);
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

async function postBuyProduct(body) {
  const data = await axios.post(`${API}/buy/product`, body);
  if ({ data }) {
    return data;
  }
  console.log('error');
}

async function postBuyProductBY(body) {
  const { data } = await axios.get(`${API}/product/by`, body);
  if (data) {
    return data;
  }
  console.log('error');
}

async function postHelpProduct(requestData) {
  const { data } = await axios.post(`${API}/product/helpers`, requestData);
  if (data) {
    return data;
  }
  console.log('error');
}

async function postBuyProductNew(body) {
  const { data } = await axios.get(`${API}/product/new`, body);
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
