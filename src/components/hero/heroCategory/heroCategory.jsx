import { Link } from 'react-router-dom';

const HeroCategory = ({ effect }) => {
  return (
    <div className={effect ? 'hero_category noneTransition' : 'hero_category '}>
      <div className="borderDec "></div>
      <ul className="category_list">
        <li className="category_item">
          <Link to="/productAll/new" className="category_link">
            Нові запчастини
          </Link>
        </li>
        <li className="category_item">
          <Link to="/productAll/by" className="category_link">
            Запчастини б/у
          </Link>
        </li>
        <li className="category_item">
          <Link to="/find" className="category_link">
            Знайди запчастину
          </Link>
        </li>
        <li className="category_item">
          <Link to="/video" className="category_link">
            Відео
          </Link>
        </li>
      </ul>
    </div>
  );
};
export default HeroCategory;
