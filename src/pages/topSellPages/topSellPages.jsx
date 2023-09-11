import React, { useState, useEffect, useCallback } from 'react';
import TopSell from 'components/topSell/topSell';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useSpring, animated } from 'react-spring';
import { useInView } from 'react-intersection-observer';
import { getTopBuyProduct } from 'redux/service';

const TopSellPages = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [data, setData] = useState();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const sectionAnimation = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateX(0)' : 'translateX(-60%)',
    config: { duration: 1000 },
  });

  const prevSlide = useCallback(() => {
    setCurrentIndex(prevIndex => (prevIndex === 0 ? 0 : prevIndex - 1));
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex(prevIndex => (prevIndex === lastIndex ? 2 : prevIndex + 1));
  }, []);

  const lastIndex = 2;

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex === 0) {
        nextSlide();
      } else if (currentIndex === 3) {
        prevSlide();
      }
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [currentIndex, prevSlide, nextSlide]);

  useEffect(() => {
    getTopBuyProduct().then(state => setData(state));
  }, []);

  return (
    <div ref={ref} className="cataloge animated-section">
      <div className="cataloge__top">
        <h3 className="cataloge__title">Топ продажів</h3>
        <div>
          <button className="top__btn--left" onClick={prevSlide}>
            <FiChevronLeft />
          </button>
          <button className="top__btn--right" onClick={nextSlide}>
            <FiChevronRight />
          </button>
        </div>
      </div>
      <animated.div style={sectionAnimation} className="section-content">
        <ul
          className="cataloge__gap top"
          style={{ transform: `translateX(-${currentIndex * 16}%)` }}
        >
          {data &&
            data.map(({ select }) => (
              <li key={select[0]._id}>
                <TopSell
                  price={select[0].price}
                  name={select[0].name}
                  img={select[0].img[0]}
                  id={select[0]._id}
                  code={select[0].code}
                />
              </li>
            ))}
        </ul>
      </animated.div>
    </div>
  );
};

export default TopSellPages;
