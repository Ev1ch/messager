async function replies(parent, args, context) {
  const replies = await context.prisma
    .message({
      id: parent.id,
    })
    .replies();

  return replies;
}

module.exports = {
  replies,
};
