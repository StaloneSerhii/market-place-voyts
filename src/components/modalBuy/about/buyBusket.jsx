import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import test from '../../../image/testBuy.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { chancheCounterValue } from 'redux/buyProduct-slice';
import { getProductLocalStorage } from 'redux/selector';
import { chanchValueProductCounter } from 'redux/operations';
import { useEffect } from 'react';

const modalRoot = document.querySelector('#modal-root');

const BuyBusketModal = ({ product, onClose }) => {
  const [val, setVal] = useState(1);
  const [idSend, setidSend] = useState(1);
  const dispatch = useDispatch();
  const authData = useSelector(getProductLocalStorage);

  // Покупка зі зміною кількості товару в стейті
  const buyProduct = e => {
    setVal(Number(e.target.value));
    const counter = Number(e.target.value);
    const id = authData[authData.length - 1]._id;
    dispatch(chancheCounterValue({ id, counter }));
  };

  useEffect(() => {
    if (authData && authData.length > 0) {
      setidSend(authData[authData.length - 1]._id);
    }
  }, [authData]);

  const sendValueProduct = () => {
    if (val > 1) {
      dispatch(chanchValueProductCounter({ productId: idSend, newCount: val }));
    }
  };

  return ReactDOM.createPortal(
    <div className="modal" id="modal-root">
      <div className="modal__block">
        <div>
          <p className="modal__text">Ваші товари</p>
        </div>
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
                  <p className="block__listBuy--name">{product.name}</p>
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
                      style={{ color: 'rgb(134, 134, 134)', lineHeight: '1.5' }}
                    >
                      Ціна
                    </span>
                    <span style={{ fontSize: '20px' }}>
                      {product.price} грн/шт
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
                        onChange={buyProduct}
                        type="number"
                        name="weight"
                        min="1"
                        max="200"
                        step="1"
                        value={val}
                      />
                    </label>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span
                      style={{ color: 'rgb(134, 134, 134)', lineHeight: '1.5' }}
                    >
                      Сума
                    </span>
                    <span style={{ color: 'red', fontSize: '20px' }}>
                      {product.price * val} грн
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
                onClick={onClose}
              >
                X
              </button>
            </li>
          </ul>
        </div>
        <div className="modal__text--block">
          <Link className="modal__btn send" to="/" onClick={sendValueProduct}>
            ПРОДОВЖИТИ ПОКУПКИ
          </Link>
          <div className="modal__text--price">
            <span>{product.price * val} грн</span>
            <Link
              className="modal__btn "
              to="/busket"
              onClick={sendValueProduct}
            >
              ОФОРМИТИ ЗАМОВЛЕННЯ
            </Link>
          </div>
        </div>
      </div>
    </div>,
    modalRoot
  );
};

export default BuyBusketModal;
