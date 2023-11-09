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
  city: Yup.string().required(),
  viddill: Yup.string().required(),
  post: Yup.string().required(),
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
    post: '',
  };

  // Відправка форми після замовлення
  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: values => {
      const result = window.confirm(`Ви піддтверджуєте свою покупку?`);
      if (result && userAuth.isLoggedIn) {
        dispatch(buyProductBusket({ values, select }));
        navigate('/profile/store');
        dispatch(dellAllProductOrder());
      } else if (result) {
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
    <div
      style={{ maxWidth: '1280px', marginLeft: 'auto', marginRight: 'auto' }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          margin: '24px auto',
          padding: ' 12px 0',
        }}
      >
        <svg
          width="20"
          height="21"
          viewBox="0 0 20 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18.0992 9.91073L16.4305 8.24404L10.59 2.41065C10.4335 2.25442 10.2213 2.16666 10.0001 2.16666C9.77884 2.16666 9.56666 2.25442 9.41019 2.41065L3.56968 8.24404L1.90096 9.91073C1.74898 10.0679 1.66488 10.2784 1.66678 10.4969C1.66868 10.7154 1.75643 10.9244 1.91113 11.0789C2.06582 11.2334 2.27509 11.3211 2.49386 11.323C2.71262 11.3249 2.92338 11.2409 3.08075 11.0891L3.32521 10.8449V17.1666C3.32521 17.6087 3.50102 18.0326 3.81397 18.3452C4.12691 18.6577 4.55136 18.8333 4.99393 18.8333H7.49701C7.71829 18.8333 7.93051 18.7455 8.08699 18.5892C8.24346 18.433 8.33137 18.221 8.33137 18V14.6666C8.33137 14.4456 8.41927 14.2336 8.57574 14.0774C8.73222 13.9211 8.94444 13.8333 9.16572 13.8333H10.8344C11.0557 13.8333 11.2679 13.9211 11.4244 14.0774C11.5809 14.2336 11.6688 14.4456 11.6688 14.6666V18C11.6688 18.221 11.7567 18.433 11.9132 18.5892C12.0697 18.7455 12.2819 18.8333 12.5032 18.8333H15.0062C15.4488 18.8333 15.8732 18.6577 16.1862 18.3452C16.4991 18.0326 16.675 17.6087 16.675 17.1666V10.8449L16.9194 11.0891C17.0768 11.2409 17.2875 11.3249 17.5063 11.323C17.7251 11.3211 17.9343 11.2334 18.089 11.0789C18.2437 10.9244 18.3315 10.7154 18.3334 10.4969C18.3353 10.2784 18.2512 10.0679 18.0992 9.91073Z"
            fill="#111928"
          />
        </svg>
        <p style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <Link to="/"> Головна</Link>
          <svg
            width="20"
            height="21"
            viewBox="0 0 20 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.78901 16.3333C7.56973 16.3333 7.35538 16.2649 7.17307 16.1369C6.99076 16.0088 6.84867 15.8269 6.76476 15.614C6.68085 15.4011 6.65889 15.1668 6.70166 14.9408C6.74443 14.7148 6.85 14.5072 7.00503 14.3443L10.6566 10.5071L7.00503 6.67003C6.89912 6.56254 6.81465 6.43396 6.75653 6.2918C6.69842 6.14964 6.66783 5.99674 6.66655 5.84202C6.66527 5.6873 6.69332 5.53386 6.74908 5.39066C6.80483 5.24745 6.88717 5.11735 6.99129 5.00795C7.0954 4.89854 7.21921 4.81202 7.35549 4.75343C7.49177 4.69484 7.63778 4.66536 7.78502 4.6667C7.93226 4.66804 8.07776 4.70019 8.21305 4.76126C8.34834 4.82233 8.4707 4.9111 8.57299 5.02239L13.0085 9.68333C13.2164 9.90184 13.3332 10.1982 13.3332 10.5071C13.3332 10.8161 13.2164 11.1125 13.0085 11.331L8.57299 15.9919C8.36508 16.2104 8.08308 16.3333 7.78901 16.3333Z"
              fill="#6B7280"
            />
          </svg>
          <Link to="/busket"> Корзина</Link>
        </p>
      </div>
      {data !== undefined && data && data.length > 0 ? (
        <form onSubmit={formik.handleSubmit} className="busketForm">
          <div
            style={{ display: 'flex', gap: '32px', flexDirection: 'column' }}
          >
            <div className="formData">
              <h3
                style={{
                  textAlign: 'start',
                  fontSize: '16px',
                  fontWeight: '500',
                }}
              >
                Контактні дані
              </h3>
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
                      formik.touched.name === undefined &&
                      formik.errors.name === undefined
                        ? { border: '1px solid rgb(164, 164, 164)' }
                        : formik.touched.name && formik.errors.name
                        ? { border: '1px solid rgb(244, 0, 0)' }
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
                      formik.touched.fename === undefined &&
                      formik.errors.fename === undefined
                        ? { border: '1px solid rgb(164, 164, 164)' }
                        : formik.touched.fename && formik.errors.fename
                        ? { border: '1px solid rgb(244, 0, 0)' }
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
                      formik.touched.phone === undefined &&
                      formik.errors.phone === undefined
                        ? { border: '1px solid rgb(164, 164, 164)' }
                        : formik.touched.phone && formik.errors.phone
                        ? { border: '1px solid rgb(244, 0, 0)' }
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
                      formik.touched.email === undefined &&
                      formik.errors.email === undefined
                        ? { border: '1px solid rgb(164, 164, 164)' }
                        : formik.touched.email && formik.errors.email
                        ? { border: '1px solid rgb(244, 0, 0)' }
                        : { border: '1px solid #009C2C' }
                    }
                  />
                </label>
              </div>
              <label htmlFor="text">
                <textarea
                  id="text"
                  type="text"
                  name="comments"
                  className="texteria"
                  placeholder="Коментарі до замовлення"
                  onBlur={formik.handleBlur}
                  value={formik.values.comments}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <label id="city" style={{ maxWidth: '737px' }}>
              Виберіть населений пункт
              <Autocomplete
                required
                renderInput={params => <TextField {...params} />}
                id="city"
                options={options}
                name="city"
                onBlur={formik.handleBlur}
                onChange={(_, newValue) => {
                  formik.setFieldValue('city', newValue.label);
                }}
                sx={
                  formik.touched.city === undefined &&
                  formik.errors.city === undefined
                    ? {
                        '& div': { padding: '0px' },
                        '& > div>div': {
                          border: '1px solid rgb(164, 164, 164)',
                          padding: '3px',
                        },
                      }
                    : formik.touched.city && formik.errors.city
                    ? {
                        '& div': { padding: '0px' },
                        '& > div>div': {
                          border: '1px solid rgb(255, 20, 20)',
                          padding: '3px',
                        },
                      }
                    : {
                        '& div': { padding: '0px' },
                        '& > div>div': {
                          border: '1px solid #009C2C',
                          padding: '3px',
                        },
                      }
                }
              />
            </label>
            <label htmlFor="post" style={{ maxWidth: '737px' }}>
              Виберіть спосіб доставки
              <Autocomplete
                required
                renderInput={params => <TextField {...params} />}
                id="post"
                options={[
                  { label: 'Самовивіз з місця продажу', id: 1 },
                  { label: 'Доставка Нова Пошта', id: 2 },
                ]}
                name="post"
                onBlur={formik.handleBlur}
                onChange={(_, newValue) => {
                  formik.setFieldValue('post', newValue.label);
                }}
                sx={
                  formik.touched.post === undefined &&
                  formik.errors.post === undefined
                    ? {
                        '& div': { padding: '0px' },
                        '& > div>div': {
                          border: '1px solid rgb(164, 164, 164)',
                          padding: '3px',
                        },
                      }
                    : formik.touched.post && formik.errors.post
                    ? {
                        '& div': { padding: '0px' },
                        '& > div>div': {
                          border: '1px solid rgb(255, 20, 20)',
                          padding: '3px',
                        },
                      }
                    : {
                        '& div': { padding: '0px' },
                        '& > div>div': {
                          border: '1px solid #009C2C',
                          padding: '3px',
                        },
                      }
                }
              />
            </label>
            <label htmlFor="viddill" style={{ maxWidth: '737px' }}>
              Відділення Нової Пошти
              <Autocomplete
                required
                renderInput={params => <TextField {...params} />}
                id="viddill"
                options={options}
                name="viddill"
                onBlur={formik.handleBlur}
                onChange={(_, newValue) => {
                  formik.setFieldValue('viddill', newValue.label);
                }}
                sx={
                  formik.touched.viddill === undefined &&
                  formik.errors.viddill === undefined
                    ? {
                        '& div': { padding: '0px' },
                        '& > div>div': {
                          border: '1px solid rgb(164, 164, 164)',
                          padding: '3px',
                        },
                      }
                    : formik.touched.viddill && formik.errors.viddill
                    ? {
                        '& div': { padding: '0px' },
                        '& > div>div': {
                          border: '1px solid rgb(255, 20, 20)',
                          padding: '3px',
                        },
                      }
                    : {
                        '& div': { padding: '0px' },
                        '& > div>div': {
                          border: '1px solid #009C2C',
                          padding: '3px',
                        },
                      }
                }
              />
            </label>
            <label htmlFor="oplata" style={{ maxWidth: '737px' }}>
              Виберіть спосіб оплати
              <Autocomplete
                required
                renderInput={params => <TextField {...params} />}
                id="oplata"
                options={[
                  { label: 'Предоплата на карточку продавця', id: 1 },
                  { label: 'Післяоплата Нова Пошта, до оплати', id: 2 },
                ]}
                name="oplata"
                onBlur={formik.handleBlur}
                onChange={(_, newValue) => {
                  formik.setFieldValue('oplata', newValue.label);
                }}
                sx={
                  formik.touched.oplata === undefined &&
                  formik.errors.oplata === undefined
                    ? {
                        '& div': { padding: '0px' },
                        '& > div>div': {
                          border: '1px solid rgb(164, 164, 164)',
                          padding: '3px',
                        },
                      }
                    : formik.touched.oplata && formik.errors.oplata
                    ? {
                        '& div': { padding: '0px' },
                        '& > div>div': {
                          border: '1px solid rgb(255, 20, 20)',
                          padding: '3px',
                        },
                      }
                    : {
                        '& div': { padding: '0px' },
                        '& > div>div': {
                          border: '1px solid #009C2C',
                          padding: '3px',
                        },
                      }
                }
              />
            </label>
          </div>
          <div>
            <div className="formData--buy">
              <h3>Ваші замовлення:</h3>
              <div className="block__listBuy">
                <ul
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '15px',
                    padding: '16px',
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
                        <img
                          className="block__listBuy--img"
                          src={pr.img[0]}
                          alt="img"
                          width="100px"
                        />
                        <div>
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                            }}
                          >
                            <Link
                              to={
                                userAuth.isLoggedIn
                                  ? `/product/${pr.id}`
                                  : `/product/${pr._id}`
                              }
                            >
                              <p className="block__listBuy--name">{pr.name}</p>
                            </Link>
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
                          </div>
                          <div style={{ display: 'flex' }}>
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: '15px',
                                marginLeft: '15px',
                                alignItems: 'flex-end',
                              }}
                            >
                              <div
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '5px',
                                }}
                              >
                                <span
                                  style={{
                                    lineHeight: '2',
                                  }}
                                >
                                  Ціна
                                </span>
                                <span style={{ fontSize: '20px' }}>
                                  <span
                                    style={{
                                      border: '1px solid #009C2C',
                                      borderRadius: '8px',
                                      padding: '0 5px',
                                    }}
                                  >
                                    {pr.price * pr.count}
                                  </span>{' '}
                                  грн
                                </span>
                              </div>
                              <div
                                style={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  lineHeight: '1.5',
                                }}
                              >
                                <span
                                  style={{
                                    lineHeight: '2',
                                  }}
                                >
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
                                {/* <span
                                    style={{
                                      color: 'rgb(134, 134, 134)',
                                      lineHeight: '1.5',
                                    }}
                                  >
                                    Сума
                                  </span> */}
                                {/* <span
                                    style={{ color: 'red', fontSize: '20px' }}
                                  >
                                    {pr.price * pr.count} грн
                                  </span> */}
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </div>
            <p style={{ textAlign: 'end' }}>
              Разом до оплати:
              <span style={{ fontWeight: '600' }}>{suma.toFixed(2)}</span> грн
            </p>
            <button
              type="submit"
              className="formLogin__btn--pr bgGreen btnHover"
              style={{ margin: '15px 0', width: '100%', color: '#fff' }}
            >
              ОФОРМИТИ ЗАМОВЛЕННЯ
            </button>
            {userAuth.isLoggedIn ? (
              ''
            ) : (
              <p style={{ textAlign: 'end', color: 'red', fontWeight: 500 }}>
                Для відслідковування відправки товару або <br /> інших
                можливостей будь ласка пройдіть авторизацію на сайті!
              </p>
            )}
          </div>
        </form>
      ) : (
        <>
          <p
            style={{
              textAlign: 'center',
              margin: '200px auto',
            }}
          >
            У вашому кошику немає товарів, перейдіть до нашого{' '}
            <Link
              style={{ textAlign: 'center', color: 'red' }}
              to="/productAll/new"
            >
              каталогу 
            </Link>
            щоб здійснити покупку
          </p>
        </>
      )}
    </div>
  );
};

export default Busket;
