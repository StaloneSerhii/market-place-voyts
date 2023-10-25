import { Link, useParams } from 'react-router-dom';
import BuyBusketModal from 'components/modalBuy/about/buyBusket';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getIdProduct } from 'redux/service';
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
import { TiMessages } from 'react-icons/ti';
import { Rating } from '@mui/material';
import {
  BiDownArrow,
  BiSolidLeftArrow,
  BiSolidRightArrow,
} from 'react-icons/bi';

const BuyProduct = () => {
  const dispatch = useDispatch();
  // Ід для запиту в бд
  const { id } = useParams();
  // Перевірка на наявність у кошику
  const [buyPr, setBuyPr] = useState(false);
  // Поверненя продуктів з бд
  const [product, setProduct] = useState();
  const [fav, setFav] = useState(-1);

  // Відкритя модалки покупки
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [hasInfoBeenSaved, setHasInfoBeenSaved] = useState(false);
  // Дефолтна картинка
  const [currentImageIndex, setCurrentImageIndex] = useState();
  // Перевірка на авторизацію
  const selectAuth = useSelector(getAuthStatus);

  // Поверненя даних з лс
  const productBuyAuth = useSelector(getProductLocalStorage);
  const productNotAuth = useSelector(getProductLocalStorageNotAuth);

  // Стейт для відправки форми запиту про допомогу

  const [value, setValue] = useState(0);
  const getFavorite = useSelector(getFavoriteProductLocalStorage);
  const getFavoriteNotAth = useSelector(getFavoriteProductLocalStorageAuth);
  const onFavorite = getFavorite.findIndex(array => array.idProduct === id);
  const onFavoriteNotAuth = getFavoriteNotAth.findIndex(
    array => array.idProduct === id
  );

  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const modalRef = useRef(null);

  // Функція для відкриття модального вікна з вибраним зображенням
  const openModal = img => {
    setSelectedImage(img);
    setShowModal(true);
  };

  // Функція для закриття модального вікна
  const closeModal = () => {
    setShowModal(false);
    setSelectedImage('');
  };

  // Додаємо слухач події для обробки кліку поза модальним вікном
  useEffect(() => {
    // Створюємо функцію обробника кліку поза модальним вікном
    const handleOutsideClick = e => {
      if (modalRef) {
        closeModal();
      }
    };

    // Додаємо слухач події для обробки кліку поза модальним вікном
    if (showModal) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    // Повертаємо функцію, яка буде виконана при розмінтці компонента
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [showModal]);

  // Запит по продукту на бд по ід і аналогів
  useEffect(() => {
    getIdProduct(id).then(pr => setProduct(pr));
    // getAnaloguesProduct(id).then(pr => setProductAnalogues(pr));
  }, [id]);

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

  const nextImg = () => {
    const currentIndex = product.img.indexOf(currentImageIndex);

    // Перевіряємо, чи знайдено поточний індекс у масиві
    if (currentIndex !== -1) {
      // Збільшуємо індекс на 1, але перевіряємо, чи не вийшли за межі масиву
      const nextIndex = (currentIndex + 1) % product.img.length;

      // Встановлюємо нове значення currentImageIndex
      setCurrentImageIndex(product.img[nextIndex]);
    }
  };

  const BackImg = () => {
    const currentIndex = product.img.indexOf(currentImageIndex);

    // Перевіряємо, чи знайдено поточний індекс у масиві
    if (currentIndex !== -1) {
      // Зменшуємо індекс на 1, але перевіряємо, чи не вийшли за межі масиву
      const previousIndex =
        (currentIndex - 1 + product.img.length) % product.img.length;

      // Встановлюємо нове значення currentImageIndex
      setCurrentImageIndex(product.img[previousIndex]);
    }
  };

  // Застосуваня картинки на яку клікнув на головну
  useEffect(() => {
    if (product) {
      setCurrentImageIndex(product.img[0]);
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

  // // Пост пошуку запчастини по номеру
  // const handleSubmit = e => {
  //   e.preventDefault();
  //   const requestData = {
  //     partNumber,
  //     phoneNumber,
  //   };

  //   postHelpProduct(requestData).then(state => console.log(state));
  // };

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
      <div
        style={{
          maxWidth: '1280px',
          marginLeft: 'auto',
          marginRight: 'auto',
          padding: '0 15px',
          gap: '48px',
        }}
      >
        <div>
          <h3 style={{ fontSize: '25px', fontWeight: '500', margin: '24px 0' }}>
            {product && product.name}
          </h3>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <ul style={{ display: 'flex', gap: '40px' }}>
              <li>
                <a href="#all" style={{ fontSize: '16px' }}>
                  Усе про товар
                </a>
              </li>
              <li>
                <a style={{ fontSize: '16px' }} href="#details">
                  Характеристика
                </a>
              </li>
              <li>
                <a style={{ fontSize: '16px' }} href="#dostavka">
                  Спосіб доставки
                </a>
              </li>
              <li>
                <a style={{ fontSize: '16px' }} href="#video">
                  Відео
                </a>
              </li>
              <li>
                <a style={{ fontSize: '16px' }} href="#rev">
                  Відгуки
                </a>
              </li>
            </ul>
            <button style={{ fontSize: '16px' }}>
              <span>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 7H17V9H20V16H18C17.7348 16 17.4804 16.1054 17.2929 16.2929C17.1054 16.4804 17 16.7348 17 17V18L14.6 16.2C14.4269 16.0702 14.2164 16 14 16H10V15.5L8.2 16.852C8.36095 17.1938 8.61545 17.4831 8.93401 17.6863C9.25257 17.8894 9.62217 17.9982 10 18H13.667L17.4 20.8C17.5731 20.9298 17.7836 21 18 21C18.2652 21 18.5196 20.8946 18.7071 20.7071C18.8946 20.5196 19 20.2652 19 20V18H20C20.5304 18 21.0391 17.7893 21.4142 17.4142C21.7893 17.0391 22 16.5304 22 16V9C22 8.46957 21.7893 7.96086 21.4142 7.58579C21.0391 7.21071 20.5304 7 20 7Z"
                    fill="#1F2A37"
                  />
                  <path
                    d="M6 17C5.73478 17 5.48043 16.8946 5.29289 16.7071C5.10536 16.5196 5 16.2652 5 16V14H4C3.46957 14 2.96086 13.7893 2.58579 13.4142C2.21071 13.0391 2 12.5304 2 12V5C2 4.46957 2.21071 3.96086 2.58579 3.58579C2.96086 3.21071 3.46957 3 4 3H14C14.5304 3 15.0391 3.21071 15.4142 3.58579C15.7893 3.96086 16 4.46957 16 5V12C16 12.5304 15.7893 13.0391 15.4142 13.4142C15.0391 13.7893 14.5304 14 14 14H10.333L6.6 16.8C6.4269 16.9298 6.21637 17 6 17ZM4 5V12H6C6.26522 12 6.51957 12.1054 6.70711 12.2929C6.89464 12.4804 7 12.7348 7 13V14L9.4 12.2C9.5731 12.0702 9.78363 12 10 12H14V5H4Z"
                    fill="#1F2A37"
                  />
                </svg>
              </span>
              Залишити відгук
            </button>
          </div>
          <div className="content__product" id="all">
            <div className="block__img">
              <div
                className="zoomable-container"
                ref={containerRef}
                onMouseMove={handleMouseMove}
              >
                <img
                  src={product && currentImageIndex}
                  alt="product"
                  width="400"
                  className="zoomable-image"
                  onClick={() => openModal(product && currentImageIndex)}
                />
                <button
                  onClick={BackImg}
                  style={{
                    position: 'absolute',
                    top: '200px',
                    left: '10px',
                    color: '#ffffffbd',
                    fontSize: '25px',
                  }}
                >
                  <BiSolidLeftArrow />
                </button>
                <button
                  onClick={nextImg}
                  style={{
                    position: 'absolute',
                    top: '200px',
                    right: '10px',
                    color: '#ffffffbd',
                    fontSize: '25px',
                  }}
                >
                  <BiSolidRightArrow />
                </button>
              </div>
              {showModal && (
                <div className="modal">
                  <span className="close" onClick={closeModal}>
                    &times;
                  </span>
                  <img src={selectedImage} alt="Full Size" />
                </div>
              )}
              <div style={{ overflowX: 'scroll', width: '628px' }}>
                <div className="block__img--allImg ">
                  {product &&
                    product.img.map(img => (
                      <img
                        key={img}
                        className={img === currentImageIndex && 'active'}
                        src={img}
                        alt="allProduct"
                        width="100"
                        onClick={switchToPreviousImage}
                      />
                    ))}
                </div>
              </div>
            </div>
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
                  <span className="block__info--price">
                    {product.price} грн
                  </span>
                </div>
                <Rating
                  name="simple-controlled"
                  value={value}
                  onChange={(_, newValue) => {
                    setValue(newValue);
                  }}
                />
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
                  <p style={{ fontSize: '16px', fontWeight: '600' }}>
                    Опис товару
                  </p>
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
                <div style={{ display: 'flex', gap: '28px' }}>
                  {buyPr ? (
                    <Link
                      to="/busket"
                      type="button"
                      className="formLogin__btn--pr"
                    >
                      У Кошик
                    </Link>
                  ) : (
                    <button
                      type="button"
                      className="formLogin__btn--pr"
                      onClick={buyProduct}
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
                    className="formLogin__btn--pr"
                    style={{
                      background: '#fff',
                      border: '1px solid #009C2C',
                      color: '#000',
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
                    <span style={{ color: '#000' }}>
                      <svg
                        width="21"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.0003 4.12207L10.9248 3.01657C8.40033 0.421573 3.77133 1.31707 2.10033 4.57957C1.31583 6.11407 1.13883 8.32957 2.57133 11.1571C3.95133 13.8796 6.82233 17.1406 12.0003 20.6926C17.1783 17.1406 20.0478 13.8796 21.4293 11.1571C22.8618 8.32807 22.6863 6.11407 21.9003 4.57957C20.2293 1.31707 15.6003 0.420073 13.0758 3.01507L12.0003 4.12207ZM12.0003 22.5001C-10.9992 7.30207 4.91883 -4.55993 11.7363 1.71457C11.8263 1.79707 11.9148 1.88257 12.0003 1.97107C12.085 1.88265 12.173 1.79759 12.2643 1.71607C19.0803 -4.56293 34.9998 7.30057 12.0003 22.5001Z"
                          fill="#2F2F37"
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
          </div>
        </div>
        <div
          style={{
            width: '100%',
            marginTop: '48px',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <div
            id="details"
            style={{
              maxWidth: '628px',
            }}
          >
            <p
              style={{
                fontSize: '24px',
                fontWeight: '500',
                marginBottom: '24px',
              }}
            >
              Характеристика
            </p>
            <p>{product.info.use}</p>
          </div>
          <div
            id="dostavka"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              padding: '24px',
              boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
            }}
          >
            <p
              style={{
                fontSize: '24px',
                fontWeight: '500',
              }}
            >
              Спосіб доставки
            </p>
            <div
              id="video"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              <p
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <span>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 7H17V9H20V16H18C17.7348 16 17.4804 16.1054 17.2929 16.2929C17.1054 16.4804 17 16.7348 17 17V18L14.6 16.2C14.4269 16.0702 14.2164 16 14 16H10V15.5L8.2 16.852C8.36095 17.1938 8.61545 17.4831 8.93401 17.6863C9.25257 17.8894 9.62217 17.9982 10 18H13.667L17.4 20.8C17.5731 20.9298 17.7836 21 18 21C18.2652 21 18.5196 20.8946 18.7071 20.7071C18.8946 20.5196 19 20.2652 19 20V18H20C20.5304 18 21.0391 17.7893 21.4142 17.4142C21.7893 17.0391 22 16.5304 22 16V9C22 8.46957 21.7893 7.96086 21.4142 7.58579C21.0391 7.21071 20.5304 7 20 7Z"
                      fill="#1F2A37"
                    />
                    <path
                      d="M6 17C5.73478 17 5.48043 16.8946 5.29289 16.7071C5.10536 16.5196 5 16.2652 5 16V14H4C3.46957 14 2.96086 13.7893 2.58579 13.4142C2.21071 13.0391 2 12.5304 2 12V5C2 4.46957 2.21071 3.96086 2.58579 3.58579C2.96086 3.21071 3.46957 3 4 3H14C14.5304 3 15.0391 3.21071 15.4142 3.58579C15.7893 3.96086 16 4.46957 16 5V12C16 12.5304 15.7893 13.0391 15.4142 13.4142C15.0391 13.7893 14.5304 14 14 14H10.333L6.6 16.8C6.4269 16.9298 6.21637 17 6 17ZM4 5V12H6C6.26522 12 6.51957 12.1054 6.70711 12.2929C6.89464 12.4804 7 12.7348 7 13V14L9.4 12.2C9.5731 12.0702 9.78363 12 10 12H14V5H4Z"
                      fill="#1F2A37"
                    />
                  </svg>
                </span>
                Самовивіз Безкоштовно
              </p>
              <p
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <span>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 7H17V9H20V16H18C17.7348 16 17.4804 16.1054 17.2929 16.2929C17.1054 16.4804 17 16.7348 17 17V18L14.6 16.2C14.4269 16.0702 14.2164 16 14 16H10V15.5L8.2 16.852C8.36095 17.1938 8.61545 17.4831 8.93401 17.6863C9.25257 17.8894 9.62217 17.9982 10 18H13.667L17.4 20.8C17.5731 20.9298 17.7836 21 18 21C18.2652 21 18.5196 20.8946 18.7071 20.7071C18.8946 20.5196 19 20.2652 19 20V18H20C20.5304 18 21.0391 17.7893 21.4142 17.4142C21.7893 17.0391 22 16.5304 22 16V9C22 8.46957 21.7893 7.96086 21.4142 7.58579C21.0391 7.21071 20.5304 7 20 7Z"
                      fill="#1F2A37"
                    />
                    <path
                      d="M6 17C5.73478 17 5.48043 16.8946 5.29289 16.7071C5.10536 16.5196 5 16.2652 5 16V14H4C3.46957 14 2.96086 13.7893 2.58579 13.4142C2.21071 13.0391 2 12.5304 2 12V5C2 4.46957 2.21071 3.96086 2.58579 3.58579C2.96086 3.21071 3.46957 3 4 3H14C14.5304 3 15.0391 3.21071 15.4142 3.58579C15.7893 3.96086 16 4.46957 16 5V12C16 12.5304 15.7893 13.0391 15.4142 13.4142C15.0391 13.7893 14.5304 14 14 14H10.333L6.6 16.8C6.4269 16.9298 6.21637 17 6 17ZM4 5V12H6C6.26522 12 6.51957 12.1054 6.70711 12.2929C6.89464 12.4804 7 12.7348 7 13V14L9.4 12.2C9.5731 12.0702 9.78363 12 10 12H14V5H4Z"
                      fill="#1F2A37"
                    />
                  </svg>
                </span>
                Доставка до поштоматів «Нової Пошти» від 89 ₴
              </p>
              <p
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <span>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 7H17V9H20V16H18C17.7348 16 17.4804 16.1054 17.2929 16.2929C17.1054 16.4804 17 16.7348 17 17V18L14.6 16.2C14.4269 16.0702 14.2164 16 14 16H10V15.5L8.2 16.852C8.36095 17.1938 8.61545 17.4831 8.93401 17.6863C9.25257 17.8894 9.62217 17.9982 10 18H13.667L17.4 20.8C17.5731 20.9298 17.7836 21 18 21C18.2652 21 18.5196 20.8946 18.7071 20.7071C18.8946 20.5196 19 20.2652 19 20V18H20C20.5304 18 21.0391 17.7893 21.4142 17.4142C21.7893 17.0391 22 16.5304 22 16V9C22 8.46957 21.7893 7.96086 21.4142 7.58579C21.0391 7.21071 20.5304 7 20 7Z"
                      fill="#1F2A37"
                    />
                    <path
                      d="M6 17C5.73478 17 5.48043 16.8946 5.29289 16.7071C5.10536 16.5196 5 16.2652 5 16V14H4C3.46957 14 2.96086 13.7893 2.58579 13.4142C2.21071 13.0391 2 12.5304 2 12V5C2 4.46957 2.21071 3.96086 2.58579 3.58579C2.96086 3.21071 3.46957 3 4 3H14C14.5304 3 15.0391 3.21071 15.4142 3.58579C15.7893 3.96086 16 4.46957 16 5V12C16 12.5304 15.7893 13.0391 15.4142 13.4142C15.0391 13.7893 14.5304 14 14 14H10.333L6.6 16.8C6.4269 16.9298 6.21637 17 6 17ZM4 5V12H6C6.26522 12 6.51957 12.1054 6.70711 12.2929C6.89464 12.4804 7 12.7348 7 13V14L9.4 12.2C9.5731 12.0702 9.78363 12 10 12H14V5H4Z"
                      fill="#1F2A37"
                    />
                  </svg>
                </span>
                Доставка у зручний вам пункт «Нової Пошти» від 99 ₴
              </p>
            </div>
            <p
              style={{
                fontSize: '24px',
                fontWeight: '500',
              }}
            >
              Оплата
            </p>
            <p>Готівкою, банківською карткою</p>
          </div>
        </div>
        {product && product.video && (
          <div style={{ margin: '64px 0' }}>
            <p style={{ fontSize: '24px', fontWeight: '500' }}>Відео</p>
            <div
              className="video_container"
              style={{ marginTop: '40px', background: 'none' }}
            >
              <div className="con3">
                <iframe
                  width="846"
                  height="489"
                  src={product.video}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        )}
        <div
          id="rev"
          style={{
            width: '100%',
            padding: '24px',
            border: '1px solid #009C2C',
            borderRadius: '8px',
            margin: '48px 0',
          }}
        >
          <p style={{ fontSize: '24px', fontWeight: '500px' }}>
            Відгуки покупців
          </p>
          <ul
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              margin: '24px 0',
            }}
          >
            <li>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p
                  style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    marginBottom: '8px',
                  }}
                >
                  User Name
                </p>
                <span style={{ color: '#939292', fontSize: '12px' }}>
                  2 дні тому
                </span>
              </div>
              <Rating
                name="simple-controlled"
                value={value}
                onChange={(_, newValue) => {
                  setValue(newValue);
                }}
              />
              <p
                style={{
                  fontSize: '16px',
                  fontWeight: '400px',
                  margin: '16px 0',
                }}
              >
                Homey atmosphere, comfortable rooms. Ideal for a simple stay.!
              </p>
              <button style={{ fontSize: '16px', textAlign: 'center' }}>
                <TiMessages /> Відповісти <BiDownArrow />
              </button>
            </li>
          </ul>
          <button
            className="formLogin__btn--pr"
            style={{
              background: '#fff',
              border: '1px solid #009C2C',
              color: '#000',
              marginRight: 'auto',
              marginLeft: 'auto',
            }}
          >
            <span style={{ color: '#000' }}></span>
            Більше
          </button>
        </div>
      </div>
    )
  );
};

export default BuyProduct;
