import track from '../../image/cards.jpg';
import { FiChevronRight } from 'react-icons/fi';

const Cards = () => {
  return (
    <div className="cards">
      <div className="block_bg"></div>
      <ul className="cards_list">
        <li className="cards__item">
          <a className="cards__link" href="/">
            <img src={track} alt="" className="cards_img" width={450} />
            <h3 className="cards_text">
              Machine <br />
              <span className="cards_span">Servicing </span>
              <span>
                <FiChevronRight className="cards_span--arrow" />
              </span>
            </h3>
          </a>
        </li>
        <li className="cards__item">
          <a className="cards__link" href="/">
            <img src={track} alt="" className="cards_img" width={450} />
            <h3 className="cards_text">
              Machine <br />
              <span className="cards_span">Servicing</span>
              <span>
                <FiChevronRight className="cards_span--arrow" />
              </span>
            </h3>
          </a>
        </li>
        <li className="cards__item">
          <a className="cards__link" href="/">
            <img src={track} alt="" className="cards_img" width={450} />
            <h3 className="cards_text">
              Акційні <br />
              <span className="cards_span">пропозиції</span>
              <span>
                <FiChevronRight className="cards_span--arrow" />
              </span>
            </h3>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Cards;
