import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { postBuyProduct } from 'redux/service';
import * as Yup from 'yup';
import {
  getFetchingCurr,
  getProductLocalStorage,
  getProductLocalStorageNotAuth,
} from 'redux/selector';
import { buyProductBusket, onDeleteProductBusket } from 'redux/operations';
import {
  chancheCounterValue,
  dellAllProductOrder,
  dellProductOrder,
} from 'redux/buyProduct-slice';
import { getAuth } from 'redux/authPer/auth-selector';
import { ThreeCircles } from 'react-loader-spinner';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { postBuyProduct } from 'redux/service';
import { Autocomplete, TextField } from '@mui/material';

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
  city: Yup.string().required().min(3, 'Too Short name!'),
  viddill: Yup.string().required(),
  oplata: Yup.string().required(),
});

const options = [
  { label: 'Тернопіль', id: 1 },
  { label: 'Львів', id: 2 },
];

const Busket = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setdata] = useState();
  const [suma, setSuma] = useState(0);
  const userAuth = useSelector(getAuth);
  const isFetchinCurr = useSelector(getFetchingCurr);
  const select = useSelector(getProductLocalStorage);
  const productNotAuth = useSelector(getProductLocalStorageNotAuth);

  // Загальна сума за всі товари
  useEffect(() => {
    if (data) {
      const totalSum = data.reduce((sum, item) => {
        return sum + item.price * item.count;
      }, 0);
      setSuma(totalSum);
    }
  }, [data]);

  // Зміна значення кількості товарів до покупки
  const changeValueCounterProduct = (counter, id) => {
    if (userAuth.isLoggedIn) {
      dispatch(chancheCounterValue({ id, counter, auth: true }));
    } else {
      dispatch(chancheCounterValue({ id, counter, auth: false }));
    }
  };

  // Запис в стейт
  useEffect(() => {
    if (select.length > 0) {
      return setdata(select);
    } else if (!userAuth.isLoggedIn) {
      return setdata(productNotAuth);
    }
    setdata([]);
  }, [select, productNotAuth, userAuth.isLoggedIn]);
  // Стейт форми покупки для відправки
  const initialValues = {
    name: userAuth.isLoggedIn ? userAuth.user.name : '',
    fename: userAuth.isLoggedIn ? userAuth.user.fename : '',
    email: userAuth.isLoggedIn ? userAuth.user.email : '',
    phone: userAuth.isLoggedIn ? userAuth.user.phone : '',
    comments: 'Добрго дня. Я б хотів...',
    city: userAuth.isLoggedIn ? userAuth.user.city : '',
    viddill: '',
    oplata: '',
  };

  // Відправка форми після замовлення
  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: values => {
      const result = window.confirm(`Ви піддтверджуєте свою покупку?`);
      if (result && userAuth.isLoggedIn) {
        dispatch(buyProductBusket({ values, select }));
        navigate('/profile/settings');
        dispatch(dellAllProductOrder());
      } else {
        postBuyProduct({ values, select: productNotAuth }).then(state => {
          if (state.status === 201) {
            navigate('/');
            dispatch(dellAllProductOrder());
          }
        });
      }
    },
  });

  // Збереження ведених даних в форму
  const handleInputChange = event => {
    const { name, value } = event.target;
    formik.setFieldValue(name, value);
  };

  // редактор введення телефону
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
    <div>
      {data !== undefined && data && data.length > 0 ? (
        <form
          onSubmit={formik.handleSubmit}
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <div>
            <h3
              style={{
                textAlign: 'start',
                fontSize: '16px',
                fontWeight: '500',
              }}
            >
              Контактні дані
            </h3>
            <div className="formData">
              <div className="formData--label">
                <label htmlFor="name">
                  Ім'я <br />
                  <input
                    required
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Імя"
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    onChange={handleInputChange}
                    style={
                      formik.touched.name && formik.errors.name
                        ? { border: '1px solid red' }
                        : { border: '1px solid #009C2C' }
                    }
                  />
                </label>
                <label htmlFor="fename">
                  Прізвище <br />
                  <input
                    required
                    type="text"
                    name="fename"
                    id="fename"
                    placeholder="Прізвище"
                    onBlur={formik.handleBlur}
                    value={formik.values.fename}
                    onChange={handleInputChange}
                    style={
                      formik.touched.fename && formik.errors.fename
                        ? { border: '1px solid red' }
                        : { border: '1px solid #009C2C' }
                    }
                  />
                </label>
                <label htmlFor="phone">
                  Телефон <br />
                  <input
                    required
                    id="phone"
                    type="tel"
                    name="phone"
                    placeholder="38-000-000-00-00"
                    onBlur={formik.handleBlur}
                    value={formik.values.phone}
                    onChange={handlePhoneNumberChange}
                    style={
                      formik.touched.phone && formik.errors.phone
                        ? { border: '1px solid red' }
                        : { border: '1px solid #009C2C' }
                    }
                  />
                </label>
                <label htmlFor="email">
                  Email <br />
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Email"
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    onChange={handleInputChange}
                    style={
                      formik.touched.email && formik.errors.email
                        ? { border: '1px solid red' }
                        : { border: '1px solid #009C2C' }
                    }
                  />
                </label>
              </div>
              <textarea
                type="text"
                name="comments"
                placeholder="Коментарі до замовлення"
                onBlur={formik.handleBlur}
                value={formik.values.comments}
                onChange={handleInputChange}
                style={{
                  width: '698px',
                  height: '80px',
                  borderRadius: '5px',
                  fontSize: '15px',
                  justifyContent: 'center',
                  border: '1px solid #009C2C',
                  padding: '16px',
                }}
              />
            </div>
            <label id="city">
              Виберіть населений пункт
              <Autocomplete
                required
                renderInput={params => <TextField {...params} />}
                id="city"
                options={options}
                name="city"
                onBlur={formik.handleBlur}
                onChange={handleInputChange}
                sx={{ width: '735px' }}
              />
            </label>
            <label htmlFor="viddill">
              Виберіть спосіб доставки
              <Autocomplete
                required
                renderInput={params => <TextField {...params} />}
                id="viddill"
                options={options}
                name="viddill"
                // onBlur={formik.handleBlur}
                // onChange={handleInputChange}
                sx={{
                  width: '735px',
                  '& .MuiInput-underline': {
                    borderColor: '1px solid #009C2C',
                  },
                }}
              />
            </label>
            <label htmlFor="viddill">
              Відділення Нової Пошти
              <Autocomplete
                required
                renderInput={params => <TextField {...params} />}
                id="viddill"
                options={options}
                name="viddill"
                onBlur={formik.handleBlur}
                onChange={handleInputChange}
                sx={{ width: '735px' }}
              />
            </label>
            <label htmlFor="oplata">
              Виберіть спосіб оплати
              <Autocomplete
                required
                renderInput={params => <TextField {...params} />}
                id="oplata"
                options={options}
                name="oplata"
                // onBlur={formik.handleBlur}
                onChange={e => {
                  formik.setFieldValue(
                    'oplata',
                    'Післяоплата Нова Пошта, до оплати'
                  ); // Оновлюємо значення в formik
                }}
                sx={{ width: '735px' }}
              />
            </label>
          </div>
          <div>
            <div className="formData--buy">
              <h3>Ваші замовлення</h3>
              <div className="block__listBuy">
                <ul
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '15px',
                  }}
                >
                  {isFetchinCurr ? (
                    <ThreeCircles
                      height="100"
                      width="100"
                      color="#4fa94d"
                      wrapperStyle={{ justifyContent: 'center' }}
                      wrapperClass=""
                      visible={true}
                      ariaLabel="three-circles-rotating"
                      outerCircleColor=""
                      innerCircleColor=""
                      middleCircleColor=""
                    />
                  ) : (
                    data &&
                    data.length > 0 &&
                    data.map(pr => (
                      <li className="block__listBuy--item" key={pr._id}>
                        <button
                          className="busketDell"
                          textarea="Вадалити з кошика"
                          onClick={() =>
                            userAuth.isLoggedIn
                              ? dispatch(onDeleteProductBusket(pr._id))
                              : dispatch(dellProductOrder(pr.id))
                          }
                        >
                          <RiDeleteBin6Line />
                        </button>
                        <Link
                          to={
                            userAuth.isLoggedIn
                              ? `/product/${pr.id}`
                              : `/product/${pr._id}`
                          }
                        >
                          {' '}
                          <img
                            className="block__listBuy--img"
                            src={pr.img[0]}
                            alt="img"
                            width="110px"
                          />
                        </Link>
                        <div style={{ display: 'flex' }}>
                          <div>
                            <p className="block__listBuy--name">{pr.name}</p>
                          </div>
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              gap: '15px',
                              marginLeft: '15px',
                            }}
                          >
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                              }}
                            >
                              <span
                                style={{
                                  color: 'rgb(134, 134, 134)',
                                  lineHeight: '1.5',
                                }}
                              >
                                Ціна
                              </span>
                              <span style={{ fontSize: '20px' }}>
                                {pr.price} грн/шт
                              </span>
                            </div>
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                                lineHeight: '1.5',
                              }}
                            >
                              <span style={{ color: 'rgb(134, 134, 134)' }}>
                                Кількість
                              </span>
                              <label
                                style={{
                                  border: '1px solid rgb(209, 209, 209)',
                                  borderRadius: '5px',
                                  textAlign: 'center',
                                  display: 'flex',
                                  flexDirection: 'row',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  gap: '5px',
                                }}
                              >
                                <input
                                  type="number"
                                  name="weight"
                                  min="1"
                                  max="200"
                                  step="1"
                                  onChange={e =>
                                    changeValueCounterProduct(
                                      e.target.value,
                                      pr._id
                                    )
                                  }
                                  value={pr.count}
                                />
                              </label>
                            </div>
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                              }}
                            >
                              <span
                                style={{
                                  color: 'rgb(134, 134, 134)',
                                  lineHeight: '1.5',
                                }}
                              >
                                Сума
                              </span>
                              <span style={{ color: 'red', fontSize: '20px' }}>
                                {pr.price * pr.count} грн
                              </span>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))
                  )}
                  <p style={{ textAlign: 'end', marginRight: '10px' }}>
                    Разом до оплати: {suma.toFixed(2)} грн
                  </p>
                </ul>
              </div>
              <button
                type="submit"
                className="modal__btn"
                style={{ marginTop: '15px' }}
              >
                ОФОРМИТИ ЗАМОВЛЕННЯ
              </button>
            </div>

            {userAuth.isLoggedIn ? (
              ''
            ) : (
              <p style={{ textAlign: 'end', color: 'red', fontWeight: 900 }}>
                Для відслідковування відправки товару або <br /> інших
                можливостей будь ласка пройдіть авторизацію на сайті!
              </p>
            )}
          </div>
        </form>
      ) : (
        <>
          <p style={{ textAlign: 'center', fontSize: '40px' }}>
            У вашому кошику немає товарів, перейдіть до нашого каталогу щоб
            здійснити покупку <br />
            <br />
            <Link
              style={{ textAlign: 'center', fontSize: '40px', color: 'red' }}
              to="/productBY"
            >
              ТИК!
            </Link>
          </p>
        </>
      )}
    </div>
  );
};

export default Busket;
