import React, { useState, useEffect, useCallback } from 'react';
import TopSell from 'components/topSell/topSell';
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
    getTopBuyProduct().then(state => setData(state[0].select));
  }, []);

  return (
    <div ref={ref} className="cataloge animated-section">
      <h3 className="cataloge__title">Популярні товари</h3>
      <animated.div style={sectionAnimation}>
        <ul className="cataloge__gap">
          {data &&
            data.map(select => (
              <li key={select._id}>
                <TopSell
                  price={select.price}
                  name={select.name}
                  img={select.img[0]}
                  id={select._id}
                  code={select.code}
                />
              </li>
            ))}
        </ul>
      </animated.div>
    </div>
  );
};

export default TopSellPages;
