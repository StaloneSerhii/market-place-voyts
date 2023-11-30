import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { getMyStore } from 'redux/selector';
import { getAuthStatus } from 'redux/authPer/auth-selector';
import { Link, useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  const clearLS = () => {
    localStorage.clear();
    navigate('/');
    window.location.reload();
  };

  return (
    <div style={{ margin: '24px', width: '100%' }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h2 className="cataloge__title">Переглянуті товари</h2>
          <button className="formLogin__btn" onClick={clearLS}>
            Очистити історію
          </button>
        </div>
        <ul className="product__container">
          {favoriteProduct.length > 0 ? (
            favoriteProduct.map(list => (
              <li key={list.code}>
                <div
                  state={list.code}
                  style={{
                    cursor: 'default',
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
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
                    <Link
                      to={`/product/${list._id}`}
                      subcategory={'test'}
                      className="card-cataloge__btn"
                    >
                      Купити
                    </Link>
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

export default History;
