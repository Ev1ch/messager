function __resolveType(parent, args, context) {
  return parent.type;
}

module.exports = {
  __resolveType,
};
