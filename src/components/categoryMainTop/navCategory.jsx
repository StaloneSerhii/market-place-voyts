import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
import NestedModal from './modalLogin';

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

  const handleOpen = () => {
    setOpen(true);
  };
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

  return (
    <div style={{ background: '#191919' }}>
      <nav className="navigate">
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
                  onClick={handleOpen}
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
            <Link className="categoty__basket" to="/favorite">
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
