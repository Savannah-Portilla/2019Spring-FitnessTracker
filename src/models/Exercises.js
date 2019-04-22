
import { api } from './api';

export async function getExercize() {
  const x = await api('exercises');
  return x;
}

export async function addExercise(data) {
  const x = await api('exercises', data);
  return x;
}

export async function getID(data) {
  const x = await api('exercises/getID', data);
  return x;
}