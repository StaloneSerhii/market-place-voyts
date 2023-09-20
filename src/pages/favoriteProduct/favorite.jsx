import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAuthStatus } from 'redux/authPer/auth-selector';
import {
  getFavoriteProductLocalStorage,
  getFavoriteProductLocalStorageAuth,
} from 'redux/selector';
import { useState, useEffect } from 'react';
import { delMyFavorite } from 'redux/operations';
import { delMyFavoritNotAuth } from 'redux/buyProduct-slice';
import { AiFillHeart } from 'react-icons/ai';
import { SlBasketLoaded } from 'react-icons/sl';

const Favorite = () => {
  const productNotAuth = useSelector(getFavoriteProductLocalStorageAuth);
  const productFavorite = useSelector(getFavoriteProductLocalStorage);
  const [favoriteProduct, setFavoriteProduct] = useState([]);
  const selectAuth = useSelector(getAuthStatus);
  const dispatch = useDispatch();

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
        <h2 className="cataloge__title">Список обраного</h2>
        <ul className="product__container">
          {favoriteProduct.length > 0 ? (
            favoriteProduct.map(list => (
              <li key={list.code}>
                <div className="product__block">
                  <div
                    className="beffore__select"
                    style={{ textAlign: 'end', margin: '10px' }}
                  >
                    <button
                      onClick={() =>
                        selectAuth
                          ? dispatch(
                              delMyFavorite({ idProduct: list.idProduct })
                            )
                          : dispatch(
                              delMyFavoritNotAuth({
                                idProduct: list.idProduct,
                              })
                            )
                      }
                    >
                      <AiFillHeart />
                    </button>
                  </div>
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
export default Favorite;
