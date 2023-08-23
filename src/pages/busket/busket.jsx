import { useDispatch, useSelector } from 'react-redux';
import test from '../../image/testBuy.jpg';
import { counterSum } from 'redux/slice';

const Busket = () => {
  const dispatch = useDispatch();
  const select = useSelector(state => state.product);
  console.log(select);
  const buyProduct = event => {
    dispatch(
      counterSum({
        id: 131,
        counter: event.target.value,
      })
    );
  };
  return (
    <div>
      <h2 style={{ fontSize: '35px', marginLeft: '25px' }}>Кошик</h2>
      <form
        style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}
      >
        <div>
          <label className="zak">
            <div className="formData">
              <h3>Контактні дані</h3>
              <div className="formData--label">
                <input type="text" placeholder="Імя" />
                <input type="text" placeholder="Прізвище" />
                <input type="tel" placeholder="Номер телефону" />
                <input type="email" placeholder="Email" />
              </div>
              <textarea
                type="text"
                placeholder="Коментарі до замовлення"
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
            <input type="text" placeholder="Місто" />
            <input type="text" placeholder="Віділення" />
          </label>
          <div className="formData--post pay">
            <label>
              <p> Способи оплати</p>
              <input type="radio" name="opl" />
              Післяоплата Нова Пошта, до оплати
              <span> 2 567.00 грн</span>
            </label>
            <label>
              <input type="radio" name="opl" />
              Оплата на карту МоноБанку 1231234545 Радчів Михасік Понеу, до
              оплати 2 567.00 грн
              <span> 2 567.00 грн</span>
            </label>
          </div>
        </div>
        <div className="formData--buy">
          <h3>Ваші замовлення</h3>
          <div className="block__listBuy">
            <ul>
              <li className="block__listBuy--item">
                <img
                  className="block__listBuy--img"
                  src={test}
                  alt="img"
                  width="100px"
                />
                <div style={{ display: 'flex' }}>
                  <div>
                    <p className="block__listBuy--name">
                      Тяга МТЗ навісна блаблабла
                    </p>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: '15px',
                      marginLeft: '15px',
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span
                        style={{
                          color: 'rgb(134, 134, 134)',
                          lineHeight: '1.5',
                        }}
                      >
                        Ціна
                      </span>
                      <span style={{ fontSize: '20px' }}>2 567.00 грн/шт</span>
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
                          onChange={buyProduct}
                          value={select[0].counter}
                        />
                      </label>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span
                        style={{
                          color: 'rgb(134, 134, 134)',
                          lineHeight: '1.5',
                        }}
                      >
                        Сума
                      </span>
                      <span style={{ color: 'red', fontSize: '20px' }}>
                        2564.00 грн
                      </span>
                    </div>
                  </div>
                </div>
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
              </li>
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
