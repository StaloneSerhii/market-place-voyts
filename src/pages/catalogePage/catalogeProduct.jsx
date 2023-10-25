import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  postBuyProductBY,
  postBuyProductNew,
  postBuyProductSg,
  postBuyProductSgTech,
} from 'redux/service';
import { useSelector } from 'react-redux';
import { getAuthStatus } from 'redux/authPer/auth-selector';
import {
  getProductLocalStorage,
  getProductLocalStorageNotAuth,
} from 'redux/selector';
import { Circles } from 'react-loader-spinner';
import { BsFillBasketFill, BsSearch } from 'react-icons/bs';
import { Autocomplete, TextField } from '@mui/material';

const CatalogeProduct = () => {
  const navigate = useLocation();
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
          <Link
            to={`/product/${list._id}`}
            subcategory={'test'}
            className="card-cataloge__btn"
          >
            Купити
          </Link>
        );
      }
      return (
        <Link to="/busket" className="card-cataloge__btn">
          <BsFillBasketFill />У кошик
        </Link>
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
          <Link to="/busket" className="card-cataloge__btn">
            <BsFillBasketFill />У кошик
          </Link>
        );
      }
    }
    return (
      <Link
        to={`/product/${list._id}`}
        subcategory={'test'}
        className="card-cataloge__btn"
      >
        Купити
      </Link>
    );
  };

  // Запит / Запит для сортування по категорії / Пошук по слову

  useEffect(() => {
    if (navigate.pathname === '/productAll/by') {
      postBuyProductBY(filterSort, findWord).then(state => setListPr(state));
    } else if (navigate.pathname === '/productAll/new') {
      postBuyProductNew(filterSort, findWord).then(state => setListPr(state));
    } else if (navigate.pathname === '/sg') {
      postBuyProductSg(filterSort, findWord).then(state => setListPr(state));
    } else if (navigate.pathname === '/sgtech') {
      postBuyProductSgTech(filterSort, findWord).then(state =>
        setListPr(state)
      );
    }
  }, [filterSort, navigate.pathname, findWord]);

  const options = [
    { label: 'Від дешевих', id: 'chep' },
    { label: 'Від дорогих', id: 'expensive' },
    { label: 'Остані додані', id: 'last' },
  ];

  return (
    <div style={{ width: '100%' }}>
      <div className="block__filter">
        <div style={{ position: 'relative' }}>
          <TextField
            sx={{ width: '460px' }}
            value={findWord}
            id="outlined-basic"
            variant="outlined"
            defaultValue={options[0]}
            type="text"
            placeholder="Пошук"
            onChange={(e, _) => setFindWord(e.target.value)}
          />
          <BsSearch
            style={{ position: 'absolute', right: '15px', top: '20px' }}
          />
        </div>
        <Autocomplete
          disablePortal
          onChange={(_, newVall) => {
            setFilterSort(newVall.id);
          }}
          id="combo-box-demo"
          options={options}
          sx={{ width: 300 }}
          renderInput={params => <TextField {...params} label="Сортувати" />}
        />
      </div>
      <ul className="cataloge__gap">
        {listPr.length > 0 ? (
          listPr.map(list => (
            <li key={list._id}>
              <div
                state={list._id}
                style={{
                  cursor: 'default',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <img
                  src={list.img && list.img[0]}
                  alt="img-buy"
                  className="card-cataloge__img"
                />
                <p className="card-cataloge__p">{list.name}</p>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    margin: '24px 0',
                  }}
                >
                  <p className="card-cataloge__span">
                    {list.price} грн
                    <span>В наявності</span>
                  </p>
                  {svgImg(list)}
                </div>
                <Link
                  to={`/product/${list._id}`}
                  style={{
                    fontSize: '14px',
                    color: '#585858',
                    margin: '0 auto',
                    display: 'flex',
                  }}
                >
                  Детальна інформація
                </Link>
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
  );
};
export default CatalogeProduct;
