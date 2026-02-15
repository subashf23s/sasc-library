import { redirect } from "@tanstack/react-router";
import { createMiddleware } from "@tanstack/react-start";
import { supabase } from "./supabase";

export async function getUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function requireAuth() {
  const user = await getUser();
  if (!user) {
    throw redirect({ to: "/login" });
  }
  return user;
}

export async function requireGuest() {
  const user = await getUser();
  if (user) {
    throw redirect({ to: "/dashboard" });
  }
}
export const unAuthMiddleware = createMiddleware().server(async ({ next }) => {
  const user = await getUser();
  console.log("User", user);
  if (user) {
    throw redirect({ to: "/dashboard" });
  }
  return next();
});

export const authMiddleware = createMiddleware().server(async ({ next }) => {
  const user = await getUser();
  if (!user) {
    throw redirect({ to: "/login" });
  }
  return next({ context: { user } });
});
