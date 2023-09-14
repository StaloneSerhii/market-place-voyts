import Cards from 'components/cards/cards';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { register } from 'redux/operations';
import * as Yup from 'yup';

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
  const [reapPass, setReapPass] = useState();
  const dispath = useDispatch();
  const initialValues = {
    name: '',
    fename: '',
    email: '',
    phone: '',
    password: '',
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
                style={
                  formik.touched.name && formik.errors.name
                    ? { border: '1px solid red' }
                    : { border: '1px solid transparent' }
                }
              />
              <input
                required
                type="text"
                name="fename"
                placeholder="Прізвище"
                onBlur={formik.handleBlur}
                value={formik.values.fename}
                onChange={handleInputChange}
                style={
                  formik.touched.fename && formik.errors.fename
                    ? { border: '1px solid red' }
                    : { border: '1px solid transparent' }
                }
              />
              <input
                required
                type="email"
                name="email"
                placeholder="Email"
                onBlur={formik.handleBlur}
                value={formik.values.email}
                onChange={handleInputChange}
                style={
                  formik.touched.email && formik.errors.email
                    ? { border: '1px solid red' }
                    : { border: '1px solid transparent' }
                }
              />
            </div>
            <div>
              <input
                required
                type="tel"
                name="phone"
                placeholder="38-000-000-00-00"
                onBlur={formik.handleBlur}
                value={formik.values.phone}
                onChange={handlePhoneNumberChange}
                style={
                  formik.touched.phone && formik.errors.phone
                    ? { border: '1px solid red' }
                    : { border: '1px solid transparent' }
                }
              />
              <input
                required
                type="password"
                name="password"
                placeholder="Пароль"
                onBlur={formik.handleBlur}
                value={formik.values.password}
                onChange={handleInputChange}
                style={
                  formik.touched.password && formik.errors.password
                    ? { border: '1px solid red' }
                    : { border: '1px solid transparent' }
                }
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
              <input type="checkbox" required />Я прочитав і згоден
              <Link className="linkRegisterRules" to="/">
                &#0; з правилави Умови використання сайту.
              </Link>
            </label>
            <button className="formLogin__btn" type="submit">
              Реєстрація
            </button>
          </div>
        </form>
      </div>
      <Cards />
    </>
  );
};

export default RegisterPage;
