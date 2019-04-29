
import { api } from './api';

export async function getExercise() {
  const x = await api('Exercises');
  return x;
}

export async function addExercise(data) {
  const x = await api('Exercises/addExercise', data);
  return x;
}

export async function get(data) {
  const x = await api('Exercises/getID', data);
  return x;
}

export async function deleteExercise(data) {
  const x = await api('Exercises/deleteExercise', data);
  return x;
}