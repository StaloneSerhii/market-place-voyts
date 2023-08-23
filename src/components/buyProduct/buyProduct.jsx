import { FcCallback } from 'react-icons/fc';
import test from '../../image/testBuy.jpg';
import { Link, Outlet, useHref } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import BuyBusketModal from 'components/modalBuy/about/buyBusket';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { counterSum } from 'redux/slice';

const BuyProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();
  const selector = useHref();

  const buyProduct = event => {
    setIsModalOpen(true);
    dispatch(
      counterSum({
        name: 'basdllasd',
        id: 131,
        code: 53,
        price: 3999.53,
        counter: 1,
      })
    );
  };
  return (
    <div className="content__product">
      <div>
        <div className="block__img">
          <img src={test} alt="product" width="400" />
          <div className="block__img--allImg">
            <FiChevronLeft />
            <img src={test} alt="allProduct" width="100" />
            <FiChevronRight />
          </div>
          <form className="formFind">
            <h3>Знайдемо потрібну запчастину:</h3>
            <label htmlFor="">
              <input type="text" placeholder="Номер або назва запчастини" />
            </label>
            <label htmlFor="">
              <input type="tel" placeholder="Телефон" />
            </label>
            <button className="formLogin__btn postBtn" type="submit">
              Надіслати запит <FiChevronRight />
            </button>
          </form>
        </div>
      </div>
      <div>
        <h3 className="name__product">
          Назва запчастини... хрестовина з головками 4324-234-324 бла бла бла
        </h3>
        <div className="block__info" id="app-root">
          <form className="block__info--item">
            <p>
              Код: <span>123132</span>
            </p>
            <p>
              Артикул: <span>cr234</span>
            </p>
            <p>
              Виробник: <span>Della Concerda</span>
            </p>
            <p className="block__info--on">В наявності</p>
            <span className="block__info--price">3999.00 грн</span>
            <button
              type="button"
              className="formLogin__btn"
              onClick={buyProduct}
            >
              Купити
            </button>

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
            <img src={test} alt="/" width="70px" />
            <p>Назва запчастини... хрестовина з головками 4324</p>
            <p className="price">6805.90 грн</p>
          </Link>
        </div>
        <div className="info__btn">
          <Link
            to="dital"
            className={
              selector === '/market-place-voyts/product/1/dital'
                ? 'info__btn--details active__btn'
                : 'info__btn--details'
            }
          >
            Опис
          </Link>
          <Link
            to="application"
            className={
              selector === '/market-place-voyts/product/1/application'
                ? 'info__btn--details active__btn'
                : 'info__btn--details'
            }
          >
            Застосування
          </Link>
          <Link
            to="obm"
            className={
              selector === '/market-place-voyts/product/1/obm'
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
  );
};

export default BuyProduct;

export const Application = () => {
  return <p>Застосовуються в мтз</p>;
};

export const Obm = () => {
  return <p>316546465</p>;
};

export const Dital = () => {
  return <p>Цей товар є найс і застосовується скрізь в мтз</p>;
};
