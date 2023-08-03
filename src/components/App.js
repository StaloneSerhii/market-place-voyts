import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import RegisterPage from 'pages/registerPages/registerPage';
import MainPages from 'pages/mainPage/mainPage';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPages />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
