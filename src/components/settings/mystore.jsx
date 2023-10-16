import { BsFillArrowDownSquareFill } from 'react-icons/bs';
import { useState, useEffect } from 'react';
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

  // Створимо масив станів для кожного елементу інформації
  const [addInfoArray, setAddInfoArray] = useState(
    new Array(stateHistory.length).fill(true)
  );

  // Функція для зміни стану для конкретного елементу інформації
  const toggleAddInfo = index => {
    const newArray = [...addInfoArray];
    newArray[index] = !newArray[index];
    setAddInfoArray(newArray);
  };

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
            stateHistory.map((pr, index) => (
              <li className="list__store--item" key={pr._id}>
                <div className="list__store--mainBlock">
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <div
                      className="status__pr"
                      style={{
                        backgroundColor:
                          (pr.status === 'wait' && 'gray') ||
                          (pr.status === 'pending' && 'orange') ||
                          (pr.status === 'rejected' && 'red') ||
                          (pr.status === 'fullfild' && 'green'),
                      }}
                    ></div>
                    <span>
                      № {pr._id.slice(18, 30)} від {pr.createdAt.slice(0, 10)}
                      <br />
                      <span>
                        {(pr.status === 'pending' &&
                          'Підтверджено замовлення, очікування відправки') ||
                          (pr.status === 'rejected' &&
                            'Замовлення скасовано') ||
                          (pr.status === 'fullfild' &&
                            `Замовлення відправлено: номер ттн ${pr.ttn}`)}
                      </span>
                    </span>
                  </div>
                  <ul className="list__product--user">
                    {pr.select.map(product => (
                      <li
                        style={{ display: 'flex', gap: '15px' }}
                        key={product._id}
                      >
                        <p>{product.name}</p>
                        <p>
                          Ціна: <br />
                          <span>{product.price} грн</span>
                        </p>
                        <p>
                          Кількість: <br />
                          <span>{product.count} грн</span>
                        </p>
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
                      </li>
                    ))}
                  </ul>
                  <button
                    style={{
                      marginLeft: '15px',
                      fontSize: '25px',
                      color: 'green',
                    }}
                    onClick={() => toggleAddInfo(index)} // Використовуйте функцію для зміни стану для конкретного елементу
                  >
                    <BsFillArrowDownSquareFill />
                  </button>
                </div>
                <div
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
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};
export default MyStore;
