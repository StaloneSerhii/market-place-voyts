import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import { useState } from 'react';
import { useEffect, Suspense, lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUser, fetchProductUser } from 'redux/operations';
import { getAuthStatus } from 'redux/authPer/auth-selector';
import { PrivateRoute } from 'redux/privateRoute';
import { AdmRoute } from 'redux/admRoute';
import AddProduct from './adm/addProduct/addProduct';
import ProductList from './adm/addProduct/productList';
import SellProduct from './adm/addProduct/sellProduct';
import Filter from './filterProduct/FilterProduct';
import FindComponentPage from 'pages/findComponentPage/findComponentPage';
import VideoPage from 'pages/videoContent/videoPage';

const BuyProduct = lazy(() => import('./buyProduct/buyProduct'));
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
  const [filter, setFilter] = useState(null);
  useEffect(() => {
    dispatch(fetchCurrentUser());
    if (isLogIn) {
      dispatch(fetchProductUser());
    }
  }, [dispatch, isLogIn]);

  return (
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
            {/* <Route
              path="register"
              element={
                <RestrictedRoute redirectTo="/" component={<RegisterPage />} />
              }
            /> */}
            <Route path="productAll" element={<Filter filter={setFilter} />}>
              <Route path="by" element={<CatalogeProduct filter={filter} />} />
              <Route path="new" element={<CatalogeProduct filter={filter} />} />
              <Route
                path="sgtech"
                element={<CatalogeProduct filter={filter} />}
              />
            </Route>
            <Route path="video" element={<VideoPage filter={filter} />} />
            <Route path="find" element={<FindComponentPage />} />
            <Route path="busket" element={<Busket />} />
            <Route path="myorder" element={<BuyModalSuc />} />
            <Route path="favorite" element={<Favorite />} />
            <Route
              path="profile"
              element={<PrivateRoute redirectTo="/" component={<Profile />} />}
            >
              <Route path="store" element={<MyStore />} />
              <Route path="history" element={<History />} />
              <Route path="settings" element={<SerringProfile />} />
              <Route path="favorite" element={<Favorite />} />
            </Route>
            <Route path="favorite" element={<Favorite />} />
            <Route path="product/:id" element={<BuyProduct />} />
          </Route>
          <Route path="*" element={<p>404 not found</p>} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
