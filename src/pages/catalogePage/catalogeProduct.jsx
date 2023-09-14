import { Link, useLocation } from 'react-router-dom';
import test from '../../image/testBuy.jpg';
import { SlBasketLoaded } from 'react-icons/sl';
import { MdOutlineAttachMoney } from 'react-icons/md';

import { useEffect, useState } from 'react';
import { postBuyProductBY, postBuyProductNew } from 'redux/service';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthStatus } from 'redux/authPer/auth-selector';
import { addProductBusketAuth } from 'redux/operations';
import { addProductOrder } from 'redux/buyProduct-slice';
import {
  getProductLocalStorage,
  getProductLocalStorageNotAuth,
} from 'redux/selector';

const CatalogeProduct = () => {
  const [listPr, setListPr] = useState([]);
  const navigate = useLocation();
  const dispatch = useDispatch();
  const selectAuth = useSelector(getAuthStatus);
  const productBuyAuth = useSelector(getProductLocalStorage);
  const productNotAuth = useSelector(getProductLocalStorageNotAuth);

  const svgImg = list => {
    if (selectAuth && listPr && productBuyAuth && productBuyAuth.length > 0) {
      const buyingTrue = productBuyAuth.find(pr => pr.code === list.code);
      if (buyingTrue) {
        return (
          <Link to="/busket" type="button" className="product__block--btn">
            <SlBasketLoaded />
          </Link>
        );
      }
      return (
        <button
          className="product__block--btn"
          onClick={() => buyProduct(list)}
        >
          <MdOutlineAttachMoney />
        </button>
      );
    } else if (
      !selectAuth &&
      listPr &&
      productNotAuth &&
      productNotAuth.length > 0
    ) {
      const buyingTrue = productNotAuth.find(pr => pr.code === list.code);
      if (buyingTrue) {
        return (
          <Link to="/busket" type="button" className="formLogin__btn">
            <SlBasketLoaded />
          </Link>
        );
      }
      return (
        <button
          className="product__block--btn"
          onClick={() => buyProduct(list)}
        >
          Купити
        </button>
      );
    }
  };

  useEffect(() => {
    if (navigate.pathname === '/productBY') {
      postBuyProductBY().then(state => setListPr(state));
    } else if (navigate.pathname === '/productNEW') {
      postBuyProductNew().then(state => setListPr(state));
    }
  }, [navigate.pathname]);

  const buyProduct = list => {
    const { _id, updatedAt, createdAt, ...obj } = list;
    if (selectAuth) {
      dispatch(addProductBusketAuth({ ...obj, count: 1, id: _id }));
    } else {
      dispatch(addProductOrder({ ...obj, count: 1, id: _id }));
    }
  };

  return (
    <div style={{ backgroundColor: '#fff' }}>
      <div>
        <h2 className="cataloge__title">
          {navigate.pathname === '/productBY'
            ? ' Б/У Запчастини'
            : ' Нові запчастини'}
        </h2>
        <div>
          <div className="block__filter">
            <input type="text" placeholder="Пошук" />
            <div className="line"></div>
            <select id="size" name="size">
              <option value="xs" selected>
                Від дешевих до дорогих
              </option>
              <option value="s">Від дорогих до дешевих</option>
              <option value="m">За рейтингом</option>
            </select>
          </div>
          <ul className="product__container">
            {listPr.length > 0 ? (
              listPr.map(list => (
                <li key={list._id}>
                  <div className="product__block">
                    <Link to={`/product/${list._id}`}>
                      <img src={test} alt="sell" width="200px" />
                    </Link>
                    <div className="product__block--text">
                      <span className="product__block--span">{list.ark}</span>
                      <p>{list.name}</p>
                      <div>
                        <span>{list.price} грн</span>
                        {svgImg(list)}
                      </div>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <div>load</div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default CatalogeProduct;
