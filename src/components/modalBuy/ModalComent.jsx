import {
  Modal,
  Fade,
  Box,
  Typography,
  Backdrop,
  Button,
  Rating,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, getAuthStatus } from 'redux/authPer/auth-selector';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { addComents } from 'redux/operations';
import Notiflix from 'notiflix';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const blue = {
  100: '#DAECFF',
  200: '#b6daff',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75',
};

export const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const Textarea = styled(BaseTextareaAutosize)(
  ({ theme }) => `
    width: 370px;
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    border-radius: 12px 12px 0 12px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${
      theme.palette.mode === 'dark' ? grey[900] : grey[50]
    };

    &:hover {
      border-color: ${blue[400]};
    }

    &:focus {
      outline: 0;
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${
        theme.palette.mode === 'dark' ? blue[600] : blue[200]
      };
    }

    // firefox
    &:focus-visible {
      outline: 0;
    }
  `
);

export const ModalComments = ({ openState, setOpen }) => {
  const handleClose = () => setOpen(false);
  const [value, setValue] = useState(0);
  const [comments, setComments] = useState('');
  const userName = useSelector(getAuth);
  const dispatch = useDispatch();
  const params = useParams();
  const selectAuth = useSelector(getAuthStatus);
  const { id } = params;

  const submitComments = () => {
    dispatch(addComents({ comments, ProductId: id, RatingValue: value })).then(
      resp => {
        if (resp?.meta.requestStatus === 'fulfilled') {
          window.location.reload();
        }
      }
    );
    setOpen(false);
  };

  return (
    <div>
      {userName.isLoggedIn ? (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={openState}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={openState}>
            <Box sx={style}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
                sx={{ mb: '15px' }}
              >
                {userName.user.name} {userName.user.fename}
              </Typography>
              <Rating
                precision={0.5}
                name="simple-controlled"
                value={value}
                onChange={(_, newValue) => {
                  if (selectAuth) {
                    setValue(newValue);
                  } else {
                    Notiflix.Notify.warning(
                      'Оцінювати товар можуть тільки зареєстровані користувачі'
                    );
                  }
                }}
              />
              <Textarea
                aria-label="minimum height"
                minRows={6}
                placeholder="Коментар"
                onChange={e => setComments(e.target.value)}
              />
              <Button
                type="submit"
                onClick={submitComments}
                variant="contained"
                sx={{ mr: 'auto', ml: 'auto', mt: '15px' }}
              >
                Відправити
              </Button>
            </Box>
          </Fade>
        </Modal>
      ) : (
        ''
      )}
    </div>
  );
};
