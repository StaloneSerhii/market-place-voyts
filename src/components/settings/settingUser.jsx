import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import * as Yup from 'yup';
import { getAuth } from 'redux/authPer/auth-selector';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { changeUserData } from 'redux/operations';
import { Oval } from 'react-loader-spinner';

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
  const [hiddenNewPass, setHiddenNewPass] = useState(false);
  const [isFormChanged, setIsFormChanged] = useState(true);
  const [hiddenPass, setHiddenPass] = useState(false);
  const [repeatPass, setRepetPass] = useState('');

  const selecAuth = useSelector(getAuth);
  const { user } = selecAuth;

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
      {selecAuth.isFetching && (
        <div
          style={{
            width: '100%',
            height: '100%',
            background: '#80808063',
            position: 'absolute',
            top: '0',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '40%',
              left: '50%',
            }}
          >
            <Oval
              height={80}
              width={80}
              color="#4fa94d"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel="oval-loading"
              secondaryColor="#4fa94d"
              strokeWidth={2}
              strokeWidthSecondary={2}
            />
          </div>
        </div>
      )}
      <div className="register">
        <h2
          style={{ fontSize: '24px', margin: '24px 23px', fontWeight: '400' }}
        >
          Мій профіль
        </h2>
        <div style={{ maxWidth: '700px', margin: '0 auto', padding: '16px' }}>
          <form onSubmit={formik.handleSubmit}>
            <p
              style={{
                fontSize: '16px',
                fontWeight: '500',
                marginBottom: '24px',
              }}
            >
              Контактні дані
            </p>{' '}
            <div className="form__register">
              <div>
                <label htmlFor="name" className="formLabel">
                  Ім'я
                  <br />
                  <input
                    className="inputForm"
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Імя"
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    onChange={handleInputChange}
                  />
                </label>
                <label htmlFor="fename" className="formLabel">
                  Прізвище
                  <br />
                  <input
                    className="inputForm"
                    type="text"
                    id="fename"
                    name="fename"
                    placeholder="Прізвище"
                    onBlur={formik.handleBlur}
                    value={formik.values.fename}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
              <div style={{ position: 'relative' }}>
                <label htmlFor="email" className="formLabel">
                  <p>Email</p>

                  <input
                    className="inputForm"
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    onChange={handleInputChange}
                  />
                </label>
                <label htmlFor="phone" className="formLabel">
                  <p>Телефон</p>
                  <input
                    className="inputForm"
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="380(00)000-00-00"
                    onBlur={formik.handleBlur}
                    value={formik.values.phone}
                    onChange={handlePhoneNumberChange}
                  />
                </label>
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
          <p
            style={{
              fontSize: '16px',
              fontWeight: '500',
              marginBottom: '24px',
            }}
          >
            Змінити пароль
          </p>
          <form onSubmit={formik.handleSubmit}>
            <div className="form__register">
              <label htmlFor="password" className="formLabel">
                <p>Старий пароль</p>
                <input
                  style={{ width: '200px' }}
                  className="inputForm"
                  type={!hiddenPass ? 'password' : 'text'}
                  name="password"
                  placeholder="Пароль"
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label htmlFor="password" className="formLabel">
                <p>Новий пароль</p>
                <input
                  style={{ width: '200px' }}
                  className="inputForm"
                  type={!hiddenPass ? 'password' : 'text'}
                  name="newPassword"
                  placeholder="Пароль"
                  onBlur={formik.handleBlur}
                  value={formik.values.newPassword}
                  onChange={handleInputChange}
                />
                {!hiddenPass ? (
                  <AiFillEyeInvisible
                    style={{
                      position: 'absolute',
                      top: '35px',
                      right: '10px',
                      cursor: 'pointer',
                      fontSize: '22px',
                    }}
                    onClick={() => setHiddenPass(!hiddenPass)}
                  />
                ) : (
                  <AiFillEye
                    style={{
                      position: 'absolute',
                      top: '35px',
                      right: '10px',
                      cursor: 'pointer',
                      fontSize: '22px',
                    }}
                    onClick={() => setHiddenPass(!hiddenPass)}
                  />
                )}
              </label>
              {formik.values.password ? (
                <label className="formLabel">
                  <p>Повторіть пароль</p>
                  <input
                    style={{ width: '200px' }}
                    className="inputForm"
                    disabled={!formik.values.password}
                    required={formik.values.password}
                    type={!hiddenNewPass ? 'password' : 'text'}
                    placeholder="Повторити пароль"
                    value={repeatPass}
                    onChange={e => setRepetPass(e.target.value)}
                  />
                  {!hiddenNewPass ? (
                    <AiFillEyeInvisible
                      style={{
                        position: 'absolute',
                        top: '35px',
                        right: '10px',
                        cursor: 'pointer',
                        fontSize: '22px',
                      }}
                      onClick={() => setHiddenNewPass(!hiddenNewPass)}
                    />
                  ) : (
                    <AiFillEye
                      style={{
                        position: 'absolute',
                        top: '35px',
                        right: '10px',
                        cursor: 'pointer',
                        fontSize: '22px',
                      }}
                      onClick={() => setHiddenNewPass(!hiddenNewPass)}
                    />
                  )}
                </label>
              ) : (
                <label className="formLabel">
                  <p> Повторіть пароль</p>
                  <input
                    style={{ width: '200px' }}
                    className="diss inputForm"
                    disabled={!formik.values.password}
                    required={formik.values.password}
                    type={!hiddenNewPass ? 'password' : 'text'}
                    id="password"
                    name="newPassword"
                    placeholder="Повторити пароль"
                    value={repeatPass}
                    onChange={e => setRepetPass(e.target.value)}
                  />
                </label>
              )}
            </div>
            <div className="form__item profile">
              <button
                className="formLogin__btn"
                type="submit"
                disabled={
                  formik.values.newPassword === repeatPass ? false : true
                }
              >
                Зберегти зміни
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default SerringProfile;
