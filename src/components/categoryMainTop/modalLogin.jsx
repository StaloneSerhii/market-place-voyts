import { Box, Button, Modal, TextField } from '@mui/material';
import { useState } from 'react';
import { AiFillEyeInvisible } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { logIn } from 'redux/operations';
import { resendPass } from 'redux/service';
import { RegisterModal } from './registeModal';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 400,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  py: '56px',
  px: '40px',
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  borderRadius: '8px',
};

function ChildModal() {
  const [open, setOpen] = useState(false);
  const [emailForResetPass, setEmailForResetPass] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button type="button" onClick={handleOpen} className="formLogin__link">
        Забули пароль?
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
      >
        <Box sx={{ ...style, maxWidth: 400 }}>
          <h2 id="child-modal-title" style={{ textAlign: 'center' }}>
            Забули пароль?
          </h2>
          <label id="resetPass">
            Вкажіть пошту для відправки нового пароля
            <TextField
              onChange={e => setEmailForResetPass({ email: e.target.value })}
              type="text"
              name="resetPass"
              id="resetPass"
              placeholder="Email"
              size="small"
              sx={{ width: '100%', mt: '15px' }}
            />
          </label>
          <button
            className="formLogin__btn--pr bgGreen btnHover"
            type="button"
            onClick={() => resendPass(emailForResetPass)}
            style={{
              width: '100%',
              color: '#fff',
            }}
          >
            Скинути пароль
          </button>
          <Button onClick={handleClose} sx={{ color: '#000' }}>
            закрити
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default function NestedModal({ setOpen, open, openMenu }) {
  const [email, setEmail] = useState();
  const [password, setPass] = useState();
  const [hiddenNewPass, setHiddenNewPass] = useState();
  const dispatch = useDispatch();
  const handleClose = () => {
    setOpen(false);
  };

  const onLogin = () => {
    dispatch(logIn({ email, password }));
  };

  return (
    <from className={openMenu ? 'formLogin' : 'formLogin none'}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, maxWidth: '526px' }}>
          <h2
            id="parent-modal-title"
            style={{ textAlign: 'center', fontSize: '32px' }}
          >
            Вхід
          </h2>
          <div>
            <label htmlFor="email">
              Email
              <TextField
                onChange={e => setEmail(e.target.value)}
                type="email"
                name="email"
                id="email"
                placeholder="E-mail"
                value={email}
                size="small"
                sx={{ width: '100%' }}
              />
            </label>
            <label htmlFor="password">
              Пароль
              <TextField
                onChange={e => setPass(e.target.value)}
                value={password}
                type={!hiddenNewPass ? 'password' : 'text'}
                name="password"
                id="password"
                placeholder="Пароль"
                size="small"
                sx={{ width: '100%' }}
              />
            </label>
            <AiFillEyeInvisible
              style={{
                position: 'absolute',
                top: '232px',
                right: '50px',
                cursor: 'pointer',
                fontSize: '22px',
                color: 'black',
              }}
              onClick={() => setHiddenNewPass(!hiddenNewPass)}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <RegisterModal />
            <ChildModal />
          </div>
          <button
            className="formLogin__btn--pr bgGreen btnHover"
            type="button"
            onClick={onLogin}
            style={{ width: '100%', color: '#fff' }}
          >
            Увійти
          </button>
          <Button onClick={handleClose} sx={{ color: '#000' }}>
            закрити
          </Button>
        </Box>
      </Modal>
    </from>
  );
}
