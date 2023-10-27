import { Box, Button, Modal, TextField } from '@mui/material';
import { useState } from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { register } from 'redux/operations';
import * as Yup from 'yup';
import { RulesRegister } from 'components/modalBuy/rulesRegister/rulesRegister';
// import { RulesRegister } from 'components/modalBuy/rulesRegister/rulesRegister';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short name!')
    .max(35, 'Too Long name!')
    .required('Name is required'),
  fename: Yup.string()
    .min(2, 'Too Short name!')
    .max(35, 'Too Long name!')
    .required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string()
    .min(14, 'Too Short name!')
    .max(14, 'Too Long name!')
    .notRequired(),
  password: Yup.string().required().min(6, 'Short password!'),
});

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  py: '40px',
  px: '40px',
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
  borderRadius: '8px',
};

const styleRules = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  py: '56px',
  px: '40px',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  height: '600px',
  overflowY: 'scroll',
};

export const RegisterModal = () => {
  const [open, setOpen] = useState(false);
  const dispath = useDispatch();
  const [reapPass, setReapPass] = useState();

  const initialValues = {
    name: '',
    fename: '',
    email: '',
    phone: '',
    password: '',
  };

  // Відправка форми після замовлення
  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: values => {
      if (formik.values.password !== reapPass) {
        return alert('Паролі  не співпадають');
      }
      dispath(register(values));
    },
  });

  // Збереження ведених даних в форму
  const handleInputChange = event => {
    const { name, value } = event.target;
    formik.setFieldValue(name, value);
  };

  // Корекція веденого номера тел
  const handlePhoneNumberChange = e => {
    let value = e.target.value;
    value = value.replace(/\D/g, '');
    if (value.length > 3 && value.length <= 6) {
      value = value.slice(0, 3) + ' ' + value.slice(3);
    } else if (value.length > 6) {
      value =
        value.slice(0, 2) + '(' + value.slice(2, 5) + ')' + value.slice(5);
    }
    formik.setFieldValue('phone', value);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleOpen}
        className="formLogin__register"
      >
        Зареєструватися
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
      >
        <form onSubmit={formik.handleSubmit}>
          <Box sx={{ ...style, width: 526 }}>
            <h2
              id="child-modal-title"
              style={{
                textAlign: 'center',
                fontSize: '32px',
                fontWeight: '400',
              }}
            >
              Реєстрація
            </h2>
            <label id="fename">
              Ім'я
              <TextField
                required
                type="text"
                name="name"
                placeholder="Ім`я"
                onBlur={formik.handleBlur}
                value={formik.values.name}
                onChange={handleInputChange}
                style={
                  formik.touched.name && formik.errors.name
                    ? { border: '1px solid red' }
                    : { border: '1px solid transparent' }
                }
                size="small"
                sx={{ width: '100%', mt: '0px' }}
              />
            </label>
            <label id="fename">
              Прізвище
              <TextField
                required
                type="text"
                name="fename"
                placeholder="Прізвище"
                onBlur={formik.handleBlur}
                value={formik.values.fename}
                onChange={handleInputChange}
                size="small"
                sx={{ width: '100%', mt: '0px' }}
              />
            </label>
            <label id="fename">
              Email
              <TextField
                required
                type="email"
                name="email"
                placeholder="Email"
                onBlur={formik.handleBlur}
                value={formik.values.email}
                onChange={handleInputChange}
                size="small"
                sx={{ width: '100%', mt: '0px' }}
              />
            </label>
            <label id="fename">
              Телефон
              <TextField
                required
                type="tel"
                name="phone"
                placeholder="380(00)000-00-00"
                onBlur={formik.handleBlur}
                value={formik.values.phone}
                onChange={handlePhoneNumberChange}
                size="small"
                sx={{ width: '100%', mt: '0px' }}
              />
            </label>
            <label id="fename">
              Пароль
              <TextField
                required
                type="password"
                name="password"
                placeholder="Пароль"
                onBlur={formik.handleBlur}
                value={formik.values.password}
                onChange={handleInputChange}
                size="small"
                sx={{ width: '100%', mt: '0px' }}
              />
            </label>
            <label id="fename">
              Повторити пароль
              <TextField
                required
                type="password"
                id="password"
                placeholder="Повторити пароль"
                onChange={e => setReapPass(e.target.value)}
                value={reapPass}
                size="small"
                sx={{ width: '100%', mt: '0px' }}
              />
            </label>
            <p style={{ color: '#585858', fontSize: '13px', lineHeight: '2' }}>
              Реєструючись, ви погоджуєтеся з
              <ChildModal />
              та угодою користувача
            </p>
            <button
              className="formLogin__btn--pr bgGreen btnHover"
              type="button"
              style={{
                width: '100%',
                color: '#fff',
              }}
            >
              Зареєструватися
            </button>
            <Button onClick={handleClose} sx={{ color: '#000' }}>
              закрити
            </Button>
          </Box>
        </form>
      </Modal>
    </div>
  );
};

function ChildModal() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ display: 'inline-block' }}>
      <button
        type="button"
        onClick={handleOpen}
        className="formLogin__link"
        style={{ textDecoration: 'underline' }}
      >
        &nbsp; захистом персональних даних &nbsp;
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
      >
        <Box sx={{ ...styleRules }}>
          <h2 id="child-modal-title" style={{ textAlign: 'center' }}>
            Правила користувача
          </h2>
          <RulesRegister />
          <Button onClick={handleClose} sx={{ color: '#000' }}>
            погоджуюсь
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
