export interface IChatItemProps {
  id: number;
  title: string;
  count: string;
  handleRoomClick: (roomId: number) => void;
  handleRoomEdit: (
    event: React.MouseEvent<HTMLButtonElement>,
    id: number,
    title: string,
    count: string,
  ) => void;
}
