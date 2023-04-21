const getCurrentTime = () => {
  const date = new Date();
  const hours = date.getHours();
  const minutes =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  return `${hours}:${minutes}`;
};

export default getCurrentTime;
