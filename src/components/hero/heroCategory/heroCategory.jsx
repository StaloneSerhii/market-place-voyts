import { Link } from 'react-router-dom';

const HeroCategory = ({ effect }) => {
  return (
    <div className={effect ? 'hero_category noneTransition' : 'hero_category '}>
      <div className="borderDec "></div>
      <ul className="category_list">
        <li className="category_item">
          <Link to="productNEW" className="category_link">
            Нові запчастини
          </Link>
        </li>
        <li className="category_item">
          <Link to="productBY" className="category_link">
            Запчастини б/у
          </Link>
        </li>
        <li className="category_item">
          <Link to="/" className="category_link">
            Акційні пропозиції
          </Link>
        </li>
        <li className="category_item">
          <Link to="/" className="category_link">
            С/Г техніка
          </Link>
        </li>
        <li className="category_item">
          <Link to="/" className="category_link">
            Навісне С/Г обладнення
          </Link>
        </li>
      </ul>
    </div>
  );
};
export default HeroCategory;
