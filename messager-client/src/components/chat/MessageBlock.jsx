import { useState } from 'react';
import Message from './Message';
import Reply from './Reply';
import MessageReplyForm from './MessageReplyForm';
import OwnMessage from './OwnMessage';
import OwnReply from './OwnReply';
import '../../styles/chat/MessageBlock.css';

function MessageBlock(props) {
  const { userId, message } = props;
  const isCurrentUser = message.userId === userId;
  const [replyForm, setReplyForm] = useState(false);

  function replyHandler() {
    if (replyForm) {
      setReplyForm(false);
    } else {
      setReplyForm(true);
    }
  }

  return (
    <div className={`message-block ${isCurrentUser && 'own-message-block'}`}>
      {isCurrentUser ? (
        <OwnMessage message={message} />
      ) : (
        <Message
          message={message}
          replyForm={replyForm}
          replyHandler={replyHandler}
          userId={userId}
        />
      )}

      {message.replies.map((reply) =>
        reply.userId === userId ? (
          <OwnReply reply={reply} key={reply.id} />
        ) : (
          <Reply reply={reply} userId={userId} key={reply.id} />
        ),
      )}

      {replyForm && <MessageReplyForm messageId={message.id} userId={userId} />}
    </div>
  );
}

export default MessageBlock;
