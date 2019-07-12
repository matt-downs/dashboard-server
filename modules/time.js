const getTime = () => {
  const today = new Date();
  let h = today.getHours();
  h = h % 12 || 12;
  let m = today.getMinutes();
  m = m < 10 ? `0${m}` : m;

  return `${h}:${m}`;
};

const renderFn = () => `
  <h1 class="m-0">${getTime()}</h1>
`;

module.exports = {
  render: renderFn
};
