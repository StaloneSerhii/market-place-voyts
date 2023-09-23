import { Link, useLocation } from 'react-router-dom';
import test from '../../image/testBuy.jpg';
import { SlBasketLoaded } from 'react-icons/sl';
import { MdOutlineAttachMoney } from 'react-icons/md';

import { useEffect, useState } from 'react';
import { postBuyProductBY, postBuyProductNew, postBuyProductSg, postBuyProductSgTech } from 'redux/service';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthStatus } from 'redux/authPer/auth-selector';
import { addProductBusketAuth } from 'redux/operations';
import { addProductOrder } from 'redux/buyProduct-slice';
import {
  getProductLocalStorage,
  getProductLocalStorageNotAuth,
} from 'redux/selector';
import { Circles } from 'react-loader-spinner';
import { debounce } from 'hooks/useHooks';

const CatalogeProduct = () => {
  const navigate = useLocation();
  const dispatch = useDispatch();
  const [listPr, setListPr] = useState([]);
  const [findWord, setFindWord] = useState('');
  const [filterSort, setFilterSort] = useState('last');
  const selectAuth = useSelector(getAuthStatus);
  const productBuyAuth = useSelector(getProductLocalStorage);
  const productNotAuth = useSelector(getProductLocalStorageNotAuth);

  const svgImg = list => {
    if (selectAuth && listPr && productBuyAuth && productBuyAuth.length > 0) {
      const buyingTrue = productBuyAuth.find(pr => pr.code === list.code);
      if (buyingTrue) {
        return (
          <Link to="/busket" type="button" className="product__block--btn">
            <SlBasketLoaded />
          </Link>
        );
      }
      return (
        <button
          className="product__block--btn"
          onClick={() => buyProduct(list)}
        >
          <MdOutlineAttachMoney />
        </button>
      );
    } else if (
      !selectAuth &&
      listPr &&
      productNotAuth &&
      productNotAuth.length > 0
    ) {
      const buyingTrue = productNotAuth.find(pr => pr.code === list.code);
      if (buyingTrue) {
        return (
          <Link to="/busket" type="button" className="product__block--btn">
            <SlBasketLoaded />
          </Link>
        );
      }
    }
    return (
      <button className="product__block--btn" onClick={() => buyProduct(list)}>
        <MdOutlineAttachMoney />
      </button>
    );
  };

  // Запит / Запит для сортування по категорії / Пошук по слову

  useEffect(() => {
    if (navigate.pathname === '/productBY') {
      postBuyProductBY(filterSort, findWord).then(state => setListPr(state));
    } else if (navigate.pathname === '/productNEW') {
      postBuyProductNew(filterSort, findWord).then(state => setListPr(state));
    } else if (navigate.pathname === '/sg') {
      postBuyProductSg(filterSort, findWord).then(state => setListPr(state));
    } else if (navigate.pathname === '/sgtech') {
      postBuyProductSgTech(filterSort, findWord).then(state => setListPr(state));
    } 
  }, [filterSort, navigate.pathname, findWord]);

  const buyProduct = list => {
    const { _id, updatedAt, createdAt, ...obj } = list;
    if (selectAuth) {
      dispatch(addProductBusketAuth({ ...obj, count: 1, id: _id }));
    } else {
      dispatch(addProductOrder({ ...obj, count: 1, id: _id }));
    }
  };

  const filterSortFind = e => {
    setFilterSort(e.target.value);
  };

  const findToWord = debounce(value => {
    setFindWord(value.target.value);
  }, 800);
  const titleMap = {
    '/productBY': 'Б/У Запчастини',
    '/productNEW': 'Нові запчастини',
    '/sg': 'СГ Навісне',
    '/sgtech': 'СГ Техніка',
  };
  return (
    <div style={{ backgroundColor: '#fff' }}>
      <div>
        <h2 className="cataloge__title">
        {titleMap[navigate.pathname] || ''}
        </h2>
        <div>
          <div className="block__filter">
            <input type="text" placeholder="Пошук" onChange={findToWord} />
            <div className="line"></div>
            <select id="size" name="size" onChange={filterSortFind}>
              <option value="last" select="true">
                Остані додані
              </option>
              <option value="expensive">Від дорогих до дешевих</option>
              <option value="cheap">Від дешевих до дорогих</option>
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
                        <span className='product__block--spanPrice'>{list.price} грн</span>
                        {svgImg(list)}
                      </div>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <Circles
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="circles-loading"
                wrapperStyle={{
                  display: 'flex',
                  justifyContent: 'center',
                  width: '100%',
                }}
                wrapperClass=""
                visible={true}
              />
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default CatalogeProduct;
