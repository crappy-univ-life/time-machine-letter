import propType from 'prop-types';

export const formatOpenTime = (date) => {
  let openTime;
  if (typeof date === 'string') {
    openTime = new Date(date).getTime();
  } else if (typeof date === 'object') {
    openTime = date.getTime();
  } else {
    openTime = undefined;
  }
  return openTime;
};

export const formatTime = (time) => {
  const hours = Math.floor(time / 3600).toString().padStart(2, '0');
  const minutes = Math.floor((time % 3600) / 60).toString().padStart(2, '0');
  const seconds = (time % 60).toString().padStart(2, '0');

  return { hours, minutes, seconds };
};

formatTime.proptype = {
  time: propType.number,
};
