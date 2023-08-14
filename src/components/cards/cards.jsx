import track from '../../image/cards.jpg';
import { FiChevronRight } from 'react-icons/fi';

const Cards = () => {
  return (
    <div className="cards">
      <div className="block_bg"></div>
      <ul className="cards_list">
        <li className="cards__item">
          <div className="cards__link" href="/">
            <img src={track} alt="" className="cards_img" width={450} />
          </div>
          <h3 className="cards_text">
            НАВІСНЕ <br />
            <span className="cards_span">ОБЛАДНАННЯ </span>
            <span>
              <FiChevronRight className="cards_span--arrow" />
            </span>
          </h3>
        </li>
        <li className="cards__item">
          <div className="cards__link" href="/">
            <img src={track} alt="" className="cards_img" width={450} />
          </div>
          <h3 className="cards_text">
            Продаж <br />
            <span className="cards_span">СГТ</span>
            <span>
              <FiChevronRight className="cards_span--arrow" />
            </span>
          </h3>
        </li>
        <li className="cards__item">
          <div className="cards__link" href="/">
            <img src={track} alt="" className="cards_img" width={450} />
          </div>
          <h3 className="cards_text">
            Акційні <br />
            <span className="cards_span">пропозиції</span>
            <span>
              <FiChevronRight className="cards_span--arrow" />
            </span>
          </h3>
        </li>
      </ul>
    </div>
  );
};

export default Cards;
