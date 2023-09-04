import { useSelector } from 'react-redux';

const BuyModalSuc = () => {
  const select = useSelector(state => state.persistedReducerAdd.myOrder);

  return (
    <div className="order">
      <h3>Ваші замовлення</h3>
      <ul className="formData--label">
        {select.length > 0 ? (
          select.map(pr => (
            <li>
              <img src={pr[0].img[0]} alt="imgProduct" width="250" />
              <p>{pr[0].name}</p>
              <p>{pr[0].price} грн</p>
              <p>{pr[0].coun} шт</p>
            </li>
          ))
        ) : (
          <p>У вас ще не має замовлень</p>
        )}
      </ul>
    </div>
  );
};

export default BuyModalSuc;
