import React from 'react';

function OwnMessage(props) {
  const { message } = props;

  return (
    <div className="own-message">
      <div className="own-message__user">
        <span>
          <strong>#{message.userId}</strong>
        </span>
      </div>
      <div className="own-message__text">
        <p>{message.text}</p>
      </div>
      <div className="message__reactions">
        <span>Likes: {message.likesNumber}</span>
        <span>Dislikes: {message.dislikesNumber}</span>
      </div>
    </div>
  );
}

export default OwnMessage;
