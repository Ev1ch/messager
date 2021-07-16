async function message(parent, args, context) {
  const message = await context.prisma
    .reply({
      id: parent.id,
    })
    .message();

  return message;
}

module.exports = {
  message,
};
