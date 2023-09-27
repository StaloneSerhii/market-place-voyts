import { Link, Outlet } from "react-router-dom";


const label = { inputProps: { true: false } };

const AdminPage = () => {


    return <section className="profile">
        <div>
            <ul className="profile__list">
                <li>
                    <Link className="formLogin__btn postBtn"  to='/'>На головну</Link>
                </li>
                <li>
                    <Link className="formLogin__btn postBtn" to='product'>Добавити товар</Link>
                </li>
            </ul>
        </div>
        <Outlet />
    </section>
}

export default AdminPage;
