import { useAppSelector } from './hooks';


// Define the type for your application's state
interface RootState {
  yourReducer: {
    gMapsResponse: gMapsResponse;
  };
}


export const useGMapsResponse = () => {
  return useAppSelector((state: RootState) => {
    return state.yourReducer.gMapsResponse;
  });
};