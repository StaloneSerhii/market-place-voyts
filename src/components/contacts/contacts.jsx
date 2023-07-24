import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { getContact, getStatusFilter} from 'redux/selector';
import { useEffect } from 'react';
import { deleteContact, fetchContact } from 'redux/operations';

export const Contacts = () => {
  const contact = useSelector(getContact);
  const filterRedux = useSelector(getStatusFilter)

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContact());
  }, [dispatch]);

  const filterContacts = () => {
    const normalizedFilter = filterRedux.toLowerCase();
    return contact.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter));
  };

  const filtredContacts = filterContacts();

  return (
    <div>
      <h2>Contacts</h2>
      <ul>
        {filtredContacts && filtredContacts.map(({ id, name, phone }) => (
          <li key={id}>
            <p>Name:</p>
            <span>{name}</span>
            <p>Number:</p>
            <span>{phone}</span>
            <button onClick={() => dispatch(deleteContact(id))}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
