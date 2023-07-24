import { IoMdPhonePortrait } from "react-icons/io";

const Header = () => {
  return (
    <header className="header">
      <a className="logo" href="/">
        TRACTOR<span className="logo__item">REPAIRS & SPARES</span>
      </a>
      <p className="header__contact">
        Потрібна допомога?Наші контакти!
        <a className="header__contact--item" href="tel:+4780023456735">
          <span className="header__contact--svg">
            <IoMdPhonePortrait />
          </span>
          800-2345-6789
        </a>
      </p>
    </header>
  );
};

export default Header;
