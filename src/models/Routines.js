
import { api } from './api';

export async function getRoutine() {
  const x = await api('Routines/getRoutine');
  return x;
}
export async function get(data) {
  const x = await api('Routines/getID', data); 
  return x;
}

export async function addRoutine(data) {
  const x = await api('Routines', data);
  return x;
}
