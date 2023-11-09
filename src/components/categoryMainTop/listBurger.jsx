import { Box, Divider, List, ListItem } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAuthStatus } from 'redux/authPer/auth-selector';

const ListBurger = ({ anchor, setOpen }) => {
  const selectAuth = useSelector(getAuthStatus);

  return (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
    >
      <List>
        <ListItem disablePadding>
          <Link to="/productAll/new">Запчастини</Link>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <Link to="find">Знайти запчастину</Link>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <Link to="/video">Відео</Link>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <Link to="/favorite">Обране</Link>
        </ListItem>
      </List>
      <Divider />
      {selectAuth ? (
        <>
          <List>
            <ListItem disablePadding>
              <Link to="/profile/settings">Особистий профіль</Link>
            </ListItem>
          </List>
          <Divider />
        </>
      ) : (
        <>
          <List>
            <ListItem disablePadding onClick={() => setOpen(true)}>
              Особистий кабінет
            </ListItem>
          </List>
          <Divider />
        </>
      )}
    </Box>
  );
};

export default ListBurger;
