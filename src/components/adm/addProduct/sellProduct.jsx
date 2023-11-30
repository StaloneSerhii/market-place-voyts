import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { apruveProduct, getSellAllProductAdm } from 'redux/operations';
import DetailInfo from 'components/settings/modalDetail';
import { Autocomplete, TextField } from '@mui/material';
import Notiflix from 'notiflix';

const SellProduct = () => {
  const [stateHistory, setStateHistory] = useState([]);
  const [statusPr, setStasusPr] = useState({ status: '', label: '' });
  const [ttn, setTtn] = useState();
  const dispatch = useDispatch();

  const [omenModals, setOmenModals] = useState({});

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

  const appendProduct = id => {
    if (statusPr.status === 'pending') {
      return dispatch(apruveProduct({ id, status: 'pending', ttn: '' })).then(
        resp => {
          if (resp?.meta.requestStatus === 'fulfilled') {
            window.location.reload();
          }
        }
      );
    } else if (statusPr.status === 'fulffild' && ttn) {
      return dispatch(apruveProduct({ id, status: 'fullfild', ttn })).then(
        resp => {
          if (resp?.meta.requestStatus === 'fulfilled') {
            window.location.reload();
          }
        }
      );
    } else if (statusPr.status === 'rejected') {
      return dispatch(apruveProduct({ id, status: 'rejected', ttn: '' })).then(
        resp => {
          if (resp?.meta.requestStatus === 'fulfilled') {
            window.location.reload();
          }
        }
      );
    } else if (statusPr.status === 'fulffild' && !ttn) {
      return Notiflix.Notify.warning('Вкажіть номер ТТН');
    }
  };

  const openModal = productId => {
    setOmenModals(prevModals => ({ ...prevModals, [productId]: true }));
  };

  const closeModal = productId => {
    setOmenModals(prevModals => ({ ...prevModals, [productId]: false }));
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
                  <Autocomplete
                    disablePortal
                    onChange={(_, value) => setStasusPr(value)}
                    id="combo-box-demo"
                    options={[
                      {
                        status: 'fulffild',
                        label: 'Відправлено',
                      },
                      { status: 'pending', label: 'Підтвердити замовлення' },
                      { status: 'rejected', label: 'Скасувати' },
                    ]}
                    sx={
                      (pr.status === 'wait' && {
                        background: 'gray',
                        width: '300px',
                      }) ||
                      (pr.status === 'pending' && {
                        background: 'yellow',
                        width: '300px',
                      }) ||
                      (pr.status === 'fullfild' && {
                        background: 'green',
                        width: '300px',
                      }) ||
                      (pr.status === 'rejected' && {
                        background: 'red',
                        width: '300px',
                      })
                    }
                    renderInput={params => (
                      <TextField
                        {...params}
                        label={
                          (pr.status === 'wait' && 'Очікує підтвердження') ||
                          (pr.status === 'pending' && 'Підтвердежно покупку') ||
                          (pr.status === 'fullfild' && 'Товар відправлено') ||
                          (pr.status === 'rejected' && 'Скасовано покупку')
                        }
                      />
                    )}
                  />
                  <input
                    required
                    onChange={e => setTtn(e.target.value)}
                    placeholder="номер ТТН"
                    type="text"
                    name="ttn"
                    id="ttn"
                    style={
                      statusPr.label !== 'Відправлено'
                        ? { display: 'none' }
                        : { display: 'block', border: '1px solid black' }
                    }
                  />
                  <button
                    onClick={() => appendProduct(pr._id)}
                    style={{ padding: '4px', background: 'green' }}
                  >
                    підтвердити
                  </button>
                  <button onClick={() => openModal(pr._id)}>
                    Детальні інформація
                  </button>
                  <DetailInfo
                    openState={omenModals[pr._id] || false}
                    setOpen={isOpen =>
                      isOpen ? openModal(pr._id) : closeModal(pr._id)
                    }
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

export default SellProduct;
