import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ImFacebook2, ImInstagram } from 'react-icons/im';
import { TfiYoutube } from 'react-icons/tfi';
import { MdArrowDropDown } from 'react-icons/md';
import { CgEnter } from 'react-icons/cg';

const NavigateCategory = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const menuOpen = () => {
    return setOpenMenu(!openMenu);
  };

  return (
    <nav className="navigate">
      <ul className="navigate__list">
        <li className="navigate__item">
          <Link className={'navigate__link background'} to="/">
            Home
          </Link>
        </li>
        <li className="navigate__item">
          <Link className="navigate__link" to="/">
            About
            <MdArrowDropDown className="arrow" />
          </Link>
          <ul className="navigate__link--subMenu">
            <li className="items">
              <Link>History</Link>
            </li>
            <li className="items">
              <Link>History</Link>
            </li>
            <li className="items">
              <Link>History</Link>
            </li>
          </ul>
        </li>
        <li className="navigate__item">
          <Link className="navigate__link" to="/">
            Repairs
          </Link>
        </li>
        <li className="navigate__item">
          <Link className="navigate__link" to="/">
            Spares
          </Link>
        </li>
        <li className="navigate__item">
          <Link className="navigate__link" to="/">
            Contacts
          </Link>
        </li>
      </ul>
      <ul className="navigate--social">
        <li>
          <Link to="/">
            <ImFacebook2 />
          </Link>
        </li>
        <li>
          <Link to="/">
            <ImInstagram />
          </Link>
        </li>
        <li>
          <Link to="/">
            <TfiYoutube />
          </Link>
        </li>
        <li>
          <div
            className={openMenu ? 'login yellow' : 'login'}
            onClick={menuOpen}
          >
            <CgEnter />
            <span>Увійти/Зареєструватись</span>
          </div>
          {openMenu && modalLogin(openMenu)}
        </li>
      </ul>
    </nav>
  );
};

const modalLogin = () => {
  return (
    <form className={'formLogin '}>
      <input type="email" name="email" id="email" placeholder="E-mail" />
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Пароль"
      />
      <div className="formLogin__item">
        <Link to="/" className="formLogin__link">
          Забули пароль?
        </Link>
        <button className="formLogin__btn">Увійти</button>
      </div>
      <Link to="/register" className="formLogin__register">
        Зареєструватися
      </Link>
    </form>
  );
};

export default NavigateCategory;
