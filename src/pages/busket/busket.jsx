import { useDispatch, useSelector } from 'react-redux';
import test from '../../image/testBuy.jpg';
import { counterSum } from 'redux/slice';
import { useFormik } from 'formik';
import { useState } from 'react';

const Busket = () => {
  const [isFormChanged, setIsFormChanged] = useState(true);
  const dispatch = useDispatch();
  const select = useSelector(state => state.persistedReducerAdd.product);
  // const userInfo = useSelector(state => console.log(state));

  // Зміна значення к-сть товарів для покупки в редакс=лс
  const chancheCountProduct = (e, id) => {
    const count = Number(e.target.value);
    dispatch(counterSum({ count, id }));
  };

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
    setIsFormChanged(true);
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
    setIsFormChanged(true);

    formik.setFieldValue('phone', value);
  };

  const isValid = field =>
    formik.touched[field] && formik.errors[field]
      ? 'is-invalid'
      : formik.touched[field]
      ? 'is-valid'
      : '';

  return (
    <div>
      <h2 style={{ fontSize: '35px', marginLeft: '25px' }}>Кошик</h2>
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
                  type="text"
                  name="name"
                  placeholder="Імя"
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="fename"
                  placeholder="Прізвище"
                  onBlur={formik.handleBlur}
                  value={formik.values.fename}
                  onChange={handleInputChange}
                />
                <input
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
              type="text"
              placeholder="Місто"
              name="city"
              onBlur={formik.handleBlur}
              onChange={handleInputChange}
            />
            <input
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
              Післяоплата Нова Пошта, до оплати
              <span> 2 567.00 грн</span>
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
              Оплата на карту МоноБанку 1231234545 Радчів Михасік Понеу, до
              оплати
              <span> 2 567.00 грн</span>
            </label>
          </div>
        </div>
        <div className="formData--buy">
          <h3>Ваші замовлення</h3>
          <div className="block__listBuy">
            <ul>
              {select &&
                select.map(pr => (
                  <li className="block__listBuy--item" key={pr._id}>
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
              <button
                style={{
                  color: 'red',
                  border: '2px solid red',
                  borderRadius: '100%',
                  height: '20px',
                  width: '20px',
                  marginTop: '10px',
                }}
              >
                X
              </button>
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
