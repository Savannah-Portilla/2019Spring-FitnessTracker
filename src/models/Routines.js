
import { api } from './api';

export async function getRoutine() {
  const x = await api('Routines');
  return x;
}

export async function addRoutine(data) {
  const x = await api('Routines', data);
  return x;
}

export async function get(data) {
  const x = await api('Routines/getID', data); // **** add this to controllers and model
  return x;
}