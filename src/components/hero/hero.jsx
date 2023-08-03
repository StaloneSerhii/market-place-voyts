import React, { useState, useEffect } from 'react';
import heroImg from './heroImg';

import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
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
    let slider = setInterval(
      () => setCurrentIndex(prevState => prevState + 1),
      50000
    );
    return () => {
      clearInterval(slider);
    };
  }, [currentIndex]);
  return (
    <>
      {/* <div>
        <img className="backImg" src={sss} alt="backLogo" height="700px" />
      </div> */}
      <section style={{display:'block' , height: '600px'}}>
        <div className="section-center">
          {heroImg.map((person, personIndex) => {
            const { id, p, image, link } = person;
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
                  <div className="title_textBlock">
                    <div className="title_textBlock--div">
                      <p className="title_textBlock--p">{p}</p>
                      <a
                        className="title_hero"
                        href={link}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Read more <FiChevronRight />
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}

          <button
            className="prev"
            onClick={() => setCurrentIndex(prevState => prevState - 1)}
          >
            <FiChevronLeft />
          </button>

          <button
            className="next"
            onClick={() => setCurrentIndex(prevState => prevState + 1)}
          >
            <FiChevronRight />
          </button>
        </div>
      </section>
    </>
  );
};

export default Hero;
