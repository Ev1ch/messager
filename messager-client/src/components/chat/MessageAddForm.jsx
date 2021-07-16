import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_MESSAGE_MUTATION } from '../../queries';
import { isMessageValid } from '../../helpers/message';
import '../../styles/chat/MessageAddForm.css';

function MessageAddForm(props) {
  const { userId } = props;
  const [text, setText] = useState('');
  const [addMessage] = useMutation(ADD_MESSAGE_MUTATION);

  function editHandler(event) {
    setText(event.target.value);
  }

  function addHandler(event) {
    if (isMessageValid(text)) {
      addMessage({
        variables: {
          userId,
          text: text.trim(),
        },
      });
      setText('');
    }
  }

  return (
    <div className="message-add-form">
      <textarea
        className="message-add-form__input"
        value={text}
        onChange={editHandler}
      ></textarea>
      <button className="message-add-form__button" onClick={addHandler}>
        Send
      </button>
    </div>
  );
}

export default MessageAddForm;
