import React from 'react';
import MessageBlock from './MessageBlock';
import '../../styles/chat/MessagesList.css';

function MessagesList(props) {
  const { messages, userId } = props;

  return (
    <div className="messages-list">
      {messages.map((message) => (
        <MessageBlock
          message={message}
          userId={userId}
          key={message.id}
        />
      ))}
      <button className="messages-list__button" onClick={props.loadMoreHandler}>
        Load more..
      </button>
    </div>
  );
}

export default MessagesList;
