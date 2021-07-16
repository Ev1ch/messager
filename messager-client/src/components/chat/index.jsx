import { useState, useEffect } from 'react';
import MessagesList from './MessagesList';
import MessageAddForm from './MessageAddForm';
import MessagesFilter from './MessagesFilter';
import { useQuery, useSubscription } from '@apollo/client';
import {
  MESSAGES_QUERY,
  NEW_MESSAGE_SUBSCRIPTION,
  NEW_REPLY_SUBSCRIPTION,
  UPDATE_MESSAGE_SUBSCRIPTION,
  UPDATE_REPLY_SUBSCRIPTION,
} from '../../queries';
import '../../styles/chat/index.css';

function Chat(props) {
  const userId =
    sessionStorage.getItem('userId') ||
    String(Math.random() * 1000000).substr(0, 6);
  const [messages, setMessages] = useState([]);
  const [orderBy, setOrderBy] = useState('createdAt_ASC');
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(0);
  const messagesPerPage = 5;

  sessionStorage.setItem('userId', userId);

  const {
    loading: messagesQueryLoading,
    variables: messageQueryVars,
    data: messagesData,
  } = useQuery(MESSAGES_QUERY, {
    variables: {
      orderBy,
      filter,
      first: messagesPerPage,
      skip: page * messagesPerPage,
    },
  });

  const { data: newMessageData } = useSubscription(NEW_MESSAGE_SUBSCRIPTION);
  const { data: newReplyData } = useSubscription(NEW_REPLY_SUBSCRIPTION);
  const { data: updateMessageData } = useSubscription(UPDATE_MESSAGE_SUBSCRIPTION);
  const { data: updateReplyData } = useSubscription(UPDATE_REPLY_SUBSCRIPTION);

  useEffect(() => {
    const messages = messagesData?.messages;

    if (messages) {
      if (messageQueryVars?.skip !== 0) {
        setMessages((state) => [...state, ...messages]);
      } else {
        setMessages(messages);
      }
    }
  }, [messagesData, messageQueryVars]);

  useEffect(() => {
    const newMessage = newMessageData?.newMessage;

    if (newMessage) {
      setMessages((state) => [...state, newMessage]);
    }
  }, [newMessageData]);

  useEffect(() => {
    const newReply = newReplyData?.newReply;

    if (newReply) {
      setMessages((messages) =>
        messages.map((message) =>
          newReply.message.id === message.id
            ? {
                ...message,
                replies: [...message.replies, newReply],
              }
            : message,
        ),
      );
    }
  }, [newReplyData]);

  useEffect(() => {
    const updatedMessage = updateMessageData?.updateMessage;

    if (updatedMessage) {
      setMessages((messages) =>
        messages.map((message) =>
          updatedMessage.id === message.id
            ? {
                ...message,
                ...updatedMessage,
              }
            : message,
        ),
      );
    }
  }, [updateMessageData]);

  useEffect(() => {
    const updatedReply = updateReplyData?.updateReply;

    if (updatedReply) {
      setMessages((messages) =>
        messages.map((message) =>
          updatedReply.message.id === message.id
            ? {
                ...message,
                replies: message.replies.map((reply) =>
                  reply.id === updatedReply.id
                    ? { ...reply, ...updatedReply }
                    : reply,
                ),
              }
            : message,
        ),
      );
    }
  }, [updateReplyData]);

  function orderByHandler(value) {
    setPage(0);
    setMessages([]);
    setOrderBy(value);
  }

  function filterHandler(value) {
    setPage(0);
    setMessages([]);
    setFilter(value);
  }

  function loadMoreHandler() {
    setPage((page) => page + 1);
  }

  return (
    <div className="chat">
      <MessagesFilter
        orderByHandler={orderByHandler}
        filterHandler={filterHandler}
      />

      {messagesQueryLoading ? (
        <h1>Loading...</h1>
      ) : (
        <MessagesList
          userId={userId}
          messages={messages}
          loadMoreHandler={loadMoreHandler}
        />
      )}

      <MessageAddForm userId={userId} />
    </div>
  );
}

export default Chat;
