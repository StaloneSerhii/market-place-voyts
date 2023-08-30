import { Link, useLocation } from 'react-router-dom';
import test from '../../image/testBuy.jpg';
import { SlBasketLoaded } from 'react-icons/sl';
import { useEffect, useState } from 'react';
import { postBuyProductBY, postBuyProductNew } from 'redux/service';

const CatalogeProduct = () => {
  const [listPr, setListPr] = useState([]);
  const navigate = useLocation();

  useEffect(() => {
    if (navigate.pathname === '/productBY') {
      postBuyProductBY().then(state => setListPr(state));
    } else if (navigate.pathname === '/productNEW') {
      postBuyProductNew().then(state => setListPr(state));
    }
  }, [navigate.pathname]);

  return (
    <div style={{ backgroundColor: '#fff' }}>
      <div>
        <h2 className="cataloge__title">
          {navigate.pathname === '/productBY'
            ? ' Б/У Запчастини'
            : ' Нові запчастини'}
        </h2>
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
            {listPr.length > 0 ? (
              listPr.map(list => (
                <li key={list._id}>
                  <div className="product__block">
                    <Link to={`/product/${list._id}`}>
                      <img src={test} alt="sell" width="200px" />
                    </Link>
                    <div className="product__block--text">
                      <span className="product__block--span">{list.ark}</span>
                      <p>{list.name}</p>
                      <div>
                        <span>{list.price} грн</span>
                        <button className="product__block--btn">
                          <SlBasketLoaded />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <div>load</div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default CatalogeProduct;
