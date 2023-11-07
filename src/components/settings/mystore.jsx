import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getHistoryProduct } from 'redux/operations';
import { Link } from 'react-router-dom';

const MyStore = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getHistoryProduct());
  }, [dispatch]);
  const stateHistory = useSelector(
    state => state.persistedReducerAdd.buyProduct.history
  );

  return (
    <div className="mystore">
      <h3 className="mystore__h3">Мої замовлення</h3>
      <div className="mystore__info">
        <div className="block__filter" style={{ margin: '0' }}>
          <input type="text" placeholder="Пошук" className="find__input" />
          <div className="line"></div>
          <select id="size" name="size">
            <option value="last" select="true">
              Остані додані
            </option>
            <option value="expensive">Від дорогих до дешевих</option>
            <option value="cheap">Від дешевих до дорогих</option>
          </select>
        </div>
        <ul className="list__store">
          {stateHistory.length > 0 &&
            stateHistory.map(pr => (
              <li className="list__store--item" key={pr._id}>
                <div className="list__store--mainBlock">
                  {pr.select.map(product => (
                    <li
                      style={{ display: 'flex', gap: '15px' }}
                      key={product._id}
                    >
                      <Link
                        to={`/product/${product._id}`}
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}
                      >
                        <img src={product.img[0]} alt="img" width="110px" />
                      </Link>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                        }}
                      >
                        <p>{product.name}</p>
                        <div>
                          <p>
                            Сума замовлення:
                            <span>{product.price * product.count} грн</span>
                          </p>
                          <p>
                            Кількість:
                            <span>{product.count} грн</span>
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </div>
                <div
                  style={{
                    width: '220px',
                    padding: '10px 16px',
                    borderRadius: '8px',
                    textAlign: 'center',
                    color: '#fff',
                    fontSize: '16px',
                    background:
                      (pr.status === 'wait' && '#939292') ||
                      (pr.status === 'fulffild' && '#009C2C') ||
                      (pr.status === 'cancell' && '#D60101') ||
                      (pr.status === 'pending' && '#E49702'),
                  }}
                >
                  {(pr.status === 'wait' && 'Очікує підтвердження') ||
                    (pr.status === 'fulffild' && 'Відправлено') ||
                    (pr.status === 'cancell' && 'Скасовано') ||
                    (pr.status === 'pending' && 'Очікує відправлення')}
                </div>
                {/* <div
                  className={
                    addInfoArray[index]
                      ? 'list__store--mainBlock none'
                      : 'list__store--mainBlock '
                  }
                >
                  <p>
                    Оплата:
                    <br />
                    <span>{pr.values.oplata.slice(0, 22)}</span>
                  </p>
                  <p>
                    Замовник: <br />
                    <span>
                      {pr.values.name}
                      {pr.values.fename}
                    </span>
                  </p>
                  <p>
                    Доставка:
                    <br /> <span>міто: {pr.values.city}</span>
                    <br />
                    <span>Віділення: {pr.values.viddill}</span>
                  </p>
                  <button
                    type="button"
                    disabled={pr.status === 'pending' && 'true'}
                    style={{
                      backgroundColor: pr.status === 'pending' ? 'red' : 'gray',
                      color: 'white',
                      padding: '10px',
                      borderRadius: '10px',
                    }}
                  >
                    Скасувати
                    <br />
                    замовлення
                  </button>
                </div> */}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};
export default MyStore;
