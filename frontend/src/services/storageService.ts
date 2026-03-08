import { api } from "./api";

export async function getStorageInfo() {
  const response = await api.get("/storage");
  return response.data;
}