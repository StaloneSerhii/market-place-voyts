import { useSelector } from 'react-redux';
import { getAuthStatus } from 'redux/authPer/auth-selector';

const BuyModalSuc = () => {
  const select = useSelector(
    state => state.persistedReducerAdd.buyProduct.userPr.history
  );
  const selectAuth = useSelector(getAuthStatus);

  return (
    <div className="order">
      <h3>Ваші замовлення</h3>
      <ul className="formData--label">
        {!selectAuth && select ? (
          select.map(pr => (
            <li key={pr._id}>
              <img src={pr.img[0]} alt="imgProduct" width="250" />
              <p>{pr.name}</p>
              <p>{pr.price} грн</p>
              <p>{pr.count} шт</p>
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
