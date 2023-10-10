import { Autocomplete, Button, Switch, TextField, useForkRef } from "@mui/material";
import { useFormik } from "formik";
import { AiOutlineHeart } from "react-icons/ai";
import { FcCallback } from "react-icons/fc";
import { FiChevronRight } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { addProductBS, chengeProductBS } from "redux/operations";
import nofoto from '../../../image/noimage.jpg'
import { getIdProduct } from "redux/service";
const category = [
    { label: 'by' },
    { label: 'new' }
];
const label = { inputProps: { true: false } };

const AddProduct = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState('');
    const [data, setData] = useState('');
    const [img, setImg] = useState('')
    const dispatch = useDispatch()
    const paramsFind = useParams()


    useEffect(() => {
        if (paramsFind.id) {
            getIdProduct(paramsFind.id).then(pr => setData(pr))

        }
    }, [paramsFind])

    useEffect(() => {
        if (data) {
            setImg({ url: data.img[0] })

        }
    }, [data])


    const formik = useFormik({
        initialValues: {
            name: data ? data.name : '',
            ark: data ? data.ark : "",
            counter: data ? data.counter : '',
            code: data ? data.code : '',
            price: data ? data.price : '',
            category: data ? data.category : null,
            subcategory: data ? data.subcategory : '',
            hidden: data ? data.hidden : false,
            video: data ? data.video : '',
            producer: data ? data.producer : '',
            info: {
                obm: data ? data.info.obm : '',
                details: data ? data.info.details : '',
                use: data ? data.info.use : ''
            },
            img: data ? data.img[0] : null
        },
        enableReinitialize: true,
        validate: (values) => {
            const errors = {};

            if (!values.name) {
                errors.name = 'Поле Назва товару є обов\'язковим';
            }

            // Додайте інші правила валідації для інших полів тут

            return errors;
        },
        onSubmit: (values) => {
            const { category, img, ...obj } = values

            // Створіть новий об'єкт FormData для відправки на сервер
            const formData = new FormData();
            formData.append("category", category ? category.label : ""); // Додайте категорію або порожню строку
            if (img) {
                formData.append("img", img); // Додайте зображення до FormData, якщо воно вибране
            }
            formData.append("name", obj.name);
            formData.append("fename", obj.name);
            formData.append("ark", obj.ark);
            formData.append("counter", obj.counter);
            formData.append("code", obj.code);
            formData.append("price", obj.price);
            formData.append("subcategory", obj.subcategory);
            formData.append("hidden", obj.hidden);
            formData.append("video", obj.video);
            formData.append("info[obm]", obj.info.obm);
            formData.append("info[details]", obj.info.details);
            formData.append("info[use]", obj.info.use);
            formData.append("producer", obj.producer);


            if (paramsFind.id) {
               const {id}=paramsFind
                dispatch(chengeProductBS({formData, id}))
            } else {
                dispatch(addProductBS(formData))
            }
            // handleClose();
        },
    });


    const containerRef = useForkRef(null);
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


    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const modalRef = useRef(null);
    // Функція для відкриття модального вікна з вибраним зображенням
    const openModal = (img) => {
        setSelectedImage(img);
        setShowModal(true);
    };

    // Функція для закриття модального вікна
    const closeModal = () => {
        setShowModal(false);
        setSelectedImage('');
    };


    // Додаємо слухач події для обробки кліку поза модальним вікном
    useEffect(() => {
        // Створюємо функцію обробника кліку поза модальним вікном
        const handleOutsideClick = (e) => {
            if (modalRef) {
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
    const switchToPreviousImage = e => {
        setCurrentImageIndex(e.target.src);
    };

    useEffect(() => {
        setCurrentImageIndex(img.url);
    }, [img]);

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="content__product">
                <div>
                    <div className="block__img">
                        <div
                            className="zoomable-container"
                            ref={containerRef}
                            onMouseMove={handleMouseMove}
                        >
                            <img
                                src={img ? img.url : nofoto}
                                alt="product"
                                width="400"
                                className="zoomable-image"
                                onClick={() => openModal(currentImageIndex)}
                            />
                        </div>
                        {showModal && (
                            <div className="modal">
                                <span className="close" onClick={closeModal}>
                                    &times;
                                </span>
                                <img src={selectedImage} alt="Full Size" />
                            </div>
                        )}
                        <div className="block__img--allImg ">
                            <img
                                key={img}
                                className="active"
                                src={img ? img.url : nofoto}
                                alt="allProduct"
                                width="100"
                                onClick={switchToPreviousImage}
                            />
                            {/* {product && product.video && <VideoModal props={product.video} />} */}
                        </div>
                        <div className="formFind" >
                            <h3>Знайдемо потрібну запчастину:</h3>
                            <label htmlFor="">
                                <input
                                    type="text"
                                    placeholder="Номер або назва запчастини"

                                />
                            </label>
                            <label htmlFor="">
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Телефон"
                                />
                            </label>
                            <button className="formLogin__btn postBtn" type="submit">
                                Надіслати запит <FiChevronRight />
                            </button>
                        </div>
                    </div>
                </div>

                <div style={{ width: '700px' }}>
                    <input
                        required
                        id="name"
                        name="name"
                        placeholder="Назва товару"
                        variant="outlined"
                        sx={{ width: '100%' }}
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                        className="inputAmd"
                    />
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            backgroundColor: '#278032',
                        }}
                    >
                        <h3 className="name__product">{formik.values.name}</h3>
                        <button
                            className="favorite">
                            <AiOutlineHeart />
                        </button>

                    </div>
                    <div className="block__info" id="app-root">
                        <div className="block__info--item">

                            <span>Завантажити картинку</span>
                            <input type="file" onChange={(event) => {
                                const selectedFile = event.target.files[0];
                                const imageUrl = URL.createObjectURL(selectedFile);

                                // Зберігаємо URL-об'єкт і вибраний файл в стані компонента
                                setImg({ url: imageUrl, file: selectedFile });
                                // Зберігаємо вибраний файл в стані компонента
                                formik.setFieldValue("img", selectedFile);
                            }} />
                            <p>
                                Код: <span>{formik.values.code}</span>
                                <input required name="code" id="code" placeholder="Унікальний код" variant="outlined" type="number" value={formik.values.code} className="inputAdm" onChange={formik.handleChange} />
                            </p>
                            <Autocomplete
                                required
                                disablePortal
                                value={formik.values.category}
                                onChange={(event, newValue) => {
                                    formik.setFieldValue("category", newValue);
                                }}
                                name="category"
                                id="category"
                                options={category}
                                sx={{ width: 300, mb: 1 }}
                                renderInput={(params) => <TextField {...params} label="Категорія" />}
                            />
                            <TextField required name="subcategory" id="subcategory" label="Підкатегорія" variant="outlined" value={formik.values.subcategory}
                                onChange={formik.handleChange} />
                            <p>
                                Артикул: <span>{formik.values.ark}</span>
                                <input
                                    required
                                    className="inputAdm"
                                    id="ark"
                                    name="ark"
                                    placeholder="Арк номер"
                                    variant="outlined"
                                    type="number"
                                    sx={{ width: '100%' }}
                                    value={formik.values.ark}
                                    onChange={formik.handleChange}
                                />
                            </p>
                            <p>
                                Виробник:
                                <span>{formik.values.producer}</span>
                                <input className="inputAdm" name="producer" id="producer" placeholder="Фірма виробник" variant="outlined" type="text" value={formik.values.producer}
                                    onChange={formik.handleChange} />
                            </p>
                            <p className="block__info--on">{!formik.values.hidden ? "В наявності" : 'Прихований'}</p>
                            <p>Приховати товару<Switch {...label} onChange={formik.handleChange} id="hidden"
                                name="hidden" /></p>
                            <input required className="inputAdm"
                                name="counter" id="counter" placeholder="Кількість до продажу" variant="outlined" type="number" value={formik.values.counter}
                                onChange={formik.handleChange} />
                            <span className="block__info--price">{formik.values.price} грн</span>
                            <input required className="inputAdm" name="price" id="price" placeholder="Ціна" variant="outlined" type="number" value={formik.values.price}
                                onChange={formik.handleChange} />
                            <Button type="submit" variant="contained">Зберегти продукт</Button>
                        </div>
                        <div className="block__infoCenter">
                            <p> {<FcCallback />} Отримати консультацію</p>
                            <span style={{ marginBottom: '25px' }}>
                                <a href="tel:+380686473128">+380-68-64-73-128</a>
                            </span>
                            <a
                                href="https://t.me/n_voyts"
                                target="_blank"
                                rel="noreferrer"
                                className="formLogin__btn"
                            >
                                Потрібна допомога
                            </a>
                        </div>
                    </div>
                    <div className="block__analog">
                        <h4>Аналоги</h4>
                        <Link
                            // to={`/product/${pr._id}`}
                            className="block__analog--info"
                        >
                            <img src={img ? img.url : nofoto} alt="/" width="70px" />
                            <p>{formik.values.name}</p>
                            <p className="price">{formik.values.price} грн</p>
                        </Link>

                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <Link
                            to=""
                            className={
                                'info__btn--details  '
                            }
                        >
                            Опис
                        </Link>
                        <p>{formik.values.info.details}</p>
                        <TextField required name="info.details" id="details" label="Опис товару" variant="outlined" value={formik.values.info.details}
                            onChange={formik.handleChange} />
                        <Link
                            to=''
                            className={

                                'info__btn--details'
                            }
                        >Застосування
                        </Link>
                        <p>{formik.values.info.use}</p>
                        <TextField required name="info.use" id="use" label="Застосування" variant="outlined" value={formik.values.info.use}
                            onChange={formik.handleChange} />
                        <Link
                            to=""
                            className={

                                'info__btn--details'
                            }
                        >
                            Локація
                        </Link>

                        <p>{formik.values.info.obm}</p>
                        <TextField required name="info.obm" id="obm" label="Локація" variant="outlined" value={formik.values.info.obm}
                            onChange={formik.handleChange} />
                    </div>
                </div>
            </div>
        </form>
    )
}

export default AddProduct