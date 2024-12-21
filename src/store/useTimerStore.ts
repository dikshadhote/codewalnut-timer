import { configureStore, createSlice } from '@reduxjs/toolkit';
import { Timer } from '../types/timer';
import { useDispatch, useSelector } from 'react-redux';
import { loadTimersFromLocalStorage, saveTimersToLocalStorage } from '../utils/localStorageTimer';



const initialState = {
  timers: loadTimersFromLocalStorage() as Timer[],
};

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    addTimer: (state, action) => {
      const newTimer = {
        ...action.payload,
        id: crypto.randomUUID(),
        createdAt: Date.now(),
      };
      state.timers.push(newTimer);
      saveTimersToLocalStorage(state.timers);  // Save after adding
    },
    deleteTimer: (state, action) => {
      state.timers = state.timers.filter(timer => timer.id !== action.payload);
      saveTimersToLocalStorage(state.timers);  // Save after deleting
    },
    toggleTimer: (state, action) => {
      const timer = state.timers.find(timer => timer.id === action.payload);
      if (timer) {
        timer.isRunning = !timer.isRunning;
        saveTimersToLocalStorage(state.timers);  // Save after toggling
      }
    },
    updateTimer: (state, action) => {
      const timer = state.timers.find(timer => timer.id === action.payload);
      if (timer && timer.isRunning) {
        timer.remainingTime -= 1;
        timer.isRunning = timer.remainingTime > 0;
        saveTimersToLocalStorage(state.timers);  // Save after updating
      }
    },
    restartTimer: (state, action) => {
      const timer = state.timers.find(timer => timer.id === action.payload);
      if (timer) {
        timer.remainingTime = timer.duration;
        timer.isRunning = false;
        saveTimersToLocalStorage(state.timers);  // Save after restarting
      }
    },
    editTimer: (state, action) => {
      const timer = state.timers.find(timer => timer.id === action.payload.id);
      if (timer) {
        Object.assign(timer, action.payload.updates);
        timer.remainingTime = action.payload.updates.duration || timer.duration;
        timer.isRunning = false;
        saveTimersToLocalStorage(state.timers);  // Save after editing
      }
    },
  },
});

const store = configureStore({
  reducer: timerSlice.reducer,
});

export { store };

export const {
  addTimer,
  deleteTimer,
  toggleTimer,
  updateTimer,
  restartTimer,
  editTimer,
} = timerSlice.actions;

export const useTimerStore = () => {
  const dispatch = useDispatch();
  const timers = useSelector((state: { timers: Timer[] }) => state.timers);

  return {
    timers,
    addTimer: (timer: Omit<Timer, 'id' | 'createdAt'>) => dispatch(addTimer(timer)),
    deleteTimer: (id: string) => dispatch(deleteTimer(id)),
    toggleTimer: (id: string) => dispatch(toggleTimer(id)),
    updateTimer: (id: string) => dispatch(updateTimer(id)),
    restartTimer: (id: string) => dispatch(restartTimer(id)),
    editTimer: (id: string, updates: Partial<Timer>) => dispatch(editTimer({ id, updates })),
  };
};