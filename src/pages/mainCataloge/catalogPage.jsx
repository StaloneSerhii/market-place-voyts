import CatalogeCard from 'components/catalogeCard/CatalogeCard';
import { useSpring, animated } from 'react-spring';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { getAllProduct } from 'redux/service';
import { useState } from 'react';

const CatalogePage = () => {
  const [product, setProduct] = useState();
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    getAllProduct(limit).then(pr => setProduct(pr));
  }, [limit]);

  const [ref, inView] = useInView({
    triggerOnce: true, // Анімація відбудеться тільки раз
    threshold: 0.5, // Поріг видимості секції
  });

  const sectionAnimation = useSpring({
    opacity: inView ? 1 : 0, // Властивість для анімації
    transform: inView ? 'translateY(0)' : 'translateY(40px)', // Інша властивість для анімації
    config: { duration: 1000 },
  });

  const handlePageClick = () => {
    setLimit(limit + 10);
  };
  return (
    <>
      <div ref={ref} className="cataloge animated-section">
        <h3 className="cataloge__title">Каталог товарів</h3>
        <animated.div style={sectionAnimation}>
          <ul className="cataloge__gap">
            {product &&
              product.map(product => (
                <li key={product._id}>
                  <CatalogeCard
                    name={product.name}
                    price={product.price}
                    id={product._id}
                    img={product.img}
                    code={product.code}
                  />
                </li>
              ))}
          </ul>
        </animated.div>
      </div>
      <div className="paginate">
        {product && product.length >= limit && (
          <button
            style={{
              backgroundColor: 'green',
              borderRadius: '10px',
              padding: '10px',
              fontSize: '17px',
              color: 'white',
            }}
            onClick={handlePageClick}
          >
            Показати більше
          </button>
        )}
      </div>
    </>
  );
};

export default CatalogePage;
