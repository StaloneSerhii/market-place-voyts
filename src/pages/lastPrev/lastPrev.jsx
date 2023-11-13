import { useSelector } from 'react-redux';
import { getMyStore } from 'redux/selector';

const {
  default: CatalogeCard,
} = require('components/catalogeCard/CatalogeCard');

const LastPrev = () => {
  const product = useSelector(getMyStore);

  return (
    <div className="cataloge animated-section">
      <h3 className="cataloge__title">Остані переглянуті</h3>
      <ul className="lastPrev__gap">
        {product &&
          product.slice(0, 3).map(product => (
            <li key={product._id}>
              <CatalogeCard
                name={product.name}
                price={product.price}
                id={product._id}
                img={product.img}
                code={product.code}
              />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default LastPrev;
