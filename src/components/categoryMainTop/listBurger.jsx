import { Box, Divider, List, ListItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getAuthStatus } from 'redux/authPer/auth-selector';
import { useState, useEffect } from 'react';
import { logOut } from 'redux/operations';

const ListBurger = ({ anchor, setOpen }) => {
  const selectAuth = useSelector(getAuthStatus);
  const [stateLists, setStateLists] = useState('main');
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.slice(1, 8) === 'profile') {
      return setStateLists('profile');
    } else if (location.pathname.slice(1, 4) === 'adm') {
      return setStateLists('adm');
    } else if (location.pathname === '/') {
      return setStateLists('main');
    }
  }, [location]);

  return (
    (stateLists === 'main' && (
      <ListHeaderMain
        anchor={anchor}
        selectAuth={selectAuth}
        setOpen={setOpen}
      />
    )) ||
    (stateLists === 'profile' && <ListAccount />) ||
    (stateLists === 'adm' && <ListAdm />)
  );
};

const ListHeaderMain = ({ anchor, selectAuth, setOpen }) => {
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

const ListAccount = ({ anchor }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSuperStatus = useSelector(
    state => state.persistedReducerAdd.auth.user.status
  );
  console.log(isSuperStatus);
  return (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
    >
      {isSuperStatus === 'superuser' && (
        <List>
          <ListItem disablePadding>
            <Link to="/adm/product">Адмін панель</Link>
          </ListItem>
        </List>
      )}
      <List>
        <ListItem disablePadding>
          <Link to="/">Головна</Link>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <Link to="/profile/store">Мої замовлення</Link>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <Link to="/profile/history">Переглянуті товари</Link>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <Link to="/profile/favorite">Список бажаного</Link>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <button
            style={{ fontSize: '24px' }}
            onClick={() => {
              navigate('/');
              dispatch(logOut());
            }}
          >
            Вихід
          </button>
        </ListItem>
      </List>
      <Divider />
    </Box>
  );
};

const ListAdm = ({ anchor }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
    >
      <List>
        <ListItem disablePadding>
          <Link to="/">Головна</Link>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <Link to="/adm/product">Добавити товар</Link>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <Link to="/adm/allProduct">Список товарів</Link>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <Link to="/adm/buyPr">Куплені товари</Link>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <button
            style={{ fontSize: '24px' }}
            onClick={() => {
              navigate('/');
              dispatch(logOut());
            }}
          >
            Вихід
          </button>
        </ListItem>
      </List>
      <Divider />
    </Box>
  );
};
export default ListBurger;
