import { BsFillArrowDownSquareFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { apruveProduct, getSellAllProductAdm } from 'redux/operations';

const SellProduct = () => {
  const [stateHistory, setStateHistory] = useState([]);
  const [ttn, setTtn] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(getSellAllProductAdm());
        setStateHistory(response.payload);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [dispatch]);

  const appendProduct = (id, status) => {
    if (status === 'apruve') {
      return dispatch(apruveProduct({ id, ttn: 'pending' }));
    } else if (status === 'send' && ttn) {
      return dispatch(apruveProduct({ id, ttn }));
    } else if (status === 'cancell') {
      return dispatch(apruveProduct({ id,ttn: 'rejected' }));
    }
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
                          ' підтвердження') ||
                          (pr.status === 'rejected' && 'Скасовано') ||
                          (pr.status === 'fullfild' && 'Відправлено')}
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
                    //   onClick={() => toggleAddInfo(index)} // Використовуйте функцію для зміни стану для конкретного елементу
                  >
                    <BsFillArrowDownSquareFill />
                  </button>
                </div>
                <div
                // className={
                //   addInfoArray[index]
                //     ? 'list__store--mainBlock none'
                //     : 'list__store--mainBlock '
                // }
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
                  <form>
                    <label htmlFor="ttn">
                      Номер накладної
                      <input
                        onChange={e => setTtn(e.target.value)}
                        value={ttn}
                        style={{ border: '1px solid gray' }}
                        type="text"
                        id="ttn"
                        placeholder="ТТН"
                        required
                      />
                    </label>
                    <button
                      type="submit"
                      style={{
                        backgroundColor: 'green',
                        color: 'white',
                        padding: '10px',
                        borderRadius: '10px',
                      }}
                      onClick={() => appendProduct(pr._id, 'send')}
                    >
                      Відправлено
                      <br />
                      замовлення
                    </button>
                  </form>
                  <button
                    type="button"
                    style={{
                      backgroundColor: 'red',
                      color: 'white',
                      padding: '10px',
                      borderRadius: '10px',
                    }}
                    onClick={() => appendProduct(pr._id, 'cancell')}
                  >
                    Скасувати
                    <br />
                    замовлення
                  </button>
                  <button
                    type="button"
                    style={{
                      backgroundColor: 'orange',
                      color: 'white',
                      padding: '10px',
                      borderRadius: '10px',
                    }}
                    onClick={() => appendProduct(pr._id, 'apruve')}
                  >
                    Підтвердити
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

export default SellProduct;
