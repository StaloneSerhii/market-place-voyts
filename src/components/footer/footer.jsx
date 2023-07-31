import { ImFacebook2, ImInstagram } from 'react-icons/im';
import { TfiYoutube } from 'react-icons/tfi';
// import { MdArrowDropDown } from 'react-icons/md';

const Footer = () => {
  return (
    <div className="footer">
      <ul className="footer__section">
        <li>
          <div className="footer__section--first">
            <p>Quick Link</p>
            <ul>
              <li>
                <a href="/">Abous Us</a>
              </li>
              <li>
                <a href="/">Service</a>
              </li>
              <li>
                <a href="/">Faq</a>
              </li>
              <li>
                <a href="/">Contact Us</a>
              </li>
              <li>
                <a href="/">Reips</a>
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
              <ul>
                <li>
                  <a href=""></a>
                </li>
                <li>
                  <a href=""></a>
                </li>
                <li>
                  <a href=""></a>
                </li>
              </ul>
            </ul>
          </div>
        </li>
      </ul>
      <div className="copyright">
        <p>
          <span>&#169;</span> 2023 Fxitiondf asdasd
        </p>
      </div>
    </div>
  );
};

export default Footer;
