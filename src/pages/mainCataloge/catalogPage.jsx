import CatalogeCard from 'components/catalogeCard/CatalogeCard';
import { useSpring, animated } from 'react-spring';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { getAllProduct } from 'redux/service';
import { useState } from 'react';
// import { useState } from 'react';
// import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai';
// import ReactPaginate from 'react-paginate';

const CatalogePage = () => {
  const [product, setProduct] = useState();

  useEffect(() => {
    getAllProduct().then(pr => setProduct(pr));
  }, []);

  const [ref, inView] = useInView({
    triggerOnce: true, // Анімація відбудеться тільки раз
    threshold: 0.5, // Поріг видимості секції
  });

  const sectionAnimation = useSpring({
    opacity: inView ? 1 : 0, // Властивість для анімації
    transform: inView ? 'translateY(0)' : 'translateY(40px)', // Інша властивість для анімації
    config: { duration: 1000 },
  });

  // const [page, setPage] = useState(1);
  // const handlePageClick = () => {
  //   return setPage(page + 1);
  // };

  return (
    <div ref={ref} className="cataloge animated-section">
      <animated.div style={sectionAnimation} className="section-content">
        <h3 className="cataloge__title">Каталог продуктів</h3>
        <ul className="cataloge__gap">
          {product &&
            product.map(product => (
              <li key={product._id}>
                <CatalogeCard
                  name={product.name}
                  price={product.price}
                  id={product._id}
                />
              </li>
            ))}
        </ul>
      </animated.div>

      {/* <div className="paginate">
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={page}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
        />
      </div> */}
    </div>
  );
};

export default CatalogePage;
