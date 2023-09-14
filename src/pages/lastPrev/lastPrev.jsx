import { useSelector } from 'react-redux';
import { getMyStore } from 'redux/selector';

const {
  default: CatalogeCard,
} = require('components/catalogeCard/CatalogeCard');

const LastPrev = () => {
  const product = useSelector(getMyStore);
  return (
    <div className="lastPrev">
      <h3 className="lastPrev__title">Остані переглянуті</h3>
      <ul className="lastPrev__gap">
        {product &&
          product.map(product => (
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
