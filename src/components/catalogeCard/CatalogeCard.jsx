import buyTest from '../../image/testBuy.jpg';
import { AiOutlineHeart } from 'react-icons/ai';
import { BsFillBasketFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const CatalogeCard = () => {
  return (
    <div className="card-catalog">
      <div className="sell">
        <div className="beffore__sell">
          <span>Топ продажів</span>
        </div>
        <div className="beffore__select">
          <button>
            <AiOutlineHeart />
          </button>
        </div>
      </div>
      <Link to='product/1' className="card-catalog__link">
        <img src={buyTest} alt="img-buy" className="card-cataloge__img" />
        <p className="card-cataloge__p">Тяга МТЗ навески правая "вир-во МТЗ"</p>
        <p className="card-cataloge__span">
          998,00 <span>грн</span>
        </p>
      </Link>
      <Link to='product/1' className="card-cataloge__btn">
        <BsFillBasketFill /> Купити
      </Link>
    </div>
  );
};

export default CatalogeCard;
