import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ImFacebook2, ImInstagram } from 'react-icons/im';
import { BiSolidUser } from 'react-icons/bi';
import { SiTiktok } from 'react-icons/si';
import { TfiYoutube } from 'react-icons/tfi';
import { MdArrowDropDown } from 'react-icons/md';
import { CgEnter } from 'react-icons/cg';
import { SlBasketLoaded } from 'react-icons/sl';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthStatus } from 'redux/authPer/auth-selector';
import { logIn, logOut } from 'redux/operations';
import {
  getFavoriteProductLocalStorage,
  getFavoriteProductLocalStorageAuth,
  getProductLocalStorage,
  getProductLocalStorageNotAuth,
} from 'redux/selector';
import { resendPass } from 'redux/service';
import Notiflix from 'notiflix';
import { AiOutlineHeart } from 'react-icons/ai';

const NavigateCategory = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState();
  const [password, setPass] = useState();
  const [openMenu, setOpenMenu] = useState(false);
  const select = useSelector(getProductLocalStorage);
  const selectAuth = useSelector(getAuthStatus);
  const productNotAuth = useSelector(getProductLocalStorageNotAuth);
  const productFavoriteNotAuth = useSelector(
    getFavoriteProductLocalStorageAuth
  );
  const productFavorite = useSelector(getFavoriteProductLocalStorage);
  const menuOpen = () => {
    return setOpenMenu(true);
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

  const onLogin = () => {
    dispatch(logIn({ email, password }));
  };

  return (
    <nav className="navigate">
      <ul className="navigate__list">
        <li className="navigate__item">
          <Link className={'navigate__link background'} to="/">
            ГОЛОВНА
          </Link>
        </li>
        <li className="navigate__item">
          <div className="navigate__link">
            ЗАПЧАСТИНИ
            <MdArrowDropDown className="arrow" />
          </div>
          <ul className="navigate__link--subMenu">
            <li className="items">
              <Link to="productBY">Запчастини Б/У</Link>
            </li>
            <li className="items">
              <Link to="productNEW">Нові Запчастини</Link>
            </li>
          </ul>
        </li>
        <li className="navigate__item">
          <Link className="navigate__link" to="/">
            СГ ТЕХНІКА
          </Link>
        </li>
        <li className="navigate__item">
          <Link className="navigate__link" to="/">
            НАВІСНЕ СГ
          </Link>
        </li>
        <li className="navigate__item">
          <Link className="navigate__link" to="/">
            КОНТАКТИ
          </Link>
        </li>
      </ul>
      <ul className="navigate--social">
        <li>
          <a
            target="_blank"
            rel="noreferrer noopener"
            href="https://www.facebook.com/groups/zap4astini"
          >
            <ImFacebook2 />
          </a>
        </li>
        <li>
          <a
            target="_blank"
            rel="noreferrer noopener"
            href="https://www.instagram.com/n.voyts/"
          >
            <ImInstagram />
          </a>
        </li>
        <li>
          <a
            target="_blank"
            rel="noreferrer noopener"
            href="https://www.tiktok.com/@n.voyts "
          >
            <SiTiktok />
          </a>
        </li>
        <li>
          <a
            target="_blank"
            rel="noreferrer noopener"
            href="https://www.youtube.com/@NAZARVOYTS/featured"
          >
            <TfiYoutube />
          </a>
        </li>
        <li>
          {selectAuth ? (
            <Link to="/">
              <BiSolidUser
                className="svg__main"
                onClick={() => dispatch(logOut())}
              />
            </Link>
          ) : (
            <>
              <div
                className={openMenu ? 'login yellow' : 'login'}
                onClick={menuOpen}
              >
                <CgEnter />
                <span>Увійти/Зареєструватись</span>
              </div>
              <form className={openMenu ? 'formLogin' : 'formLogin none'}>
                <input
                  onChange={e => setEmail(e.target.value)}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="E-mail"
                  value={email}
                />
                <input
                  onChange={e => setPass(e.target.value)}
                  value={password}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Пароль"
                />
                <div className="formLogin__item">
                  <button
                    type="button"
                    onClick={() =>
                      Notiflix.Confirm.prompt(
                        'Забули пароль?',
                        'Вкажіть пошту для відправки нового пароля?',
                        '',
                        'Скинути',
                        'Відмінити',
                        function okCb(clientAnswer) {
                          resendPass({ email: clientAnswer });
                        },
                        function cancelCb() {},
                        {
                          // Custom options
                        }
                      )
                    }
                    className="formLogin__link"
                  >
                    Забули пароль?
                  </button>
                  <button
                    className="formLogin__btn"
                    type="button"
                    onClick={onLogin}
                  >
                    Увійти
                  </button>
                </div>
                <Link to="/register" className="formLogin__register">
                  Зареєструватися
                </Link>
              </form>
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
  );
};

export default NavigateCategory;
