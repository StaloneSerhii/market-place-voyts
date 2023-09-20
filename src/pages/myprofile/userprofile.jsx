import { AiOutlineHistory } from 'react-icons/ai';
import { FaStoreAlt } from 'react-icons/fa';
import { FiSettings } from 'react-icons/fi';
import { ImExit } from 'react-icons/im';
import { MdFavoriteBorder } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { logOut } from 'redux/operations';

const Profile = () => {
  const params = useLocation();
  const dispatch = useDispatch();

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
        <button className="profile__item" onClick={() => dispatch(logOut())}>
          <span>
            <ImExit />
          </span>
          Вихід
        </button>
      </ul>
      <Outlet />
    </section>
  );
};

export default Profile;
