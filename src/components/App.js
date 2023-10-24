import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import { Application, Dital, Obm } from './buyProduct/buyProduct';
import { useState } from 'react';
import { useEffect, Suspense, lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUser, fetchProductUser } from 'redux/operations';
import { getAuthStatus, getFetching } from 'redux/authPer/auth-selector';
import { Circles } from 'react-loader-spinner';
import { PrivateRoute } from 'redux/privateRoute';
import { AdmRoute } from 'redux/admRoute';
import AddProduct from './adm/addProduct/addProduct';
import ProductList from './adm/addProduct/productList';
import SellProduct from './adm/addProduct/sellProduct';
import { RestrictedRoute } from 'redux/restrikedRoute';
import Filter from './filterProduct/FilterProduct';

const BuyProduct = lazy(() => import('./buyProduct/buyProduct'));
const RegisterPage = lazy(() => import('pages/registerPages/registerPage'));
const BuyModalSuc = lazy(() => import('../pages/buysuccess/buySuc'));
const Favorite = lazy(() => import('pages/favoriteProduct/favorite'));
const Profile = lazy(() => import('pages/myprofile/userprofile'));
const History = lazy(() => import('./settings/history'));
const MyStore = lazy(() => import('./settings/mystore'));
const SerringProfile = lazy(() => import('./settings/settingUser'));
const MainPages = lazy(() => import('pages/mainPage/mainPage'));
const AdminPage = lazy(() => import('pages/adm/adminPane'));
const CatalogeProduct = lazy(() =>
  import('pages/catalogePage/catalogeProduct')
);
const Busket = lazy(() => import('pages/busket/busket'));

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
      <Suspense>
        <Routes>
          <Route
            path="adm"
            element={<AdmRoute redirectTo="/" component={<AdminPage />} />}
          >
            <Route path="product" element={<AddProduct />} />
            <Route path="allProduct" element={<ProductList />} />
            <Route path="buyPr" element={<SellProduct />} />
            <Route path="product/:id" element={<AddProduct />} />
          </Route>
          <Route path="/" element={<Layout />}>
            <Route index element={<MainPages />} />
            <Route
              path="register"
              element={
                <RestrictedRoute redirectTo="/" component={<RegisterPage />} />
              }
            />
            <Route path="productAll" element={<Filter />}>
              <Route path="by" element={<CatalogeProduct />} />
              <Route path="new" element={<CatalogeProduct />} />
              <Route path="sg" element={<CatalogeProduct />} />
              <Route path="sgtech" element={<CatalogeProduct />} />
            </Route>
            <Route path="busket" element={<Busket />} />
            <Route path="myorder" element={<BuyModalSuc />} />
            <Route path="favorite" element={<Favorite />} />
            <Route
              path="profile"
              element={
                <PrivateRoute redirectTo="/register" component={<Profile />} />
              }
            >
              <Route path="store" element={<MyStore />} />
              <Route path="history" element={<History />} />
              <Route path="favorite" element={<Favorite />} />
              <Route path="settings" element={<SerringProfile />} />
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
      </Suspense>
    </div>
  );
}

export default App;
