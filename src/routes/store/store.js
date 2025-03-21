// stores.js
import { writable } from 'svelte/store';

// Browser check helper
const isBrowser = typeof window !== 'undefined';

// Safe localStorage functions
const safeGetItem = (key, defaultValue) => {
  if (!isBrowser) return defaultValue;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (e) {
    console.error('Error reading from localStorage:', e);
    return defaultValue;
  }
};

const safeSetItem = (key, value) => {
  if (!isBrowser) return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Error writing to localStorage:', e);
  }
};

// Initialize stores with safe defaults
export const tasks = writable(safeGetItem('pomodoro-tasks', []));
export const timeLeft = writable(safeGetItem('pomodoro-time', 1500));
export const isRunning = writable(false);
export const currentTask = writable(safeGetItem('current-task', null));

// Only set up subscribers in browser environment
if (isBrowser) {
  tasks.subscribe(value => {
    safeSetItem('pomodoro-tasks', value);
  });

  timeLeft.subscribe(value => {
    safeSetItem('pomodoro-time', value);
  });

  currentTask.subscribe(value => {
    if (value !== null) {
      safeSetItem('current-task', value);
    }
  });
}