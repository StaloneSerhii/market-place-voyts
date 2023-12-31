import {
  Box,
  // Checkbox,
  FormControl,
  FormControlLabel,
  // FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
  Slider,
  TextField,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

function valuetext(value) {
  return `${value}$`;
}

const Filter = ({ filter }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState([1, 100000]);
  const [fromValue, setFromValue] = useState(1);
  const [toValue, setToValue] = useState(100000);
  const [selectedValue, setSelectedValue] = useState('');
  // const [checkboxes, setCheckboxes] = useState({
  //   label: true, // початковий стан для "Label"
  //   required: false, // початковий стан для "Required"
  //   disabled: false, // початковий стан для "Disabled"
  // });

  // const handleCheckboxChange = event => {
  //   const { name, checked } = event.target;
  //   setCheckboxes({ ...checkboxes, [name]: checked });
  // };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setFromValue(newValue[0]);
    setToValue(newValue[1]);
  };

  const handleChangeRadio = event => {
    setSelectedValue(event.target.value);
  };

  useEffect(() => {
    filter({ price: value,});
  }, [filter, value]);

  useEffect(() => {
    if (location.pathname === '/productAll/new') {
      setSelectedValue('new');
    } else if (location.pathname === '/productAll/by') {
      setSelectedValue('by');
    }
  }, [location, navigate]);

  useEffect(() => {
    if (selectedValue === 'new') {
      navigate('new');
    } else if (selectedValue === 'by') {
      navigate('by');
    }
  }, [navigate, selectedValue]);

  const titleMap = {
    '/productAll/by': (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
        }}
      >
        <svg
          width="20"
          height="21"
          viewBox="0 0 20 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18.0992 9.91073L16.4305 8.24404L10.59 2.41065C10.4335 2.25442 10.2213 2.16666 10.0001 2.16666C9.77884 2.16666 9.56666 2.25442 9.41019 2.41065L3.56968 8.24404L1.90096 9.91073C1.74898 10.0679 1.66488 10.2784 1.66678 10.4969C1.66868 10.7154 1.75643 10.9244 1.91113 11.0789C2.06582 11.2334 2.27509 11.3211 2.49386 11.323C2.71262 11.3249 2.92338 11.2409 3.08075 11.0891L3.32521 10.8449V17.1666C3.32521 17.6087 3.50102 18.0326 3.81397 18.3452C4.12691 18.6577 4.55136 18.8333 4.99393 18.8333H7.49701C7.71829 18.8333 7.93051 18.7455 8.08699 18.5892C8.24346 18.433 8.33137 18.221 8.33137 18V14.6666C8.33137 14.4456 8.41927 14.2336 8.57574 14.0774C8.73222 13.9211 8.94444 13.8333 9.16572 13.8333H10.8344C11.0557 13.8333 11.2679 13.9211 11.4244 14.0774C11.5809 14.2336 11.6688 14.4456 11.6688 14.6666V18C11.6688 18.221 11.7567 18.433 11.9132 18.5892C12.0697 18.7455 12.2819 18.8333 12.5032 18.8333H15.0062C15.4488 18.8333 15.8732 18.6577 16.1862 18.3452C16.4991 18.0326 16.675 17.6087 16.675 17.1666V10.8449L16.9194 11.0891C17.0768 11.2409 17.2875 11.3249 17.5063 11.323C17.7251 11.3211 17.9343 11.2334 18.089 11.0789C18.2437 10.9244 18.3315 10.7154 18.3334 10.4969C18.3353 10.2784 18.2512 10.0679 18.0992 9.91073Z"
            fill="#111928"
          />
        </svg>
        <p style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          Головна
          <svg
            width="20"
            height="21"
            viewBox="0 0 20 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.78901 16.3333C7.56973 16.3333 7.35538 16.2649 7.17307 16.1369C6.99076 16.0088 6.84867 15.8269 6.76476 15.614C6.68085 15.4011 6.65889 15.1668 6.70166 14.9408C6.74443 14.7148 6.85 14.5072 7.00503 14.3443L10.6566 10.5071L7.00503 6.67003C6.89912 6.56254 6.81465 6.43396 6.75653 6.2918C6.69842 6.14964 6.66783 5.99674 6.66655 5.84202C6.66527 5.6873 6.69332 5.53386 6.74908 5.39066C6.80483 5.24745 6.88717 5.11735 6.99129 5.00795C7.0954 4.89854 7.21921 4.81202 7.35549 4.75343C7.49177 4.69484 7.63778 4.66536 7.78502 4.6667C7.93226 4.66804 8.07776 4.70019 8.21305 4.76126C8.34834 4.82233 8.4707 4.9111 8.57299 5.02239L13.0085 9.68333C13.2164 9.90184 13.3332 10.1982 13.3332 10.5071C13.3332 10.8161 13.2164 11.1125 13.0085 11.331L8.57299 15.9919C8.36508 16.2104 8.08308 16.3333 7.78901 16.3333Z"
              fill="#6B7280"
            />
          </svg>{' '}
          Б/У запчастини
        </p>
      </div>
    ),
    '/productAll/new': (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
        }}
      >
        <svg
          width="20"
          height="21"
          viewBox="0 0 20 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18.0992 9.91073L16.4305 8.24404L10.59 2.41065C10.4335 2.25442 10.2213 2.16666 10.0001 2.16666C9.77884 2.16666 9.56666 2.25442 9.41019 2.41065L3.56968 8.24404L1.90096 9.91073C1.74898 10.0679 1.66488 10.2784 1.66678 10.4969C1.66868 10.7154 1.75643 10.9244 1.91113 11.0789C2.06582 11.2334 2.27509 11.3211 2.49386 11.323C2.71262 11.3249 2.92338 11.2409 3.08075 11.0891L3.32521 10.8449V17.1666C3.32521 17.6087 3.50102 18.0326 3.81397 18.3452C4.12691 18.6577 4.55136 18.8333 4.99393 18.8333H7.49701C7.71829 18.8333 7.93051 18.7455 8.08699 18.5892C8.24346 18.433 8.33137 18.221 8.33137 18V14.6666C8.33137 14.4456 8.41927 14.2336 8.57574 14.0774C8.73222 13.9211 8.94444 13.8333 9.16572 13.8333H10.8344C11.0557 13.8333 11.2679 13.9211 11.4244 14.0774C11.5809 14.2336 11.6688 14.4456 11.6688 14.6666V18C11.6688 18.221 11.7567 18.433 11.9132 18.5892C12.0697 18.7455 12.2819 18.8333 12.5032 18.8333H15.0062C15.4488 18.8333 15.8732 18.6577 16.1862 18.3452C16.4991 18.0326 16.675 17.6087 16.675 17.1666V10.8449L16.9194 11.0891C17.0768 11.2409 17.2875 11.3249 17.5063 11.323C17.7251 11.3211 17.9343 11.2334 18.089 11.0789C18.2437 10.9244 18.3315 10.7154 18.3334 10.4969C18.3353 10.2784 18.2512 10.0679 18.0992 9.91073Z"
            fill="#111928"
          />
        </svg>
        <p style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          Головна
          <svg
            width="20"
            height="21"
            viewBox="0 0 20 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.78901 16.3333C7.56973 16.3333 7.35538 16.2649 7.17307 16.1369C6.99076 16.0088 6.84867 15.8269 6.76476 15.614C6.68085 15.4011 6.65889 15.1668 6.70166 14.9408C6.74443 14.7148 6.85 14.5072 7.00503 14.3443L10.6566 10.5071L7.00503 6.67003C6.89912 6.56254 6.81465 6.43396 6.75653 6.2918C6.69842 6.14964 6.66783 5.99674 6.66655 5.84202C6.66527 5.6873 6.69332 5.53386 6.74908 5.39066C6.80483 5.24745 6.88717 5.11735 6.99129 5.00795C7.0954 4.89854 7.21921 4.81202 7.35549 4.75343C7.49177 4.69484 7.63778 4.66536 7.78502 4.6667C7.93226 4.66804 8.07776 4.70019 8.21305 4.76126C8.34834 4.82233 8.4707 4.9111 8.57299 5.02239L13.0085 9.68333C13.2164 9.90184 13.3332 10.1982 13.3332 10.5071C13.3332 10.8161 13.2164 11.1125 13.0085 11.331L8.57299 15.9919C8.36508 16.2104 8.08308 16.3333 7.78901 16.3333Z"
              fill="#6B7280"
            />
          </svg>
          Нові запчастини
        </p>
      </div>
    ),
    '/sg': 'СГ Навісне',
    '/sgtech': 'СГ Техніка',
  };

  return (
    <div
      style={{
        maxWidth: '1280px',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      <div className="cataloge__title" style={{ fontSize: '14px' }}>
        {titleMap[location.pathname] || ''}
      </div>
      <div className="productPrice">
        <Box
          sx={{
            width: '300px',
            p: '16px 24px',
            boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25);',
          }}
        >
          <p
            style={{
              fontSize: '16px',
              marginBottom: '32px',
            }}
          >
            Фільтр
          </p>
          <ul
            style={{
              display: 'flex',
              flexDirection: 'column',

              gap: '32px',
            }}
          >
            <li>
              <p
                style={{
                  fontSize: '20px',
                  fontWeight: '500',
                }}
              >
                Ціна
              </p>
              <div
                style={{
                  marginBottom: '20px',
                  marginTop: '16px',
                  display: 'flex',
                  justifyContent: 'space-evenly',
                }}
              >
                <TextField
                  sx={{ width: '117px', height: '44px', mr: '20px' }}
                  id="priceFrom"
                  variant="outlined"
                  type="text"
                  placeholder="Від"
                  value={fromValue}
                  onChange={e => {
                    const newValue = parseInt(e.target.value, 10);
                    if (!isNaN(newValue) && newValue < toValue) {
                      setFromValue(newValue);
                      setValue([newValue, toValue]);
                    }
                  }}
                />
                <TextField
                  sx={{ width: '117px', height: '44px' }}
                  id="priceTo"
                  variant="outlined"
                  type="text"
                  placeholder="До"
                  value={toValue}
                  onChange={e => {
                    const newValue = parseInt(e.target.value, 10);
                    if (!isNaN(newValue) && newValue > fromValue) {
                      setToValue(newValue);
                      setValue([fromValue, newValue]);
                    }
                  }}
                />
              </div>
              <Slider
                min={1}
                max={100000}
                getAriaLabel={() => 'Temperature range'}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
              />
            </li>
            <li>
              <FormControl>
                <FormLabel id="radio-buttons-group-label">Запчастини</FormLabel>
                <RadioGroup
                  aria-labelledby="radio-buttons-group-label"
                  defaultValue="new"
                  value={selectedValue}
                  onChange={handleChangeRadio}
                >
                  <FormControlLabel
                    value="new"
                    control={<Radio />}
                    label="Нові запчастини"
                  />
                  <FormControlLabel
                    value="by"
                    control={<Radio />}
                    label="Б/У Запчастини"
                  />
                </RadioGroup>
              </FormControl>
            </li>
            {/* <li>
              <p style={{ color: 'rgba(0, 0, 0, 0.6)' }}>Amenities</p>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="label"
                      checked={checkboxes.label}
                      onChange={handleCheckboxChange}
                    />
                  }
                  label="Label"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="required"
                      checked={checkboxes.required}
                      onChange={handleCheckboxChange}
                    />
                  }
                  label="Required"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="disabled"
                      checked={checkboxes.disabled}
                      onChange={handleCheckboxChange}
                    />
                  }
                  label="Disabled"
                />
              </FormGroup>
            </li> */}
          </ul>
        </Box>
        <Outlet />
      </div>
    </div>
  );
};

export default Filter;
