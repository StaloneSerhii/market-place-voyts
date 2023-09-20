import { AiOutlineHistory } from 'react-icons/ai';
import { FaStoreAlt } from 'react-icons/fa';
import { FiSettings } from 'react-icons/fi';
import { MdFavoriteBorder } from 'react-icons/md';
import { Link, Outlet, useLocation } from 'react-router-dom';

const Profile = () => {
  const params = useLocation();
  return (
    <section className="profile">
      <ul className="profile__list">
        <Link
          to="settings"
          className={
            params.pathname === '/profile/settings'
              ? 'profile__item activePr'
              : 'profile__item'
          }
        >
          <span>
            <FiSettings />
          </span>
          Особистий профіль
        </Link>
        <Link
          to="store"
          className={
            params.pathname === '/profile/store'
              ? 'profile__item activePr'
              : 'profile__item'
          }
        >
          <span>
            <FaStoreAlt />
          </span>
          Мої Замовлення
        </Link>
        <Link
          to="history"
          className={
            params.pathname === '/profile/history'
              ? 'profile__item activePr'
              : 'profile__item'
          }
        >
          <span>
            <AiOutlineHistory />
          </span>
          Переглянуті товари
        </Link>
        <Link
          to="favorite"
          className={
            params.pathname === '/profile/favorite'
              ? 'profile__item activePr'
              : 'profile__item'
          }
        >
          <span>
            <MdFavoriteBorder />
          </span>
          Список бажаного
        </Link>
      </ul>
      <Outlet />
    </section>
  );
};

export default Profile;
