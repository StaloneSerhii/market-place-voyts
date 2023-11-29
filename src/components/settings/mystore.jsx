import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getHistoryProduct } from 'redux/operations';
import { Link } from 'react-router-dom';
import DetailInfo from './modalDetail';
import { useState } from 'react';
const MyStore = () => {
  const dispatch = useDispatch();
  const [omenModal, setOpenModal] = useState(false);

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
        {/* <div className="block__filter" style={{ margin: '0' }}>
          <input type="text" placeholder="Пошук" className="find__input" />
          <div className="line"></div>
          <select id="size" name="size">
            <option value="last" select="true">
              Остані додані
            </option>
            <option value="expensive">Від дорогих до дешевих</option>
            <option value="cheap">Від дешевих до дорогих</option>
          </select>
        </div> */}
        <ul className="list__store">
          {stateHistory.length > 0 &&
            stateHistory.map(pr => (
              <li className="list__store--item" key={pr._id}>
                {pr.select.map(product => (
                  <div className="list__store--mainBlock">
                    <Link to={`/product/${product._id}`}>
                      <img src={product.img[0]} alt="img" width="110px" />
                    </Link>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        height: '100px',
                      }}
                    >
                      <p style={{ fontSize: '20px' }}>{product.name}</p>
                      <div>
                        <p>
                          Сума замовлення:
                          <span style={{ fontWeight: '500' }}>
                            {product.price * product.count} грн
                          </span>
                        </p>
                        <p>
                          Кількість:
                          <span style={{ fontWeight: '500' }}>
                            {product.count} грн
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '100px',
                  }}
                >
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
                        (pr.status === 'fullfild' && '#009C2C') ||
                        (pr.status === 'rejected' && '#D60101') ||
                        (pr.status === 'pending' && '#E49702'),
                    }}
                  >
                    {(pr.status === 'wait' && 'Очікує підтвердження') ||
                      (pr.status === 'fullfild' && 'Відправлено') ||
                      (pr.status === 'rejected' && 'Скасовано') ||
                      (pr.status === 'pending' && 'Очікує відправлення')}
                  </div>
                  <button onClick={() => setOpenModal(true)}>
                    Детальні інформація
                  </button>
                  <DetailInfo
                    openState={omenModal}
                    setOpen={setOpenModal}
                    pr={pr}
                  />
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};
export default MyStore;
