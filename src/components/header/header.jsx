import { IoMdPhonePortrait } from 'react-icons/io';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <Link className="logo" to="/">
        ZAP4ASTINI
        <span className="logo__item">ВІД Б/У ДО НОВИХ СГ ЗАПЧАСТИН</span>
      </Link>
      <p className="header__contact">
        Потрібна допомога?Наші контакти!
        <a className="header__contact--item" href="tel:+380686473128">
          <span className="header__contact--svg">
            <IoMdPhonePortrait />
          </span>
          +380-68-64-73-128
        </a>
      </p>
    </header>
  );
};

export default Header;
