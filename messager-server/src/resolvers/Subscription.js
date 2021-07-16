function newMessageSubscribe(parent, args, context) {
  return context.prisma.$subscribe
    .message({
      mutation_in: ['CREATED'],
    })
    .node();
}

function newReplySubscribe(parent, args, context) {
  return context.prisma.$subscribe
    .reply({
      mutation_in: ['CREATED'],
    })
    .node();
}

function updateMessageSubscribe(parent, args, context) {
  return context.prisma.$subscribe
    .message({
      mutation_in: ['UPDATED'],
    })
    .node();
}

function updateReplySubscribe(parent, args, context) {
  return context.prisma.$subscribe
    .reply({
      mutation_in: ['UPDATED'],
    })
    .node();
}

const newMessage = {
  subscribe: newMessageSubscribe,
  resolve: (payload) => payload,
};

const newReply = {
  subscribe: newReplySubscribe,
  resolve: (payload) => payload,
};

const updateMessage = {
  subscribe: updateMessageSubscribe,
  resolve: (payload) => payload,
};

const updateReply = {
  subscribe: updateReplySubscribe,
  resolve: (payload) => payload,
};

module.exports = {
  newMessage,
  updateMessage,
  newReply,
  updateReply,
};
