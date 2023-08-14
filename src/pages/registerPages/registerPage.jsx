import Cards from 'components/cards/cards';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  return (
    <>
      <div className="register">
        <h2>РЕРЕЄСТРАЦІЯ</h2>
        <form className="form__register">
          <div>
            <input type="text" id="name" placeholder="Ім`я" />
            <input type="text" id="feName" placeholder="Фамілія" />
            <input type="email" id="email" placeholder="E-mail" />
          </div>
          <div>
            <input type="tel" id="name" placeholder="Телефон" />
            <input type="password" id="password" placeholder="Пароль" />
            <input
              type="password"
              id="password"
              placeholder="Повторити пароль"
            />
          </div>
        </form>
        <div className="form__item">
          <label className="docSite">
            <input type="checkbox" />Я прочитав і згоден
            <Link className="linkRegisterRules" to="/">
              &#0; з правилави Умови використання сайту.
            </Link>
          </label>
          <button className="formLogin__btn">Реєстрація</button>
        </div>
      </div>
      <Cards />
    </>
  );
};

export default RegisterPage;
