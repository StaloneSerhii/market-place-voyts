import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ImFacebook2, ImInstagram } from 'react-icons/im';
import { TfiYoutube } from 'react-icons/tfi';
import { MdArrowDropDown } from 'react-icons/md';

const NavigateCategory = () => {
  const [activePage, setActivePage] = useState(true);
  return (
    <nav className="navigate">
      <ul className="navigate__list">
        <li className="navigate__item">
          <Link
            className={
              activePage ? 'navigate__link background' : 'navigate__link'
            }
            to="/"
          >
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
      </ul>
    </nav>
  );
};

export default NavigateCategory;
