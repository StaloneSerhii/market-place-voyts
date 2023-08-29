import { useDispatch, useSelector } from 'react-redux';
import test from '../../image/testBuy.jpg';
import { counterSum, onDeleteProductBusket } from 'redux/slice';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';

const Busket = () => {
  const [suma, setSuma] = useState(null);
  const dispatch = useDispatch();
  const select = useSelector(state => state.persistedReducerAdd.product);
  // const userInfo = useSelector(state => console.log(state));

  // Зміна значення к-сть товарів для покупки в редакс=лс
  const chancheCountProduct = (e, id) => {
    const count = Number(e.target.value);
    dispatch(counterSum({ count, id }));
  };

  useEffect(() => {
    let totalPrice = 0;
    if (select) {
      for (const pr of select) {
        const productTotal = pr.price * pr.coun;
        totalPrice += productTotal;
      }
    }
    setSuma(totalPrice.toFixed(2));
  }, [select]);

  const initialValues = {
    name: '',
    fename: '',
    email: '',
    phone: '',
    comments: '',
    city: '',
    viddil: '',
    oplata: '',
  };
  const formik = useFormik({
    initialValues,
    // validationSchema: validationSchema,
    onSubmit: values => {
      console.log(values);
      // dispatch(updateUser(values));
    },
  });
  const handleInputChange = event => {
    const { name, value } = event.target;
    console.log(event);
    formik.setFieldValue(name, value);
  };

  // редактор введення телефону
  const handlePhoneNumberChange = (e, setFieldValue) => {
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

  // const isValid = field =>
  //   formik.touched[field] && formik.errors[field]
  //     ? 'is-invalid'
  //     : formik.touched[field]
  //     ? 'is-valid'
  //     : '';

  return (
    <div>
      <h2
        style={{
          fontSize: '35px',
          marginLeft: '25px',
          textAlign: 'center',
          fontWeight: 900,
          margin: '15px',
        }}
      >
        Кошик
      </h2>
      <form
        onSubmit={formik.handleSubmit}
        style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}
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
                  type="tel"
                  name="phone"
                  placeholder="Номер телефону"
                  onBlur={formik.handleBlur}
                  value={formik.values.phone}
                  onChange={handlePhoneNumberChange}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  onChange={handleInputChange}
                />
              </div>
              <textarea
                type="text"
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
              placeholder="Місто"
              name="city"
              onBlur={formik.handleBlur}
              onChange={handleInputChange}
            />
            <input
              required
              type="text"
              placeholder="Віділення"
              name="viddill"
              onBlur={formik.handleBlur}
              onChange={handleInputChange}
            />
          </label>
          <div className="formData--post pay">
            <label>
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
              <span> {suma} грн</span>
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
              Оплата на карту МоноБанку 1231234545 Радчів Михасік Поне до оплати
              <span> {suma} грн</span>
            </label>
          </div>
        </div>
        <div className="formData--buy">
          <h3>Ваші замовлення</h3>
          <div className="block__listBuy">
            <ul
              style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
            >
              {select &&
                select.map(pr => (
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
                          style={{ display: 'flex', flexDirection: 'column' }}
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
                              onChange={e => chancheCountProduct(e, pr._id)}
                              value={Number(pr.coun)}
                            />
                          </label>
                        </div>
                        <div
                          style={{ display: 'flex', flexDirection: 'column' }}
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
                            {pr.price * pr.coun} грн
                          </span>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              <p style={{ textAlign: 'end', marginRight: '10px' }}>
                Разом до оплати: {suma} грн
              </p>
            </ul>
          </div>
          <button
            type="submit"
            className="modal__btn "
            style={{ marginTop: '15px' }}
          >
            ОФОРМИТИ ЗАМОВЛЕННЯ
          </button>
        </div>
      </form>
    </div>
  );
};

export default Busket;
