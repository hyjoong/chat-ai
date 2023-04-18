export const validateRoomCount = (count: string) => {
  const MIN_ROOM_COUNT = 2;
  const MAX_ROOM_COUNT = 5;
  const newCount = Number(count);

  if (
    isNaN(newCount) ||
    newCount < MIN_ROOM_COUNT ||
    MAX_ROOM_COUNT < newCount
  ) {
    return false;
  }
  return true;
};
