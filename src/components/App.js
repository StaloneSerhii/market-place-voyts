import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import RegisterPage from 'pages/registerPages/registerPage';
import MainPages from 'pages/mainPage/mainPage';
import BuyProduct from './buyProduct/buyProduct';
import CatalogeProduct from 'pages/catalogePage/catalogeProduct';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPages />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="product" element={<CatalogeProduct />} />
          <Route path="product/:id" element={<BuyProduct />} />
        </Route>
        <Route path="*" element={<p>404 not found</p>} />
      </Routes>
    </div>
  );
}

export default App;
