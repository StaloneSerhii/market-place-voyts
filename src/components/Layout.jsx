import { Suspense } from 'react';
import NavigateCategory from './categoryMainTop/navCategory';
import Footer from './footer/footer';
// import Header from './header/header'

import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      {/* <Header /> */}
      <NavigateCategory />
      <Suspense>
        <Outlet />
      </Suspense>
      <Footer />
    </>
  );
};

export default Layout;
