import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllProductAdm } from 'redux/operations';

const ProductList = () => {
  const [data, setData] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(getAllProductAdm());
        setData(response.payload);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [dispatch]);

  return (
    <>
      {data &&
        data.map(pr => (
          <div
            className="card-catalog"
            key={pr._id}
            style={{ marginLeft: '10px', marginTop: '10px' }}
          >
            <div className="sell">
              <div className="beffore__select"></div>
            </div>
            <Link
              to={`/adm/product/${pr._id}`}
              state={pr.id}
              className="card-catalog__link"
            >
              <img
                src={pr.img[0]}
                alt="img-buy"
                className="card-cataloge__img"
              />
              <p className="card-cataloge__p">{pr.name}</p>
              <p className="card-cataloge__span">
                {pr.price} <span>грн</span>
              </p>
            </Link>
            <Link
              to={`/adm/product/${pr._id}`}
              subcategory={'test'}
              style={{
                padding: '5px 10px',
                backgroundColor: 'orange',
                margin: '5px',
              }}
            >
              Редагувати
            </Link>
            <Link
              to={`/product/${pr._id}`}
              subcategory={'test'}
              style={{
                padding: '5px 10px',
                backgroundColor: 'orange',
                margin: '5px',
              }}
            >
              Переглянути
            </Link>
          </div>
        ))}
    </>
  );
};
export default ProductList;
