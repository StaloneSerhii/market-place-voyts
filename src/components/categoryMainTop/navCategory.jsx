import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BiSolidUser } from 'react-icons/bi';
import { CgEnter } from 'react-icons/cg';
import { SlBasketLoaded } from 'react-icons/sl';
import { useSelector } from 'react-redux';
import { getAuthStatus } from 'redux/authPer/auth-selector';
import {
  getFavoriteProductLocalStorage,
  getFavoriteProductLocalStorageAuth,
  getProductLocalStorage,
  getProductLocalStorageNotAuth,
} from 'redux/selector';
import { AiOutlineHeart } from 'react-icons/ai';
import { RxHamburgerMenu } from 'react-icons/rx';
import NestedModal from './modalLogin';
import { Button, Drawer } from '@mui/material';
import ListBurger from './listBurger';

const NavigateCategory = () => {
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const select = useSelector(getProductLocalStorage);
  const selectAuth = useSelector(getAuthStatus);
  const productNotAuth = useSelector(getProductLocalStorageNotAuth);
  const productFavoriteNotAuth = useSelector(
    getFavoriteProductLocalStorageAuth
  );
  const productFavorite = useSelector(getFavoriteProductLocalStorage);
  const location = useLocation();
  const [locationSrc, setLocationSrc] = useState(false);
  const [state, setState] = useState({
    left: false,
  });

  useEffect(() => {
    if (location.pathname !== locationSrc) {
      setState({ ...state, left: false });
    }
    setLocationSrc(location.pathname);
  }, [location.pathname, locationSrc, state]);

  useEffect(() => {
    const handleClickOutside = event => {
      if (
        openMenu &&
        !event.target.closest('.login') &&
        !event.target.closest('.formLogin')
      ) {
        setOpenMenu(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [openMenu]);

  const toggleDrawer = (anchor, open) => event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  return (
    <div style={{ background: '#191919' }}>
      <nav className="navigate">
        <div className="burgerHidden">
          <Button onClick={toggleDrawer('left', true)}>
            <RxHamburgerMenu style={{ fontSize: '25px', color: '#fff' }} />
          </Button>
          <Drawer
            className="burger"
            anchor={'left'}
            open={state['left']}
            onClose={toggleDrawer('left', false)}
          >
            <ListBurger anchor={'left'} setOpen={setOpen} />
          </Drawer>
        </div>
        <Link to="/">
          <svg
            width="42"
            height="32"
            viewBox="0 0 42 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="Group 2360">
              <path
                id="Z"
                d="M0.277594 32V29.1875L25.8163 3.4375H0V0H32.6636V2.8125L7.12492 28.5625H36.6471V32H0.277594Z"
                fill="#009C2C"
              />
              <path
                id="A"
                d="M15.2353 27.5862H9.88232L36.2353 0L41.1764 0.551724L42 32H37.8823L37.4706 4.13793L15.2353 27.5862ZM28 14.8966H38.2941V18.7586H24.7059L28 14.8966Z"
                fill="#009C2C"
              />
            </g>
          </svg>
        </Link>
        <ul className="navigate__list">
          <li className="navigate__item">
            <Link className="navigate__link " to="/">
              Головна
            </Link>
          </li>
          <li className="navigate__item">
            <Link to="productAll/new" className="navigate__link">
              Запчастини
            </Link>
          </li>
          <li className="navigate__item">
            <Link className="navigate__link" to="find">
              Знайдемо запчастину
            </Link>
          </li>
          <li className="navigate__item">
            <Link className="navigate__link" to="video">
              Відео
            </Link>
          </li>
        </ul>
        <ul className="navigate--social">
          <li>
            {selectAuth ? (
              <Link to="profile/settings">
                <BiSolidUser className="svg__main" />
              </Link>
            ) : (
              <>
                <div
                  className={openMenu ? 'login yellow' : 'login'}
                  onClick={() => setOpen(true)}
                >
                  <CgEnter />
                  <span>Особистий кабінет</span>
                </div>
                <NestedModal
                  setOpen={setOpen}
                  open={open}
                  openMenu={openMenu}
                />
              </>
            )}
          </li>
          <li>
            <Link className="categoty__basket" to="/busket">
              <div className="categoty__basket--num">
                {(select && select.length) ||
                  (productNotAuth && !selectAuth && productNotAuth.length) ||
                  0}
              </div>
              <SlBasketLoaded />
            </Link>
          </li>
          <li>
            <Link
              className="categoty__basket"
              to={!selectAuth ? '/favorite' : '/profile/favorite'}
            >
              <div className="categoty__basket--num">
                {(productFavorite && selectAuth && productFavorite.length) ||
                  (productFavoriteNotAuth &&
                    !selectAuth &&
                    productFavoriteNotAuth.length) ||
                  0}
              </div>
              <AiOutlineHeart />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavigateCategory;
