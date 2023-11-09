import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="footer">
      <ul className="footer__section">
        <li className="first">
          <ul
            style={{
              fontSize: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              textAlign: 'center',
              alignItems: 'flex-start',
            }}
          >
            <li>
              <Link to="/">Головна</Link>
            </li>
            <li>
              <Link to="/productAll/new">Нові Запчастини</Link>
            </li>
            <li>
              <Link to="/productAll/ин">Б/У Запчастини</Link>
            </li>
            <li>
              <Link to="/find">Знайти запчастину</Link>
            </li>
            <li>
              <Link to="/video">Відео</Link>
            </li>
          </ul>
        </li>
        <li className="nextF">
          <div className="footer__section--second">
            <p>Потрібна допомога? Наші контакти!</p>
            <ul>
              <li style={{ textAlign: 'center', fontSize: '14px' }}>
                <ul style={{ margin: '20px 0' }}>
                  <li>
                    <a href="tel:380678645646">Телефон: +380678645646</a>
                  </li>
                  <li>
                    <a href="email:info@gmail.com">Пошта: info@gmail.com</a>
                  </li>
                </ul>
                <li>
                  <a href="/">
                    м. Тернопіль, вул. Поліська, 7{' '}
                    <span style={{ display: 'block', textAlign: 'center' }}>
                      46020
                    </span>
                  </a>
                </li>
              </li>
            </ul>
          </div>
        </li>
        <li className="last">
          <ul>
            <li>
              <a href="/">
                <svg
                  width="33"
                  height="33"
                  viewBox="0 0 33 33"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.4998 29.8333H20.4998C27.1665 29.8333 29.8332 27.1666 29.8332 20.5V12.5C29.8332 5.83329 27.1665 3.16663 20.4998 3.16663H12.4998C5.83317 3.16663 3.1665 5.83329 3.1665 12.5V20.5C3.1665 27.1666 5.83317 29.8333 12.4998 29.8333Z"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M16.5002 21.1667C17.113 21.1667 17.7198 21.046 18.286 20.8115C18.8522 20.577 19.3667 20.2332 19.8 19.7999C20.2333 19.3665 20.5771 18.8521 20.8116 18.2859C21.0461 17.7197 21.1668 17.1129 21.1668 16.5C21.1668 15.8872 21.0461 15.2804 20.8116 14.7142C20.5771 14.148 20.2333 13.6335 19.8 13.2002C19.3667 12.7669 18.8522 12.4231 18.286 12.1886C17.7198 11.9541 17.113 11.8334 16.5002 11.8334C15.2625 11.8334 14.0755 12.325 13.2003 13.2002C12.3252 14.0754 11.8335 15.2624 11.8335 16.5C11.8335 17.7377 12.3252 18.9247 13.2003 19.7999C14.0755 20.675 15.2625 21.1667 16.5002 21.1667Z"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M24.0146 9.83337H24.0306"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </a>
            </li>
            <li>
              <a href="/">
                <svg
                  width="33"
                  height="33"
                  viewBox="0 0 33 33"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.1667 12.9V16.7667H22.6333C22.9 16.7667 23.0333 17.0333 23.0333 17.3L22.5 19.8333C22.5 19.9667 22.2333 20.1 22.1 20.1H19.1667V29.8333H15.1667V20.2333H12.9C12.6333 20.2333 12.5 20.1 12.5 19.8333V17.3C12.5 17.0333 12.6333 16.9 12.9 16.9H15.1667V12.5C15.1667 10.2333 16.9 8.5 19.1667 8.5H22.7667C23.0333 8.5 23.1667 8.63333 23.1667 8.9V12.1C23.1667 12.3667 23.0333 12.5 22.7667 12.5H19.5667C19.3 12.5 19.1667 12.6333 19.1667 12.9Z"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                  />
                  <path
                    d="M20.4998 29.8333H12.4998C5.83317 29.8333 3.1665 27.1666 3.1665 20.5V12.5C3.1665 5.83329 5.83317 3.16663 12.4998 3.16663H20.4998C27.1665 3.16663 29.8332 5.83329 29.8332 12.5V20.5C29.8332 27.1666 27.1665 29.8333 20.4998 29.8333Z"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </a>
            </li>
            <li>
              <a href="/">
                <svg
                  width="33"
                  height="33"
                  viewBox="0 0 33 33"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.4998 29.8333H20.4998C27.1665 29.8333 29.8332 27.1666 29.8332 20.5V12.5C29.8332 5.83329 27.1665 3.16663 20.4998 3.16663H12.4998C5.83317 3.16663 3.1665 5.83329 3.1665 12.5V20.5C3.1665 27.1666 5.83317 29.8333 12.4998 29.8333Z"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12.6333 16.5V14.5267C12.6333 11.98 14.4333 10.9533 16.6333 12.22L18.34 13.2067L20.0466 14.1933C22.2466 15.46 22.2466 17.54 20.0466 18.8067L18.34 19.7933L16.6333 20.78C14.4333 22.0467 12.6333 21.0067 12.6333 18.4733V16.5Z"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </a>
            </li>
            <li>
              <a href="/">
                <svg
                  width="33"
                  height="33"
                  viewBox="0 0 33 33"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M23.6333 12.5666L20.5133 22.62C19.7666 25.0066 16.42 25.0466 15.6333 22.6733L14.7 19.9133C14.4466 19.1533 13.8466 18.54 13.0866 18.3L10.3133 17.3666C7.9533 16.58 7.9933 13.2066 10.38 12.4866L20.4333 9.3533C22.4066 8.7533 24.26 10.6066 23.6333 12.5666Z"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12.4998 29.8333H20.4998C27.1665 29.8333 29.8332 27.1666 29.8332 20.5V12.5C29.8332 5.83329 27.1665 3.16663 20.4998 3.16663H12.4998C5.83317 3.16663 3.1665 5.83329 3.1665 12.5V20.5C3.1665 27.1666 5.83317 29.8333 12.4998 29.8333Z"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </a>
            </li>
          </ul>
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
