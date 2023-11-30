import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { deleteProduct, getAllProductAdm } from 'redux/operations';

const ProductList = () => {
  const [data, setData] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const deleteProductBtn = id => {
    const result = window.confirm(`Видалити продукт?`);
    if (result) {
      dispatch(deleteProduct(id));
    }
  };

  return (
    <ul className="lastPrev__gap" style={{ flexWrap: 'wrap' }}>
      {data &&
        data.map(pr => (
          <li key={pr._id}>
            <div
              state={pr.id}
              style={{
                cursor: 'default',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <img
                src={pr.img[0]}
                alt="img-buy"
                className="card-cataloge__img"
              />
              <p className="card-cataloge__p">{pr.name}</p>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  margin: '24px 0',
                  borderBottom: '1px solid #F9F9F9',
                }}
              >
                <p className="card-cataloge__span">
                  {pr.price} грн
                  <span>В наявності</span>
                </p>
                <div>
                  <button
                    onClick={() => deleteProductBtn(pr._id)}
                    style={{
                      padding: '5px 10px',
                      backgroundColor: 'red',
                      margin: '15px',
                    }}
                  >
                    Видалити
                  </button>
                  <Link
                    to={`/adm/product/${pr._id}`}
                    subcategory={'test'}
                    style={{
                      padding: '5px 10px',
                      backgroundColor: 'orange',
                    }}
                  >
                    Редагувати
                  </Link>
                </div>
              </div>
              <button
                onClick={() => navigate(`/product/${pr._id}`)}
                style={{
                  fontSize: '14px',
                  color: '#585858',
                  margin: '0 auto',
                  display: 'flex',
                }}
              >
                Детальна інформація
              </button>
            </div>
          </li>
        ))}
    </ul>
  );
};
export default ProductList;
