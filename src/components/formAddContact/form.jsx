import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/operations';
import { getContact } from 'redux/selector';

export const Form = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [phone, setNumber] = useState('');
  const contact = useSelector(getContact)
  const changeSubmit = e => {
    const nameInput = e.currentTarget.name;
    const valueInput = e.currentTarget.value;
    switch (nameInput) {
      case 'name':
        setName(valueInput);
        break;
      case 'phone':
        setNumber(valueInput);
        break;
      default:
        return;
    }
  };
  const handleSubmit = e => {
    e.preventDefault();
    const alertFind = contact.find(contact => contact.name === e.target.name.value);
    if (alertFind) {
      return alert(`${name} is already in contacs.`);
    }
    dispatch(addContact({ name, phone }));
    reset()
  };

    const reset = () => {
      setName('');
      setNumber('');
    };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <span>Name</span>
        <input
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          type="text"
          value={name}
          name="name"
          onChange={changeSubmit}
        />
        <span>Number</span>
        <input
          required
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          type="tel"
          value={phone}
          name="phone"
          onChange={changeSubmit}
        />
        <button type="submit">Add Contact</button>
      </form>
    </div>
  );
};
