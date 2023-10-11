import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import * as Yup from 'yup';
import { getAuth } from 'redux/authPer/auth-selector';
import { AiFillEye, AiFillEyeInvisible, AiFillSetting } from 'react-icons/ai';
import { changeUserData } from 'redux/operations';
import { useLocation } from 'react-router-dom';

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
  password: Yup.string().min(6, 'Short password!'),
  newpassword: Yup.string().min(6, 'Short password!'),
});

const SerringProfile = () => {
  const dispath = useDispatch();
  const [hiddenPass, setHiddenPass] = useState(false);
  const [hiddenNewPass, setHiddenNewPass] = useState(false);
  const selecAuth = useSelector(getAuth);
  const [isFormChanged, setIsFormChanged] = useState(true);
  const { user } = selecAuth;
  const location = useLocation();
  const { pathname } = location;

  const initialValues = {
    name: user.name,
    fename: user.fename,
    email: user.email,
    phone: user.phone,
    password: '',
    newPassword: '',
  };

  // Відправка форми після замовлення
  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: values => {
      if (formik.values.newPassword && formik.values.password) {
        return dispath(changeUserData(values));
      }
      const { newPassword, password, ...obj } = values;
      dispath(changeUserData(obj));
    },
  });

  // Збереження ведених даних в форму
  const handleInputChange = event => {
    const { name, value } = event.target;
    formik.setFieldValue(name, value);
    setIsFormChanged(true);
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
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h2 className="register-text">
            {pathname === '/profile/settings' ? 'Мій профіль' : 'РЕРЕЄСТРАЦІЯ'}
          </h2>
          <button
            style={{ color: '#278032', fontSize: '30px' }}
            title="Скинути історію профілю"
          >
            <AiFillSetting />
          </button>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="form__register">
            <div>
              <input
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

            <div style={{ position: 'relative' }}>
              <input
                type="tel"
                name="phone"
                placeholder="380(00)000-00-00"
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
                type={!hiddenPass ? 'password' : 'text'}
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
              {!hiddenPass ? (
                <AiFillEyeInvisible
                  style={{
                    position: 'absolute',
                    top: '85px',
                    right: '25px',
                    cursor: 'pointer',
                    fontSize: '22px',
                  }}
                  onClick={() => setHiddenPass(!hiddenPass)}
                />
              ) : (
                <AiFillEye
                  style={{
                    position: 'absolute',
                    top: '85px',
                    right: '25px',
                    cursor: 'pointer',
                    fontSize: '22px',
                  }}
                  onClick={() => setHiddenPass(!hiddenPass)}
                />
              )}
              {formik.values.password ? (
                <input
                  disabled={!formik.values.password}
                  required={formik.values.password}
                  type={!hiddenNewPass ? 'password' : 'text'}
                  id="password"
                  name="newPassword"
                  placeholder="Повторити пароль"
                  onBlur={formik.handleBlur}
                  value={formik.values.newPassword}
                  onChange={handleInputChange}
                  style={
                    formik.touched.newPassword && formik.errors.newPassword
                      ? { border: '1px solid red' }
                      : { border: '1px solid transparent' }
                  }
                />
              ) : (
                <input
                  className="diss"
                  disabled={!formik.values.password}
                  required={formik.values.password}
                  type={!hiddenNewPass ? 'password' : 'text'}
                  id="password"
                  name="newPassword"
                  placeholder="Повторити пароль"
                  onBlur={formik.handleBlur}
                  value={formik.values.newPassword}
                  onChange={handleInputChange}
                  style={
                    formik.touched.newPassword && formik.errors.newPassword
                      ? { border: '1px solid red' }
                      : { border: '1px solid transparent' }
                  }
                />
              )}
              {!hiddenNewPass ? (
                <AiFillEyeInvisible
                  style={{
                    position: 'absolute',
                    top: '150px',
                    right: '25px',
                    cursor: 'pointer',
                    fontSize: '22px',
                  }}
                  onClick={() => setHiddenNewPass(!hiddenNewPass)}
                />
              ) : (
                <AiFillEye
                  style={{
                    position: 'absolute',
                    top: '150px',
                    right: '25px',
                    cursor: 'pointer',
                    fontSize: '22px',
                  }}
                  onClick={() => setHiddenNewPass(!hiddenNewPass)}
                />
              )}
            </div>
          </div>
          <div className="form__item profile">
            <button
              className="formLogin__btn"
              type="submit"
              disabled={!isFormChanged}
            >
              Зберегти зміни
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default SerringProfile;
