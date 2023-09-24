import { FcCallback } from 'react-icons/fc';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
import BuyBusketModal from 'components/modalBuy/about/buyBusket';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
  getAnaloguesProduct,
  getIdProduct,
  postHelpProduct,
} from 'redux/service';
import { useRef } from 'react';
import { getAuthStatus } from 'redux/authPer/auth-selector';
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
import {
  addHistory,
  addMyFavoritNotAuth,
  addProductOrder,
  delMyFavoritNotAuth,
} from 'redux/buyProduct-slice';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import VideoModal from 'components/modalBuy/modalVideo';

const BuyProduct = ({ saveInfo }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  // Ід для запиту в бд
  const { id } = useParams();
  // Перевірка на наявність у кошику
  const [buyPr, setBuyPr] = useState(false);
  // Поверненя продуктів з бд
  const [product, setProduct] = useState();
  const [fav, setFav] = useState(-1);

  // Поверненя аналогів продуктів з бд
  const [productAnalogues, setProductAnalogues] = useState([]);

  // Відкритя модалки покупки
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasInfoBeenSaved, setHasInfoBeenSaved] = useState(false);
  // Дефолтна картинка
  const [currentImageIndex, setCurrentImageIndex] = useState();
  // Перевірка на авторизацію
  const selectAuth = useSelector(getAuthStatus);

  // Поверненя даних з лс
  const productBuyAuth = useSelector(getProductLocalStorage);
  const productNotAuth = useSelector(getProductLocalStorageNotAuth);

  // Стейт для відправки форми запиту про допомогу
  const [partNumber, setPartNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const getFavorite = useSelector(getFavoriteProductLocalStorage);
  const getFavoriteNotAth = useSelector(getFavoriteProductLocalStorageAuth);
  const onFavorite = getFavorite.findIndex(array => array.idProduct === id);
  const onFavoriteNotAuth = getFavoriteNotAth.findIndex(
    array => array.idProduct === id
  );

  // Запит по продукту на бд по ід
  useEffect(() => {
    getIdProduct(id).then(pr => setProduct(pr));
    getAnaloguesProduct(id).then(pr => setProductAnalogues(pr));
  }, [id]);

  // Дод інфа
  useEffect(() => {
    if (product && !hasInfoBeenSaved) {
      saveInfo({
        use:product.info.use ||  'інформація відсутння',
        obm: product.info.obm || 'інформація відсутння',
        details:product.info.details ||  'інформація відсутння',
      });
      setHasInfoBeenSaved(true);
    }
  }, [product, hasInfoBeenSaved, saveInfo]);

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

  // Застосуваня картинки на яку клікнув на головну
  useEffect(() => {
    if (product) {
      setCurrentImageIndex(`https://voyts.onrender.com/${product.img[0]}`);
    }
  }, [product]);

  // Додаваня в кошик на бд і лс
  const buyProduct = () => {
    const { _id, updatedAt, createdAt, ...obj } = product;
    if (selectAuth) {
      dispatch(addProductBusketAuth({ ...obj, count: 1, id: _id }));
    } else {
      dispatch(addProductOrder({ ...obj, count: 1, id: _id }));
    }
    setIsModalOpen(true);
  };

  // Пост пошуку запчастини по номеру
  const handleSubmit = e => {
    e.preventDefault();
    const requestData = {
      partNumber,
      phoneNumber,
    };

    postHelpProduct(requestData).then(state => console.log(state));
  };

  const switchToPreviousImage = e => {
    setCurrentImageIndex(e.target.src);
  };

  // Додаваня в історію переглядів
  useEffect(() => {
    if (product) {
      dispatch(addHistory(product));
    }
  }, [product, dispatch]);

  const containerRef = useRef(null);
  // Збільшення зображення
  const handleMouseMove = event => {
    const container = containerRef.current;
    const image = container.querySelector('.zoomable-image');

    const containerRect = container.getBoundingClientRect();
    const mouseX = event.clientX - containerRect.left;
    const mouseY = event.clientY - containerRect.top;

    const imageX = ((mouseX / containerRect.width) * 100) / 100;
    const imageY = ((mouseY / containerRect.height) * 100) / 100;

    image.style.transformOrigin = `${imageX * 100}% ${imageY * 100}%`;
  };

  useEffect(() => {
    if (selectAuth) {
      setFav(onFavorite);
    } else {
      setFav(onFavoriteNotAuth);
    }
  }, [onFavorite, onFavoriteNotAuth, selectAuth]);

  return (
    product && (
      <div className="content__product">
        <div>
          <div className="block__img">
            <div
              className="zoomable-container"
              ref={containerRef}
              onMouseMove={handleMouseMove}
            >
              <img
                src={product && currentImageIndex }
                alt="product"
                width="400"
                className="zoomable-image"
              />
            </div>
            <div className="block__img--allImg ">
              {product &&
                product.img.map(img => (
                  <img
                    key={img}
                    className="active"
                    src={`https://voyts.onrender.com/${img}`}
                    alt="allProduct"
                    width="100"
                    onClick={switchToPreviousImage}
                  />
                ))}
              {product && product.video && <VideoModal props={product.video} />}
            </div>
            <form className="formFind" onSubmit={handleSubmit}>
              <h3>Знайдемо потрібну запчастину:</h3>
              <label htmlFor="">
                <input
                  required
                  type="text"
                  placeholder="Номер або назва запчастини"
                  value={partNumber}
                  onChange={e => setPartNumber(e.target.value)}
                />
              </label>
              <label htmlFor="">
                <input
                  required
                  type="tel"
                  name="phone"
                  placeholder="Телефон"
                  value={phoneNumber}
                  onChange={e => setPhoneNumber(e.target.value)}
                />
              </label>
              <button className="formLogin__btn postBtn" type="submit">
                Надіслати запит <FiChevronRight />
              </button>
            </form>
          </div>
        </div>
        {product && (
          <div style={{width: '700px'}}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                backgroundColor: '#278032',
              }}
            >
              <h3 className="name__product">{product.name}</h3>
              <button
                className="favorite"
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
                {fav === -1 ? <AiOutlineHeart /> : <AiFillHeart />}
              </button>
            </div>
            <div className="block__info" id="app-root">
              <form className="block__info--item">
                <p>
                  Код: <span>{product.code}</span>
                </p>
                <p>
                  Артикул: <span>{product.ark}</span>
                </p>
                <p>
                  Виробник:
                  <span>{product.producer || <span>не вказано</span>}</span>
                </p>
                <p className="block__info--on">В наявності</p>
                <span className="block__info--price">{product.price} грн</span>
                {buyPr ? (
                  <Link to="/busket" type="button" className="formLogin__btn">
                    У Кошик
                  </Link>
                ) : (
                  <button
                    type="button"
                    className="formLogin__btn"
                    onClick={buyProduct}
                  >
                    Купити
                  </button>
                )}
                {isModalOpen && (
                  <BuyBusketModal
                    product={product}
                    onClose={() => setIsModalOpen(false)}
                  />
                )}
              </form>
              <div className="block__infoCenter">
                <p> {<FcCallback />} Отримати консультацію</p>
                <span style={{ marginBottom: '25px' }}>
                  <a href="tel:+380686473128">+380-68-64-73-128</a>
                </span>
                <a
                  href="https://t.me/n_voyts"
                  target="_blank"
                  rel="noreferrer"
                  className="formLogin__btn"
                >
                  Задати питання
                </a>
              </div>
            </div>
            <div className="block__analog">
              <h4>Аналоги</h4>
              {productAnalogues &&
                productAnalogues.map(pr => (
                  <Link
                    to={`/product/${pr._id}`}
                    className="block__analog--info"
                  >
                    <img src={pr.img[0]} alt="/" width="70px" />
                    <p>{pr.name}</p>
                    <p className="price">{pr.price} грн</p>
                  </Link>
                ))}
            </div>
            <div className="info__btn">
              <Link
                to=""
                className={
                  location.pathname === `/product/${id}`
                    ? 'info__btn--details active__btn'
                    : 'info__btn--details  '
                }
              >
                Опис
              </Link>
              <Link
                to={{ pathname: 'application', state: product.info }}
                className={
                  location.pathname === `/product/${id}/application`
                    ? 'info__btn--details active__btn'
                    : 'info__btn--details'
                }
              >
                Застосування
              </Link>
              <Link
                to="obm"
                className={
                  location.pathname === `/product/${id}/obm`
                    ? 'info__btn--details active__btn'
                    : 'info__btn--details'
                }
              >
                ОБМ номер
              </Link>
            </div>
            <Outlet />
          </div>
        )}
      </div>
    )
  );
};

export default BuyProduct;

export const Application = ({ info }) => {
  return <p>{info && info.use}</p>;
};

export const Obm = ({ info }) => {
  return <p>{info && info.obm}</p>;
};

export const Dital = ({ info }) => {
  return <p>{info && info.details}</p>;
};
