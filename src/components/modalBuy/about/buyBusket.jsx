import React from 'react';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

const BuyBusketModal = ({ onClose }) => {
  return ReactDOM.createPortal(
    <div className="modal" id="modal-root">
      <div className="modal__block">
        <div>
          <p className="modal__text">Товар додано в кошик</p>
          <button onClick={onClose}>x</button>
        </div>
        <div className="modal__text--block">
          <Link className="modal__btn" to="/">
            ПЕРЕЙТИ В КОШИК
          </Link>
          <Link className="modal__btn send" to="/" onClick={onClose}>
            ПРОДОВЖИТИ ПОКУПКИ
          </Link>
        </div>
      </div>
    </div>,
    modalRoot
  );
};

export default BuyBusketModal;
