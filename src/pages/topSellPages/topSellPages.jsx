import TopSell from 'components/topSell/topSell';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const TopSellPages = () => {
  return (
    <div className="cataloge">
      <div className="cataloge__top">
        <h3 className="cataloge__title">Топ продажів</h3>
        <div>
          <button className="top__btn--left">
            <FiChevronLeft />
          </button>
          <button className="top__btn--right">
            <FiChevronRight />
          </button>
        </div>
      </div>
      <div className="cataloge__gap top">
        <TopSell />
        <TopSell />
        <TopSell />
        <TopSell />
        <TopSell />
      </div>
    </div>
  );
};

export default TopSellPages;
