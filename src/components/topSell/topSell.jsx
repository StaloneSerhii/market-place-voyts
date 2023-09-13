import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { BsFillBasketFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMyFavorite, delMyFavorite } from 'redux/operations';
import {
  getProductLocalStorage,
  getProductLocalStorageNotAuth,
} from 'redux/selector';
import { FaMoneyBillAlt } from 'react-icons/fa';
import { getAuthStatus } from 'redux/authPer/auth-selector';

const TopSell = ({ id, price, img, name, code }) => {
  const [fav, setFav] = useState(-1);
  const [buyPr, setBuyPr] = useState(false);

  const dispatch = useDispatch();
  const getFavorite = useSelector(
    state => state.persistedReducerAdd.buyProduct.myFavorite
  );
  const getFavoriteNotAth = useSelector(
    state => state.persistedReducerAdd.buyProduct.userPr.myFavorite
  );

  const selectAuth = useSelector(getAuthStatus);
  const productBuyAuth = useSelector(getProductLocalStorage);
  const productNotAuth = useSelector(getProductLocalStorageNotAuth);
  const onFavorite = getFavorite.findIndex(array => array.idProduct === id);
  const onFavoriteNotAuth = getFavoriteNotAth.findIndex(
    array => array.idProduct === id
  );

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

  useEffect(() => {
    if (selectAuth) {
      setFav(onFavorite);
    } else {
      setFav(onFavoriteNotAuth);
    }
  }, [onFavorite, onFavoriteNotAuth, selectAuth]);

  return (
    <li className="card-catalog" key={id}>
      <div className="sell">
        <div className="beffore__sell">
          <span>Хіти продажу</span>
        </div>
        <div className="beffore__select">
          <button
            onClick={() =>
              dispatch(fav === -1 ? addMyFavorite(id) : delMyFavorite(id))
            }
          >
            {onFavorite === -1 ? <AiOutlineHeart /> : <AiFillHeart />}
          </button>
        </div>
      </div>
      <Link
        to={buyPr ? '/busket' : `product/${id}`}
        state={id}
        className="card-catalog__link"
      >
        <img src={img} alt="img-buy" className="card-cataloge__img" />
        <p className="card-cataloge__p">{name}</p>
        <p className="card-cataloge__span">
          {price} <span>грн</span>
        </p>
      </Link>
      {!buyPr ? (
        <Link to={`product/${id}`} className="card-cataloge__btn">
          <FaMoneyBillAlt />
          Купити
        </Link>
      ) : (
        <Link to={`/busket`} className="card-cataloge__btn">
          <BsFillBasketFill />У кошик
        </Link>
      )}
    </li>
  );
};
export default TopSell;
