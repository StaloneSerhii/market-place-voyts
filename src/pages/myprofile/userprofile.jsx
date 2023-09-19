import { AiOutlineHistory } from 'react-icons/ai';
import { FaStoreAlt } from 'react-icons/fa';
import { FiSettings } from 'react-icons/fi';
import { MdFavoriteBorder } from 'react-icons/md';
import { Link, Outlet } from 'react-router-dom';

const Profile = () => {
  return (
    <section>
      <ul>
        <Link to="store">
          <span>
            <FaStoreAlt />
          </span>
          Мої Замовлення
        </Link>
        <Link to="history">
          <span>
            <AiOutlineHistory />
          </span>
          Переглянуті товари
        </Link>
        <Link to="favorite">
          <span>
            <MdFavoriteBorder />
          </span>
          Список бажаного
        </Link>
        <Link to="settings">
          <span>
            <FiSettings />
          </span>
          Налаштування профілю
        </Link>
      </ul>
      <Outlet />
    </section>
  );
};

export default Profile;
