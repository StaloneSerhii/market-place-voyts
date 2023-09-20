import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import { getMyStore } from 'redux/selector';
import { getAuthStatus } from 'redux/authPer/auth-selector';

import { Link } from 'react-router-dom';
import { SlBasketLoaded } from 'react-icons/sl';

const History = () => {
  const productNotAuth = useSelector(getMyStore);
  const productFavorite = useSelector(getMyStore);
  const [favoriteProduct, setFavoriteProduct] = useState([]);
  const selectAuth = useSelector(getAuthStatus);

  // Продукти з лс для авторизованих і не авторизованих
  useEffect(() => {
    if (selectAuth) {
      setFavoriteProduct(productFavorite);
    } else if (!selectAuth) {
      setFavoriteProduct(productNotAuth);
    }
  }, [productFavorite, productNotAuth, selectAuth]);

  return (
    <div style={{ margin: '15px' }}>
      <div>
        <h2 className="cataloge__title">Переглянуті товари</h2>
        <ul className="product__container">
          {favoriteProduct.length > 0 ? (
            favoriteProduct.map(list => (
              <li key={list.code}>
                <div className="product__block">
                  <div style={{ height: '33px' }}></div>
                  <Link to={`/product/${list.idProduct}`}>
                    <img src={list.img[0]} alt="sell" width="200px" />
                  </Link>
                  <div className="product__block--text">
                    <span className="product__block--span">{list.code}</span>
                    <p>{list.name}</p>
                    <div>
                      <span className="product__block--spanPrice">
                        {list.price} грн
                      </span>
                      <SlBasketLoaded className="product__block--spanSvg" />
                    </div>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <p style={{ margin: 'auto' }}>
              Додайте товар в обрані щоб переглянути їх на цій сторінці
            </p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default History;
