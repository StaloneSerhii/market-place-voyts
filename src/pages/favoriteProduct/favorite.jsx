import { useDispatch, useSelector } from 'react-redux';
import { getAuthStatus } from 'redux/authPer/auth-selector';
import {
  getFavoriteProductLocalStorage,
  getFavoriteProductLocalStorageAuth,
} from 'redux/selector';
import { useState, useEffect } from 'react';
import { delMyFavorite } from 'redux/operations';
import { delMyFavoritNotAuth } from 'redux/buyProduct-slice';
import { AiFillHeart } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const Favorite = () => {
  const productNotAuth = useSelector(getFavoriteProductLocalStorageAuth);
  const productFavorite = useSelector(getFavoriteProductLocalStorage);
  const [favoriteProduct, setFavoriteProduct] = useState([]);
  const selectAuth = useSelector(getAuthStatus);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
                <button
                  style={{ fontSize: '20px', color: 'orange' }}
                  onClick={() =>
                    selectAuth
                      ? dispatch(delMyFavorite({ idProduct: list.idProduct }))
                      : dispatch(
                          delMyFavoritNotAuth({
                            idProduct: list.idProduct,
                          })
                        )
                  }
                >
                  <AiFillHeart />
                </button>
                <div state={list.id} style={{ cursor: 'default' }}>
                  <img
                    src={list.img[0]}
                    alt="img-buy"
                    className="card-cataloge__img"
                  />
                  <p className="card-cataloge__p">{list.name}</p>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      margin: '24px 0',
                    }}
                  >
                    <p className="card-cataloge__span">
                      {list.price} грн
                      <span>В наявності</span>
                    </p>

                    <button
                      onClick={() => navigate(`/product/${list._id}`)}
                      subcategory={'test'}
                      className="card-cataloge__btn"
                    >
                      Купити
                    </button>
                  </div>
                  <button
                    onClick={() => navigate(`/product/${list._id}`)}
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
