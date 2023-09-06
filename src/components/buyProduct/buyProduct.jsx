import { FcCallback } from 'react-icons/fc';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
import BuyBusketModal from 'components/modalBuy/about/buyBusket';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProductBusket } from 'redux/slice';
import { useEffect } from 'react';
import { getIdProduct, postHelpProduct } from 'redux/service';
import { useRef } from 'react';
import { getAuth, getAuthStatus } from 'redux/authPer/auth-selector';
import { addProductBusketAuth } from 'redux/operations';

const BuyProduct = ({ saveInfo }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  // Ід для запиту в бд
  const { id } = useParams();
  // Перевірка на наявність у кошику
  const [buyPr, setBuyPr] = useState(false);
  // Поверненя продуктів з бд
  const [product, setProduct] = useState();
  // Відкритя модалки покупки
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasInfoBeenSaved, setHasInfoBeenSaved] = useState(false);
  // Дефолтна картинка
  const [currentImageIndex, setCurrentImageIndex] = useState(
    '/market-place-voyts/static/media/noimage.2efe78cdf6dbf909f571.jpg'
  );

  // Перевірка на авторизацію
  const selectAuth = useSelector(getAuthStatus);
  // Поверненя даних з лс
  const productBuyAuth = useSelector(getAuth);
  const productBuy = useSelector(state => state.persistedReducerAdd.product);
  const getAuthProfile = useSelector(state => state.persistedReducerAdd.auth);
  // Стейт для відправки форми запиту про допомогу
  const [partNumber, setPartNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    getIdProduct(id).then(pr => setProduct(pr));
    if (selectAuth) {
      const buy = productBuy.filter(pr => pr._id === id);
      if (buy.length > 0) {
        setBuyPr(true);
      }
    }
    const buyAuth = productBuyAuth.user.product.filter(pr => pr._id === id);
    if (buyAuth.length > 0) {
      setBuyPr(true);
    }
  }, [id, productBuy, productBuyAuth.user.product, selectAuth]);

  useEffect(() => {
    if (product && !hasInfoBeenSaved) {
      saveInfo({
        use: product.info.use,
        obm: product.info.obm,
        details: product.info.details,
      });
      setHasInfoBeenSaved(true);
    }
  }, [product, hasInfoBeenSaved, saveInfo]);

  useEffect(() => {
    if (product) {
      setCurrentImageIndex(product.img[0]);
    }
  }, [product]);

  const buyProduct = () => {
    const { _id } = getAuthProfile.user;
    const { token } = getAuthProfile;

    console.log(getAuthProfile);
    setIsModalOpen(true);
    if (!selectAuth) {
      dispatch(addProductBusket(product));
    }
    dispatch(
      addProductBusketAuth({ token, _id, product: { ...product, count: 1 } })
    );
  };

  const handleSubmit = e => {
    e.preventDefault();
    const requestData = {
      partNumber,
      phoneNumber,
    };

    postHelpProduct(requestData).then(state => console.log(state));
  };

  const switchToPreviousImage = e => {
    const openImg = e.target.src.slice(21, e.target.src.length);
    setCurrentImageIndex(openImg);
  };

  const containerRef = useRef(null);

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
                src={currentImageIndex}
                alt="product"
                width="400"
                className="zoomable-image"
              />
            </div>
            <div className="block__img--allImg ">
              {product &&
                product.img.map(img => (
                  <img
                    className="active"
                    src={img}
                    alt="allProduct"
                    width="100"
                    onClick={switchToPreviousImage}
                  />
                ))}
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
                  type="number"
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
        <div>
          <h3 className="name__product">{product.name}</h3>
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
                <BuyBusketModal onClose={() => setIsModalOpen(false)} />
              )}
            </form>
            <div className="block__infoCenter">
              <p> {<FcCallback />} Отримати консультацію</p>
              <span>+38(67)000-00-00</span>
              <button className="formLogin__btn">Задати питання</button>
            </div>
          </div>
          <div className="block__analog">
            <h4>Аналоги</h4>
            <Link to="/product/2" className="block__analog--info">
              <img src={product.img} alt="/" width="70px" />
              <p>Назва запчастини... хрестовина з головками 4324</p>
              <p className="price">6805.90 грн</p>
            </Link>
          </div>
          <div className="info__btn">
            <Link
              to="dital"
              className={
                location.pathname === `/product/${id}/dital`
                  ? 'info__btn--details active__btn'
                  : 'info__btn--details'
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
