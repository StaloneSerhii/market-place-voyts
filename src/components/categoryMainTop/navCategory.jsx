import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BiSolidUser } from 'react-icons/bi';
import { CgEnter } from 'react-icons/cg';
import { SlBasketLoaded } from 'react-icons/sl';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthStatus } from 'redux/authPer/auth-selector';
import { logIn } from 'redux/operations';
import {
  getFavoriteProductLocalStorage,
  getFavoriteProductLocalStorageAuth,
  getProductLocalStorage,
  getProductLocalStorageNotAuth,
} from 'redux/selector';
import { resendPass } from 'redux/service';
import Notiflix from 'notiflix';
import { AiFillEyeInvisible, AiOutlineHeart } from 'react-icons/ai';

const NavigateCategory = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState();
  const [password, setPass] = useState();
  const [hiddenNewPass, setHiddenNewPass] = useState();
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
          <Link className="navigate__link " to="/">
            Головна
          </Link>
        </li>
        <li className="navigate__item">
          <Link to="productAll" className="navigate__link">
            Запчастини
          </Link>
        </li>
        <li className="navigate__item">
          <Link className="navigate__link" to="sgtech">
            СГ техніка
          </Link>
        </li>
        <li className="navigate__item">
          <Link className="navigate__link" to="sg">
            Навісне СГ
          </Link>
        </li>
        <li className="navigate__item">
          <Link className="navigate__link" to="/">
            Контакти
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
                onClick={menuOpen}
              >
                <CgEnter />
                <span>Особистий кабінет</span>
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
                  type={!hiddenNewPass ? 'password' : 'text'}
                  name="password"
                  id="password"
                  placeholder="Пароль"
                />
                <AiFillEyeInvisible
                  style={{
                    position: 'absolute',
                    top: '80px',
                    right: '25px',
                    cursor: 'pointer',
                    fontSize: '22px',
                    color: 'black',
                  }}
                  onClick={() => setHiddenNewPass(!hiddenNewPass)}
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
