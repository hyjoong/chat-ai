import { renderHook } from '@testing-library/react-hooks';
import useFormatTime from '@hooks/useFormatTime';

describe('useFormatTime', () => {
  it('It shows the current time in HH:MM format.', () => {
    const date = new Date(2023, 4, 17, 21, 30);
    const { result } = renderHook(() => useFormatTime(date));
    expect(result.current).toEqual('21:30');
  });

  it('If the minute is less than 10 minutes, show 0 in front of the minute', () => {
    const date = new Date(2022, 4, 17, 15, 5);
    const { result } = renderHook(() => useFormatTime(date));
    expect(result.current).toEqual('15:05');
  });
});
