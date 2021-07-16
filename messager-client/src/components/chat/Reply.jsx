import React from 'react';
import { useMutation } from '@apollo/client';
import { TOGGLE_LIKE_MUTATION, TOGGLE_DISLIKE_MUTATION } from '../../queries';
import '../../styles/chat/Reply.css';

function Reply(props) {
  const [toggleLike] = useMutation(TOGGLE_LIKE_MUTATION);
  const [toggleDisike] = useMutation(TOGGLE_DISLIKE_MUTATION);

  const { reply, userId } = props;

  function likeHandler() {
    toggleLike({
      variables: {
        userId,
        messageId: reply.id,
      },
    });
  }

  function dislikeHandler() {
    toggleDisike({
      variables: {
        userId,
        messageId: reply.id,
      },
    });
  }

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
      <div className="reply__reactions">
        <button className="reply__like" onClick={likeHandler}>
          {reply.likes.find((likeId) => likeId === userId) ? (
            <strong>{reply.likesNumber} Like</strong>
          ) : (
            `${reply.likesNumber} Like`
          )}
        </button>
        <button className="reply__dislike" onClick={dislikeHandler}>
          {reply.dislikes.find((dislikeId) => dislikeId === userId) ? (
            <strong>{reply.dislikesNumber} Dislike</strong>
          ) : (
            `${reply.dislikesNumber} Dislike`
          )}
        </button>
      </div>
    </div>
  );
}

export default Reply;
