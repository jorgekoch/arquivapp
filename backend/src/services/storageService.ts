import { getUserFiles } from "../repositories/filesRepository";

export async function getUserStorageUsage(userId: number) {
  const files = await getUserFiles(userId);

  const total = files.reduce((sum, file) => {
    return sum + (file.size ?? 0);
  }, 0);

  return total;
}

export function getStorageLimit(plan: string) {
  if (plan === "PRO") {
    return 20 * 1024 * 1024 * 1024;
  }

  return 500 * 1024 * 1024;
}