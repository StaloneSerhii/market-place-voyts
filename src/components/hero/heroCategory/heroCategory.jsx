import { Link } from 'react-router-dom';

const HeroCategory = ({ effect }) => {
  return (
    <div className={effect ? 'hero_category noneTransition' : 'hero_category '}>
      <div className="borderDec "></div>
      <ul className="category_list">
        <li className="category_item">
          <Link to="productNEW" className="category_link">
            НОВІ ЗАПЧАСТИНИ
          </Link>
        </li>
        <li className="category_item">
          <Link to="productBY" className="category_link">
            ЗАПЧАСТИНИ Б/У
          </Link>
        </li>
        <li className="category_item">
          <Link to="/" className="category_link">
            АКЦІЙНІ ПРОПОЗИЦІЇ
          </Link>
        </li>
        <li className="category_item">
          <Link to="/" className="category_link">
            СГ ТЕХНІКА
          </Link>
        </li>
        <li className="category_item">
          <Link to="/" className="category_link">
            НАВІСНЕ ОБЛАДНАННЯ
          </Link>
        </li>
      </ul>
    </div>
  );
};
export default HeroCategory;
