import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_REPLY_MUTATION } from '../../queries';
import { isMessageValid } from '../../helpers/message';
import '../../styles/chat/MessageReplyForm.css';

function MessageReplyForm(props) {
  const userId = props.userId;
  const messageId = props.messageId;
  const [text, setText] = useState('');
  const [addReply] = useMutation(ADD_REPLY_MUTATION);

  function editHandler(event) {
    setText(event.target.value);
  }

  function addHandler() {
    if (isMessageValid(text)) {
      addReply({
        variables: {
          userId,
          messageId,
          text: text.trim(),
        },
      });
      setText('');
    }
  }

  return (
    <div className="message-reply-form">
      <textarea
        className="message-reply-form__input"
        value={text}
        onChange={editHandler}
      ></textarea>
      <button className="message-reply-form__button" onClick={addHandler}>
        Send
      </button>
    </div>
  );
}

export default MessageReplyForm;
