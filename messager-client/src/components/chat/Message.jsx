import React from 'react';
import { useMutation } from '@apollo/client';
import { TOGGLE_LIKE_MUTATION, TOGGLE_DISLIKE_MUTATION } from '../../queries';
import '../../styles/chat/Message.css';

function Message(props) {
  const { message, userId } = props;
  const [toggleLike] = useMutation(TOGGLE_LIKE_MUTATION);
  const [toggleDisike] = useMutation(TOGGLE_DISLIKE_MUTATION);

  function likeHandler() {
    toggleLike({
      variables: {
        userId,
        messageId: message.id,
      },
    });
  }

  function dislikeHandler() {
    toggleDisike({
      variables: {
        userId,
        messageId: message.id,
      },
    });
  }

  function replyHandler() {
    props.replyHandler();
  }

  return (
    <div className="message">
      <div className="message__user">
        <span>
          <strong>#{message.userId}</strong>
        </span>
      </div>
      <div className="message__text">
        <p>{message.text}</p>
      </div>
      <div className="message__reactions">
        <button className="message__like" onClick={likeHandler}>
          {message.likes.find((likeId) => likeId === userId) ? (
            <strong>{message.likesNumber} Like</strong>
          ) : (
            `${message.likesNumber} Like`
          )}
        </button>
        <button className="message__dislike" onClick={dislikeHandler}>
          {message.dislikes.find((dislikeId) => dislikeId === userId) ? (
            <strong>{message.dislikesNumber} Dislike</strong>
          ) : (
            `${message.dislikesNumber} Dislike`
          )}
        </button>
        <button className="message__reply" onClick={replyHandler}>
          {props.replyForm ? 'Hide form' : 'Reply'}
        </button>
      </div>
    </div>
  );
}

export default Message;
