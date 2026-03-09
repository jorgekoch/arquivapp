import bcrypt from "bcrypt";
import { AppError } from "../errors/AppError";
import {
  findUserById,
  updateUserPassword,
  updateUserProfile,
} from "../repositories/userRepository";
import { getStorageLimit, getUserStorageUsage } from "./storageService";

export async function getProfileService(userId: number) {
  const user = await findUserById(userId);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const storageUsed = await getUserStorageUsage(userId);
  const storageLimit = getStorageLimit(user.plan);

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    avatarUrl: user.avatarUrl,
    plan: user.plan,
    storageUsed,
    storageLimit,
    createdAt: user.createdAt,
  };
}

export async function updateProfileService(userId: number, name: string) {
  const user = await findUserById(userId);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const updatedUser = await updateUserProfile(userId, { name });

  const storageUsed = await getUserStorageUsage(userId);
  const storageLimit = getStorageLimit(updatedUser.plan);

  return {
    id: updatedUser.id,
    email: updatedUser.email,
    name: updatedUser.name,
    avatarUrl: updatedUser.avatarUrl,
    plan: updatedUser.plan,
    storageUsed,
    storageLimit,
    createdAt: updatedUser.createdAt,
  };
}

export async function updatePasswordService(
  userId: number,
  currentPassword: string,
  newPassword: string
) {
  const user = await findUserById(userId);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const passwordMatches = await bcrypt.compare(currentPassword, user.password);

  if (!passwordMatches) {
    throw new AppError("Current password is incorrect", 401);
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await updateUserPassword(userId, hashedPassword);
}

export async function updateAvatarService(userId: number, avatarUrl: string) {
  const user = await findUserById(userId);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const updatedUser = await updateUserProfile(userId, { avatarUrl });

  const storageUsed = await getUserStorageUsage(userId);
  const storageLimit = getStorageLimit(updatedUser.plan);

  return {
    id: updatedUser.id,
    email: updatedUser.email,
    name: updatedUser.name,
    avatarUrl: updatedUser.avatarUrl,
    plan: updatedUser.plan,
    storageUsed,
    storageLimit,
    createdAt: updatedUser.createdAt,
  };
}