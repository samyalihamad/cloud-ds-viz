import { useAppSelector } from './hooks';

export const useData = () =>
  useAppSelector(({ yourReducer }) => {
    return yourReducer.data;
  });