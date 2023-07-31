import CatalogeCard from 'components/catalogeCard/CatalogeCard';
// import { useState } from 'react';
// import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai';
// import ReactPaginate from 'react-paginate';

const CatalogePage = () => {
  // const [page, setPage] = useState(1);
  // const handlePageClick = () => {
  //   return setPage(page + 1);
  // };
  return (
    <div className="cataloge">
      <h3 className="cataloge__title">Каталог продуктів</h3>
      <div className="cataloge__gap">
        <CatalogeCard />
        <CatalogeCard />
        <CatalogeCard />
        <CatalogeCard />
        <CatalogeCard />
        <CatalogeCard />
        <CatalogeCard />
        <CatalogeCard />
      </div>

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
