import { useEffect, useState } from 'react';

const useFormatTime = (date: Date) => {
  const [formattedTime, setFormattedTime] = useState('');

  useEffect(() => {
    const hours = date.getHours();
    const minutes =
      date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();

    setFormattedTime(`${hours}:${minutes}`);
  }, [date]);

  return formattedTime;
};

export default useFormatTime;
