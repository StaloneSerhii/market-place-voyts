import { Rating } from '@mui/material';
import BuyBusketModal from 'components/modalBuy/about/buyBusket';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getAuthStatus } from 'redux/authPer/auth-selector';
import {
  addHistory,
  addMyFavoritNotAuth,
  addProductOrder,
  delMyFavoritNotAuth,
} from 'redux/buyProduct-slice';
import {
  addMyFavorite,
  addProductBusketAuth,
  delMyFavorite,
} from 'redux/operations';
import {
  getFavoriteProductLocalStorage,
  getFavoriteProductLocalStorageAuth,
  getProductLocalStorage,
  getProductLocalStorageNotAuth,
} from 'redux/selector';

export const MainInfoProduct = ({ comments, product }) => {
  const { id } = useParams();
  const [buyPr, setBuyPr] = useState(false);
  const dispatch = useDispatch();
  const [fav, setFav] = useState(-1);

  const selectAuth = useSelector(getAuthStatus);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getFavorite = useSelector(getFavoriteProductLocalStorage);
  const getFavoriteNotAth = useSelector(getFavoriteProductLocalStorageAuth);
  const onFavorite = getFavorite.findIndex(array => array.idProduct === id);
  const onFavoriteNotAuth = getFavoriteNotAth.findIndex(
    array => array.idProduct === id
  );

  // Поверненя даних з лс
  const productBuyAuth = useSelector(getProductLocalStorage);
  const productNotAuth = useSelector(getProductLocalStorageNotAuth);

  // Додаваня в історію переглядів
  useEffect(() => {
    if (product) {
      dispatch(addHistory(product));
    }
  }, [product, dispatch]);

  useEffect(() => {
    if (selectAuth) {
      setFav(onFavorite);
    } else {
      setFav(onFavoriteNotAuth);
    }
  }, [onFavorite, onFavoriteNotAuth, selectAuth]);

  const AllRating = () => {
    let quntity = 0;
    for (let i = 0; i < comments.length; i++) {
      quntity += comments[i].RatingValue;
    }
    return quntity / comments.length;
  };

  // Додаваня в кошик на бд і лс
  const buyProduct = () => {
    const { _id, updatedAt, createdAt, ...obj } = product;
    if (selectAuth) {
      dispatch(addProductBusketAuth({ ...obj, count: 1, id: _id }));
    } else {
      dispatch(addProductOrder({ ...obj, count: 1, id: _id }));
    }
  };

  // Зміна кнопки на посиланя кошика (купити...у кошик)
  useEffect(() => {
    if (selectAuth && product && productBuyAuth && productBuyAuth.length > 0) {
      const buyingTrue = productBuyAuth.find(pr => pr.code === product.code);
      if (buyingTrue) {
        setBuyPr(true);
      }
    } else if (
      !selectAuth &&
      product &&
      productNotAuth &&
      productNotAuth.length > 0
    ) {
      const buyingTrue = productNotAuth.find(pr => pr.code === product.code);
      if (buyingTrue) {
        setBuyPr(true);
      }
    }
  }, [product, productBuyAuth, selectAuth, productNotAuth]);

  return (
    <>
      {product && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <p className="block__info--on">В наявності</p>
          <div>
            <span className="block__info--price">{product.price} грн</span>
          </div>
          {comments && (
            <Rating
              name="simple-controlled"
              precision={0.5}
              value={AllRating()}
              readOnly
            />
          )}
          <div>
            <p style={{ fontSize: '16px', fontWeight: '600' }}>
              Отримати консультацію
            </p>
            <a
              href="tel:380686473128"
              style={{
                color: '#666',
                fontSize: '16px',
                lineHeight: '24px',
              }}
            >
              +380-68-64-73-128
            </a>
          </div>
          <div>
            <p style={{ fontSize: '16px', fontWeight: '600' }}>Опис товару</p>
            <p
              style={{
                color: '#666',
                fontSize: '16px',
                lineHeight: '24px',
              }}
            >
              {product.info.details}
            </p>
          </div>
          <div>
            <p style={{ fontSize: '16px', fontWeight: '600' }}>
              Розташування товару
            </p>
            <p
              style={{
                color: '#666',
                fontSize: '16px',
                lineHeight: '24px',
              }}
            >
              {product.info.obm}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '28px' }}>
            {buyPr ? (
              <Link
                to="/busket"
                type="button"
                className="formLogin__btn--pr bgGreen btnHover "
                style={{ color: '#fff' }}
              >
                У Кошик
              </Link>
            ) : (
              <button
                type="button"
                className="formLogin__btn--pr bgGreen btnHover "
                onClick={buyProduct}
                style={{ color: '#fff' }}
              >
                <span>
                  <svg
                    width="21"
                    height="20"
                    viewBox="0 0 25 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.5 1.5C13.4946 1.5 14.4484 1.89509 15.1517 2.59835C15.8549 3.30161 16.25 4.25544 16.25 5.25V6H8.75V5.25C8.75 4.25544 9.14509 3.30161 9.84835 2.59835C10.5516 1.89509 11.5054 1.5 12.5 1.5ZM17.75 6V5.25C17.75 3.85761 17.1969 2.52226 16.2123 1.53769C15.2277 0.553123 13.8924 0 12.5 0C11.1076 0 9.77226 0.553123 8.78769 1.53769C7.80312 2.52226 7.25 3.85761 7.25 5.25V6H2V21C2 21.7956 2.31607 22.5587 2.87868 23.1213C3.44129 23.6839 4.20435 24 5 24H20C20.7956 24 21.5587 23.6839 22.1213 23.1213C22.6839 22.5587 23 21.7956 23 21V6H17.75ZM3.5 7.5H21.5V21C21.5 21.3978 21.342 21.7794 21.0607 22.0607C20.7794 22.342 20.3978 22.5 20 22.5H5C4.60218 22.5 4.22064 22.342 3.93934 22.0607C3.65804 21.7794 3.5 21.3978 3.5 21V7.5Z"
                      fill="white"
                    />
                  </svg>
                </span>{' '}
                Купити
              </button>
            )}
            <button
              className="formLogin__btn--pr btnHoverReverse"
              style={{
                border: '1px solid #009C2C',
              }}
              onClick={() =>
                selectAuth
                  ? dispatch(
                      fav === -1
                        ? addMyFavorite({
                            idProduct: id,
                            ...product,
                          })
                        : delMyFavorite({ idProduct: id })
                    )
                  : dispatch(
                      fav === -1
                        ? addMyFavoritNotAuth({
                            idProduct: id,
                            ...product,
                          })
                        : delMyFavoritNotAuth({
                            idProduct: id,
                          })
                    )
              }
            >
              <span>
                <svg
                  width="21"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.0003 4.12207L10.9248 3.01657C8.40033 0.421573 3.77133 1.31707 2.10033 4.57957C1.31583 6.11407 1.13883 8.32957 2.57133 11.1571C3.95133 13.8796 6.82233 17.1406 12.0003 20.6926C17.1783 17.1406 20.0478 13.8796 21.4293 11.1571C22.8618 8.32807 22.6863 6.11407 21.9003 4.57957C20.2293 1.31707 15.6003 0.420073 13.0758 3.01507L12.0003 4.12207ZM12.0003 22.5001C-10.9992 7.30207 4.91883 -4.55993 11.7363 1.71457C11.8263 1.79707 11.9148 1.88257 12.0003 1.97107C12.085 1.88265 12.173 1.79759 12.2643 1.71607C19.0803 -4.56293 34.9998 7.30057 12.0003 22.5001Z"
                    fill="#cfbd18"
                  />
                </svg>
              </span>
              Улюблені
            </button>
          </div>
          {isModalOpen && (
            <BuyBusketModal
              product={product}
              onClose={() => setIsModalOpen(false)}
            />
          )}
        </div>
      )}
    </>
  );
};
