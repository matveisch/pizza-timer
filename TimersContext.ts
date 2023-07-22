import { createContext, Dispatch, SetStateAction } from 'react';

export type TimersContextType = {
  timers: number[];
  setTimers: Dispatch<SetStateAction<number[]>>;
};

export const TimersContext = createContext<TimersContextType | null>(null);
