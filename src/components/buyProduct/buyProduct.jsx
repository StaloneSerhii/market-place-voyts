import { FcCallback } from 'react-icons/fc';
import test from '../../image/testBuy.jpg';
import { Link } from 'react-router-dom';

const BuyProduct = () => {
  return (
    <div className="content__product">
      <div>
        <div>
          <img src="/" alt="/" />
          <form>
            <label htmlFor="">
              <h3>Знайдемо потрібну запчастину</h3>
              <input type="text" placeholder="Номер або назва запчастини" />
            </label>
            <label htmlFor="">
              <input type="tel" placeholder="Телефон" />
            </label>
            <button>Надіслати запит</button>
          </form>
        </div>
      </div>
      <div>
        <h3 className="name__product">
          Назва запчастини... хрестовина з головками 4324-234-324 бла бла бла
        </h3>
        <div className="block__info">
          <div className="block__info--item">
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
            <button type="button" className="formLogin__btn">
              Купити
            </button>
          </div>
          <div className="block__infoCenter">
            <p> {<FcCallback />} Отримати консультацію</p>
            <span>+38(67)000-00-00</span>
            <button className="formLogin__btn">Задати питання</button>
          </div>
        </div>
        <div className="block__analog">
          <h4>Аналоги</h4>
          <Link to="product/2" className="block__analog--info">
            <img src={test} alt="/" width="70px" />
            <p>Назва запчастини... хрестовина з головками 4324</p>
            <p className="price">6805.90 грн</p>
          </Link>
        </div>
        <div className="info__btn">
          <button className="info__btn--details active__btn">Опис</button>
          <button className="info__btn--details">Застосування</button>
          <button className="info__btn--details">ОБМ номер</button>
        </div>
      </div>
    </div>
  );
};

export default BuyProduct;
