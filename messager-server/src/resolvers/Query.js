async function messages(parent, args, context) {
  const where = args.filter
    ? {
        text_contains: args.filter,
      }
    : {};

  const messages = await context.prisma.messages({
    where,
    orderBy: args.orderBy,
    skip: args.skip,
    first: args.first,
  });

  return messages;
}

async function messagesNumber(parent, args, context) {
  const messagesNumber = await context.prisma
    .messagesConnection()
    .aggregate()
    .count();

  return messagesNumber;
}

module.exports = {
  messages,
  messagesNumber,
};
