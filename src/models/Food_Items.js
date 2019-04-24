
import { api } from './api';

export async function getFood() {
  const x = await api('Food_Items');
  return x;
}

export async function addFood(data) {
  const x = await api('Food_Items', data);
  return x;
}

export async function get(data) {
  const x = await api('Food_Items/getID', data);
  return x;
}