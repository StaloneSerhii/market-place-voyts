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
import { getAuthStatus } from 'redux/authPer/auth-selector';

function App() {
  const dispatch = useDispatch();
  const isLogIn = useSelector(getAuthStatus);
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

  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPages />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="productBY" element={<CatalogeProduct />} />
          <Route path="productNEW" element={<CatalogeProduct />} />
          <Route path="busket" element={<Busket />} />
          <Route path="myorder" element={<BuyModalSuc />} />
          <Route
            path="product/:id"
            element={<BuyProduct saveInfo={saveInfo} />}
          >
            <Route path="dital" element={<Dital info={info} />} />
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
