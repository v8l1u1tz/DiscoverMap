import type { Pin } from "../types/pin";

const API_URL = "http://localhost:5227/api/pin";

export const fetchPins = async (): Promise<Pin[]> => {
  const res = await fetch(API_URL);
  return res.json();
};