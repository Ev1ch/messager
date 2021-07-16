import gql from 'graphql-tag';

export const ORDER_BY = {
  createdAt_ASC: 'createdAt_ASC',
  createdAt_DESC: 'createdAt_DESC',
  likesNumber_ASC: 'likesNumber_ASC',
  likesNumber_DESC: 'likesNumber_DESC',
  dislikesNumber_ASC: 'dislikesNumber_ASC',
  dislikesNumber_DESC: 'dislikesNumber_DESC',
};

export const MESSAGES_QUERY = gql`
  query messagesQuery(
    $orderBy: MessageOrderByInput
    $skip: Int
    $first: Int
    $filter: String
  ) {
    messages(orderBy: $orderBy, skip: $skip, first: $first, filter: $filter) {
      id
      userId
      text
      likes
      likesNumber
      dislikes
      dislikesNumber
      replies {
        id
        userId
        text
        likes
        likesNumber
        dislikes
        dislikesNumber
      }
    }
  }
`;

export const ADD_MESSAGE_MUTATION = gql`
  mutation addMessage($userId: ID!, $text: String!) {
    addMessage(userId: $userId, text: $text) {
      id
    }
  }
`;

export const ADD_REPLY_MUTATION = gql`
  mutation addReply($messageId: ID!, $userId: ID!, $text: String!) {
    addReply(messageId: $messageId, userId: $userId, text: $text) {
      id
      message {
        id
      }
    }
  }
`;

export const TOGGLE_LIKE_MUTATION = gql`
  mutation toggleMessageLike($userId: ID!, $messageId: ID!) {
    toggleMessageLike(userId: $userId, messageId: $messageId) {
      ... on Message {
        type
        likes
        likesNumber
        dislikes
        dislikesNumber
      }
      ... on Reply {
        type
        likes
        likesNumber
        dislikes
        dislikesNumber
      }
    }
  }
`;

export const TOGGLE_DISLIKE_MUTATION = gql`
  mutation toggleMessageDislike($messageId: ID!, $userId: ID!) {
    toggleMessageDislike(messageId: $messageId, userId: $userId) {
      __typename
      ... on Message {
        type
        likes
        likesNumber
        dislikes
        dislikesNumber
      }
      ... on Reply {
        type
        likes
        likesNumber
        dislikes
        dislikesNumber
      }
    }
  }
`;

export const NEW_MESSAGE_SUBSCRIPTION = gql`
  subscription {
    newMessage {
      id
      userId
      text
      likes
      likesNumber
      dislikes
      dislikesNumber
      replies {
        id
        userId
        text
        likes
        likesNumber
        dislikes
        dislikesNumber
      }
    }
  }
`;

export const NEW_REPLY_SUBSCRIPTION = gql`
  subscription {
    newReply {
      id
      userId
      text
      likes
      likesNumber
      dislikes
      dislikesNumber
      message {
        id
      }
    }
  }
`;

export const UPDATE_REPLY_SUBSCRIPTION = gql`
  subscription {
    updateReply {
      id
      likes
      likesNumber
      dislikes
      dislikesNumber
      message {
        id
      }
    }
  }
`;

export const UPDATE_MESSAGE_SUBSCRIPTION = gql`
  subscription {
    updateMessage {
      id
      likes
      likesNumber
      dislikes
      dislikesNumber
      replies {
        id
        userId
        text
        likes
        likesNumber
        dislikes
        dislikesNumber
      }
    }
  }
`;
