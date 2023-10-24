import { BsFillBasketFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  getProductLocalStorage,
  getProductLocalStorageNotAuth,
} from 'redux/selector';
import { getAuthStatus } from 'redux/authPer/auth-selector';

const TopSell = ({ id, price, img, name, code }) => {
  const [buyPr, setBuyPr] = useState(false);
  const selectAuth = useSelector(getAuthStatus);
  const productBuyAuth = useSelector(getProductLocalStorage);
  const productNotAuth = useSelector(getProductLocalStorageNotAuth);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectAuth && productBuyAuth && productBuyAuth.length > 0) {
      const buyingTrue = productBuyAuth.find(pr => pr.code === code);
      if (buyingTrue) {
        setBuyPr(true);
      }
    } else if (!selectAuth && productNotAuth && productNotAuth.length > 0) {
      const buyingTrue = productNotAuth.find(pr => pr.code === code);
      if (buyingTrue) {
        setBuyPr(true);
      }
    }
  }, [code, productBuyAuth, productNotAuth, selectAuth]);

  return (
    <div state={id}>
      <img src={img} alt="img-buy" className="card-cataloge__img" />
      <p className="card-cataloge__p">{name}</p>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          margin: '24px 0',
        }}
      >
        <p className="card-cataloge__span">
          {price} грн
          <span>В наявності</span>
        </p>
        {!buyPr ? (
          <button
            onClick={() => navigate(`/product/${id}`)}
            subcategory={'test'}
            className="card-cataloge__btn"
          >
            Купити
          </button>
        ) : (
          <button
            type="button"
            onClick={() => navigate('/busket')}
            className="card-cataloge__btn"
          >
            <BsFillBasketFill />У кошик
          </button>
        )}
      </div>
      <button
        onClick={() => navigate(`/product/${id}`)}
        style={{
          fontSize: '14px',
          color: '#585858',
          margin: '0 auto',
          display: 'flex',
        }}
      >
        Детальна інформація
      </button>
    </div>
  );
};
export default TopSell;
