import { useDispatch, useSelector } from 'react-redux';
import test from '../../image/testBuy.jpg';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { postBuyProduct } from 'redux/service';
import * as Yup from 'yup';
import { getProductLocalStorage } from 'redux/selector';
import { buyProductBusket, onDeleteProductBusket } from 'redux/operations';
import { chancheCounterValue } from 'redux/buyProduct-slice';
import { getAuth } from 'redux/authPer/auth-selector';

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

const Busket = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [suma, setSuma] = useState(0);
  // Відповідь від сервера після замовленя для переадресації
  const [res, setRes] = useState(null);
  // ЛС для передаваня в ордер
  const [data, setdata] = useState();
  const select = useSelector(getProductLocalStorage);
  const userAuth = useSelector(getAuth);
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
    dispatch(chancheCounterValue({ id, counter }));
  };
  // Запис в стейт
  useEffect(() => {
    if (select) {
      setdata(select);
    }
  }, [select]);

  // Перенаправлення на сторінку після покупки
  useEffect(() => {
    if (res) {
      navigate('/myorder');
    }
  }, [res, data, dispatch, navigate]);

  // Стейт форми покупки для відправки
  const initialValues = {
    name:
      data !== undefined && data && data.length > 0 ? userAuth.user.name : '',
    fename:
      data !== undefined && data && data.length > 0 ? userAuth.user.fename : '',
    email:
      data !== undefined && data && data.length > 0 ? userAuth.user.email : '',
    phone:
      data !== undefined && data && data.length > 0 ? userAuth.user.phone : '',
    comments: '-',
    city:
      data !== undefined && data && data.length > 0 ? userAuth.user.city : '',
    viddill: '',
    oplata: '',
  };

  // Відправка форми після замовлення
  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: values => {
      const result = window.confirm(`Ви піддтверджуєте свою покупку?`);
      if (result) {
        dispatch(buyProductBusket({ values, select }));
        navigate('/');
        // postBuyProduct({ values, select }).then(state => setRes(state));
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
      <div className="block__name">
        <Link
          to="/busket"
          style={{
            fontSize: '35px',
            marginLeft: '25px',
            textAlign: 'center',
            fontWeight: 900,
            margin: '15px',
          }}
        >
          | Кошик |
        </Link>
        <Link
          to="/myorder"
          style={{
            fontSize: '35px',
            marginLeft: '25px',
            textAlign: 'center',
            fontWeight: 900,
            margin: '15px',
          }}
        >
          | Мої Замовлення |
        </Link>
      </div>
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
            <label className="zak">
              <div className="formData">
                <h3>Контактні дані</h3>
                <div className="formData--label">
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
                        : { border: '1px solid gray' }
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
                        : { border: '1px solid gray' }
                    }
                  />
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
                        : { border: '1px solid gray' }
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
                        : { border: '1px solid gray' }
                    }
                  />
                </div>
                <textarea
                  type="text"
                  name="comments"
                  placeholder="Коментарі до замовлення"
                  onBlur={formik.handleBlur}
                  value={formik.values.comments}
                  onChange={handleInputChange}
                  style={{
                    width: '750px',
                    height: '80px',
                    borderRadius: '5px',
                    fontSize: '15px',
                    justifyContent: 'center',
                  }}
                />
              </div>
            </label>
            <label className="formData--post">
              Доставка "Нова Пошта" у віділення
              <input
                required
                type="text"
                placeholder="Місто/Населений пункт"
                name="city"
                onBlur={formik.handleBlur}
                onChange={handleInputChange}
                style={
                  formik.touched.city && formik.errors.city
                    ? { border: '1px solid red' }
                    : { border: '1px solid gray' }
                }
              />
              <input
                required
                type="text"
                placeholder="Віділення нової пошти"
                name="viddill"
                onBlur={formik.handleBlur}
                onChange={handleInputChange}
                style={
                  formik.touched.viddill && formik.errors.viddill
                    ? { border: '1px solid red' }
                    : { border: '1px solid gray' }
                }
              />
            </label>
            <div className="formData--post pay">
              <label required>
                <p> Способи оплати</p>
                <input
                  type="radio"
                  name="oplata"
                  onBlur={formik.handleBlur}
                  checked={formik.values.postOplata}
                  onChange={e => {
                    formik.setFieldValue(
                      'oplata',
                      'Післяоплата Нова Пошта, до оплати'
                    ); // Оновлюємо значення в formik
                  }}
                />
                Післяоплата Нова Пошта, до оплати буде
                <span> {suma.toFixed(2)} грн</span>
              </label>

              <label>
                <input
                  type="radio"
                  name="oplata"
                  onBlur={formik.handleBlur}
                  checked={formik.values.monoOplata}
                  onChange={e => {
                    formik.setFieldValue('oplata', 'Оплата на карту МоноБанку'); // Оновлюємо значення в formik
                  }}
                />
                Оплата на карту МоноБанку 1231234545 Радчів Михасік Поне до
                оплати
                <span> {suma.toFixed(2)} грн</span>
              </label>
              {formik.touched.oplata && formik.errors.oplata && (
                <div className="error" style={{ color: 'red' }}>
                  Ви не вибрали спосіб оплати
                </div>
              )}
            </div>
          </div>
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
                {data &&
                  data.length > 0 &&
                  data.map(pr => (
                    <li className="block__listBuy--item" key={pr._id}>
                      <button
                        style={{
                          color: 'red',
                          border: '2px solid red',
                          borderRadius: '100%',
                          height: '20px',
                          width: '20px',
                          marginTop: '10px',
                          position: 'absolute',
                          right: '10px',
                        }}
                        onClick={() => dispatch(onDeleteProductBusket(pr._id))}
                      >
                        X
                      </button>
                      <img
                        className="block__listBuy--img"
                        src={test}
                        alt="img"
                        width="100px"
                      />
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
                  ))}
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
