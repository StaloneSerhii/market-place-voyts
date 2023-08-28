import React from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactDOM from 'react-dom';
import test from '../../../image/testBuy.jpg';
import { useDispatch } from 'react-redux';
import { counterSum } from 'redux/slice';
// import { useState } from 'react';

const modalRoot = document.querySelector('#modal-root');

const BuyBusketModal = ({ onClose }) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const buyProduct = e => {
    const event = e.target.value;
    dispatch(counterSum({ event, id }));
  };

  // const [counter, setCounter] = useState(1);
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
                      style={{ color: 'rgb(134, 134, 134)', lineHeight: '1.5' }}
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
                        onChange={buyProduct}
                        type="number"
                        name="weight"
                        min="1"
                        max="200"
                        step="1"
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
                onClick={onClose}
              >
                X
              </button>
            </li>
          </ul>
        </div>
        <div className="modal__text--block">
          <Link className="modal__btn send" to="/">
            ПРОДОВЖИТИ ПОКУПКИ
          </Link>
          <div className="modal__text--price">
            <span>2 567,00 грн</span>
            <Link className="modal__btn " to="/busket" onClick={onClose}>
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
