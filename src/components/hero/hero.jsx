import React, { useState, useEffect } from 'react';
import heroImg from './heroImg';

import HeroCategory from './heroCategory/heroCategory';
import { useCallback } from 'react';

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

  const nextSlide = useCallback(() => {
    if (!effect) {
      setEffect(true);
      setTimeout(() => {
        setCurrentIndex(prevState => prevState + 1);
        setTimeout(() => {
          setEffect(false);
        }, 700);
      }, 1000);
    }
  }, [effect]);

  useEffect(() => {
    const sliderInterval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => {
      clearInterval(sliderInterval);
    };
  }, [nextSlide]);

  return (
    <>
      <section
        style={{ display: 'block', height: '600px', position: 'relative' }}
      >
        <div className="bf"></div>
        <div>
          <div
            style={{
              maxWidth: '1280px',
              height: '600px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginLeft: 'auto',
              marginRight: 'auto',
              gap: '420px',
              padding: '0 15px',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                zIndex: '10',
              }}
            >
              {' '}
              <h1 className="hero__text">ZAP4ASTINI</h1>
              <p className="hero__text--p">Від б\у до нових с\г зпчастин</p>
              <a
                className="btnHover bgGreen hero__btn"
                href="tel:+380678645646"
                style={{
                  padding: '10px 20px',
                  color: '#fff',
                  width: '220px',
                  textAlign: 'center',
                  fontSize: '16px',
                  lineHeight: '24px',
                  borderRadius: '8px',
                }}
              >
                Зв`язатися з нами
              </a>
            </div>
            <HeroCategory effect={effect} />
          </div>
        </div>
        <div className="section-center">
          {heroImg.map((person, personIndex) => {
            const { id } = person;
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
                <div className={person.classImg}></div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Hero;
