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
              zIndex: '10',
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
              }}
            >
              {' '}
              <h1
                style={{
                  display: 'inline-block',
                  color: '#009C2C',
                  fontSize: '80px',
                  lineHeight: ' 100px',
                  cursor: 'default',
                  fontWeight: '400',
                }}
              >
                ZAP4ASTINI
              </h1>
              <p
                style={{
                  display: 'inline-block',
                  fontSize: '32px',
                  color: '#fff',
                  margin: '0',
                  cursor: 'default',
                }}
              >
                Від б\у до нових с\г зпчастин
              </p>
              <button
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#009C2C',
                  color: '#fff',
                  width: '220px',
                  textAlign: 'center',
                  fontSize: '16px',
                  lineHeight: '24px',
                  borderRadius: '8px',
                  marginTop: '64px',
                }}
              >
                Зв`язатися з нами
              </button>
            </div>
            <HeroCategory effect={effect} />
          </div>
        </div>
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
                <img src={image} alt="hero_img" width={'100%'} />
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Hero;
