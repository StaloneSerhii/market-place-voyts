import NavigateCategory from 'components/categoryMainTop/navCategory';
import Footer from 'components/footer/footer';
import { Link, Outlet } from 'react-router-dom';

const AdminPage = () => {
  return (
    <>
      <NavigateCategory />
      <section className="profile">
        <div>
          <ul className="profile__list">
            <li>
              <Link className="formLogin__btn postBtn" to="/">
                На головну
              </Link>
            </li>
            <li>
              <Link className="formLogin__btn postBtn" to="product">
                Добавити товар
              </Link>
            </li>
            <li>
              <Link className="formLogin__btn postBtn" to="allProduct">
                Список товарів
              </Link>
            </li>
            <li>
              <Link className="formLogin__btn postBtn" to="buyPr">
                Куплені товари
              </Link>
            </li>
          </ul>
        </div>
        <Outlet />
      </section>
      <Footer />
    </>
  );
};

export default AdminPage;
