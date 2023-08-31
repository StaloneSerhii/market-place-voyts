import { AiOutlineHeart } from 'react-icons/ai';
import { BsFillBasketFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const TopSell = ({ id, price, img, name }) => {
  return (
    <div className="card-catalog">
      <div className="sell">
        <div className="beffore__sell">
          <span>Хіти продажу</span>
        </div>
        <div className="beffore__select">
          <button>
            <AiOutlineHeart />
          </button>
        </div>
      </div>
      <Link to={`/product/${id}`} className="card-catalog__link">
        <img src={img} alt="img-buy" className="card-cataloge__img" />
        <p className="card-cataloge__p">{name}</p>
        <p className="card-cataloge__span">
          {price} <span>грн</span>
        </p>
      </Link>
      <button className="card-cataloge__btn">
        <BsFillBasketFill /> Купити
      </button>
    </div>
  );
};
export default TopSell;
