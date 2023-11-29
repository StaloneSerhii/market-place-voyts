import { Backdrop, Box, Fade, Modal, Typography } from '@mui/material';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const DetailInfo = ({ openState, setOpen, pr }) => {
  const handleClose = () => setOpen(false);
  return (
    <div style={{ display: 'none' }}>
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
              title="Номер накладної стане доступний після зміни статусу на відправлено"
            >
              Номер замовлення: {pr._id.slice(-4)}
            </Typography>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              sx={{ mb: '15px' }}
              title="Номер накладної стане доступний після зміни статусу на відправлено"
            >
              Номер накладної: {pr.ttn || '-'}
            </Typography>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              sx={{ mb: '15px' }}
            >
              Замовник: {pr.values.name}
            </Typography>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              sx={{ mb: '15px' }}
            >
              Замовник: {pr.values.fename}
            </Typography>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              sx={{ mb: '15px' }}
            >
              Місто: {pr.values.city}
            </Typography>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              sx={{ mb: '15px' }}
            >
              Віділення: {pr.values.viddill}
            </Typography>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              sx={{ mb: '15px' }}
            >
              Спосіб отримання: {pr.values.post}
            </Typography>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              sx={{ mb: '15px' }}
            >
              Коментар до замовлення: {pr.values.comments}
            </Typography>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              sx={{ mb: '15px' }}
            >
              Спосіб оплати: {pr.values.oplata}
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};
export default DetailInfo;
