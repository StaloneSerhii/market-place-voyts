import TopSell from 'components/topSell/topSell';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useSpring, animated } from 'react-spring';
import { useInView } from 'react-intersection-observer';

const TopSellPages = () => {
  const [ref, inView] = useInView({
    triggerOnce: true, // Анімація відбудеться тільки раз
    threshold: 0.5, // Поріг видимості секції
  });

  const sectionAnimation = useSpring({
    opacity: inView ? 1 : 0, // Властивість для анімації
    transform: inView ? 'translateX(0)' : 'translateX(-70%)', // Інша властивість для анімації
    config: { duration: 1000 },
  });

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
        <div className="cataloge__gap top">
          <TopSell />
          <TopSell />
          <TopSell />
          <TopSell />
          <TopSell />
        </div>
      </animated.div>
    </div>
  );
};

export default TopSellPages;
