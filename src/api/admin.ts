import { api } from "./client";

export type PendingUser = {
  id: number;
  email: string;
  name: string;
};

export const getPendingUsers = async (): Promise<PendingUser[]> => {
  const res = await api.get("/auth/admin/pending");
  return res.data;
};

export const approveUser = async (userId: number) => {
  await api.post(`/auth/admin/approve/${userId}`);
};
