import { Suspense } from 'react';
import NavigateCategory from './categoryMainTop/navCategory';
import Footer from './footer/footer';
// import Header from './header/header'

import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="bgMain">
      {/* <Header /> */}
      <NavigateCategory />
      <Suspense>
        <Outlet />
      </Suspense>
      <Footer />
    </div>
  );
};

export default Layout;
