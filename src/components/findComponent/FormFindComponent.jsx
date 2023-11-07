import { useState } from 'react';
import { postHelpProduct } from 'redux/service';

const FormFindComponent = () => {
  const [name, setName] = useState('');
  const [fename, setFename] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');

  const sendSubmit = e => {
    e.preventDefault();
    postHelpProduct({ name, fename, phone, email, text });
    setName('');
    setFename('');
    setPhone('');
    setEmail('');
    setText('');
  };

  return (
    <form style={{ width: '632px', margin: '64px auto' }}>
      <p style={{ fontSize: '16px', fontWeight: '600' }}>Контакті дані</p>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '24px',
          margin: '16px 0',
        }}
      >
        <label htmlFor="name">
          <p> Ім'я</p>
          <input
            onChange={e => setName(e.target.value)}
            value={name}
            type="text"
            id="name"
            required
            placeholder="Ім'я"
            style={{
              border: '1px solid #009C2C',
              borderRadius: '8px',
              padding: '12px 16px',
              width: '270px',
            }}
          />
        </label>
        <label htmlFor="fename">
          <p> Прізвище</p>
          <input
            onChange={e => setFename(e.target.value)}
            value={fename}
            type="text"
            id="fename"
            required
            placeholder="Прізвище"
            style={{
              border: '1px solid #009C2C',
              borderRadius: '8px',
              padding: '12px 16px',
              width: '270px',
            }}
          />
        </label>
        <label htmlFor="phone">
          <p>Тел.</p>
          <input
            onChange={e => setPhone(e.target.value)}
            value={phone}
            type="number"
            id="phone"
            required
            placeholder="+380"
            style={{
              border: '1px solid #009C2C',
              borderRadius: '8px',
              padding: '12px 16px',
              width: '270px',
            }}
          />
        </label>
        <label htmlFor="email">
          <p>Email</p>
          <input
            onChange={e => setEmail(e.target.value)}
            value={email}
            type="email"
            id="email"
            required
            placeholder="info@gmail.com"
            style={{
              border: '1px solid #009C2C',
              borderRadius: '8px',
              padding: '12px 16px',
              width: '270px',
            }}
          />
        </label>
      </div>
      <p style={{ fontSize: '16px', fontWeight: '600' }}>Назва Запчастини</p>
      <textarea
        onChange={e => setText(e.target.value)}
        value={text}
        cols="100"
        rows="10"
        placeholder="Текст"
        required
        style={{
          border: '1px solid #009C2C',
          borderRadius: '8px',
          padding: '12px 16px',
          width: '600px',
          margin: '16px 0',
        }}
      ></textarea>
      <button
        type="submit"
        onClick={sendSubmit}
        style={{
          padding: '10px 16px',
          fontSize: '16px',
          background: '#009C2C',
          width: '220px',
          borderRadius: '8px',
          margin: '0 auto',
          color: '#fff',
        }}
      >
        Відправити
      </button>
    </form>
  );
};

export default FormFindComponent;
