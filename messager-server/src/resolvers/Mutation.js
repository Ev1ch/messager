async function addMessage(parent, args, context) {
  const message = await context.prisma.createMessage({
    userId: args.userId,
    type: 'Message',
    likesNumber: 0,
    dislikesNumber: 0,
    text: args.text,
  });

  return message;
}

async function addReply(parent, args, context) {
  let existingMessage;
  if (
    await context.prisma.$exists.message({
      id: args.messageId,
    })
  ) {
    existingMessage = await context.prisma.message({
      id: args.messageId,
    });
  }

  if (!existingMessage) {
    throw new Error(`Message with ID ${args.messageId} does not exist.`);
  }

  if (existingMessage.userId === args.userId) {
    throw new Error(`User can not reply to his own messages`);
  }

  const reply = await context.prisma.createReply({
    userId: args.userId,
    type: 'Reply',
    text: args.text,
    likesNumber: 0,
    dislikesNumber: 0,
    message: {
      connect: {
        id: args.messageId,
      },
    },
  });

  return reply;
}

async function toggleMessageLike(parent, args, context) {
  let existingMessage;
  if (
    await context.prisma.$exists.message({
      id: args.messageId,
    })
  ) {
    existingMessage = await context.prisma.message({
      id: args.messageId,
    });
  } else if (
    await context.prisma.$exists.reply({
      id: args.messageId,
    })
  ) {
    existingMessage = await context.prisma.reply({
      id: args.messageId,
    });
  }

  if (!existingMessage) {
    throw new Error(`Message/reply with ID ${args.messageId} does not exist.`);
  }

  if (existingMessage.userId === args.userId) {
    throw new Error(
      `User with ID ${
        args.userId
      } can not like/dislike his own message/reply with ID ${args.messageId}`,
    );
  }

  let updatedMessage;
  let payload;
  if (!existingMessage.likes.includes(args.userId)) {
    const updatedDislikes = existingMessage.dislikes.filter(
      (userId) => userId !== args.userId,
    );
    const updatedLikes = [...existingMessage.likes, args.userId];

    payload = {
      data: {
        dislikes: {
          set: updatedDislikes,
        },
        dislikesNumber: updatedDislikes.length,
        likes: {
          set: updatedLikes,
        },
        likesNumber: updatedLikes.length,
      },
      where: {
        id: args.messageId,
      },
    };

    updatedMessage =
      existingMessage.type === 'Message'
        ? context.prisma.updateMessage(payload)
        : context.prisma.updateReply(payload);
  } else {
    const updatedLikes = existingMessage.likes.filter(
      (userId) => userId !== args.userId,
    );
    payload = {
      data: {
        likes: {
          set: updatedLikes,
        },
        likesNumber: updatedLikes.length,
      },
      where: {
        id: args.messageId,
      },
    };

    updatedMessage =
      existingMessage.type === 'Message'
        ? context.prisma.updateMessage(payload)
        : context.prisma.updateReply(payload);
  }

  return updatedMessage;
}

async function toggleMessageDislike(parent, args, context) {
  let existingMessage;
  if (
    await context.prisma.$exists.message({
      id: args.messageId,
    })
  ) {
    existingMessage = await context.prisma.message({
      id: args.messageId,
    });
  } else if (
    await context.prisma.$exists.reply({
      id: args.messageId,
    })
  ) {
    existingMessage = await context.prisma.reply({
      id: args.messageId,
    });
  }

  if (!existingMessage) {
    throw new Error(`Message/reply with ID ${args.messageId} does not exist.`);
  }

  if (existingMessage.userId === args.userId) {
    throw new Error(
      `User with ID ${
        args.userId
      } can not like/dislike his own message/reply with ID ${args.messageId}`,
    );
  }

  let updatedMessage;
  let payload;
  if (!existingMessage.dislikes.includes(args.userId)) {
    const updatedLikes = existingMessage.likes.filter(
      (userId) => userId !== args.userId,
    );
    const updatedDislikes = [...existingMessage.dislikes, args.userId];

    payload = {
      data: {
        likes: {
          set: updatedLikes,
        },
        likesNumber: updatedLikes.length,
        dislikes: {
          set: updatedDislikes,
        },
        dislikesNumber: updatedDislikes.length,
      },
      where: {
        id: args.messageId,
      },
    };

    updatedMessage =
      existingMessage.type === 'Message'
        ? context.prisma.updateMessage(payload)
        : context.prisma.updateReply(payload);
  } else {
    const updatedDislikes = existingMessage.dislikes.filter(
      (userId) => userId !== args.userId,
    );

    payload = {
      data: {
        dislikes: {
          set: updatedDislikes,
        },
        dislikesNumber: updatedDislikes.length,
      },
      where: {
        id: args.messageId,
      },
    };

    updatedMessage =
      existingMessage.type === 'Message'
        ? context.prisma.updateMessage(payload)
        : context.prisma.updateReply(payload);
  }

  return updatedMessage;
}

module.exports = {
  addMessage,
  addReply,
  toggleMessageLike,
  toggleMessageDislike,
};
