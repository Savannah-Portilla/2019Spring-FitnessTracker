
import { api } from './api';

export async function getWorkouts() {
  const x = await api('Workouts/getWorkout');
  return x;
}

export async function addWorkout(data) {
  const x = await api('Workouts', data);
  return x;
}

export async function get(data) {
  const x = await api('Workouts/getID', data); 
  return x;
}
export async function deleteWorkout(data) {
  const x = await api('Workouts/deleteWorkout', data);
  return x;
}