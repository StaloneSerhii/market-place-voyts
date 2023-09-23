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
    marginBottom:10
};

const category = [
    { label: 'by' },
    { label: 'new' }
];

const label = { inputProps: { true : false } };

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
            info: {
                obm: '',
                details: '',
                use: ''
            },
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
            const {category, ...obj}=values
            console.log({category: category.label, ...obj});
            dispatch(addProductBS({category: category.label, ...obj}))
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
        >
            <Box sx={style} >
                <form onSubmit={formik.handleSubmit} style={{display:'flex',flexDirection: 'column',gap: '10px'}}>
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
                    <p>Приховати товар</p><Switch {...label}   onChange={formik.handleChange}   id="hidden"
                        name="hidden"/>
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
                    <TextField name="info.obm" id="obm" label="ОБМ номер" variant="outlined" value={formik.values.info.obm}
                        onChange={formik.handleChange} />
                    <Button type="submit" variant="contained">Зберегти</Button>
                </form>
            </Box>
        </Modal>
    </section>
}

export default AdminPage;
