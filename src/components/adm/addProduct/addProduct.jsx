import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { addProductBS, chengeProductBS } from 'redux/operations';
import nofoto from '../../../image/noimage.jpg';
import { getIdProduct } from 'redux/service';
import {
  Autocomplete,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Switch,
  TextField,
} from '@mui/material';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';
import { grey } from 'components/modalBuy/ModalComent';
const label = { inputProps: { true: false } };

const Textarea = styled(BaseTextareaAutosize)(
  ({ theme }) => `
    width: 80%;
    font-family: IBM Plex Sans, sans-serif;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    border-radius: 5px;
    color: 'dark';
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid #c6c6c6;
   margin-top:24px;
    &:hover {
      border-color: black;
    }
  `
);

const AddProduct = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [data, setData] = useState('');
  const [img, setImg] = useState([]);
  const dispatch = useDispatch();
  const paramsFind = useParams();

  useEffect(() => {
    if (paramsFind.id) {
      getIdProduct(paramsFind.id).then(pr => setData(pr));
    }
  }, [paramsFind]);

  // Збереження ведених даних в форму
  const handleInputChange = event => {
    const { name, value } = event.target;
    formik.setFieldValue(name, value);
  };

  const formik = useFormik({
    initialValues: {
      name: data ? data.name : '',
      ark: data ? data.ark : '',
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
        use: data ? data.info.use : '',
      },
    },
    enableReinitialize: true,
    validate: values => {
      const errors = {};
      if (!values.name) {
        errors.name = "Поле Назва товару є обов'язковим";
      }
      // Додайте інші правила валідації для інших полів тут

      return errors;
    },
    onSubmit: values => {
      const { category, img, ...obj } = values;
      // Створіть новий об'єкт FormData для відправки на сервер
      const formData = new FormData();
      if (selectedFiles.length > 0) {
        for (let i = 0; i < selectedFiles.length; i++) {
          formData.append('img', selectedFiles[i]);
        }
      }
      console.log(category);
      formData.append('category', category || ''); // Додайте категорію або порожню строку
      formData.append('name', obj.name);
      formData.append('ark', obj.ark);
      formData.append('counter', obj.counter);
      formData.append('code', obj.code);
      formData.append('price', obj.price);
      formData.append('subcategory', obj.subcategory);
      formData.append('hidden', obj.hidden);
      formData.append('video', obj.video);
      formData.append('info[obm]', obj.info.obm);
      formData.append('info[details]', obj.info.details);
      formData.append('info[use]', obj.info.use);
      formData.append('producer', obj.producer);

      if (paramsFind.id) {
        const { id } = paramsFind;
        const back = dispatch(chengeProductBS({ formData, id }));
        console.log(back);
        if (back) {
          formik.resetForm();
        }
      } else {
        dispatch(addProductBS(formData));
      }
    },
  });

  return (
    <div style={{ width: '100%', margin: '15px' }}>
      <p style={{ marginBottom: '24px' }}>Добавити товар</p>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="">
          Добавити фотографії:  
          <input
            type="file"
            name="photos"
            multiple
            onChange={event => {
              const selectedFile = event.target.files;
              setSelectedFiles(selectedFile);
              const newFiles = Array.from(selectedFile).map(file => ({
                url: URL.createObjectURL(file),
              }));
              setImg(newFiles);
            }}
          />
        </label>
        <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
          {(img &&
            img.length > 0 &&
            img.map(({ url }) => (
              <li>
                <img src={url} alt="" width="270" />
              </li>
            ))) || (
            <li>
              <img src={nofoto} alt="" width="270" />
            </li>
          )}
        </ul>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '24px',
            marginTop: '24px',
          }}
        >
          <TextField
            required
            id="name"
            label="Назва товару"
            variant="outlined"
            sx={{ width: '82%' }}
            size="small"
            name="name"
            onBlur={formik.handleBlur}
            value={formik.values.name}
            onChange={handleInputChange}
          />
          <TextField
            required
            id="outlined-basic"
            label="Номер артикула"
            variant="outlined"
            size="small"
            sx={{ width: '40%' }}
            name="ark"
            onBlur={formik.handleBlur}
            value={formik.values.ark}
            onChange={handleInputChange}
          />
          <TextField
            required
            id="outlined-basic"
            label="Кількість товару"
            variant="outlined"
            size="small"
            sx={{ width: '40%' }}
            name="counter"
            onBlur={formik.handleBlur}
            value={formik.values.counter}
            onChange={handleInputChange}
          />
          <TextField
            required
            id="outlined-basic"
            label="Код товару"
            variant="outlined"
            sx={{ width: '40%' }}
            size="small"
            name="code"
            onBlur={formik.handleBlur}
            value={formik.values.code}
            onChange={handleInputChange}
          />
          <FormControl fullWidth sx={{ width: '40%' }} size="small">
            <InputLabel htmlFor="outlined-adornment-amount">
              Вартість товару
            </InputLabel>
            <OutlinedInput
              name="price"
              onBlur={formik.handleBlur}
              value={formik.values.price}
              onChange={handleInputChange}
              id="outlined-adornment-amount"
              startAdornment={
                <InputAdornment position="start">₴</InputAdornment>
              }
              label="Вартість товару"
            />
          </FormControl>
        </div>
        <label>
          <Textarea
            aria-label="minimum height"
            minRows={6}
            placeholder="Опис товару"
            name="details"
            onBlur={formik.handleBlur}
            value={formik.values.info.details}
            onChange={e => formik.setFieldValue('info.details', e.target.value)}
          />
        </label>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '24px',
            marginTop: '24px',
          }}
        >
          <Autocomplete
            disablePortal
            size="small"
            onBlur={formik.handleBlur}
            onChange={(_, newLabel) =>
              formik.setFieldValue('category', newLabel.id)
            }
            id="combo-box-demo"
            options={[
              { label: 'Б.У', id: 'by' },
              { label: 'Нові запчастини', id: 'new' },
            ]}
            sx={{ width: '40%' }}
            renderInput={params => (
              <TextField
                {...params}
                label="Категорія"
                sx={{ width: '100%%' }}
              />
            )}
          />
          <TextField
            required
            id="outlined-basic"
            label="Підкатегорія"
            variant="outlined"
            size="small"
            sx={{ width: '40%' }}
            name="subcategory"
            onBlur={formik.handleBlur}
            value={formik.values.subcategory}
            onChange={handleInputChange}
          />
          <TextField
            required
            id="outlined-basic"
            label="Виробник"
            variant="outlined"
            size="small"
            sx={{ width: '40%' }}
            name="producer"
            onBlur={formik.handleBlur}
            value={formik.values.producer}
            onChange={handleInputChange}
          />
          <TextField
            required
            id="outlined-basic"
            label="Розташування товару"
            variant="outlined"
            sx={{ width: '40%' }}
            size="small"
            onBlur={formik.handleBlur}
            value={formik.values.info.obm}
            onChange={e => formik.setFieldValue('info.obm', e.target.value)}
          />
        </div>
        <label style={{ width: '20%', display: 'block', margin: '24px 0' }}>
          Приховати товар
          <Switch
            {...label}
            name="hidden"
            onBlur={formik.handleBlur}
            onChange={(_, val) => formik.setFieldValue('hidden', val)}
          />
        </label>
        <TextField
          id="outlined-basic"
          label="Силка на відео ютуб"
          variant="outlined"
          sx={{ width: '82%' }}
          size="small"
          name="video"
          onBlur={formik.handleBlur}
          value={formik.values.video}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="formLogin__btn--pr bgGreen btnHover "
          style={{ color: '#fff', marginTop: '24px' }}
        >
          Зберегти
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
