// import { ImFacebook2, ImInstagram } from 'react-icons/im';
// import { TfiYoutube } from 'react-icons/tfi';
// import { MdArrowDropDown } from 'react-icons/md';

import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="footer">
      <ul className="footer__section">
        <li>
          <div className="footer__section--first">
            <p>Quick Link</p>
            <ul>
              <li>
                <Link to="productBY">Запчастини Б/У</Link>
              </li>
              <li>
                <Link to="productNEW">Нові Запчастини</Link>
              </li>
              <li>
                <Link to="/">СГ ТЕХНІКА</Link>
              </li>
              <li>
                <Link to="/">НАВІСНЕ СГ</Link>
              </li>
              <li>
                <Link to="/">КОНТАКТИ</Link>
              </li>
            </ul>
          </div>
        </li>
        <li>
          <div className="footer__section--second">
            <p>Get in Touch</p>
            <ul>
              <li>
                <a href="https://goo.gl/maps/2TkGNW32Sg7HyLpW9">
                  вулиця Поліська, 7, Тернопіль, Тернопільська область, 46020
                </a>
              </li>
              <li>
                <a href="tel:+45646464546">+380678645646</a>
              </li>
              <li>
                <a href="email:info@gmail.com">info@gmail.com</a>
              </li>
            </ul>
          </div>
        </li>
      </ul>
      <div className="copyright">
        <p>
          <span>&#169;</span> 2023
        </p>
      </div>
    </div>
  );
};

export default Footer;
