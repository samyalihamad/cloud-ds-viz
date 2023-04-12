import { useAppSelector } from './hooks';

interface Point {
  x: number;
  y: number;
}

interface Edge {
  a: Point;
  b: Point;
}

// Define the type for your application's state
interface RootState {
  yourReducer: {
    data: Edge[];
  };
}


export const useData = () => {
  return useAppSelector((state: RootState) => {
    return state.yourReducer.data;
  });
};