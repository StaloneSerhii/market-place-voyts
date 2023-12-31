import Cards from 'components/cards/cards';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { register } from 'redux/operations';
import * as Yup from 'yup';
import { RulesRegister } from 'components/modalBuy/rulesRegister/rulesRegister';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short name!')
    .max(35, 'Too Long name!')
    .required('Name is required'),
  fename: Yup.string()
    .min(2, 'Too Short name!')
    .max(35, 'Too Long name!')
    .required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string()
    .min(14, 'Too Short name!')
    .max(14, 'Too Long name!')
    .notRequired(),
  password: Yup.string().required().min(6, 'Short password!'),
});

const RegisterPage = () => {
  const dispath = useDispatch();
  const [reapPass, setReapPass] = useState();
  const [openRules, setOpenRules] = useState(false);

  const initialValues = {
    name: '',
    fename: '',
    email: '',
    phone: '',
    password: '',
  };

  // Відкритя правил користувача
  const openRulesModal = () => {
    setOpenRules(!openRules);
  };
  // Відправка форми після замовлення
  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: values => {
      if (formik.values.password !== reapPass) {
        return alert('Паролі  не співпадають');
      }
      dispath(register(values));
    },
  });

  // Збереження ведених даних в форму
  const handleInputChange = event => {
    const { name, value } = event.target;
    formik.setFieldValue(name, value);
  };

  // Корекція веденого номера тел
  const handlePhoneNumberChange = e => {
    let value = e.target.value;
    value = value.replace(/\D/g, '');
    if (value.length > 3 && value.length <= 6) {
      value = value.slice(0, 3) + ' ' + value.slice(3);
    } else if (value.length > 6) {
      value =
        value.slice(0, 2) + '(' + value.slice(2, 5) + ')' + value.slice(5);
    }
    formik.setFieldValue('phone', value);
  };

  return (
    <>
      <div className="register">
        <h2>РЕРЕЄСТРАЦІЯ</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="form__register">
            <div>
              <input
                required
                type="text"
                name="name"
                placeholder="Імя"
                onBlur={formik.handleBlur}
                value={formik.values.name}
                onChange={handleInputChange}
              />
              <input
                required
                type="text"
                name="fename"
                placeholder="Прізвище"
                onBlur={formik.handleBlur}
                value={formik.values.fename}
                onChange={handleInputChange}
              />
              <input
                required
                type="email"
                name="email"
                placeholder="Email"
                onBlur={formik.handleBlur}
                value={formik.values.email}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <input
                required
                type="tel"
                name="phone"
                placeholder="380(00)000-00-00"
                onBlur={formik.handleBlur}
                value={formik.values.phone}
                onChange={handlePhoneNumberChange}
              />
              <input
                required
                type="password"
                name="password"
                placeholder="Пароль"
                onBlur={formik.handleBlur}
                value={formik.values.password}
                onChange={handleInputChange}
              />
              <input
                required
                type="password"
                id="password"
                placeholder="Повторити пароль"
                onChange={e => setReapPass(e.target.value)}
                value={reapPass}
              />
            </div>
          </div>
          <div className="form__item">
            <label className="docSite">
              <input type="checkbox" required />Я прочитав і згоден &#0;
              <button onClick={openRulesModal} className="linkRegisterRules">
                з правилави Умови використання сайту.
              </button>
            </label>
            <button className="formLogin__btn" type="submit">
              Реєстрація
            </button>
          </div>
        </form>
        {openRules && <RulesRegister openRulesModal={openRulesModal} />}
      </div>
      <Cards />
    </>
  );
};

export default RegisterPage;
