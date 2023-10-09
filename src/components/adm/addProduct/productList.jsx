import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { getAllProduct } from 'redux/service';

const ProductList = () => {
    const [data, setData] = useState()
    useEffect(() => {
        getAllProduct(0).then(pr => setData(pr));
    }, [])

    return (
        <>
            {data && data.map(pr => (
                <div className="card-catalog">
                    <div className="sell">
                        <div className="beffore__select">
                        </div>
                    </div>
                    <Link to={`/adm/product/${pr._id}`} state={pr.id} className="card-catalog__link">
                        <img src={pr.img[0]} alt="img-buy" className="card-cataloge__img" />
                        <p className="card-cataloge__p">{pr.name}</p>
                        <p className="card-cataloge__span">
                            {pr.price} <span>грн</span>
                        </p>
                    </Link>
                    <Link
                        to={`/adm/product/${pr._id}`}
                        subcategory={'test'}
                        className="card-cataloge__btn"
                    >
                        Детальніше
                    </Link>
                </div>
            ))}
        </>
    )
}
export default ProductList

