export const uid = () =>
  // eslint-disable-next-line operator-linebreak
  Date.now().toString(36) +
  Math.random()
    .toString(36)
    .substr(2, 5);