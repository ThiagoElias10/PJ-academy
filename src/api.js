import db from '../db.json';

// Celular físico: use o IP do seu PC na rede (ex.: 192.168.0.10)
// Emulador Android: 10.0.2.2  |  Simulador iOS: localhost
const HOST = '192.168.0.117';

export const API_URL = `http://${HOST}:3000`;

const data = db;

export async function get(path) {
  try {
    const res = await fetch(`${API_URL}${path}`);
    if (res.ok) {
      return res.json();
    }
  } catch (e) {
    // fallback to bundled data
  }

  if (path === '/user') return data.user;
  if (path === '/home') return data.home;
  if (path === '/weekWorkouts') return data.weekWorkouts;
  if (path === '/monthWorkouts') return data.monthWorkouts;
  if (path === '/monthProgress') return data.monthProgress;
  if (path === '/plans') return data.plans;
  throw new Error(`Erro em ${path}`);
}