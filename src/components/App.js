import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import RegisterPage from 'pages/registerPages/registerPage';
import MainPages from 'pages/mainPage/mainPage';
import BuyProduct, { Application, Dital, Obm } from './buyProduct/buyProduct';
import CatalogeProduct from 'pages/catalogePage/catalogeProduct';
import Busket from 'pages/busket/busket';
import { useState } from 'react';
import BuyModalSuc from '../pages/buysuccess/buySuc';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUser, fetchProductUser } from 'redux/operations';
import { getAuthStatus, getFetching } from 'redux/authPer/auth-selector';
import { Circles } from 'react-loader-spinner';
import Favorite from 'pages/favoriteProduct/favorite';
import Profile from 'pages/myprofile/userprofile';
import History from './settings/history';
import MyStore from './settings/mystore';

function App() {
  const dispatch = useDispatch();
  const isLogIn = useSelector(getAuthStatus);
  const isFetching = useSelector(getFetching);

  // Пропси з описом для передачі в продукти
  const [info, setInfo] = useState();

  const saveInfo = info => {
    setInfo(info);
  };

  useEffect(() => {
    dispatch(fetchCurrentUser());
    if (isLogIn) {
      dispatch(fetchProductUser());
    }
  }, [dispatch, isLogIn]);

  return isFetching ? (
    <Circles
      height="80"
      width="80"
      color="#4fa94d"
      ariaLabel="circles-loading"
      wrapperStyle={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '25%',
      }}
      wrapperClass=""
      visible={true}
    />
  ) : (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPages />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="productBY" element={<CatalogeProduct />} />
          <Route path="productNEW" element={<CatalogeProduct />} />
          <Route path="busket" element={<Busket />} />
          <Route path="myorder" element={<BuyModalSuc />} />
          <Route path="favorite" element={<Favorite />} />
          <Route path="profile" element={<Profile />}>
            <Route path="store" element={<MyStore />} />
            <Route path="history" element={<History />} />
            <Route path="favorite" element={<Favorite />} />
            <Route path="settings" element={<p>settings</p>} />
          </Route>
          <Route
            path="product/:id"
            element={<BuyProduct saveInfo={saveInfo} />}
          >
            <Route path="" element={<Dital info={info} />} />
            <Route path="application" element={<Application info={info} />} />
            <Route path="obm" element={<Obm info={info} />} />
          </Route>
        </Route>
        <Route path="*" element={<p>404 not found</p>} />
      </Routes>
    </div>
  );
}

export default App;
