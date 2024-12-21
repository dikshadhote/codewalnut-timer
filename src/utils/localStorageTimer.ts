import { Timer } from '../types/timer';

// Helper function to load timers from localStorage
export const loadTimersFromLocalStorage = (): Timer[] => {
  const storedTimers = localStorage.getItem('timers');
  if (storedTimers) {
    return JSON.parse(storedTimers);
  }
  return [];
};

// Helper function to save timers to localStorage
export const saveTimersToLocalStorage = (timers: Timer[]) => {
  localStorage.setItem('timers', JSON.stringify(timers));
};