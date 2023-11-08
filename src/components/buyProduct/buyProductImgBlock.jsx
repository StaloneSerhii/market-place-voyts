import { BiSolidLeftArrow, BiSolidRightArrow } from 'react-icons/bi';
import { useState, useEffect } from 'react';
import { useRef } from 'react';

export const ImgBlockProduct = ({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState();
  const [showModal, setShowModal] = useState(false);
  const containerRef = useRef(null);

  // Збільшення зображення
  const handleMouseMove = event => {
    const container = containerRef.current;
    const image = container.querySelector('.zoomable-image');

    const containerRect = container.getBoundingClientRect();
    const mouseX = event.clientX - containerRect.left;
    const mouseY = event.clientY - containerRect.top;

    const imageX = ((mouseX / containerRect.width) * 100) / 100;
    const imageY = ((mouseY / containerRect.height) * 100) / 100;

    image.style.transformOrigin = `${imageX * 100}% ${imageY * 100}%`;
  };

  const nextImg = () => {
    const currentIndex = product.img.indexOf(currentImageIndex);

    // Перевіряємо, чи знайдено поточний індекс у масиві
    if (currentIndex !== -1) {
      // Збільшуємо індекс на 1, але перевіряємо, чи не вийшли за межі масиву
      const nextIndex = (currentIndex + 1) % product.img.length;

      // Встановлюємо нове значення currentImageIndex
      setCurrentImageIndex(product.img[nextIndex]);
    }
  };

  const BackImg = () => {
    const currentIndex = product.img.indexOf(currentImageIndex);

    // Перевіряємо, чи знайдено поточний індекс у масиві
    if (currentIndex !== -1) {
      // Зменшуємо індекс на 1, але перевіряємо, чи не вийшли за межі масиву
      const previousIndex =
        (currentIndex - 1 + product.img.length) % product.img.length;

      // Встановлюємо нове значення currentImageIndex
      setCurrentImageIndex(product.img[previousIndex]);
    }
  };

  const switchToPreviousImage = e => {
    setCurrentImageIndex(e.target.src);
  };

  // Додаємо слухач події для обробки кліку поза модальним вікном
  useEffect(() => {
    // Створюємо функцію обробника кліку поза модальним вікном
    const handleOutsideClick = e => {
      if (e.target.className === 'modal') {
        closeModal();
      }
    };

    // Додаємо слухач події для обробки кліку поза модальним вікном
    if (showModal) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    // Повертаємо функцію, яка буде виконана при розмінтці компонента
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [showModal]);

  // Застосуваня картинки на яку клікнув на головну
  useEffect(() => {
    if (product) {
      setCurrentImageIndex(product.img[0]);
    }
  }, [product]);

  // Функція для відкриття модального вікна з вибраним зображенням
  const openModal = () => {
    setShowModal(true);
  };

  // Функція для закриття модального вікна
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="block__img">
      <div
        className="zoomable-container"
        ref={containerRef}
        onMouseMove={handleMouseMove}
      >
        <img
          src={product && currentImageIndex}
          alt="product"
          width="400"
          className="zoomable-image"
          onClick={() => openModal(product && currentImageIndex)}
        />
        <button
          onClick={BackImg}
          style={{
            position: 'absolute',
            top: '200px',
            left: '10px',
            color: '#ffffffbd',
            fontSize: '25px',
          }}
        >
          <BiSolidLeftArrow />
        </button>
        <button
          onClick={nextImg}
          style={{
            position: 'absolute',
            top: '200px',
            right: '10px',
            color: '#ffffffbd',
            fontSize: '25px',
          }}
        >
          <BiSolidRightArrow />
        </button>
      </div>
      {showModal && (
        <div className="modal">
          <div style={{ display: 'flex' }}>
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <button onClick={BackImg} className="navigate__btn--img">
              <BiSolidLeftArrow />
            </button>
            <img src={currentImageIndex} alt="Full Size" />
            <button onClick={nextImg} className="navigate__btn--img">
              <BiSolidRightArrow />
            </button>
          </div>
        </div>
      )}
      <div style={{ overflowX: 'scroll', width: '628px' }}>
        <div className="block__img--allImg ">
          {product &&
            product.img.map(img => (
              <img
                key={img}
                className={img === currentImageIndex && 'active'}
                src={img}
                alt="allProduct"
                width="100"
                onClick={switchToPreviousImage}
              />
            ))}
        </div>
      </div>
    </div>
  );
};
