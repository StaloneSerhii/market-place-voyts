import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { BsFillBasketFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addMyFavorite, delMyFavorite } from 'redux/operations';
import { useState, useEffect } from 'react';
import {
  getProductLocalStorage,
  getProductLocalStorageNotAuth,
} from 'redux/selector';
import { getAuthStatus } from 'redux/authPer/auth-selector';
import {
  addMyFavoritNotAuth,
  delMyFavoritNotAuth,
} from 'redux/buyProduct-slice';

const CatalogeCard = ({ price, id, name, img, code, setProduct }) => {
  console.log(img);
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
    <div className="card-catalog">
      <div className="sell">
        <div className="beffore__sell">
          <span>Новинка</span>
        </div>
        <div className="beffore__select">
          <button
            onClick={() =>
              selectAuth
                ? dispatch(
                    fav === -1
                      ? addMyFavorite({ idProduct: id, price, name, img, code })
                      : delMyFavorite({ idProduct: id })
                  )
                : dispatch(
                    fav === -1
                      ? addMyFavoritNotAuth({
                          idProduct: id,
                          price,
                          name,
                          img,
                          code,
                        })
                      : delMyFavoritNotAuth({
                          idProduct: id,
                        })
                  )
            }
          >
            {fav === -1 ? <AiOutlineHeart /> : <AiFillHeart />}
          </button>
        </div>
      </div>
      <Link to={`product/${id}`} state={id} className="card-catalog__link">
        <img src={img && `https://voyts.onrender.com/${img[0]}`} alt="img-buy" className="card-cataloge__img" />
        <p className="card-cataloge__p">{name}</p>
        <p className="card-cataloge__span">
          {price} <span>грн</span>
        </p>
      </Link>
      {!buyPr ? (
        <Link
          to={`product/${id}`}
          subcategory={'test'}
          className="card-cataloge__btn"
        >
          Детальніше
        </Link>
      ) : (
        <Link to={`/busket`} className="card-cataloge__btn">
          <BsFillBasketFill />У кошик
        </Link>
      )}
    </div>
  );
};

export default CatalogeCard;
