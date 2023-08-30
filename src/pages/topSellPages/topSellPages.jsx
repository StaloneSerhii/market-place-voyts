import TopSell from 'components/topSell/topSell';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useSpring, animated } from 'react-spring';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { getTopBuyProduct } from 'redux/service';
import { useState } from 'react';

const TopSellPages = () => {
  const [data, setData] = useState();
  const [ref, inView] = useInView({
    triggerOnce: true, // Анімація відбудеться тільки раз
    threshold: 0.5, // Поріг видимості секції
  });

  const sectionAnimation = useSpring({
    opacity: inView ? 1 : 0, // Властивість для анімації
    transform: inView ? 'translateX(0)' : 'translateX(-70%)', // Інша властивість для анімації
    config: { duration: 1000 },
  });

  useEffect(() => {
    getTopBuyProduct().then(state => setData(state));
  }, []);
  console.log(data);
  return (
    <div ref={ref} className="cataloge animated-section">
      <animated.div style={sectionAnimation} className="section-content">
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
        <ul className="cataloge__gap top">
          {data &&
            data.map(({ select }) => (
              <li key={select[0]._id}>
                <TopSell
                  price={select[0].price}
                  name={select[0].name}
                  img={select[0].img[0]}
                />
              </li>
            ))}
        </ul>
      </animated.div>
    </div>
  );
};

export default TopSellPages;
