// src/api/auth.ts
import { api } from "./client";

export type AuthUser = {
  user_id: number;
  email: string;
  name: string;
  role: "admin" | "employee";
  company_id: number;
  company_name: string;
};

export async function login(email: string, password: string) {
  const form = new FormData();
  form.append("username", email);
  form.append("password", password);

  const res = await api.post("/auth/login", form);
  return res.data as { access_token: string };
}

export async function signupCompany(payload: {
  company_name: string;
  email: string;
  password: string;
  admin_name: string;
}) {
  const res = await api.post("/auth/company/signup", payload);
  return res.data as { access_token: string };
}

export async function signupEmployee(payload: {
  company_name: string;
  email: string;
  password: string;
  name: string;
}) {
  const res = await api.post("/auth/employee/signup", payload);
  return res.data as { message: string };
}

export async function getMe() {
  const res = await api.get("/auth/me");
  return res.data as AuthUser;
}

export async function logout() {
  sessionStorage.removeItem("novus_token");
}
