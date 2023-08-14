import { Link } from 'react-router-dom';
import test from '../../image/testBuy.jpg';
import { SlBasketLoaded } from 'react-icons/sl';

const CatalogeProduct = () => {
  return (
    <div style={{ backgroundColor: '#fff' }}>
      <div>
        <h2 className="cataloge__title">Б/У Запчастини</h2>
        <div>
          <div className="block__filter">
            <input type="text" placeholder="Пошук" />
            <div className="line"></div>
            <select id="size" name="size">
              <option value="xs" selected>
                Від дешевих до дорогих
              </option>
              <option value="s">Від дорогих до дешевих</option>
              <option value="m">За рейтингом</option>
            </select>
          </div>
          <ul className="product__container">
            <li>
              <Link to="1" className="product__block">
                <img src={test} alt="sell" width="200px" />
                <div className="product__block--text">
                  <span className="product__block--span">A-re4235</span>
                  <p>Electrik drive</p>
                  <div>
                    <span>3000.00 грн</span>
                    <button className="product__block--btn">
                      <SlBasketLoaded />
                    </button>
                  </div>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default CatalogeProduct;
