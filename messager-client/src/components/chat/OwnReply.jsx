import React from 'react';
import '../../styles/chat/Reply.css';

function OwnReply(props) {
  const { reply } = props;

  return (
    <div className="reply">
      <div className="reply__user">
        <span>
          <strong>#{reply.userId}</strong>
        </span>
      </div>
      <div className="reply__text">
        <p>{reply.text}</p>
      </div>
    </div>
  );
}

export default OwnReply;
