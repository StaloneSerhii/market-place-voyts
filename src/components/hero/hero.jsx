import React, { useState, useEffect } from 'react';
import heroImg from './heroImg';

import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import HeroCategory from './heroCategory/heroCategory';

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [effect, setEffect] = useState(false);

  useEffect(() => {
    const lastIndex = heroImg.length - 1;
    if (currentIndex < 0) {
      setCurrentIndex(lastIndex);
    }
    if (currentIndex > lastIndex) {
      setCurrentIndex(0);
    }
  }, [currentIndex]);

  useEffect(() => {
    const sliderInterval = setInterval(nextSlide, 5000);

    return () => {
      clearInterval(sliderInterval);
    };
  }, []);

  const prevSlide = () => {
    if (!effect) {
      setEffect(true);
    }
    setTimeout(() => {
      setCurrentIndex(prevState => prevState - 1);
    }, 800);
    setTimeout(() => {
      setEffect(false);
    }, 1500);
  };
  const nextSlide = () => {
    if (!effect) {
      setEffect(true);
    }
    setTimeout(() => {
      setCurrentIndex(prevState => prevState + 1);
    }, 800);
    setTimeout(() => {
      setEffect(false);
    }, 1500);
  };

  return (
    <>
      <section style={{ display: 'block', height: '600px' }}>
        <div className="section-center">
          {heroImg.map((person, personIndex) => {
            const { id, image } = person;
            let position = 'nexSlide';
            if (personIndex === currentIndex) {
              position = 'activeSlide';
            }
            if (
              personIndex === currentIndex - 1 ||
              (currentIndex === 0 && personIndex === heroImg.length - 1)
            ) {
              position = 'lastSlide';
            }
            return (
              <article className={position} key={id}>
                <div className="slide-p">
                  <img src={image} alt="hero_img" height={600} width={'100%'} />
                </div>
              </article>
            );
          })}

          <button className="prev" onClick={prevSlide}>
            <FiChevronLeft />
          </button>

          <button className="next" onClick={nextSlide}>
            <FiChevronRight />
          </button>
        </div>
        <HeroCategory effect={effect} />
      </section>
    </>
  );
};

export default Hero;
