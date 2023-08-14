import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ImFacebook2, ImInstagram } from 'react-icons/im';
import { SiTiktok } from 'react-icons/si';
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
            ГОЛОВНА
          </Link>
        </li>
        <li className="navigate__item">
          <Link className="navigate__link" to="/">
            ЗАПЧАСТИНИ
            <MdArrowDropDown className="arrow" />
          </Link>
          <ul className="navigate__link--subMenu">
            <li className="items">
              <Link to="product">Запчастини Б/У</Link>
            </li>
            <li className="items">
              <Link to="product">Нові Запчастини</Link>
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
