import { Contacts } from './contacts/contacts';
import { FindFilt } from './filter/findFiltr';
import { Form } from './formAddContact/form';

export const App = () => {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
        flexDirection: 'column',
      }}
    >
      <Form />
      <FindFilt/>
      <Contacts />
    </div>
  );
};
