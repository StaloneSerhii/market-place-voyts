import { Autocomplete, Box, Button, Modal, Switch, TextField } from "@mui/material";
import { useState } from 'react';
import { Link, Outlet } from "react-router-dom";
import { useFormik } from 'formik';
import { addProductBS } from "redux/operations";
import { useDispatch } from "react-redux";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    width: 400,
    p: 4,
    marginBottom: 10,

};

const category = [
    { label: 'by' },
    { label: 'new' }
];

const label = { inputProps: { true: false } };

const AdminPage = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            name: '',
            ark: '',
            counter: '',
            code: '',
            price: '',
            category: null,
            subcategory: '',
            hidden: false,
            video: '',
            producer: '',
            info: {
                obm: '',
                details: '',
                use: ''
            },
            img: null
        },
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

            for (let pair of formData.entries()) {
                console.log(pair[0], pair[1]);
              }
            dispatch(addProductBS( formData))
            // handleClose();
        },
    });

    return <section className="profile">
        <div>
            <ul className="profile__list">
                <Button variant="contained" onClick={handleOpen}>Добавити товар</Button>
            </ul>
        </div>
        <Link to='/'>На головну</Link>
        <Outlet />
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{    overflow: 'scroll'}}
        >
            <Box sx={style} >
                <form onSubmit={formik.handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '150px' }}>
                    <TextField
                        id="name"
                        name="name"
                        label="Назва товару"
                        variant="outlined"
                        sx={{ width: '100%' }}
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                    />
                    <p>Приховати товар</p><Switch {...label} onChange={formik.handleChange} id="hidden"
                        name="hidden" />
                    <span>Завантажити картинку</span>
                    <input type="file" onChange={(event) => {
                        const selectedFile = event.target.files[0];
                        // Зберігаємо вибраний файл в стані компонента
                        formik.setFieldValue("img", selectedFile);
                    }} />
                    <TextField
                        id="ark"
                        name="ark"
                        label="Арк номер"
                        variant="outlined"
                        type="number"
                        sx={{ width: '100%' }}
                        value={formik.values.ark}
                        onChange={formik.handleChange}
                    />
                    <TextField
                        name="counter" id="counter" label="Кількість до продажу" variant="outlined" type="number" value={formik.values.counter}
                        onChange={formik.handleChange} />
                    <TextField name="code" id="code" label="Унікальний код" variant="outlined" type="number" value={formik.values.code}
                        onChange={formik.handleChange} />
                    <TextField name="price" id="price" label="Ціна" variant="outlined" type="number" value={formik.values.price}
                        onChange={formik.handleChange} />
                         <TextField name="producer" id="producer" label="Фірма виробник" variant="outlined" type="text" value={formik.values.producer}
                        onChange={formik.handleChange} />
                    <Autocomplete
                        disablePortal
                        value={formik.values.category}
                        onChange={(event, newValue) => {
                            formik.setFieldValue("category", newValue);
                        }}
                        name="category"
                        id="category"
                        options={category}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Категорія" />}
                    />
                    <TextField name="subcategory" id="subcategory" label="Підкатегорія" variant="outlined" value={formik.values.subcategory}
                        onChange={formik.handleChange} />
                    <TextField name="info.details" id="details" label="Опис товару" variant="outlined" value={formik.values.info.details}
                        onChange={formik.handleChange} />
                    <TextField name="info.use" id="use" label="Застосування" variant="outlined" value={formik.values.info.use}
                        onChange={formik.handleChange} />
                    <TextField name="info.obm" id="obm" label="Локація" variant="outlined" value={formik.values.info.obm}
                        onChange={formik.handleChange} />
                    <TextField name="video" id="video" label="Силка на відео" variant="outlined" value={formik.values.video}
                        onChange={formik.handleChange} />
                    <Button type="submit" variant="contained">Зберегти</Button>
                </form>
            </Box>
        </Modal>
    </section>
}

export default AdminPage;
