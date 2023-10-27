import { TextField, Button } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addAnswerComents } from 'redux/operations';

export const CommentAnswer = ({ hidden, idComment, setHidden }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');

  const submitAswerTextComment = () => {
    if (text.length > 0) {
      dispatch(addAnswerComents({ text, idComment }));
    }
  };

  return (
    <div style={{ display: hidden ? 'none' : 'block', marginTop: '24px' }}>
      <TextField
        size="small"
        value={text}
        id="outlined-basic"
        label="Текст"
        variant="outlined"
        onChange={e => setText(e.target.value)}
      />
      <Button
        sx={{
          background: '#009C2C',
          ml: '15px',
          '&:hover': {
            background: '#00611c',
          },
        }}
        variant="contained"
        onClick={() => {
          submitAswerTextComment();
          setHidden(true);
        }}
      >
        Відповісти
      </Button>
    </div>
  );
};
