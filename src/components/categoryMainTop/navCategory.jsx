import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ImFacebook2, ImInstagram } from 'react-icons/im';
import { BiSolidUser } from 'react-icons/bi';
import { SiTiktok } from 'react-icons/si';
import { TfiYoutube } from 'react-icons/tfi';
import { MdArrowDropDown } from 'react-icons/md';
import { CgEnter } from 'react-icons/cg';
import { SlBasketLoaded } from 'react-icons/sl';
import { useDispatch, useSelector } from 'react-redux';
import { logIn } from 'redux/operations';

const NavigateCategory = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPass] = useState();
  const dispatch = useDispatch();
  const select = useSelector(state => state.persistedReducerAdd.product.length);
  const selectAuth = useSelector(
    state => state.persistedReducerAdd.auth.isLoggedIn
  );

  const menuOpen = () => {
    return setOpenMenu(!openMenu);
  };

  const onLogin = e => {
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
            <Link to="/account">
              <BiSolidUser className="svg__main" />
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
              {{ openMenu } && (
                <form className="formLogin ">
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
                    <Link to="/" className="formLogin__link">
                      Забули пароль?
                    </Link>
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
              )}
            </>
          )}
        </li>
        <li>
          <Link className="categoty__basket" to="/busket">
            <div className="categoty__basket--num">{select}</div>
            <SlBasketLoaded />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavigateCategory;
